"use client";

import React, { useState } from "react";
import SegmentedControl from "@/components/ui/SegmentedControl";
import { BarChart, PieChart } from "@mui/x-charts";
import styles from "./dashboard.module.css";
import ThisMonthGraph from "./ThisMonthGraph";

function monthString(month: number): string {
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  
  return months[month - 1] || "Invalid Month";
}

const DashboardPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Bus Earnings");

  // RESPONSE FROM THE BACKEND
  const earnings = {
    month: 6,
    day: 25, 
    year: 2025,
    data: [
      1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800,
      2500, 3000, 3400, 3700, 3200, 3900, 4100, 3500, 4300, 4500,
      4000, 4700, 5000, 5200, 4800, 5400, 5600, 5900, 6100, 3500
    ],
  };

  // RESPONSE FROM THE BACKEND
  const busStatus = {
    inGarage: 80,
    inOperation: 20,
  };

  // RESPONSE FROM THE BACKEND
  const topRoutes = {
    "Sapang Palay - Divisoria": 300000,
    "Sapang Palay - PITX": 250000,
    "Sapang Palay - Fairview": 100000,
  };



  const handleSegmentChange = (value: string) => {
    console.log("Selected Tab:", value);
    setSelectedTab(value);
  };

  // **Safe Data Access**
  const todayIndex = earnings.day - 1;
  const yesterdayIndex = todayIndex - 1;
  const lastWeekIndex = todayIndex - 7;

  // **Calculate Today's Earnings**
  const todayEarnings = earnings.data[todayIndex] || 0;
  const yesterdayEarnings = earnings.data[yesterdayIndex] || todayEarnings; // Avoid NaN issues

  // **Calculate Change from Yesterday**
  const yesterdayChange =
    yesterdayEarnings > 0
      ? Math.abs(((todayEarnings - yesterdayEarnings) / yesterdayEarnings) * 100).toFixed(2)
      : "0.00";


  // **Calculate This Week's Earnings**
  const thisWeekEarnings = earnings.data.slice(Math.max(todayIndex - 6, 0), todayIndex + 1).reduce((acc, num) => acc + num, 0);

  // **Calculate Last Week's Earnings**
  const lastWeekEarnings = earnings.data.slice(Math.max(lastWeekIndex - 6, 0), lastWeekIndex + 1).reduce((acc, num) => acc + num, 0);

  // **Weekly Trend**
  const weeklyTrend =
    lastWeekEarnings > 0
      ? (((thisWeekEarnings - lastWeekEarnings) / lastWeekEarnings) * 100).toFixed(2)
      : "0.00";

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
          <div className={styles.heading}>Bus Total Earnings</div>
          <div className="grid gap-13 sm:grid-cols-3">
            {/* Today's Earnings */}
            <div className={styles.reportCard}>
              <p className={styles.cardTitle}>Today ({monthString(earnings.month)} {earnings.day})</p>
              <h3 className={styles.amount}>₱{todayEarnings.toLocaleString()}</h3>
              <p className={styles.trend}> {todayEarnings >= yesterdayEarnings ? "+" : "−"}{yesterdayChange}% from yesterday</p>

            </div>

            {/* Weekly Earnings */}
            <div className={styles.reportCard}>
              <p className={styles.cardTitle}>This week</p>
              <h3 className={styles.amount}>₱{thisWeekEarnings.toLocaleString()}</h3>
              <p className={styles.trend}>+{weeklyTrend}% from last week</p>
            </div>

            {/* Monthly Earnings */}
            <div className={styles.reportCard}>
              <p className={styles.cardTitle}>This month ({monthString(earnings.month)})</p>
              <h3 className={styles.amount}>₱{earnings.data.reduce((acc, num) => acc + num, 0).toLocaleString()}</h3>
              <p className={styles.trend}>−15% lower than last month</p>
            </div>
          </div>
          <div className="w-full my-3">
            <ThisMonthGraph earnings={earnings} />
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
                  { id: 0, value: busStatus.inGarage, label: "In Garage", color: "#961C1E" },
                  { id: 1, value: busStatus.inOperation, label: "In Operation", color: "#FEB71F" },
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
                data: Object.keys(topRoutes),
              },
            ]}
            series={[{ data: Object.values(topRoutes) }]}
            height={300}
          />
        </>
      )}
    </div>
  );
};

export default DashboardPage;