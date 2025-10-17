'use client';

import React, { useEffect, useState } from "react";
import styles from "./damage-check.module.css";

interface DamageCheckModalProps {
  show: boolean;
  onClose: () => void;
  busInfo: {
    rentalId: string;
    busNumber: string;
    driver: string;
  };
  damageData?: {
    vehicleCondition: Record<string, boolean>;
    note: string;
  };
  onSave: (data: {
    rentalId: string;
    vehicleCondition: Record<string, boolean>;
    note: string;
  }) => void;
}

const DamageCheckModal: React.FC<DamageCheckModalProps> = ({
  show,
  onClose,
  busInfo,
  damageData,
  onSave,
}) => {
  const conditionItems = [
    "Battery",
    "Lights",
    "Oil",
    "Water",
    "Brake",
    "Air",
    "Gas",
    "Engine",
    "Tire Condition"
  ];

  const [vehicleCondition, setVehicleCondition] = useState<Record<string, boolean>>({});
  const [note, setNote] = useState("");

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
      setVehicleCondition(
        damageData?.vehicleCondition ?? 
        conditionItems.reduce((acc, item) => ({ ...acc, [item]: false }), {})
      );
      setNote(damageData?.note ?? "");
    }
  }, [show, damageData]);

  const toggleVehicleCondition = (item: string) => {
    setVehicleCondition((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleSave = async () => {
    onSave({
      rentalId: busInfo.rentalId,
      vehicleCondition,
      note,
    });
    await Swal.fire('Success', 'Damage check has been saved.', 'success');
    onClose();
  };

  if (!show) return null;

  const gridRows = [];
  for (let i = 0; i < conditionItems.length; i += 2) {
    gridRows.push(conditionItems.slice(i, i + 2));
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Damage Check</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className={styles.body}>
          <div className={styles.leftCol}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Bus Information</h4>
              <p><strong>Bus:</strong> {busInfo.busNumber}</p>
              <p><strong>Driver:</strong> {busInfo.driver}</p>
            </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Vehicle Damage Check</h4>
              <div className={styles.vehicleGrid}>
                {gridRows.map((row, rowIdx) => (
                  <React.Fragment key={rowIdx}>
                    {row.map((item) => (
                      <div className={styles.vehicleCheck} key={item}>
                        <input
                          type="checkbox"
                          id={item}
                          checked={vehicleCondition[item] || false}
                          onChange={() => toggleVehicleCondition(item)}
                        />
                        <label htmlFor={item}>{item}</label>
                      </div>
                    ))}
                    {row.length === 1 && <div></div>}
                  </React.Fragment>
                ))}
              </div>

              <div className={styles.section} style={{ marginTop: '16px' }}>
                <label htmlFor="damageNote" className={styles.formLabel}>Notes</label>
                <textarea
                  id="damageNote"
                  className={styles.input}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add any notes about damages..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

            <div className={styles.footer}>
            <small className="text-muted" style={{ marginRight: 'auto' }}>
                {currentTime}
            </small>
            <button type="button" className={styles.createBtn} onClick={handleSave}>
                Save Damage Check
            </button>
            </div>
      </div>
    </div>
  );
};

export default DamageCheckModal;
