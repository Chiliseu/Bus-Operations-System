"use client";

import React, { useState } from "react";
import SegmentedControl from "@/components/ui/SegmentedControl";
import { BarChart, PieChart } from "@mui/x-charts";

// Style Imports
import styles from "./performance-report.module.css";
import ThisMonthGraph from "./ThisMonthGraph";

const PerformanceReportPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Bus Earnings");

  const handleSegmentChange = (value: string) => {
    console.log("Selected Tab:", value);
    setSelectedTab(value);
  };

  return (
    <div className={styles.wideCard}>
      {/* Segmented Control */}
      <div className="mb-4">
        <SegmentedControl
          options={["Bus Earnings", "Bus Status", "Top Performing Routes"]}
          defaultValue="Bus Earnings"
          onSelect={handleSegmentChange}
        />
      </div>
      {/* Conditional Rendering */}
      {selectedTab === "Bus Earnings" && (
        <>
          <div className={styles.heading}>Bus Earnings</div>
          <div className="grid gap-13 sm:grid-cols-3">
            <div className={styles.reportCard}>
              <p className={styles.cardTitle}>Today</p>
              <h3 className={styles.amount}>₱9,953.00</h3>
              <p className={styles.trend}>+20% higher than yesterday</p>
            </div>
            <div className={styles.reportCard}>
              <p className={styles.cardTitle}>This week</p>
              <h3 className={styles.amount}>₱56,678.00</h3>
              <p className={styles.trend}>+10% higher than last week</p>
            </div>
            <div className={styles.reportCard}>
              <p className={styles.cardTitle}>This month</p>
              <h3 className={styles.amount}>₱1,653,122.00</h3>
              <p className={styles.trend}>−15% lower than last month</p>
            </div>
          </div>
          <div className="w-full my-3">
            <ThisMonthGraph />
          </div>
        </>
      )}

      {selectedTab === "Bus Status" && (
        <>
          <div className={styles.heading}>Bus Status Summary</div>
          <PieChart
            colors={["#961C1E", "#FEB71F"]}
            series={[
              {
                data: [
                  { id: 0, value: 80, label: "In Garage", color: "#961C1E" },
                  { id: 1, value: 20, label: "In Operation", color: "#FEB71F" },
                ],
              },
            ]}
            width={200}
            height={200}
          />
        </>
      )}

      {selectedTab === "Top Performing Routes" && (
        <>
          <div className={styles.heading}>Top Performing Routes</div>
          <BarChart
            xAxis={[
              {
                data: [
                  "Sapang Palay - Divisoria",
                  "Sapang Palay - PITX",
                  "Sapang Palay - Fairview",
                ],
              },
            ]}
            series={[{ data: [300000, 250000, 100000] }]}
            height={300}
          />
        </>
      )}
    </div>
  );
};

export default PerformanceReportPage;
