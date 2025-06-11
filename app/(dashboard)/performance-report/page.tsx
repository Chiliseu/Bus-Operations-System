'use client';

import React from 'react';
// Style Imports
import styles from './performance-report.module.css';

const PerformanceReportPage: React.FC = () => {
  return (
    <div className={styles.wideCard}>
      <div className="bg-red-100 text-center">Hindi pa tapos</div>
      <div className={styles.heading}>Bus Sales</div>
      {/* Cards */}
      <div className="grid gap-13 sm:grid-cols-3">
        {/* Today */}
        <div className={styles.reportCard}>
          <p className={styles.cardTitle}>Today</p>
          <h3 className={styles.amount}>₱9,953.00</h3>
          <p className={styles.trend}>+20% higher than yesterday</p>
        </div>

        {/* This Week */}
        <div className={styles.reportCard}>
          <p className={styles.cardTitle}>This week</p>
          <h3 className={styles.amount}>₱56,678.00</h3>
          <p className={styles.trend}>+10% higher than last week</p>
        </div>

        {/* This Month */}
        <div className={styles.reportCard}>
          <p className={styles.cardTitle}>This month</p>
          <h3 className={styles.amount}>₱1,653,122.00</h3>
          <p className={styles.trend}>−15% lower than last month</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReportPage;
