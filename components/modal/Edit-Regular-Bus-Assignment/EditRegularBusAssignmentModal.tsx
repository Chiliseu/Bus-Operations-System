import React from "react";
import { Bus } from "@/app/interface/bus";
import { Driver } from "@/app/interface/driver";
import { Conductor } from "@/app/interface/conductor";
import { Route } from "@/app/interface/route";
import styles from "./edit-regular-bus-assignment.module.css";

interface EditRegularBusAssignmentModalProps {
  show: boolean;
  onClose: () => void;
  onBusClick: () => void;
  onDriverClick: () => void;
  onConductorClick: () => void;
  onRouteClick: () => void;
  selectedBus: Bus | null;
  selectedDriver: Driver | null;
  selectedConductor: Conductor | null;
  selectedRoute: Route | null;
  setSelectedBus: (bus: Bus | null) => void;
  setSelectedDriver: (driver: Driver | null) => void;
  setSelectedConductor: (conductor: Conductor | null) => void;
  setSelectedRoute: (route: Route | null) => void;
  onSave: (data: {
    bus: Bus;
    driver: Driver;
    conductor: Conductor;
    route: Route;
  }) => void;
}

const EditRegularBusAssignmentModal: React.FC<EditRegularBusAssignmentModalProps> = ({
  show,
  onClose,
  onBusClick,
  onDriverClick,
  onConductorClick,
  onRouteClick,
  selectedBus,
  selectedDriver,
  selectedConductor,
  selectedRoute,
  setSelectedBus,
  setSelectedDriver,
  setSelectedConductor,
  setSelectedRoute,
  onSave
}) => {
  if (!show) return null;

  const handleSave = () => {
    if (selectedBus && selectedDriver && selectedConductor && selectedRoute) {
      onSave({
        bus: selectedBus,
        driver: selectedDriver,
        conductor: selectedConductor,
        route: selectedRoute,
      });
    } else {
      alert("Please make sure all fields are selected before saving.");
    }
  };

  return (
    <div
      className={`modal show d-block ${styles.busModalOverlay}`}
      tabIndex={-1}
      style={{ zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className={`modal-content ${styles.busModalContent}`}>
          <div className={`modal-header ${styles.busModalHeader}`}>
            <h5 className={`modal-title ${styles.busModalTitle}`}>
              Edit Regular Bus Assignment
            </h5>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          <div className={`modal-body ${styles.busModalBody}`}>
            <div className={styles.formSection}>
              <h6 className={styles.sectionTitle}>
                Vehicle & Personnel Assignment
              </h6>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className={styles.formLabel}>Bus</label>
                  <input
                    type="text"
                    className={`form-control ${styles.selectionInput} ${
                      selectedBus ? styles.filled : ""
                    }`}
                    value={selectedBus?.license_plate || ""}
                    placeholder="Click to select bus"
                    readOnly
                    onClick={onBusClick}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className={styles.formLabel}>Driver</label>
                  <input
                    type="text"
                    className={`form-control ${styles.selectionInput} ${
                      selectedDriver ? styles.filled : ""
                    }`}
                    value={selectedDriver?.name || ""}
                    placeholder="Click to select driver"
                    readOnly
                    onClick={onDriverClick}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className={styles.formLabel}>Conductor</label>
                  <input
                    type="text"
                    className={`form-control ${styles.selectionInput} ${
                      selectedConductor ? styles.filled : ""
                    }`}
                    value={selectedConductor?.name || ""}
                    placeholder="Click to select conductor"
                    readOnly
                    onClick={onConductorClick}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className={styles.formLabel}>Route</label>
                  <input
                    type="text"
                    className={`form-control ${styles.selectionInput} ${
                      selectedRoute ? styles.filled : ""
                    }`}
                    value={selectedRoute?.RouteName || ""}
                    placeholder="Click to select route"
                    readOnly
                    onClick={onRouteClick}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSave}
            >
              Save Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRegularBusAssignmentModal;
