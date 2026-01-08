import React, { useState, useEffect } from "react";
import { Bus } from "@/app/interface/bus";
import { Driver } from "@/app/interface/driver";
import { Conductor } from "@/app/interface/conductor";
import { Route } from "@/app/interface/route";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./add-regular-bus-assignment.module.css";
import Swal from 'sweetalert2';



interface QuotaPolicy {
  startDate: string;
  endDate: string;
  quotaType: "Fixed" | "Percentage";
  quotaValue: number;
}

interface AddRegularBusAssignmentModalProps {
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
  handleAdd: (assignment: {
    BusID: string;
    RouteID: string;
    AssignmentDate?: string;
    DriverID: string;
    ConductorID: string;
    QuotaPolicy: {
      type: "Fixed" | "Percentage";
      value: number;
      startDate: string;
      endDate: string;
    }[];
  }) => Promise<any>;
}

// Get current year dynamically
const getCurrentYearRange = () => {
  const currentYear = new Date().getFullYear();
  return {
    start: `${currentYear}-01-01`,
    end: `${currentYear}-12-31`
  };
};

const dateToISO = (date: Date) => date.toISOString().slice(0, 10);

const addDays = (dateStr: string, days: number): string => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return dateToISO(d);
};

const daysBetween = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
};

const recalcQuotaDateRanges = (count: number): QuotaPolicy[] => {
  const { start: YEAR_START, end: YEAR_END } = getCurrentYearRange();
  const totalDays = daysBetween(YEAR_START, YEAR_END);
  const baseDays = Math.floor(totalDays / count);
  const remainder = totalDays % count;

  const policies: QuotaPolicy[] = [];
  let currentStart = YEAR_START;

  for (let i = 0; i < count; i++) {
    const daysInSlice = baseDays + (i < remainder ? 1 : 0);
    const currentEnd = addDays(currentStart, daysInSlice - 1);

    policies.push({
      startDate: currentStart,
      endDate: currentEnd,
      quotaType: "Fixed",
      quotaValue: 0,
    });

    currentStart = addDays(currentEnd, 1);
  }

  return policies;
};

const AddRegularBusAssignmentModal: React.FC<AddRegularBusAssignmentModalProps> = ({
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
  handleAdd,
}) => {
  const [quotaPolicies, setQuotaPolicies] = useState<QuotaPolicy[]>(recalcQuotaDateRanges(1));
  const [currentTime, setCurrentTime] = useState<string>(
  new Date().toLocaleString('en-US', { hour12: true })
);


  useEffect(() => {
    if (show) {
      setSelectedBus(null);
      setSelectedDriver(null);
      setSelectedConductor(null);
      setSelectedRoute(null);
      setQuotaPolicies(recalcQuotaDateRanges(1));
    }
  }, [show]);

  //TIME CHECK

  useEffect(() => {
  if (!show) return;  // Only tick when modal is visible

  const interval = setInterval(() => {
    setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
  }, 1000);

  return () => clearInterval(interval);  // Cleanup on close
}, [show]);


  const addQuotaPolicy = () => {
    const newCount = quotaPolicies.length + 1;
    setQuotaPolicies(recalcQuotaDateRanges(newCount));
  };

  const removeQuotaPolicy = (index: number) => {
    if (quotaPolicies.length <= 1) return;
    const newPolicies = quotaPolicies.filter((_, i) => i !== index);
    // Recalculate date ranges to keep continuity and cover full year
    // But preserve quotaType and quotaValue where possible
    const count = newPolicies.length;
    const recalculated = recalcQuotaDateRanges(count);

    // Map old quota values and types to new recalculated date slices (by index)
    const merged = recalculated.map((p, i) => ({
      ...p,
      quotaType: newPolicies[i]?.quotaType || "Fixed",
      quotaValue: newPolicies[i]?.quotaValue || 0,
    }));
    setQuotaPolicies(merged);
  };

  // Update quotaType or quotaValue for policy index
  const updateQuotaPolicyValue = (
    index: number,
    updatedFields: Partial<Omit<QuotaPolicy, "startDate" | "endDate">>
  ) => {
    const updated = [...quotaPolicies];
    updated[index] = { ...updated[index], ...updatedFields };
    setQuotaPolicies(updated);
  };

  // Handle user changing a date (startDate or endDate) for a quota policy
  // and auto-adjust neighboring policies to keep continuity and no overlap/gaps
  const handleDateChange = (
    index: number,
    field: "startDate" | "endDate",
    value: string
  ) => {
    let updated = [...quotaPolicies];

    if (field === "startDate") {
      // startDate can't be after current endDate
      if (value > updated[index].endDate) {
        value = updated[index].endDate;
      }

      updated[index].startDate = value;

      // Fix previous policy endDate to be one day before current startDate
      if (index > 0) {
        const prev = updated[index - 1];
        const prevNewEnd = addDays(value, -1);
        if (prevNewEnd < prev.startDate) {
          // If invalid, clamp prev startDate too
          prev.startDate = value;
          prev.endDate = value;
        } else {
          prev.endDate = prevNewEnd;
        }
        updated[index - 1] = prev;
      }
    } else if (field === "endDate") {
      // endDate can't be before current startDate
      if (value < updated[index].startDate) {
        value = updated[index].startDate;
      }
      updated[index].endDate = value;

      // Fix next policy startDate to be one day after current endDate
      if (index < updated.length - 1) {
        const next = updated[index + 1];
        const nextNewStart = addDays(value, 1);
        if (nextNewStart > next.endDate) {
          // If invalid, clamp next endDate too
          next.startDate = value;
          next.endDate = value;
        } else {
          next.startDate = nextNewStart;
        }
        updated[index + 1] = next;
      }
    }

    setQuotaPolicies(updated);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleCreate = () => {
    if (
      !selectedBus ||
      !selectedDriver ||
      !selectedConductor ||
      !selectedRoute ||
      quotaPolicies.some(
        (p) =>
          !p.quotaType ||
          p.quotaValue === undefined ||
          p.quotaValue === null ||
          p.quotaValue <= 0
      )
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please complete all fields and ensure quota values are valid.',
      });
      return;
    }

    // Validate date continuity strictly (optional)
    for (let i = 0; i < quotaPolicies.length - 1; i++) {
      if (
        addDays(quotaPolicies[i].endDate, 1) !== quotaPolicies[i + 1].startDate
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Date Range Error',
          text: `Date ranges must be continuous and non-overlapping. Check policies #${i + 1} and #${i + 2}.`,
        });
        return;
      }
    }

    handleAdd({
      BusID: selectedBus.busId,
      DriverID: selectedDriver.driver_id,
      ConductorID: selectedConductor.conductor_id,
      RouteID: selectedRoute.RouteID,
      QuotaPolicy: quotaPolicies.map((p) => ({
        type: p.quotaType,
        value: p.quotaValue,
        startDate: p.startDate,
        endDate: p.endDate,
      })),
    });

    onClose();
  };

  if (!show) return null;

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
              Add Regular Bus Assignment
            </h5>
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
            {/* Vehicle & Personnel */}
            <div className={styles.formSection}>
              <h6 className={styles.sectionTitle}>
                Vehicle & Personnel Assignment
              </h6>
              <div className="row">
                {/* Bus */}
                <div className="col-md-6 mb-3">
                  <label className={styles.formLabel}>Bus</label>
                  <input
                    type="text"
                    className={`form-control ${styles.selectionInput} ${
                      selectedBus ? styles.filled : ""
                    }`}
                    value={selectedBus?.busId || ""}
                    placeholder="Click to select bus"
                    readOnly
                    onClick={onBusClick}
                  />
                </div>
                {/* Driver */}
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
                {/* Conductor */}
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
                {/* Route */}
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

            {/* Quota Policies */}
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
                      value={policy.startDate}
                      onChange={(e) =>
                        handleDateChange(index, "startDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label className={styles.formLabel}>End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={policy.endDate}
                      onChange={(e) =>
                        handleDateChange(index, "endDate", e.target.value)
                      }
                      min={policy.startDate}
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
                      value={policy.quotaValue.toString()}
                      min={policy.quotaType === "Percentage" ? 1 : 0}
                      max={policy.quotaType === "Percentage" ? 99 : 99999}
                      step={policy.quotaType === "Percentage" ? 1 : 0.01}
                      onFocus={(e) => {
                        if (e.target.value === '0') e.target.value = '';
                      }}
                      onBlur={(e) => {
                        if (e.target.value === '') updateQuotaPolicyValue(index, { quotaValue: 0 });
                      }}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/^0+(?!$)/, '');
                        const val = Number(raw);

                        let normalized = val;
                        if (policy.quotaType === 'Percentage') {
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
              className={styles.createAssignmentBtn}
              onClick={handleCreate}
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
