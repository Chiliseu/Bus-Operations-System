import React, { useState, useEffect } from "react";
import { Bus, Driver, Conductor, Route, Quota_Policy, Fixed, Percentage } from "@/app/interface";
import styles from "./edit-regular-bus-assignment.module.css";
import Swal from 'sweetalert2';

interface EditRegularBusAssignmentModalProps {
  show: boolean;
  onClose: () => void;
  onBusClick: () => void;
  onDriverClick: () => void;
  onConductorClick: () => void;
  onRouteClick: () => void;
  quotaPolicy: Quota_Policy[] | null;
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
    quotaPolicies: Quota_Policy[];
  }) => void;
}

const YEAR_START = "2025-01-01";
const YEAR_END = "2025-12-31";

const EditRegularBusAssignmentModal: React.FC<EditRegularBusAssignmentModalProps> = ({
  show,
  onClose,
  onBusClick,
  onDriverClick,
  onConductorClick,
  onRouteClick,
  quotaPolicy,
  selectedBus,
  selectedDriver,
  selectedConductor,
  selectedRoute,
  setSelectedBus,
  setSelectedDriver,
  setSelectedConductor,
  setSelectedRoute,
  onSave,
}) => {
  const [quotaPolicies, setQuotaPolicies] = useState<any[]>(
    quotaPolicy || [
      {
        StartDate: YEAR_START,
        EndDate: YEAR_END,
        quotaType: "Fixed",
        quotaValue: 0,
      },
    ]
  );

  // TIME CHECK
  const [currentTime, setCurrentTime] = useState<string>(
  new Date().toLocaleString('en-US', { hour12: true })
);
  
  useEffect(() => {
    if (quotaPolicy && quotaPolicy.length > 0) {
      const mapped = quotaPolicy.map((policy) => {
        const startDate = new Date(policy.StartDate);
        const endDate = new Date(policy.EndDate);

        const isValidDate = (d: Date) => !isNaN(d.getTime());

        const formattedStartDate = isValidDate(startDate)
          ? startDate.toISOString().split("T")[0]
          : YEAR_START;

        const formattedEndDate = isValidDate(endDate)
          ? endDate.toISOString().split("T")[0]
          : YEAR_END;

        const quotaType = policy.Fixed ? "Fixed" : "Percentage";
        const quotaValue = policy.Fixed?.Quota ?? policy.Percentage?.Percentage ?? 0;

        return {
          StartDate: formattedStartDate,
          EndDate: formattedEndDate,
          quotaType,
          quotaValue,
        };
      });

      setQuotaPolicies(mapped);
    }
  }, [quotaPolicy]);

    useEffect(() => {
    if (!show) return;

    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
    }, 1000);

    return () => clearInterval(interval);
  }, [show]);

  if (!show) return null;

  const handleSave = () => {
    if (selectedBus && selectedDriver && selectedConductor && selectedRoute) {
      const isOverlapping = quotaPolicies.some((policy, idx) => {
        return quotaPolicies.some((other, jdx) => {
          if (idx !== jdx) {
            return (
              policy.StartDate <= other.EndDate &&
              policy.EndDate >= other.StartDate
            );
          }
          return false;
        });
      });

        if (isOverlapping) {
          Swal.fire({
            icon: 'error',
            title: 'Date Range Overlap',
            text: 'Quota policy date ranges should not overlap.',
          });
          return;
        }

      const formattedPolicies: Quota_Policy[] = quotaPolicies.map((policy) => {
        const base: Quota_Policy = {
          QuotaPolicyID: "",
          StartDate: new Date(policy.StartDate),
          EndDate: new Date(policy.EndDate),
          RegularBusAssignmentID: "",
          Fixed: policy.quotaType === "Fixed"
            ? {
                FQuotaPolicyID: "",
                Quota: policy.quotaValue,
                quotaPolicy: {} as Quota_Policy,
                CreatedAt: "",   // <-- Add this
                UpdatedAt: "",   // <-- Add this
              }
            : undefined,
          Percentage: policy.quotaType === "Percentage"
            ? {
                PQuotaPolicyID: "",
                Percentage: policy.quotaValue,
                quotaPolicy: {} as Quota_Policy,
                CreatedAt: "",   // <-- Add this
                UpdatedAt: "",   // <-- Add this
              }
            : undefined,
          CreatedAt: "",   // <-- Add this line
          UpdatedAt: "",   // <-- Add this line
        };
        return base;
      });

      onSave({
        bus: selectedBus,
        driver: selectedDriver,
        conductor: selectedConductor,
        route: selectedRoute,
        quotaPolicies: formattedPolicies,
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Fields',
        text: 'Please make sure all fields are selected before saving.',
      });
    }
  };

  const handleDateChange = (index: number, field: "StartDate" | "EndDate", value: string) => {
    const updated = [...quotaPolicies];
    updated[index] = { ...updated[index], [field]: value };
    setQuotaPolicies(updated);
  };

  const updateQuotaPolicyValue = (index: number, values: Partial<any>) => {
    const updated = [...quotaPolicies];
    updated[index] = { ...updated[index], ...values };
    setQuotaPolicies(updated);
  };

  const removeQuotaPolicy = (index: number) => {
    const updated = quotaPolicies.filter((_, i) => i !== index);
    setQuotaPolicies(updated);
  };

  const addQuotaPolicy = () => {
    setQuotaPolicies([
      ...quotaPolicies,
      {
        StartDate: YEAR_START,
        EndDate: YEAR_END,
        quotaType: "Fixed",
        quotaValue: 0,
      },
    ]);
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
            
            {/* <p>{JSON.stringify(quotaPolicy)}</p> */}

            <div className={styles.formSection}>
              <h6 className={styles.sectionTitle}>Quota Configuration</h6>
              {quotaPolicies.map((policy, index) => (
                <div
                  key={index}
                  className="row mb-3 border p-2 rounded align-items-end"
                >
                  <div className="col-md-3">
                    <label className={styles.formLabel}>Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={policy.StartDate || ""}
                      onChange={(e) =>
                        handleDateChange(index, "StartDate", e.target.value)
                      }
                      min={YEAR_START}
                      max={policy.EndDate}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className={styles.formLabel}>End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={policy.EndDate || ""}
                      onChange={(e) =>
                        handleDateChange(index, "EndDate", e.target.value)
                      }
                      min={policy.StartDate}
                      max={YEAR_END}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className={styles.formLabel}>Type</label>
                    <select
                      className="form-select"
                      value={policy.quotaType || ""}
                      onChange={(e) =>
                        updateQuotaPolicyValue(index, {
                          quotaType: e.target.value as "Fixed" | "Percentage",
                          quotaValue: 0,
                        })
                      }
                    >
                      <option value="Fixed">Fixed</option>
                      <option value="Percentage">Percentage</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className={styles.formLabel}>Value</label>
                    <input
                      type="number"
                      className="form-control"
                      value={policy.quotaValue === undefined || policy.quotaValue === null ? "" : policy.quotaValue}
                      min={policy.quotaType === "Percentage" ? 1 : 0}
                      max={policy.quotaType === "Percentage" ? 99 : 99999}
                      step={policy.quotaType === "Percentage" ? 1 : 0.01}
                      onFocus={e => {
                        if (e.target.value === "0") e.target.value = "";
                      }}
                      onBlur={e => {
                        if (e.target.value === "") updateQuotaPolicyValue(index, { quotaValue: 0 });
                      }}
                      onChange={e => {
                        let raw = e.target.value.replace(/^0+(?!$)/, "");
                        let val = Number(raw);

                        let normalized = val;
                        if (policy.quotaType === "Percentage") {
                          if (val < 1) normalized = 1;
                          if (val > 99) normalized = 99;
                          normalized = Math.floor(normalized); // Ensure integer for percentage
                        } else {
                          if (val < 0) normalized = 0;
                          if (val > 99999) normalized = 99999;
                          // Limit to 2 decimal places
                          normalized = Math.floor(normalized * 100) / 100;
                        }

                        updateQuotaPolicyValue(index, { quotaValue: normalized });
                      }}
                    />
                  </div>
                  <div className="col-md-1 d-flex justify-content-end">
                    {quotaPolicies.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeQuotaPolicy(index)}
                        title="Remove quota policy"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                </div>
              ))}
            <button
              type="button"
              className={styles.addQuotaBtn}
              onClick={addQuotaPolicy}
            >
              + Add Quota Policy
            </button>
            </div>
          </div>

          <div className="modal-footer d-flex justify-content-between align-items-center w-100">
            <small className="text-muted">
               {currentTime}
            </small>
            <button
              type="button"
              className={styles.saveAssignmentBtn}
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
