import React, { useState, useEffect } from "react";
import { Bus } from "@/app/interface/bus";
import { Driver } from "@/app/interface/driver";
import { Conductor } from "@/app/interface/conductor";
import { Route } from "@/app/interface/route";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './add-regular-bus-assignment.module.css';

interface AddRegularBusAssignmentModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (assignment: {
    bus: Bus;
    driver: Driver;
    conductor: Conductor;
    route: Route;
    quotaType: "Fixed" | "Percentage";
    quotaValue: number;
  }) => void;
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
}

const AddRegularBusAssignmentModal: React.FC<AddRegularBusAssignmentModalProps> = ({
  show,
  onClose,
  onCreate,
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
}) => {
  const [quotaType, setQuotaType] = useState<"Fixed" | "Percentage">("Fixed");
  const [quotaValue, setQuotaValue] = useState<number>(0);

  // Reset form when modal is opened
  useEffect(() => {
    if (show) {
      // Reset all selections and form fields when modal opens
      setSelectedBus(null);
      setSelectedDriver(null);
      setSelectedConductor(null);
      setSelectedRoute(null);
      setQuotaType("Fixed");
      setQuotaValue(0);
    }
  }, [show, setSelectedBus, setSelectedDriver, setSelectedConductor, setSelectedRoute]);

  const resetForm = () => {
    setSelectedBus(null);
    setSelectedDriver(null);
    setSelectedConductor(null);
    setSelectedRoute(null);
    setQuotaType("Fixed");
    setQuotaValue(0);
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleCreate = () => {
    if (
      !selectedBus ||
      !selectedDriver ||
      !selectedConductor ||
      !selectedRoute ||
      !quotaValue
    ) {
      alert("Please fill in all fields.");
      return;
    }
    onCreate({
      bus: selectedBus,
      driver: selectedDriver,
      conductor: selectedConductor,
      route: selectedRoute,
      quotaType,
      quotaValue,
    });
    resetForm();
    onClose();
  };

  if (!show) return null;

  return (
    <div className={`modal show d-block ${styles.busModalOverlay}`} tabIndex={-1} style={{ zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className={`modal-content ${styles.busModalContent}`}>
          <div className={`modal-header ${styles.busModalHeader}`}>
            <h5 className={`modal-title ${styles.busModalTitle}`}>Add Regular Bus Assignment</h5>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={handleCancel}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className={`modal-body ${styles.busModalBody}`}>
            {/* Personnel & Vehicle Section */}
            <div className={styles.formSection}>
              <h6 className={styles.sectionTitle}>Vehicle & Personnel Assignment</h6>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className={styles.formLabel}>Bus</label>
                  <input
                    type="text"
                    className={`form-control ${styles.selectionInput} ${selectedBus ? styles.filled : ''}`}
                    value={selectedBus ? selectedBus.busId : ""}
                    placeholder="Click to select bus"
                    readOnly
                    onClick={onBusClick}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className={styles.formLabel}>Driver</label>
                  <input
                    type="text"
                    className={`form-control ${styles.selectionInput} ${selectedDriver ? styles.filled : ''}`}
                    value={selectedDriver ? selectedDriver.name : ""}
                    placeholder="Click to select driver"
                    readOnly
                    onClick={onDriverClick}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className={styles.formLabel}>Conductor</label>
                  <input
                    type="text"
                    className={`form-control ${styles.selectionInput} ${selectedConductor ? styles.filled : ''}`}
                    value={selectedConductor ? selectedConductor.name : ""}
                    placeholder="Click to select conductor"
                    readOnly
                    onClick={onConductorClick}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className={styles.formLabel}>Route</label>
                  <input
                    type="text"
                    className={`form-control ${styles.selectionInput} ${selectedRoute ? styles.filled : ''}`}
                    value={selectedRoute ? selectedRoute.RouteName : ""}
                    placeholder="Click to select route"
                    readOnly
                    onClick={onRouteClick}
                  />
                </div>
              </div>
            </div>

            {/* Quota Configuration Section */}
            <div className={styles.formSection}>
              <h6 className={styles.sectionTitle}>Quota Configuration</h6>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className={styles.formLabel}>Quota Type</label>
                  <select
                    className={`form-select ${styles.formSelectCustom}`}
                    value={quotaType}
                    onChange={e => {
                      setQuotaType(e.target.value as "Fixed" | "Percentage");
                      setQuotaValue(0);
                    }}
                  >
                    <option value="Fixed">Fixed Amount</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className={styles.formLabel}>
                    {quotaType === "Fixed" ? "Amount" : "Percentage"} Value
                  </label>
                  <input
                    type="number"
                    className={`form-control ${styles.quotaInput}`}
                    placeholder={
                      quotaType === "Fixed"
                        ? "Enter fixed amount"
                        : "Enter percentage (1-99)"
                    }
                    value={quotaValue === 0 ? "" : quotaValue}
                    onChange={e => setQuotaValue(Number(e.target.value))}
                    min={quotaType === "Fixed" ? "0.01" : "1"}
                    max={quotaType === "Percentage" ? "99" : undefined}
                    step={quotaType === "Fixed" ? "0.01" : "1"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`modal-footer ${styles.busModalFooter}`}>
            <button
              type="button"
              className={`btn ${styles.btnCancel}`}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`btn ${styles.btnCreate}`}
              onClick={handleCreate}
              disabled={
                !selectedBus ||
                !selectedBus.busId ||
                !selectedDriver ||
                !selectedDriver.driver_id ||
                !selectedConductor ||
                !selectedConductor.conductor_id ||
                !selectedRoute ||
                !selectedRoute.RouteID ||
                !quotaValue
              }
            >
              Create Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRegularBusAssignmentModal;