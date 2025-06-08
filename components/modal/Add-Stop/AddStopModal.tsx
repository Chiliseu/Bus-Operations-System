import React, { useState } from "react";
import Swal from 'sweetalert2';
import styles from "./add-stop.module.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import dynamic from "next/dynamic";

interface AddStopModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (stop: { name: string; latitude: string; longitude: string }) => Promise<boolean>;
}

// Add types for LocationPicker props
interface LocationPickerProps {
  latitude: string;
  longitude: string;
  setLatitude: (lat: string) => void;
  setLongitude: (lng: string) => void;
}

const StopMapPicker = dynamic(() => import("@/components/ui/MapPicker"), { ssr: false });

const LocationPicker: React.FC<LocationPickerProps> = ({ latitude, longitude, setLatitude, setLongitude }) => {
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

const AddStopModal: React.FC<AddStopModalProps> = ({ show, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleCreate = async () => {
  if (!name || !latitude || !longitude) {
    return await Swal.fire({
      icon: 'warning',
      title: 'Missing Fields',
      text: 'Please fill in all fields.',
    });
  }

    const success = await onCreate({ name, latitude, longitude });
    if (success) {
      setName("");
      setLatitude("");
      setLongitude("");
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create Stop</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Stop Information</h4>
            <label className={styles.label}>Stop Name</label>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter stop name"
            />
          </div>

          {/* <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Location Coordinates</h4>
            <div className={styles.coords}>
              <div>
                <label className={styles.label}>Latitude</label>
                <input
                  className={styles.input}
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Enter latitude"
                />
              </div>
              <div>
                <label className={styles.label}>Longitude</label>
                <input
                  className={styles.input}
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Enter longitude"
                />
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Pick Location on Map</h4>
            <div style={{ height: 300, width: "100%", marginBottom: 12 }}>
              <MapContainer
                center={[
                  latitude ? parseFloat(latitude) : 14.5995,
                  longitude ? parseFloat(longitude) : 120.9842,
                ]}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <LocationPicker
                  latitude={latitude}
                  longitude={longitude}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                />
              </MapContainer>
            </div>
            <div className={styles.coords}>
              <div>
                <label className={styles.label}>Latitude</label>
                <input
                  className={styles.input}
                  type="text"
                  value={latitude}
                  readOnly
                />
              </div>
              <div>
                <label className={styles.label}>Longitude</label>
                <input
                  className={styles.input}
                  type="text"
                  value={longitude}
                  readOnly
                />
              </div>
            </div>
          </div> */}
          <div style={{ height: 300, width: "100%", marginBottom: 12 }}>
            <StopMapPicker
              latitude={latitude}
              longitude={longitude}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
          </div>

          <div className={styles.coords}>
            <div>
              <label className={styles.label}>Latitude</label>
              <input
                className={styles.input}
                type="text"
                value={latitude}
                readOnly  
              />
            </div>
            <div>
              <label className={styles.label}>Longitude</label>
              <input
                className={styles.input}
                type="text"
                value={longitude}
                readOnly
              />
            </div>
          </div>

        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.createStopBtn}
            onClick={handleCreate}
          >
            Create Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStopModal;
