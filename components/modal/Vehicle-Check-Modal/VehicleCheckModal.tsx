'use client';

import React, { useEffect, useState } from "react";
import styles from "./vehicle-check.module.css";

interface VehicleCheckModalProps {
  show: boolean;
  onClose: () => void;
  busInfo: {
    busAssignmentID: string;
    busTripID: string;
    busNumber: string;
    driver: string;
    conductor: string;
    route: string;
  };
  onSave: (data: {
    busAssignmentID: string;
    busTripID: string;
    vehicleCondition: Record<string, boolean>;
    note: string;
  }) => Promise<void>;
}

const VehicleCheckModal: React.FC<VehicleCheckModalProps> = ({
  show,
  onClose,
  busInfo,
  onSave,
}) => {
  const conditionItems = [
    "Battery", "Air",
    "Lights", "Gas",
    "Oil", "Engine",
    "Water", "Tire Condition",
    "Brake"
  ];

  const [vehicleCondition, setVehicleCondition] = useState<Record<string, boolean>>({});
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleString('en-US', { hour12: true })
  );

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  useEffect(() => {
    if (show) {
      // Default all conditions to true (no damage)
      setVehicleCondition(
        conditionItems.reduce((acc, item) => ({ ...acc, [item]: true }), {})
      );
      setNote("");
    }
  }, [show]);

  const toggleVehicleCondition = (item: string) => {
    setVehicleCondition((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({
        busAssignmentID: busInfo.busAssignmentID,
        busTripID: busInfo.busTripID,
        vehicleCondition,
        note,
      });
      onClose();
    } catch (error) {
      // Error handling is done in parent
    } finally {
      setSaving(false);
    }
  };

  if (!show) return null;

  // Check if any damage was reported (any condition is false)
  const hasDamage = Object.values(vehicleCondition).some(v => !v);
  const damageItems = Object.entries(vehicleCondition)
    .filter(([_, ok]) => !ok)
    .map(([item]) => item);

  // Group items into rows of 2
  const gridRows = [];
  for (let i = 0; i < conditionItems.length; i += 2) {
    gridRows.push(conditionItems.slice(i, i + 2));
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Post-Trip Vehicle Check</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className={styles.body}>
          {/* Bus Info */}
          <div className={styles.infoRow}>
            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>Bus</div>
              <div className={styles.infoValue}>{busInfo.busNumber}</div>
            </div>
            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>Route</div>
              <div className={styles.infoValue}>{busInfo.route}</div>
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>Driver</div>
              <div className={styles.infoValue}>{busInfo.driver}</div>
            </div>
            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>Conductor</div>
              <div className={styles.infoValue}>{busInfo.conductor}</div>
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>Check Date/Time</div>
              <div className={styles.infoValue}>{currentTime}</div>
            </div>
          </div>

          {/* Vehicle Condition Section */}
          <div>
            <div className={styles.sectionTitle}>Vehicle Condition Check</div>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '12px' }}>
              ✓ Check = OK (No damage) | ☐ Unchecked = Damage/Issue found
            </p>
            <div className={styles.conditionGrid}>
              {conditionItems.map((item) => (
                <div key={item} className={styles.conditionRow}>
                  <span className={styles.conditionLabel}>{item}</span>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={vehicleCondition[item] ?? true}
                    onChange={() => toggleVehicleCondition(item)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Damage Warning */}
          {hasDamage && (
            <div className={styles.damageSummary}>
              <div className={styles.damageSummaryTitle}>⚠️ Damage Detected</div>
              <div className={styles.damageSummaryList}>
                Issues found: {damageItems.join(', ')}
              </div>
              <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>
                A damage report will be created for maintenance review.
              </p>
            </div>
          )}

          {/* Notes */}
          <div className={styles.noteGroup}>
            <div className={styles.noteLabel}>Notes (Optional)</div>
            <textarea
              className={styles.noteInput}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add any additional notes about the vehicle condition..."
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Complete Check'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCheckModal;
