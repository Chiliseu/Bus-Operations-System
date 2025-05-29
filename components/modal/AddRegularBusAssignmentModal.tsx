import React, { useState } from "react";
import { Bus } from "@/app/interface/bus";
import { Driver } from "@/app/interface/driver";
import { Conductor } from "@/app/interface/conductor";
import { Route } from "@/app/interface/route";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    setSelectedBus(null);
    setSelectedDriver(null);
    setSelectedConductor(null);
    setSelectedRoute(null);
    setQuotaType("Fixed");
    setQuotaValue(0);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Regular Bus Assignment</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Bus</label>
              <input
                type="text"
                className="form-control"
                value={selectedBus ? selectedBus.busId : ""}
                placeholder="Select Bus"
                readOnly
                onClick={onBusClick}
                style={{ cursor: "pointer", background: "#f9f9f9" }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Driver</label>
              <input
                type="text"
                className="form-control"
                value={selectedDriver ? selectedDriver.name : ""}
                placeholder="Select Driver"
                readOnly
                onClick={onDriverClick}
                style={{ cursor: "pointer", background: "#f9f9f9" }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Conductor</label>
              <input
                type="text"
                className="form-control"
                value={selectedConductor ? selectedConductor.name : ""}
                placeholder="Select Conductor"
                readOnly
                onClick={onConductorClick}
                style={{ cursor: "pointer", background: "#f9f9f9" }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Route</label>
              <input
                type="text"
                className="form-control"
                value={selectedRoute ? selectedRoute.RouteName : ""}
                placeholder="Select Route"
                readOnly
                onClick={onRouteClick}
                style={{ cursor: "pointer", background: "#f9f9f9" }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Quota Type</label>
              <select
                className="form-select"
                value={quotaType}
                onChange={e => {
                  setQuotaType(e.target.value as "Fixed" | "Percentage");
                  setQuotaValue(0);
                }}
              >
                <option value="Fixed">Fixed</option>
                <option value="Percentage">Percentage</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Quota Value</label>
              <input
                type="number"
                className="form-control"
                placeholder={
                  quotaType === "Fixed"
                    ? "Enter Fixed Value"
                    : "Enter Percentage (1-99)"
                }
                value={quotaValue === 0 ? "" : quotaValue}
                onChange={e => setQuotaValue(Number(e.target.value))}
                min={quotaType === "Fixed" ? "0.01" : "1"}
                max={quotaType === "Percentage" ? "99" : undefined}
                step={quotaType === "Fixed" ? "0.01" : "1"}
              />
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
              className="btn btn-primary"
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
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRegularBusAssignmentModal;