import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import styles from './edit-stop.module.css';
import dynamic from "next/dynamic";
const StopMapPicker = dynamic(() => import('@/components/ui/MapPicker'), { ssr: false });

interface EditStopModalProps {
  show: boolean;
  onClose: () => void;
  stop: { id: string; name: string; latitude: string; longitude: string } | null;
  onSave: (stop: { id: string; name: string; latitude: string; longitude: string }) => Promise<boolean>;
}

// Utility function to validate coordinates
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

  // Populate fields when stop changes
  useEffect(() => {
    if (stop) {
      setName(stop.name);

      // Validate coordinates, fallback to Manila if invalid
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
                  onChange={(e) => {
                    const filtered = e.target.value.replace(
                      /[^a-zA-Z0-9 .,\-'/&#]/g,
                      ""
                    );
                    if (filtered.length <= 30) setName(filtered);
                  }}
                />
                <small className={styles.hint}>
                  * Max 30 characters and only . , - &apos; &amp; / # allowed.
                </small>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Pick Location on Map</label>
                <div style={{ height: 300, width: "100%", marginBottom: 12 }}>
                  <StopMapPicker
                    latitude={latitude}
                    longitude={longitude}
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                  />
                </div>
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

              {/* <div className={styles.formGroup}>
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
              </div> */}
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={`${styles.btn} ${styles.saveStopBtn}`}
              onClick={handleSave}
            >
              Save Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStopModal;
