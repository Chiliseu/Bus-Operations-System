import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import styles from '../Edit-Stop/edit-stop.module.css';
import dynamic from "next/dynamic";
const StopMapPicker = dynamic(() => import('@/components/ui/MapPicker'), { ssr: false });

interface EditStopModalProps {
  show: boolean;
  onClose: () => void;
  stop: { id: string; name: string; latitude: string; longitude: string } | null;
  onSave: (stop: { id: string; name: string; latitude: string; longitude: string }) => Promise<boolean>;
}

function isValidLatLng(lat: string, lng: string) {
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  return (
    !isNaN(latNum) &&
    !isNaN(lngNum) &&
    latNum >= -90 && latNum <= 90 &&
    lngNum >= -180 && lngNum <= 180
  );
}

const EditStopModal: React.FC<EditStopModalProps> = ({ show, onClose, stop, onSave }) => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString('en-US', { hour12: true })
  );

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  useEffect(() => {
    if (stop) {
      setName(stop.name);
      if (isValidLatLng(stop.latitude, stop.longitude)) {
        setLatitude(stop.latitude);
        setLongitude(stop.longitude);
      } else {
        setLatitude("14.5995");
        setLongitude("120.9842");
      }
    }
  }, [stop]);

  const handleSave = async () => {
    if (!stop) return;
    if (!name.trim() || !latitude.trim() || !longitude.trim()) {
      await Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all fields before saving.',
      });
      return;
    }
    const success = await onSave({ id: stop.id, name, latitude, longitude });
    if (success) {
      onClose();
    }
  };

  if (!show || !stop) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Edit Stop</h2>
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
              onChange={(e) => {
                const filtered = e.target.value.replace(/[^a-zA-Z0-9 .,\-'/&#]/g, "");
                if (filtered.length <= 30) setName(filtered);
              }}
              placeholder="Enter stop name"
            />
            <small className={styles.hint}>
              * Max 30 characters and only . , - &#39; &amp; / # allowed.
            </small>
          </div>
          
          <label className={styles.label} style={{ marginBottom: 6 }}>
            Select a location on the map to set the stop's coordinates.
          </label>

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

        <div className={`${styles.footer} d-flex justify-content-between align-items-center`}>
          <small className="text-muted">{currentTime}</small>
          <button
            type="button"
            className={styles.createStopBtn}
            onClick={handleSave}
          >
            Save Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStopModal;
