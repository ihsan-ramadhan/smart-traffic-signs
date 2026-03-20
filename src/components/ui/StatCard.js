"use client";

export default function StatCard({ icon: Icon, label, value, unit, colorClass = "bg-blue-50 text-primary", iconColorClass = "text-primary" }) {
  return (
    <div className={`${colorClass} p-3 rounded-xl flex-1 border border-white/30 flex flex-col justify-center`}>
      <div className="flex items-center gap-1 mb-1">
        {Icon && <Icon size={14} className={iconColorClass} fill={iconColorClass.includes('yellow') ? 'currentColor' : 'none'} />}
        <p className="text-xs opacity-80 uppercase font-bold tracking-tight">{label}</p>
      </div>
      <p className="font-bold text-xl leading-none flex items-baseline gap-1">
        {value}
        {unit && <span className="text-xs font-normal opacity-60">{unit}</span>}
      </p>
    </div>
  );
}
