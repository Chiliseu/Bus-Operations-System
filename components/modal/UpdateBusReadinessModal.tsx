'use client';

import React, { useState, useEffect } from "react";

interface Ticket {
  type: string;
  id: string;
}

interface BusReadinessModalProps {
  show: boolean;
  onClose: () => void;
  busInfo: {
    regularBusAssignmentID: string;
    busNumber: string;
    driver: string;
    conductor: string;
  };
  onSave: (data: {
    vehicleCondition: Record<string, boolean>;
    personnelCondition: { driverReady: boolean; conductorReady: boolean };
    changeDetails: string;
    tickets: Ticket[];
  }) => Promise<boolean>;
}

const BusReadinessModal: React.FC<BusReadinessModalProps> = ({
  show,
  onClose,
  busInfo,
  onSave,
}) => {
  // Vehicle condition checkboxes state
  const conditionItems = [
    "Battery",
    "Lights",
    "Oil",
    "Water",
    "Brake",
    "Air",
    "Engine",
    "Tire",
  ];

  const [vehicleCondition, setVehicleCondition] = useState<Record<string, boolean>>(
    {}
  );
  const [personnelCondition, setPersonnelCondition] = useState({
    driverReady: false,
    conductorReady: false,
  });
  const [showChangeInput, setShowChangeInput] = useState(false);
  const [changeDetails, setChangeDetails] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([{ type: "", id: "" }]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (show) {
      setVehicleCondition(
        conditionItems.reduce((acc, item) => ({ ...acc, [item]: false }), {})
      );
      setPersonnelCondition({ driverReady: false, conductorReady: false });
      setShowChangeInput(false);
      setChangeDetails("");
      setTickets([{ type: "", id: "" }]);
    }
  }, [show]);

  const toggleVehicleCondition = (item: string) => {
    setVehicleCondition((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handlePersonnelChange = (field: "driverReady" | "conductorReady") => {
    setPersonnelCondition((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const addTicket = () => setTickets((prev) => [...prev, { type: "", id: "" }]);

  const removeTicket = (index: number) => {
    setTickets((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTicket = (index: number, field: keyof Ticket, value: string) => {
    setTickets((prev) =>
      prev.map((ticket, i) =>
        i === index ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  const handleSave = async () => {
    const success = await onSave({
      vehicleCondition,
      personnelCondition,
      changeDetails,
      tickets,
    });
    if (success) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Bus Readiness Checklist</h5>
          </div>
          <div className="modal-body">
            <p>
              <strong>Bus:</strong> {busInfo.busNumber}
            </p>
            <p>
              <strong>Driver:</strong> {busInfo.driver}
            </p>
            <p>
              <strong>Conductor:</strong> {busInfo.conductor}
            </p>

            <h6 className="mt-3">Vehicle Condition:</h6>
            {conditionItems.map((item) => (
              <div className="form-check" key={item}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={item}
                  checked={vehicleCondition[item] || false}
                  onChange={() => toggleVehicleCondition(item)}
                />
                <label className="form-check-label" htmlFor={item}>
                  {item}
                </label>
              </div>
            ))}

            <h6 className="mt-3">Personnel Condition:</h6>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="driverReady"
                checked={personnelCondition.driverReady}
                onChange={() => handlePersonnelChange("driverReady")}
              />
              <label className="form-check-label" htmlFor="driverReady">
                Driver
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="conductorReady"
                checked={personnelCondition.conductorReady}
                onChange={() => handlePersonnelChange("conductorReady")}
              />
              <label className="form-check-label" htmlFor="conductorReady">
                Conductor
              </label>
            </div>

            <h6 className="mt-3">Operations:</h6>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="changeCheck"
                checked={showChangeInput}
                onChange={() => setShowChangeInput(!showChangeInput)}
              />
              <label className="form-check-label" htmlFor="changeCheck">
                Change / Money
              </label>
            </div>
            {showChangeInput && (
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter amount or details"
                value={changeDetails}
                onChange={(e) => setChangeDetails(e.target.value)}
              />
            )}

            <h6 className="mt-3">Tickets:</h6>
            {tickets.map((ticket, index) => (
              <div className="row g-2 mb-2" key={index}>
                <div className="col-5">
                  <select
                    className="form-select"
                    value={ticket.type}
                    onChange={(e) => updateTicket(index, "type", e.target.value)}
                  >
                    <option value="">Ticket Type</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </select>
                </div>
                <div className="col-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Latest ID Number"
                    value={ticket.id}
                    onChange={(e) => updateTicket(index, "id", e.target.value)}
                  />
                </div>
                <div className="col-2 d-flex align-items-center">
                  {tickets.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeTicket(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={addTicket}
            >
              + Add Ticket
            </button>

            <div className="mt-4">
              <strong>Readiness Check:</strong>{" "}
              <span className="text-muted">Pass / Fail</span>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save Readiness
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusReadinessModal;
