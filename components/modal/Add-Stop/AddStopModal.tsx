import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import styles from "./add-stop.module.css";

const StopMapPicker = dynamic(() => import("@/components/ui/MapPicker"), { ssr: false });

interface AddStopModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (stop: { name: string; latitude: string; longitude: string }) => Promise<boolean>;
  title?: string; // e.g. "Add Pickup Location"
  selectButtonText?: string; // e.g. "Set Pickup Location"
  initialName?: string;
  initialLat?: string;
  initialLng?: string;
}

const AddStopModal: React.FC<AddStopModalProps> = ({
  show,
  onClose,
  onCreate,
  title = "Create Stop",
  selectButtonText = "Create Stop",
  initialName = "",
  initialLat = "",
  initialLng = "",
}) => {
  const [name, setName] = useState(initialName);
  const [latitude, setLatitude] = useState(initialLat);
  const [longitude, setLongitude] = useState(initialLng);
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString('en-US', { hour12: true })
  );

  useEffect(() => {
    if (!show) return;
    setName(initialName);
    setLatitude(initialLat);
    setLongitude(initialLng);
  }, [show, initialName, initialLat, initialLng]);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  const handleCreate = async () => {
    if (!name && !latitude && !longitude) {
      await Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please provide a name or pick a location on the map.",
      });
      return;
    }

    try {
      const success = await onCreate({
        name: name || `${latitude}, ${longitude}`,
        latitude: latitude || "",
        longitude: longitude || "",
      });

      if (success) {
        // clear local state and close
        setName("");
        setLatitude("");
        setLongitude("");
        onClose();
      }
      // if not success, keep modal open for user to retry
    } catch (err) {
      console.error("AddStopModal onCreate error:", err);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to set location. Please try again.",
      });
    }
  };

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.section}>
            <label className={styles.label}>Name / Address</label>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a name or address for this location"
            />
            <small className={styles.inputHint}>
              You can type a name or click the map to pick coordinates.
            </small>
          </div>

          <label className={styles.label} style={{ marginBottom: 6 }}>
            Select a location on the map to set the coordinates.
          </label>
          <div style={{ height: 300, width: "100%", marginBottom: 12 }}>
            <StopMapPicker
              latitude={latitude}
              longitude={longitude}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
          </div>

          <div className={styles.coords} style={{ gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label className={styles.label}>Latitude</label>
              <input className={styles.input} value={latitude} readOnly />
            </div>
            <div style={{ flex: 1 }}>
              <label className={styles.label}>Longitude</label>
              <input className={styles.input} value={longitude} readOnly />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <small className={styles.currentTime}>{currentTime}</small>
          <button className={styles.createStopBtn} onClick={handleCreate} type="button">
            {selectButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStopModal;