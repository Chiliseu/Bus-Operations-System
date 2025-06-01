import React, { useEffect, useState } from "react";
import { Bus } from "@/app/interface/bus";
import { Driver } from "@/app/interface/driver";
import { Conductor } from "@/app/interface/conductor";
import { Route } from "@/app/interface/route";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./edit-regular-bus-assignment.module.css";

interface QuotaPolicy {
  startDate: string;
  endDate: string;
  quotaType: "Fixed" | "Percentage";
  quotaValue: number;
}

interface BusAssignment {
  BusID: string;
  RouteID: string;
  DriverID: string;
  ConductorID: string;
  QuotaPolicy: QuotaPolicy[];
}

interface EditRegularBusAssignmentModalProps {
  show: boolean;
  onClose: () => void;
  busAssignment: BusAssignment;
  selectedBus: Bus | null;
  selectedDriver: Driver | null;
  selectedConductor: Conductor | null;
  selectedRoute: Route | null;
  setSelectedBus: (bus: Bus | null) => void;
  setSelectedDriver: (driver: Driver | null) => void;
  setSelectedConductor: (conductor: Conductor | null) => void;
  setSelectedRoute: (route: Route | null) => void;
  onBusClick: () => void;
  onDriverClick: () => void;
  onConductorClick: () => void;
  onRouteClick: () => void;
  handleSave: (updatedAssignment: BusAssignment) => Promise<any>;
}

const YEAR_START = "2025-01-01";
const YEAR_END = "2025-12-31";

const dateToISO = (date: Date) => date.toISOString().slice(0, 10);

const addDays = (dateStr: string, days: number): string => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return dateToISO(d);
};

const clampDate = (dateStr: string) => {
  if (dateStr < YEAR_START) return YEAR_START;
  if (dateStr > YEAR_END) return YEAR_END;
  return dateStr;
};

const EditRegularBusAssignmentModal: React.FC<EditRegularBusAssignmentModalProps> = ({
  show,
  onClose,
  busAssignment,
  selectedBus,
  selectedDriver,
  selectedConductor,
  selectedRoute,
  setSelectedBus,
  setSelectedDriver,
  setSelectedConductor,
  setSelectedRoute,
  onBusClick,
  onDriverClick,
  onConductorClick,
  onRouteClick,
  handleSave,
}) => {
  const [quotaPolicies, setQuotaPolicies] = useState<QuotaPolicy[]>([]);

  useEffect(() => {
    if (show && busAssignment) {
      setQuotaPolicies(busAssignment.QuotaPolicy);
    }
  }, [show, busAssignment]);

  const updateQuotaPolicyValue = (
    index: number,
    updatedFields: Partial<Omit<QuotaPolicy, "startDate" | "endDate">>
  ) => {
    const updated = [...quotaPolicies];
    updated[index] = { ...updated[index], ...updatedFields };
    setQuotaPolicies(updated);
  };

  const handleDateChange = (
    index: number,
    field: "startDate" | "endDate",
    value: string
  ) => {
    let updated = [...quotaPolicies];
    value = clampDate(value);

    if (field === "startDate") {
      if (value > updated[index].endDate) {
        value = updated[index].endDate;
      }

      updated[index].startDate = value;

      if (index > 0) {
        const prev = updated[index - 1];
        const prevNewEnd = addDays(value, -1);
        prev.endDate = prevNewEnd < prev.startDate ? prev.startDate : prevNewEnd;
      }
    } else {
      if (value < updated[index].startDate) {
        value = updated[index].startDate;
      }

      updated[index].endDate = value;

      if (index < updated.length - 1) {
        const next = updated[index + 1];
        const nextNewStart = addDays(value, 1);
        next.startDate = nextNewStart > next.endDate ? next.endDate : nextNewStart;
      }
    }

    updated = updated.map((p) => ({
      ...p,
      startDate: clampDate(p.startDate),
      endDate: clampDate(p.endDate),
    }));

    setQuotaPolicies(updated);
  };

  const handleSubmit = () => {
    if (
      !selectedBus ||
      !selectedDriver ||
      !selectedConductor ||
      !selectedRoute ||
      quotaPolicies.some(
        (p) => !p.quotaType || p.quotaValue <= 0
      )
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    handleSave({
      BusID: selectedBus.busId,
      DriverID: selectedDriver.driver_id,
      ConductorID: selectedConductor.conductor_id,
      RouteID: selectedRoute.RouteID,
      QuotaPolicy: quotaPolicies,
    });

    onClose();
  };

  if (!show) return null;

  return (
    <div className={`modal show d-block ${styles.busModalOverlay}`} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className={`modal-content ${styles.busModalContent}`}>
          <div className={`modal-header ${styles.busModalHeader}`}>
            <h5 className={`modal-title ${styles.busModalTitle}`}>Edit Regular Bus Assignment</h5>
            <button type="button" className={styles.closeBtn} onClick={onClose}>
              ×
            </button>
          </div>
          <div className={`modal-body ${styles.busModalBody}`}>
            <div className={styles.formSection}>
              <h6 className={styles.sectionTitle}>Vehicle & Personnel Assignment</h6>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className={styles.formLabel}>Bus</label>
                  <input
                    type="text"
                    className={`form-control ${styles.selectionInput} ${selectedBus ? styles.filled : ""}`}
                    value={selectedBus?.busId || ""}
                    placeholder="Click to select bus"
                    readOnly
                    onClick={onBusClick}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className={styles.formLabel}>Driver</label>
                  <input
                    type="text"
                    className={`form-control ${styles.selectionInput} ${selectedDriver ? styles.filled : ""}`}
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
                    className={`form-control ${styles.selectionInput} ${selectedConductor ? styles.filled : ""}`}
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
                    className={`form-control ${styles.selectionInput} ${selectedRoute ? styles.filled : ""}`}
                    value={selectedRoute?.RouteName || ""}
                    placeholder="Click to select route"
                    readOnly
                    onClick={onRouteClick}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h6 className={styles.sectionTitle}>Quota Configuration</h6>
              {quotaPolicies.map((policy, index) => (
                <div key={index} className="row mb-3 border p-2 rounded align-items-end">
                  <div className="col-md-3">
                    <label className={styles.formLabel}>Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={policy.startDate}
                      onChange={(e) => handleDateChange(index, "startDate", e.target.value)}
                      min={YEAR_START}
                      max={policy.endDate}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className={styles.formLabel}>End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={policy.endDate}
                      onChange={(e) => handleDateChange(index, "endDate", e.target.value)}
                      min={policy.startDate}
                      max={YEAR_END}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className={styles.formLabel}>Type</label>
                    <select
                      className="form-select"
                      value={policy.quotaType}
                      onChange={(e) =>
                        updateQuotaPolicyValue(index, {
                          quotaType: e.target.value as "Fixed" | "Percentage",
                        })
                      }
                    >
                      <option value="Fixed">Fixed</option>
                      <option value="Percentage">Percentage</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className={styles.formLabel}>Value</label>
                    <input
                      type="number"
                      className="form-control"
                      value={policy.quotaValue}
                      onChange={(e) =>
                        updateQuotaPolicyValue(index, {
                          quotaValue: parseFloat(e.target.value),
                        })
                      }
                      min={0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`modal-footer ${styles.busModalFooter}`}>
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRegularBusAssignmentModal;
