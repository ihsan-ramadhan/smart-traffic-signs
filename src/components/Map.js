"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export default function Map() {
  const defaultCenter = [-6.8721, 107.5744]; 

  return (
    <MapContainer
      center={defaultCenter}
      zoom={16}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={defaultCenter}>
        <Popup>
          <b>Polban</b> <br /> Titik awal simulasi.
        </Popup>
      </Marker>
    </MapContainer>
  );
}