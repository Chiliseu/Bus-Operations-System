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

  // Create the complete route visualization
  const renderRouteVisualization = () => {
    const allStops = [];
    
    // Add start stop
    if (route.StartStop) {
      allStops.push({
        ...route.StartStop,
        type: 'start'
      });
    }
    
    // Add intermediate stops
    stopsBetween.forEach(stop => {
      allStops.push({
        ...stop,
        type: 'intermediate'
      });
    });
    
    // Add end stop
    if (route.EndStop) {
      allStops.push({
        ...route.EndStop,
        type: 'end'
      });
    }

    if (allStops.length === 0) {
      return <div className={styles.noStopsText}>No route stops available</div>;
    }

    return (
      <div className={styles.routeFlow}>
        {allStops.map((stop, index) => (
          <React.Fragment key={stop.StopID || index}>
            <div 
              className={`${styles.routeStop} ${
                stop.type === 'start' ? styles.startStop : 
                stop.type === 'end' ? styles.endStop : ''
              }`}
            >
              {stop.StopName}
              {stop.type === 'start' && ' (Start)'}
              {stop.type === 'end' && ' (End)'}
            </div>
            {index < allStops.length - 1 && (
              <div className={styles.routeArrow}>→</div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

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
            <label className={styles.label}>Route Visualization</label>
            <div className={styles.routeVisualization}>
              {renderRouteVisualization()}
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