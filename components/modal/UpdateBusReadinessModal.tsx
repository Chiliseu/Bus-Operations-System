'use client';

import React, { useState, useEffect } from "react";
import { fetchAllTicketTypes } from "@/lib/apiCalls/ticket-types"; // adjust path if needed


interface Ticket {
  type: string;
  StartingIDNumber: number;
}

interface BusReadinessModalProps  {
  show: boolean;
  onClose: () => void;
  busInfo: {
    regularBusAssignmentID: string;
    busNumber: string;
    driver: string;
    conductor: string;
  };
  onSave: (data: {
    regularBusAssignmentID: string;
    vehicleCondition: Record<string, boolean>;
    personnelCondition: { driverReady: boolean; conductorReady: boolean };
    changeFunds: number;
    tickets: Ticket[];
  }) => Promise<boolean>;
  readiness?: {
    regularBusAssignmentID: string;
    vehicleCondition: Record<string, boolean>;
    personnelCondition: { driverReady: boolean; conductorReady: boolean };
    changeFunds: number;
    tickets: Ticket[];
  };
}

const BusReadinessModal: React.FC<BusReadinessModalProps> = ({
  show,
  onClose,
  busInfo,
  onSave,
  readiness,
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

  const [ticketTypes, setTicketTypes] = useState<{ TicketTypeID: string; Value: number }[]>([]);

  const [vehicleCondition, setVehicleCondition] = useState<Record<string, boolean>>(
    {}
  );
  const [personnelCondition, setPersonnelCondition] = useState({
    driverReady: false,
    conductorReady: false,
  });
  const [showChangeInput, setShowChangeInput] = useState(false);
  const [changeFunds, setChangeFunds] = useState(0);
  const [tickets, setTickets] = useState<Ticket[]>([{ type: "", StartingIDNumber: 0 }]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (show) {
      setVehicleCondition(
        readiness?.vehicleCondition ??
        conditionItems.reduce((acc, item) => ({ ...acc, [item]: false }), {})
      );
      setPersonnelCondition(readiness?.personnelCondition ?? { driverReady: false, conductorReady: false });
      setShowChangeInput(!!readiness?.changeFunds);
      setChangeFunds(readiness?.changeFunds ?? 0);
      fetchAllTicketTypes()
        .then((types) => {
          setTicketTypes(types);
          setTickets(readiness?.tickets && readiness.tickets.length > 0
            ? readiness.tickets
            : (types.length > 0 ? [{ type: types[0].TicketTypeID, StartingIDNumber: 0 }] : [])
          );
        })
        .catch(() => {
          setTicketTypes([]);
          setTickets([]);
        });
    }
  }, [show, readiness]);

  const toggleVehicleCondition = (item: string) => {
    setVehicleCondition((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handlePersonnelChange = (field: "driverReady" | "conductorReady") => {
    setPersonnelCondition((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const addTicket = () => {
    // Find the first ticket type that is not already selected
    const selectedTypes = tickets.map(t => t.type);
    const unselected = ticketTypes.find(tt => !selectedTypes.includes(tt.TicketTypeID));
    if (unselected) {
      setTickets(prev => [
        ...prev,
        { type: unselected.TicketTypeID, StartingIDNumber: 0 }
      ]);
    }
  };

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
      regularBusAssignmentID: busInfo.regularBusAssignmentID,
      vehicleCondition,
      personnelCondition,
      changeFunds: changeFunds,
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
                type="number"
                className="form-control mb-2"
                placeholder="Enter amount or details"
                value={changeFunds}
                onChange={(e) => setChangeFunds(Number(e.target.value))}
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
                    {ticketTypes
                      .filter(
                        (tt) =>
                          ticket.type === tt.TicketTypeID ||
                          !tickets.some((t, i) => t.type === tt.TicketTypeID && i !== index)
                      )
                      .map((tt) => (
                        <option key={tt.TicketTypeID} value={tt.TicketTypeID}>
                          ₱{tt.Value}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Latest ID Number"
                    value={ticket.StartingIDNumber}
                    onChange={(e) => updateTicket(index, "StartingIDNumber", e.target.value)}
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
              disabled={tickets.length >= ticketTypes.length}
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
