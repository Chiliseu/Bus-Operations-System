import React from "react";
import styles from "../Add-Stop/add-stop.module.css";

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
          {/* Combined Main Details */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Assignment Participants</h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              {/* Bus */}
              <div>
                <h5 style={{ marginBottom: 8, fontWeight: 600 }}>Bus</h5>
                <ul>
                  <li><b>License Plate:</b> {assignment.busLicensePlate || assignment.bus?.license_plate || "N/A"}</li>
                  <li><b>Type:</b> {assignment.busType || assignment.bus?.type || "N/A"}</li>
                  {assignment.bus?.capacity && (
                    <li><b>Capacity:</b> {assignment.bus.capacity}</li>
                  )}
                  {assignment.bus?.image && (
                    <li>
                      <img src={assignment.bus.image} alt="Bus" style={{ width: 80, marginTop: 8 }} />
                    </li>
                  )}
                </ul>
              </div>
              {/* Driver */}
              <div>
                <h5 style={{ marginBottom: 8, fontWeight: 600 }}>Driver</h5>
                <ul>
                  <li><b>Name:</b> {assignment.driverName || assignment.driver?.name || "N/A"}</li>
                  {assignment.driver?.contactNo && (
                    <li><b>Contact:</b> {assignment.driver.contactNo}</li>
                  )}
                  {assignment.driver?.address && (
                    <li><b>Address:</b> {assignment.driver.address}</li>
                  )}
                  {assignment.driver?.image && (
                    <li>
                      <img src={assignment.driver.image} alt="Driver" style={{ width: 80, marginTop: 8 }} />
                    </li>
                  )}
                </ul>
              </div>
              {/* Conductor */}
              <div>
                <h5 style={{ marginBottom: 8, fontWeight: 600 }}>Conductor</h5>
                <ul>
                  <li><b>Name:</b> {assignment.conductorName || assignment.conductor?.name || "N/A"}</li>
                  {assignment.conductor?.contactNo && (
                    <li><b>Contact:</b> {assignment.conductor.contactNo}</li>
                  )}
                  {assignment.conductor?.address && (
                    <li><b>Address:</b> {assignment.conductor.address}</li>
                  )}
                  {assignment.conductor?.image && (
                    <li>
                      <img src={assignment.conductor.image} alt="Conductor" style={{ width: 80, marginTop: 8 }} />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Quota Policy - Display Only, Styled Like Edit Modal */}
            <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Quota Policy</h4>
            {assignment.QuotaPolicies && assignment.QuotaPolicies.length > 0 ? (
                <div>
                {assignment.QuotaPolicies.map((policy: any, idx: number) => (
                    <div
                    key={policy.QuotaPolicyID || idx}
                    style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        border: "1px solid #e0e0e0",
                        borderRadius: 6,
                        padding: "0.75rem 1rem",
                        marginBottom: 10,
                        background: "#fafbfc"
                    }}
                    >
                    <div style={{ minWidth: 120 }}>
                        <label className={styles.formLabel}>Start Date</label>
                        <div>
                        {policy.StartDate
                            ? new Date(policy.StartDate).toLocaleDateString()
                            : "-"}
                        </div>
                    </div>
                    <div style={{ minWidth: 120 }}>
                        <label className={styles.formLabel}>End Date</label>
                        <div>
                        {policy.EndDate
                            ? new Date(policy.EndDate).toLocaleDateString()
                            : "-"}
                        </div>
                    </div>
                    <div style={{ minWidth: 120 }}>
                        <label className={styles.formLabel}>Type</label>
                        <div>
                        {policy.Fixed && policy.Fixed.Quota != null
                            ? "Fixed"
                            : policy.Percentage && policy.Percentage.Percentage != null
                            ? "Percentage"
                            : "-"}
                        </div>
                    </div>
                    <div style={{ minWidth: 120 }}>
                        <label className={styles.formLabel}>Value</label>
                        <div>
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
                <div className="text-muted">No quota policy info.</div>
            )}
            </div>

            {/* Bus Trip History */}
            <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Bus Trip History</h4>
            {assignment.BusTrips && assignment.BusTrips.length > 0 ? (
                <div style={{ maxHeight: 250, overflowY: "auto", border: "1px solid #e0e0e0", borderRadius: 6 }}>
                <table style={{ width: "100%", fontSize: "0.95rem" }}>
                    <thead style={{ position: "sticky", top: 0, background: "#f5f5f5", zIndex: 1 }}>
                    <tr>
                        <th>Dispatched At</th>
                        <th>Completed At</th>
                        <th>Sales</th>
                        <th>Change Fund</th>
                    </tr>
                    </thead>
                    <tbody>
                    {assignment.BusTrips.map((trip: any) => (
                        <tr key={trip.BusTripID}>
                        <td>{trip.DispatchedAt ? new Date(trip.DispatchedAt).toLocaleString() : "N/A"}</td>
                        <td>{trip.CompletedAt ? new Date(trip.CompletedAt).toLocaleString() : "N/A"}</td>
                        <td>₱{trip.Sales?.toLocaleString() ?? "0"}</td>
                        <td>₱{trip.ChangeFund?.toLocaleString() ?? "0"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            ) : (
                <div className="text-muted">No bus trip history.</div>
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