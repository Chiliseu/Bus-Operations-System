import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

interface StopMapPickerProps {
  latitude: string;
  longitude: string;
  setLatitude: (lat: string) => void;
  setLongitude: (lng: string) => void;
}

const LocationPicker: React.FC<StopMapPickerProps> = ({ latitude, longitude, setLatitude, setLongitude }) => {
  useMapEvents({
    click(e) {
      setLatitude(e.latlng.lat.toString());
      setLongitude(e.latlng.lng.toString());
    },
  });

  return latitude && longitude ? (
    <Marker position={[parseFloat(latitude), parseFloat(longitude)]} />
  ) : null;
};

const StopMapPicker: React.FC<StopMapPickerProps> = (props) => (
  <MapContainer
    center={[
      props.latitude ? parseFloat(props.latitude) : 14.5995,
      props.longitude ? parseFloat(props.longitude) : 120.9842,
    ]}
    zoom={12}
    style={{ height: "100%", width: "100%" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
    <LocationPicker {...props} />
  </MapContainer>
);

export default StopMapPicker;