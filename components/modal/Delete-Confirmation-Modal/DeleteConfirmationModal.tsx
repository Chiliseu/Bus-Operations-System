import React from 'react';
import Image from 'next/image';
import styles from './delete-confirmation-modal.module.css';

interface DeleteConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
  isDeleting?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  show,
  onClose,
  onConfirm,
  title = "Delete Bus Assignment",
  message = "Are you sure you want to delete this bus assignment?",
  itemName,
  isDeleting = false
}) => {
  if (!show) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            <Image 
              src="/assets/images/delete-bin-line.png" 
              alt="Delete" 
              width={28} 
              height={28}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            {title}
          </h2>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.warningSection}>
            <div className={styles.warningIcon}>
              <Image 
                src="/assets/images/deletion-bus.png" 
                alt="Warning" 
                width={120} 
                height={120}
              />
            </div>
            <p className={styles.warningMessage}>{message}</p>
            {itemName && (
              <p className={styles.itemName}>{itemName}</p>
            )}
            <p className={styles.warningSubtext}>
              This action cannot be undone!
            </p>
          </div>
        </div>

        {isDeleting && (
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar}>
              <div className={styles.progressBarFill}></div>
            </div>
            <p className={styles.deletingText}>Deleting...</p>
          </div>
        )}

        <div className={styles.modalFooter}>
          <button className={styles.btnCancel} onClick={onClose} disabled={isDeleting}>
            <Image 
              src="/assets/images/close-line.png" 
              alt="Cancel" 
              width={18} 
              height={18}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            Cancel
          </button>
          <button className={styles.btnDelete} onClick={handleConfirm} disabled={isDeleting}>
            <Image 
              src="/assets/images/delete-bin-line.png" 
              alt="Delete" 
              width={18} 
              height={18}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
