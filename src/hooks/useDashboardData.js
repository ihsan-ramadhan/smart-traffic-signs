"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useDashboardData(user) {
  const [scans, setScans] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        const promises = [];

        // Fetch scans if user is logged in
        if (user) {
          promises.push(
            supabase
              .from('scans')
              .select(`
                id,
                points_earned,
                created_at,
                sign_locations (
                  location_name,
                  traffic_signs (
                    id,
                    name,
                    category
                  )
                )
              `)
              .eq('user_id', user.id)
              .order('created_at', { ascending: false })
              .limit(5)
          );
        } else {
          promises.push(Promise.resolve({ data: [] }));
        }

        // Fetch leaderboard (always needed)
        promises.push(
          supabase
            .from('profiles')
            .select('id, full_name, xp, avatar_url')
            .order('xp', { ascending: false })
            .limit(5)
        );

        const [scansResult, leaderboardResult] = await Promise.all(promises);

        if (isMounted) {
          if (scansResult.error) throw scansResult.error;
          if (leaderboardResult.error) throw leaderboardResult.error;

          setScans(scansResult.data || []);
          setLeaderboard(leaderboardResult.data || []);
        }
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return { scans, leaderboard, loading, error };
}
