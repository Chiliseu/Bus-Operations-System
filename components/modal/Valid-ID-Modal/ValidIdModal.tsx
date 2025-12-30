import React from 'react';
import styles from './validid-modal.module.css';

interface ValidIdModalProps {
  show: boolean;
  onClose: () => void;
  validIdType: string;
  setValidIdType: (value: string) => void;
}

export default function ValidIdModal({
  show,
  onClose,
  validIdType,
  setValidIdType,
}: ValidIdModalProps) {
  if (!show) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Select Valid ID Type</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={styles.body}>
          <div className={styles.section}>
            <label className={styles.label}>ID Type</label>
            <select
              className={styles.select}
              value={validIdType}
              onChange={(e) => {
                setValidIdType(e.target.value);
                if (e.target.value !== 'Others') {
                  // Auto-close modal if not Others
                  setTimeout(() => onClose(), 300);
                }
              }}
            >
              <option value="">-- Select ID Type --</option>
              <option value="National ID">National ID</option>
              <option value="Passport">Passport</option>
              <option value="Driver's License">Driver&apos;s License</option>
              <option value="UMID (SSS/GSIS)">UMID (SSS/GSIS)</option>
              <option value="Postal ID">Postal ID</option>
              <option value="Senior Citizen ID">Senior Citizen ID</option>
              <option value="PRC ID">PRC ID</option>
              <option value="Voter's ID">Voter&apos;s ID</option>
              <option value="Others">Others (Specify)</option>
            </select>
          </div>

          {validIdType === 'Others' && (
            <div className={styles.section}>
              <label className={styles.label}>Specify ID Type</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter ID type"
                onChange={(e) => setValidIdType(e.target.value)}
                autoFocus
              />
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => {
              onClose();
              setValidIdType('');
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={() => {
              if (validIdType) {
                onClose();
              }
            }}
            disabled={!validIdType}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
