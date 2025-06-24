import { MapContainer, TileLayer, Marker, Tooltip, Polyline } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import { Stop } from "@/app/interface";

// Custom icons for start, end, and stops
const startIcon = new Icon({
  iconUrl: "/assets/images/marker-icon-green.png",
  shadowUrl: "/assets/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const endIcon = new Icon({
  iconUrl: "/assets/images/marker-icon-red.png",
  shadowUrl: "/assets/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const stopIcon = new Icon({
  iconUrl: "/assets/images/marker-icon.png",
  shadowUrl: "/assets/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface RouteMapPreviewProps {
  startStop?: Stop | null;
  endStop?: Stop | null;
  stopsBetween: Stop[];
}

const RouteMapPreview: React.FC<RouteMapPreviewProps> = ({
  startStop,
  endStop,
  stopsBetween,
}) => {
  // State to track which stopsBetween marker is active (clicked)
  const [activeStopIdx, setActiveStopIdx] = useState<number | null>(null);

  // Collect all stops with their type and label
  const markers: {
    lat: number;
    lng: number;
    label: string;
    icon: Icon;
    type: "start" | "between" | "end";
    idx?: number;
  }[] = [];

  if (startStop && startStop.latitude && startStop.longitude) {
    markers.push({
      lat: parseFloat(startStop.latitude),
      lng: parseFloat(startStop.longitude),
      label: "Start",
      icon: startIcon,
      type: "start",
    });
  }
  stopsBetween.forEach((stop, idx) => {
    if (stop.latitude && stop.longitude) {
      markers.push({
        lat: parseFloat(stop.latitude),
        lng: parseFloat(stop.longitude),
        label: `Stop ${idx + 1}`,
        icon: stopIcon,
        type: "between",
        idx,
      });
    }
  });
  if (endStop && endStop.latitude && endStop.longitude) {
    markers.push({
      lat: parseFloat(endStop.latitude),
      lng: parseFloat(endStop.longitude),
      label: "End",
      icon: endIcon,
      type: "end",
    });
  }

  // Polyline positions for the route
  const polylinePositions = markers.map(m => [m.lat, m.lng]) as [number, number][];

  // Center map on first marker, or default to Manila
  const center =
    markers.length > 0
      ? [markers[0].lat, markers[0].lng]
      : [14.5995, 120.9842];

  return (
    <div style={{ height: 300, width: "100%", marginBottom: 16 }}>
      <MapContainer center={center as [number, number]} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {/* Draw the route as a polyline */}
        {polylinePositions.length > 1 && (
          <Polyline positions={polylinePositions} color="blue" />
        )}
        {/* Markers with tooltips */}
        {markers.map((m, idx) => (
          <Marker
            key={idx}
            position={[m.lat, m.lng]}
            icon={m.icon}
            eventHandlers={
              m.type === "between"
                ? {
                    click: () => setActiveStopIdx(m.idx ?? null),
                  }
                : undefined
            }
          >
            {m.type === "start" || m.type === "end" ? (
              <Tooltip direction="top" offset={[0, -10]} permanent>
                {m.label}
              </Tooltip>
            ) : activeStopIdx === m.idx ? (
              <Tooltip direction="top" offset={[0, -10]}>{m.label}</Tooltip>
            ) : null}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RouteMapPreview;