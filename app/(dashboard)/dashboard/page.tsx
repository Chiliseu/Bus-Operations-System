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
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
    fetchDashboardSummary()
      .then(setDashboard)
      .catch(console.error)
      .finally(() => setIsLoading(false));
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

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className={styles.statsGrid}>
      {[1, 2, 3].map((i) => (
        <div key={i} className={`${styles.reportCard} ${styles.loading}`}>
          <div style={{ height: '20px', marginBottom: '12px' }}></div>
          <div style={{ height: '40px', marginBottom: '8px' }}></div>
          <div style={{ height: '16px' }}></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.wideCard}>
      <div className={styles.segmentedControlContainer}>
        <SegmentedControl
          options={["Bus Earnings", "Bus Status", "Top Performing Routes"]}
          defaultValue="Bus Earnings"
          onSelect={handleSegmentChange}
        />
      </div>

      {selectedTab === "Bus Earnings" && (
        <>
          <div className={styles.heading}>Bus Total Earnings</div>
          
          {isLoading ? (
            <LoadingSkeleton />
          ) : earnings ? (
            <div className={styles.statsGrid}>
              <div className={styles.reportCard}>
                <p className={styles.cardTitle}>
                   Today ({monthString(earnings.month)} {todayDay})
                </p>
                <h3 className={styles.amount}>₱ {todayEarnings.toLocaleString()}</h3>
                <p className={`${styles.trend} ${todayEarnings >= yesterdayEarnings ? styles.trendUp : styles.trendDown}`}>
                  {todayEarnings >= yesterdayEarnings ? "+" : "−"}
                  {Math.abs(yesterdayChange).toFixed(2)}% from yesterday
                </p>
              </div>

              <div className={styles.reportCard}>
                <p className={styles.cardTitle}> This week</p>
                <h3 className={styles.amount}>₱ {thisWeekEarnings.toLocaleString()}</h3>
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
                  ₱ {thisMonthTotal.toLocaleString()}
                </h3>
                <p className={`${styles.trend} ${monthlyTrend >= 0 ? styles.trendUp : styles.trendDown}`}>
                  {monthlyTrend >= 0 ? "+" : "−"}
                  {Math.abs(monthlyTrend).toFixed(2)}% {monthlyTrend >= 0 ? "higher" : "lower"} than last month
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.reportCard}>
              <p>No earnings data available</p>
            </div>
          )}

          {earnings && (
            <div className={styles.chartContainer}>
              <ThisMonthGraph earnings={{ ...earnings, day: todayDay }} />
            </div>
          )}
        </>
      )}

      {selectedTab === "Bus Status" && (
        <>
          <div className={styles.heading}> Bus Status Summary</div>
          
          {isLoading ? (
            <div className={`${styles.chartContainer} ${styles.loading}`} style={{ height: '200px' }}></div>
          ) : busStatus ? (
            <div className={styles.chartContainer}>
              {/* Status Summary Cards */}
              <div className={styles.statsGrid} style={{ marginBottom: '24px' }}>
                <div className={styles.reportCard}>
                  <p className={styles.cardTitle}>
                    <span className={`${styles.statusIcon} ${styles.ready}`}></span>
                    In Operation
                  </p>
                  <h3 className={styles.amount} style={{ color: '#059669' }}>
                    {busStatus.InOperation ?? 0}
                  </h3>
                </div>
                
                <div className={styles.reportCard}>
                  <p className={styles.cardTitle}>
                    <span className={`${styles.statusIcon} ${styles.notReady}`}></span>
                    Not Ready
                  </p>
                  <h3 className={styles.amount} style={{ color: '#961c1e' }}>
                    {busStatus.NotReady ?? 0}
                  </h3>
                </div>
                
                <div className={styles.reportCard}>
                  <p className={styles.cardTitle}>
                    <span className={`${styles.statusIcon} ${styles.notStarted}`}></span>
                    Not Started
                  </p>
                  <h3 className={styles.amount} style={{ color: '#6b7280' }}>
                    {busStatus.NotStarted ?? 0}
                  </h3>
                </div>
              </div>

              {/* Pie Chart */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  colors={["#961C1E", "#FEB71F", "#888"]}
                  series={[
                    {
                      data: [
                        { id: 0, value: busStatus.NotReady ?? 0, label: "Not Ready", color: "#961C1E" },
                        { id: 1, value: busStatus.InOperation ?? 0, label: "In Operation", color: "#FEB71F" },
                        { id: 2, value: busStatus.NotStarted ?? 0, label: "Not Started", color: "#888" },
                      ],
                    },
                  ]}
                  width={400}
                  height={300}
                />
              </div>
            </div>
          ) : (
            <div className={styles.reportCard}>
              <p>No bus status data available</p>
            </div>
          )}
        </>
      )}

      {selectedTab === "Top Performing Routes" && (
        <>
          <div className={styles.heading}>Top Performing Routes</div>
          
          {isLoading ? (
            <div className={`${styles.chartContainer} ${styles.loading}`} style={{ height: '300px' }}></div>
          ) : topRoutes ? (
            <div className={styles.chartContainer}>
              <BarChart
                xAxis={[
                  {
                    data: Object.keys(topRoutes),
                  },
                ]}
                series={[{ 
                  data: Object.values(topRoutes),
                  color: '#961c1e'
                }]}
                height={300}
              />
            </div>
          ) : (
            <div className={styles.reportCard}>
              <p>No route performance data available</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardPage;