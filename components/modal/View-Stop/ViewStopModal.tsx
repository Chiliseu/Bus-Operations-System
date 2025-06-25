import React from "react";
import styles from "./view-stop.module.css";
import dynamic from "next/dynamic";
const RouteMapPreview = dynamic(() => import("@/components/ui/RouteMapPreview"), { ssr: false });
import { Stop } from "@/app/interface";

interface ViewStopModalProps {
  show: boolean;
  onClose: () => void;
  stop: Stop | null;
}

const ViewStopModal: React.FC<ViewStopModalProps> = ({ show, onClose, stop }) => {
  if (!show || !stop) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>View Stop</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className={styles.body}>
          <div className={styles.section}>
            <label className={styles.label}>Stop Name</label>
            <div className={styles.input} style={{ background: "#f5f5f5" }}>{stop.StopName}</div>
          </div>
          <div style={{ height: 300, width: "100%", marginBottom: 12 }}>
            <RouteMapPreview
              startStop={null}
              endStop={null}
              stopsBetween={[{
                StopID: "view",
                StopName: stop.StopName,
                latitude: stop.latitude,
                longitude: stop.longitude,
                IsDeleted: false,
                CreatedAt: "",
                UpdatedAt: "",
              }]}
            />
          </div>
          <div className={styles.coords}>
            <div>
              <label className={styles.label}>Latitude</label>
              <input className={styles.input} type="text" value={stop.latitude} readOnly />
            </div>
            <div>
              <label className={styles.label}>Longitude</label>
              <input className={styles.input} type="text" value={stop.longitude} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStopModal;