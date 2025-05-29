'use client';

import React, { useEffect, useState } from 'react';
import styles from './quota-assignment.module.css'; // Create a CSS module for styling

interface QuotaPolicy {
  QuotaPolicyID: string;
  StartDate: Date;
  EndDate: Date;
  Fixed?: {
    Quota: number;
  } | null;
  Percentage?: {
    Percentage: number;
  } | null;
  RegularBusAssignment: {
    RegularBusAssignmentID: string;
  } | null;
}

const QuotaAssignmentPage: React.FC = () => {
  const [quotaPolicy, setAssignments] = useState<QuotaPolicy[]>([]);

  useEffect(() => {
      const fetchAssignments = async () => {
        try {
          const response = await fetch('/api/quota-assignment');
          if (!response.ok) {
            throw new Error(`Failed to fetch assignments: ${response.statusText}`);
          }
          const data = await response.json();
          console.log('Fetched assignments:', data); // Debugging
          setAssignments(data);
        } catch (error) {
          console.error('Error fetching assignments:', error);
        }
      };
    
      fetchAssignments();
    }, []);

  return (
    <div className="dashboard-content">
      <div className="center-box">
        <h1>Quota Assignment</h1>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Quota Assignment ID</th>
                <th>Bus ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Quota Type</th>
                <th>Quota Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotaPolicy.map((quotaPolicy) => (
                <tr key={quotaPolicy.QuotaPolicyID}>
                  <td>{quotaPolicy.QuotaPolicyID}</td>
                  <td>{quotaPolicy.RegularBusAssignment?.RegularBusAssignmentID}</td>
                  <td>{quotaPolicy.StartDate.toString()}</td>
                  <td>{quotaPolicy.EndDate.toString()}</td>
                  <td>{quotaPolicy.Fixed ? 'Fixed' : 'Percentage'}</td>
                  <td>{quotaPolicy.Fixed ? quotaPolicy.Fixed.Quota : quotaPolicy.Percentage?.Percentage}</td>
                  <td>
                    <button className={styles.actionButton}>Edit</button>
                    <button className={styles.actionButton}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuotaAssignmentPage;
