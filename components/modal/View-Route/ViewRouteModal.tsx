import React from "react";
import styles from "./view-route.module.css";
import dynamic from "next/dynamic";
import { Route, Stop } from "@/app/interface";
const RouteMapPreview = dynamic(() => import("@/components/ui/RouteMapPreview"), { ssr: false });

interface ViewRouteModalProps {
  show: boolean;
  onClose: () => void;
  route: Route | null;
}

const ViewRouteModal: React.FC<ViewRouteModalProps> = ({ show, onClose, route }) => {
  if (!show || !route) return null;

  // Prepare stopsBetween as Stop[]
  const stopsBetween: Stop[] = route.RouteStops
    ? route.RouteStops
        .filter(rs => rs.Stop && rs.Stop.StopID)
        .map(rs => ({
          StopID: rs.Stop.StopID,
          StopName: rs.Stop.StopName || "",
          IsDeleted: rs.Stop.IsDeleted ?? false,
          latitude: rs.Stop.latitude ?? "",
          longitude: rs.Stop.longitude ?? "",
          CreatedAt: rs.Stop.CreatedAt ?? "",
          UpdatedAt: rs.Stop.UpdatedAt ?? "",
        }))
    : [];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>View Route</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className={styles.body}>
          <div className={styles.section}>
            <label className={styles.label}>Route Name</label>
            <div className={styles.input} style={{ background: "#f5f5f5" }}>{route.RouteName}</div>
          </div>
          <div className={styles.section}>
            <label className={styles.label}>Start Stop</label>
            <div className={styles.input} style={{ background: "#f5f5f5" }}>{route.StartStop?.StopName || "-"}</div>
          </div>
          <div className={styles.section}>
            <label className={styles.label}>End Stop</label>
            <div className={styles.input} style={{ background: "#f5f5f5" }}>{route.EndStop?.StopName || "-"}</div>
          </div>
          <div className={styles.section}>
            <label className={styles.label}>Stops Between</label>
            <div
              className={styles.input}
              style={{
                background: "#f5f5f5",
                maxHeight: 120,
                overflowY: "auto",
                whiteSpace: "normal",
                padding: "8px",
              }}
            >
              {stopsBetween.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {stopsBetween.map((s, idx) => (
                    <li key={s.StopID || idx}>{s.StopName}</li>
                  ))}
                </ul>
              ) : (
                "None"
              )}
            </div>
          </div>
          <div style={{ height: 300, width: "100%", marginBottom: 12 }}>
            <RouteMapPreview
              startStop={route.StartStop}
              endStop={route.EndStop}
              stopsBetween={stopsBetween}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRouteModal;