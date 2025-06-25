import React from "react";
import styles from "./view-assignment-modal.module.css";

interface ViewAssignmentModalProps {
  show: boolean;
  onClose: () => void;
  assignment: any; // Replace 'any' with your assignment type for better type safety
}

const ViewAssignmentModal: React.FC<ViewAssignmentModalProps> = ({ show, onClose, assignment }) => {
  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Bus Assignment Details</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.body}>
          {/* Assignment Participants */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Assignment Participants</h4>
            <div className={styles.participantsGrid}>
              {/* Bus */}
              <div className={styles.participantCard}>
                <h5 className={styles.participantTitle}>Bus</h5>
                <ul className={styles.participantInfo}>
                  <li><b>License Plate:</b> {assignment.busLicensePlate || assignment.bus?.license_plate || "N/A"}</li>
                  <li><b>Type:</b> {assignment.busType || assignment.bus?.type || "N/A"}</li>
                  {assignment.bus?.capacity && (
                    <li><b>Capacity:</b> {assignment.bus.capacity}</li>
                  )}
                  {assignment.bus?.image && (
                    <li>
                      <img src={assignment.bus.image} alt="Bus" className={styles.participantImg} />
                    </li>
                  )}
                </ul>
              </div>

              {/* Driver */}
              <div className={styles.participantCard}>
                <h5 className={styles.participantTitle}>Driver</h5>
                <ul className={styles.participantInfo}>
                  <li><b>Name:</b> {assignment.driverName || assignment.driver?.name || "N/A"}</li>
                  {assignment.driver?.contactNo && (
                    <li><b>Contact:</b> {assignment.driver.contactNo}</li>
                  )}
                  {assignment.driver?.address && (
                    <li><b>Address:</b> {assignment.driver.address}</li>
                  )}
                  {assignment.driver?.image && (
                    <li>
                      <img src={assignment.driver.image} alt="Driver" className={styles.participantImg} />
                    </li>
                  )}
                </ul>
              </div>

              {/* Conductor */}
              <div className={styles.participantCard}>
                <h5 className={styles.participantTitle}>Conductor</h5>
                <ul className={styles.participantInfo}>
                  <li><b>Name:</b> {assignment.conductorName || assignment.conductor?.name || "N/A"}</li>
                  {assignment.conductor?.contactNo && (
                    <li><b>Contact:</b> {assignment.conductor.contactNo}</li>
                  )}
                  {assignment.conductor?.address && (
                    <li><b>Address:</b> {assignment.conductor.address}</li>
                  )}
                  {assignment.conductor?.image && (
                    <li>
                      <img src={assignment.conductor.image} alt="Conductor" className={styles.participantImg} />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Quota Policy */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Quota Policy</h4>
            {assignment.QuotaPolicies && assignment.QuotaPolicies.length > 0 ? (
              <div>
                {assignment.QuotaPolicies.map((policy: any, idx: number) => (
                  <div key={policy.QuotaPolicyID || idx} className={styles.quotaPolicyItem}>
                    <div className={styles.policyField}>
                      <label className={styles.formLabel}>Start Date</label>
                      <div className={styles.policyValue}>
                        {policy.StartDate
                          ? new Date(policy.StartDate).toLocaleDateString()
                          : "-"}
                      </div>
                    </div>
                    <div className={styles.policyField}>
                      <label className={styles.formLabel}>End Date</label>
                      <div className={styles.policyValue}>
                        {policy.EndDate
                          ? new Date(policy.EndDate).toLocaleDateString()
                          : "-"}
                      </div>
                    </div>
                    <div className={styles.policyField}>
                      <label className={styles.formLabel}>Type</label>
                      <div className={styles.policyValue}>
                        {policy.Fixed && policy.Fixed.Quota != null
                          ? "Fixed"
                          : policy.Percentage && policy.Percentage.Percentage != null
                          ? "Percentage"
                          : "-"}
                      </div>
                    </div>
                    <div className={styles.policyField}>
                      <label className={styles.formLabel}>Value</label>
                      <div className={styles.policyValue}>
                        {policy.Fixed && policy.Fixed.Quota != null
                          ? `₱${policy.Fixed.Quota}`
                          : policy.Percentage && policy.Percentage.Percentage != null
                          ? `${policy.Percentage.Percentage}%`
                          : "-"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>No quota policy information available.</div>
            )}
          </div>

          {/* Bus Trip History */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Bus Trip History</h4>
            {assignment.BusTrips && assignment.BusTrips.length > 0 ? (
              <div className={styles.tripHistoryContainer}>
                <table className={styles.tripTable}>
                  <thead>
                    <tr>
                      <th>Dispatched At</th>
                      <th>Completed At</th>
                      <th>Sales</th>
                      <th>Petty Cash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignment.BusTrips.map((trip: any) => (
                      <tr key={trip.BusTripID}>
                        <td>{trip.DispatchedAt ? new Date(trip.DispatchedAt).toLocaleString() : "N/A"}</td>
                        <td>{trip.CompletedAt ? new Date(trip.CompletedAt).toLocaleString() : "N/A"}</td>
                        <td>₱{trip.Sales?.toLocaleString() ?? "0"}</td>
                        <td>₱{trip.PettyCash?.toLocaleString() ?? "0"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={styles.emptyState}>No bus trip history available.</div>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAssignmentModal;