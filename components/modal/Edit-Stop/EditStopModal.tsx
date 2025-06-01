import React, { useState, useEffect } from "react";
import styles from './edit-stop.module.css';

interface EditStopModalProps {
  show: boolean;
  onClose: () => void;
  stop: { id: string; name: string; latitude: string; longitude: string } | null;
  onSave: (stop: { id: string; name: string; latitude: string; longitude: string }) => Promise<boolean>;
}

const EditStopModal: React.FC<EditStopModalProps> = ({ show, onClose, stop, onSave }) => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Populate fields when stop changes
  useEffect(() => {
    if (stop) {
      setName(stop.name);
      setLatitude(stop.latitude);
      setLongitude(stop.longitude);
    }
  }, [stop]);

  const handleSave = async () => {
    if (!stop) return;
    const success = await onSave({ id: stop.id, name, latitude, longitude });
    if (success) {
      onClose();
    }
  };

  if (!show || !stop) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalDialog}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h5 className={styles.modalTitle}>Edit Stop</h5>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          
          <div className={styles.modalBody}>
            <div className={styles.formSection}>
              <h6 className={styles.sectionTitle}>Stop Information</h6>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Stop Name</label>
                <input
                  type="text"
                  className={styles.formControl}
                  placeholder="Enter stop name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Latitude</label>
                <input
                  type="text"
                  className={styles.formControl}
                  placeholder="Enter latitude (e.g., 14.5995)"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Longitude</label>
                <input
                  type="text"
                  className={styles.formControl}
                  placeholder="Enter longitude (e.g., 120.9842)"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.modalFooter}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnCancel}`}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnSave}`}
              onClick={handleSave}
              disabled={!name.trim() || !latitude.trim() || !longitude.trim()}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStopModal;