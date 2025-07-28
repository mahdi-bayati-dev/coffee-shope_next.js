"use client";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// فقط در مرورگر import میشه
import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

import "leaflet/dist/leaflet.css";
import styles from "./map.module.css";

export default function Map({ position, center, children }) {
  return (
    <>
      <MapContainer
        className={styles.map}
        center={center}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Set Coffee</Popup>
        </Marker>
      </MapContainer>
      <div className={styles.details}>{children}</div>
    </>
  );
}
