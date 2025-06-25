'use client';

import React, { useState, useEffect } from "react";
import { fetchAllTicketTypes } from "@/lib/apiCalls/ticket-types";
import styles from "./update-bus-readiness.module.css";
import Swal from 'sweetalert2';

interface Ticket {
  type: string;
  StartingIDNumber: number;
  EndingIDNumber?: number ; // Add this line
  OverallEndingID: number;
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
    pettyCashs: number;
    tickets: Ticket[];
  }) => Promise<boolean>;
  readiness?: {
    regularBusAssignmentID: string;
    vehicleCondition: Record<string, boolean>;
    personnelCondition: { driverReady: boolean; conductorReady: boolean };
    pettyCashs: number;
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
  // 2-column, 5-row grid for vehicle condition
  const conditionItems = [
    "Battery", "Air",
    "Lights", "Gas",
    "Oil", "Engine",
    "Water", "Tire",
    "Brake"
  ];

  const [ticketTypes, setTicketTypes] = useState<{ TicketTypeID: string; Value: number }[]>([]);
  const [vehicleCondition, setVehicleCondition] = useState<Record<string, boolean>>({});
  const [personnelCondition, setPersonnelCondition] = useState({
    driverReady: false,
    conductorReady: false,
  });
  const [showChangeInput, setShowChangeInput] = useState(false);
  const [pettyCashs, setPettyCashs] = useState(0);
  const [tickets, setTickets] = useState<Ticket[]>([{ type: "", StartingIDNumber: 0, OverallEndingID: 0 }]);
  const [currentTime, setCurrentTime] = useState(
  new Date().toLocaleString('en-US', { hour12: true })
);
  
//TIME CHECK
  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  useEffect(() => {
    if (show) {
      setVehicleCondition(
        readiness?.vehicleCondition ??
        conditionItems.reduce((acc, item) => ({ ...acc, [item]: false }), {})
      );
      setPersonnelCondition(readiness?.personnelCondition ?? { driverReady: false, conductorReady: false });
      setShowChangeInput(!!readiness?.pettyCashs);
      setPettyCashs(readiness?.pettyCashs ?? 0);
      fetchAllTicketTypes()
        .then((types) => {
          setTicketTypes(types);
          setTickets(
            readiness?.tickets && readiness.tickets.length > 0
              ? readiness.tickets.map(t => ({
                  ...t,
                  OverallEndingID: t.OverallEndingID ?? 0, // Ensure EndingIDNumber is present
                }))
              : [{ type: "", StartingIDNumber: 0, OverallEndingID: 0 }]
          );
          // Debug
          // console.log("TicketTypes:", types);
          // console.log("Tickets:", readiness?.tickets);
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
    const selectedTypes = tickets.map(t => t.type);
    const unselected = ticketTypes.find(tt => !selectedTypes.includes(tt.TicketTypeID));
    if (unselected) {
      setTickets(prev => [
        ...prev,
        { type: "", StartingIDNumber: 0, OverallEndingID: 0 }
      ]);
    }
  };

  const removeTicket = (index: number) => {
    setTickets((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTicket = (index: number, field: keyof Ticket, value: string) => {
    setTickets((prev) =>
      prev.map((ticket, i) =>
        i === index
          ? field === "EndingIDNumber"
            ? { ...ticket, EndingIDNumber: Number(value), OverallEndingID: Number(value) }
            : { ...ticket, [field]: value }
          : ticket
      )
    );
  };

  const validateTickets = () => {
    let hasTypeError = false;
    let hasSameIdError = false;

    for (const ticket of tickets) {
      if (!ticket.type) {
        hasTypeError = true;
      }
      if (
        ticket.StartingIDNumber != null &&
        ticket.EndingIDNumber != null &&
        ticket.StartingIDNumber === ticket.EndingIDNumber
      ) {
        hasSameIdError = true;
      }
    }

    const errors: string[] = [];
    if (hasTypeError) errors.push('Select a ticket type.');
    if (hasSameIdError) errors.push('Start and End ID number cannot be the same.');

    return errors;
  };

  const handleSave = async () => {
    const errors = validateTickets();
    if (errors.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        html: errors.map(e => `<div>${e}</div>`).join(''),
      });
      return;
    }
    const success = await onSave({
      regularBusAssignmentID: busInfo.regularBusAssignmentID,
      vehicleCondition,
      personnelCondition,
      pettyCashs: pettyCashs,
      tickets,
    });
    if (success) {
      onClose();
    }
  };

  if (!show) return null;

  // Split conditionItems into pairs for grid rows
  const gridRows = [];
  for (let i = 0; i < conditionItems.length; i += 2) {
    gridRows.push(conditionItems.slice(i, i + 2));
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Bus Readiness Checklist</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className={styles.body}>
          <div className={styles.leftCol}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Bus Information</h4>
              <p><strong>Bus:</strong> {busInfo.busNumber}</p>
              <p><strong>Driver:</strong> {busInfo.driver}</p>
              <p><strong>Conductor:</strong> {busInfo.conductor}</p>
            </div>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Personnel Condition</h4>
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
            </div>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Operations</h4>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="changeCheck"
                  checked={showChangeInput}
                  onChange={() => {
                    setShowChangeInput((prev) => {
                      if (prev) setPettyCashs(0); // If unchecking, set to zero
                      return !prev;
                    });
                  }}
                />
                <label className="form-check-label" htmlFor="changeCheck">
                  Change / Money
                </label>
              </div>
              {showChangeInput && (
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Enter amount or details"
                  value={pettyCashs}
                  onChange={(e) => setPettyCashs(Number(e.target.value))}
                />
              )}
            </div>
          </div>
          <div className={styles.rightCol}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Vehicle Condition</h4>
              <div className={styles.vehicleGrid}>
                {gridRows.map((row, rowIdx) => (
                  <React.Fragment key={rowIdx}>
                    {row.map((item, colIdx) => (
                      <div className={styles.vehicleCheck} key={item}>
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
                    {/* If last row has only one item, fill the grid */}
                    {row.length === 1 && <div></div>}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Tickets</h4>
              {/* Header row for labels */}
              {/* Warning label */}
              {tickets.length === 0 ? (
                <div className="text-danger mb-2">
                  Please add a ticket.
                </div>
              ) : (
                <div className="row g-2 mb-1">
                  <div className="col-4">
                    <label className="form-label">Ticket Type</label>
                  </div>
                  <div className="col-3">
                    <label className="form-label">Starting ID Number</label>
                  </div>
                  <div className="col-3">
                    <label className="form-label">Ending ID Number</label>
                  </div>
                  <div className="col-2"></div>
                </div>
              )}
              {tickets.map((ticket, index) => (
                <div className="row g-2 mb-2" key={index}>
                  <div className="col-4">
                    <select
                      className="form-select"
                      value={ticket.type}
                      onChange={(e) => updateTicket(index, "type", e.target.value)}
                    >
                      <option value="">Select Ticket Type</option>
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
                  <div className="col-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Latest ID Number"
                      value={ticket.StartingIDNumber}
                      onChange={(e) => updateTicket(index, "StartingIDNumber", e.target.value)}
                    />
                  </div>
                  <div className="col-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ending ID Number"
                      value={ticket.EndingIDNumber}
                      onChange={(e) => updateTicket(index, "EndingIDNumber", e.target.value)}
                    />
                  </div>
                  <div className="col-2 d-flex align-items-center">
                    {/* {tickets.length > 1 && ( */}
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeTicket(index)}
                      >
                        ×
                      </button>
                    {/* )} */}
                  </div>
                </div>
              ))}
              <button
                type="button"
                className={styles.createBtn}
                onClick={addTicket}
                disabled={tickets.length >= ticketTypes.length}
              >
                + Add Ticket
              </button>
            </div>
          </div>
        </div>
          <div className={`${styles.footer} d-flex justify-content-between align-items-center`}>
            <small className="text-muted">
              {currentTime}
            </small>
            <button
              type="button"
              className={styles.createBtn}
              onClick={handleSave}
            >
              Save Readiness
            </button>
          </div>
      </div>
    </div>
  );
};

export default BusReadinessModal;