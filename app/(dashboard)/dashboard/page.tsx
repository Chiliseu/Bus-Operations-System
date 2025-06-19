"use client";

import React, { useState, useEffect } from "react";
import SegmentedControl from "@/components/ui/SegmentedControl";
import { BarChart, PieChart } from "@mui/x-charts";
import styles from "./dashboard.module.css";
import ThisMonthGraph from "./ThisMonthGraph";
import { fetchDashboardSummary } from "@/lib/apiCalls/dashboard";

function monthString(month: number): string {
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  return months[month - 1] || "Invalid Month";
}

const DashboardPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Bus Earnings");

  const [dashboard, setDashboard] = useState<{
    earnings: {
      month: number;
      year: number;
      data: number[];
      previous?: {
        month: number;
        year: number;
        data: number[];
      };
    };
    busStatus: { NotStarted: number; NotReady: number; InOperation: number };
    topRoutes: { [routeName: string]: number };
  } | null>(null);

  useEffect(() => {
    fetchDashboardSummary().then(setDashboard).catch(console.error);
  }, []);

  const handleSegmentChange = (value: string) => {
    setSelectedTab(value);
  };

  const earnings = dashboard?.earnings;
  const busStatus = dashboard?.busStatus;
  const topRoutes = dashboard?.topRoutes;
  const previous = earnings?.previous;

  const todayDay = new Date().getDate();
  const todayIndex = todayDay - 1;

  const todayEarnings = earnings ? earnings.data[todayIndex] || 0 : 0;
  const yesterdayIndex = todayIndex - 1;
  const yesterdayEarnings = earnings ? earnings.data[yesterdayIndex] || 0 : 0;

  const yesterdayChange = yesterdayEarnings > 0
    ? ((todayEarnings - yesterdayEarnings) / yesterdayEarnings) * 100
    : 0;

  const thisWeekEarnings = earnings
    ? earnings.data.slice(Math.max(todayIndex - 6, 0), todayIndex + 1).reduce((acc, num) => acc + num, 0)
    : 0;

  const lastWeekStart = Math.max(todayIndex - 13, 0);
  const lastWeekEnd = Math.max(todayIndex - 7, 0);
  const lastWeekEarnings = earnings
    ? earnings.data.slice(lastWeekStart, lastWeekEnd + 1).reduce((acc, num) => acc + num, 0)
    : 0;

  const weeklyTrend = lastWeekEarnings > 0
    ? ((thisWeekEarnings - lastWeekEarnings) / lastWeekEarnings) * 100
    : 0;

  const thisMonthTotal = earnings
    ? earnings.data.reduce((acc, num) => acc + num, 0)
    : 0;

  const previousMonthTotal = previous
  ? previous.data.reduce((acc, num) => acc + num, 0)
  : 0;

  const monthlyTrend =
    previousMonthTotal > 0
      ? ((thisMonthTotal - previousMonthTotal) / previousMonthTotal) * 100
      : 0;

  return (
    <div className={styles.wideCard}>
      <div className="mb-4">
        <SegmentedControl
          options={["Bus Earnings", "Bus Status", "Top Performing Routes"]}
          defaultValue="Bus Earnings"
          onSelect={handleSegmentChange}
        />
      </div>

      {selectedTab === "Bus Earnings" && earnings && (
        <>
          <div className={styles.heading}>Bus Total Earnings</div>
          <div className="grid gap-13 sm:grid-cols-3">
            <div className={styles.reportCard}>
              <p className={styles.cardTitle}>
                Today ({monthString(earnings.month)} {todayDay})
              </p>
              <h3 className={styles.amount}>₱{todayEarnings.toLocaleString()}</h3>
              <p className={`${styles.trend} ${todayEarnings >= yesterdayEarnings ? styles.trendUp : styles.trendDown}`}>
                {todayEarnings >= yesterdayEarnings ? "+" : "−"}
                {Math.abs(yesterdayChange).toFixed(2)}% from yesterday
              </p>
            </div>

            <div className={styles.reportCard}>
              <p className={styles.cardTitle}>This week</p>
              <h3 className={styles.amount}>₱{thisWeekEarnings.toLocaleString()}</h3>
              <p className={`${styles.trend} ${weeklyTrend >= 0 ? styles.trendUp : styles.trendDown}`}>
                {weeklyTrend >= 0 ? "+" : "−"}
                {Math.abs(weeklyTrend).toFixed(2)}% from last week
              </p>
            </div>

            <div className={styles.reportCard}>
              <p className={styles.cardTitle}>
                This month ({monthString(earnings.month)})
              </p>
              <h3 className={styles.amount}>
                ₱{thisMonthTotal.toLocaleString()}
              </h3>
              <p className={`${styles.trend} ${monthlyTrend >= 0 ? styles.trendUp : styles.trendDown}`}>
                {monthlyTrend >= 0 ? "+" : "−"}
                {Math.abs(monthlyTrend).toFixed(2)}% {monthlyTrend >= 0 ? "higher" : "lower"} than last month
              </p>
            </div>
          </div>

          <div className="w-full my-3">
            <ThisMonthGraph earnings={{ ...earnings, day: todayDay }} />
          </div>
        </>
      )}

      {selectedTab === "Bus Status" && busStatus && (
        <>
          <div className={styles.heading}>Bus Status Summary</div>
          <PieChart
            colors={["#961C1E", "#FEB71F"]}
            series={[
              {
                data: [
                  { id: 0, value: busStatus.NotReady ?? 0, label: "Not Ready", color: "#961C1E" },
                  { id: 1, value: busStatus.InOperation ?? 0, label: "In Operation", color: "#FEB71F" },
                  { id: 2, value: busStatus.NotStarted ?? 0, label: "Not Started", color: "#888" },
                ],
              },
            ]}
            width={200}
            height={200}
          />
        </>
      )}

      {selectedTab === "Top Performing Routes" && topRoutes && (
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
