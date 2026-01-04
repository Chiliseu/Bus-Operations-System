"use client";

import React, { useState, useEffect } from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import styles from "./dashboard.module.css";
import ThisMonthGraph from "./ThisMonthGraph";
import { fetchDashboardSummary } from "@/lib/apiCalls/dashboard";
import LoadingModal from "@/components/modal/LoadingModal";

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

  const tabs = ["Bus Earnings", "Bus Status", "Top Performing Routes"];
  const activeTabIndex = tabs.indexOf(selectedTab);

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
    rentalEarnings?: {
      month: number;
      year: number;
      data: number[];
      previous?: {
        month: number;
        year: number;
        data: number[];
      };
    };
    busStatus: { NotStarted: number; NotReady: number; InOperation: number; InRental?: number };
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
  const rentalEarnings = dashboard?.rentalEarnings;
  const busStatus = dashboard?.busStatus;
  const topRoutes = dashboard?.topRoutes;
  const previous = earnings?.previous;
  const rentalPrevious = rentalEarnings?.previous;

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

  // Rental earnings calculations
  const todayRentalEarnings = rentalEarnings ? rentalEarnings.data[todayIndex] || 0 : 0;
  const yesterdayRentalEarnings = rentalEarnings ? rentalEarnings.data[yesterdayIndex] || 0 : 0;

  const rentalYesterdayChange = yesterdayRentalEarnings > 0
    ? ((todayRentalEarnings - yesterdayRentalEarnings) / yesterdayRentalEarnings) * 100
    : 0;

  const thisWeekRentalEarnings = rentalEarnings
    ? rentalEarnings.data.slice(Math.max(todayIndex - 6, 0), todayIndex + 1).reduce((acc, num) => acc + num, 0)
    : 0;

  const lastWeekRentalEarnings = rentalEarnings
    ? rentalEarnings.data.slice(lastWeekStart, lastWeekEnd + 1).reduce((acc, num) => acc + num, 0)
    : 0;

  const rentalWeeklyTrend = lastWeekRentalEarnings > 0
    ? ((thisWeekRentalEarnings - lastWeekRentalEarnings) / lastWeekRentalEarnings) * 100
    : 0;

  const thisMonthRentalTotal = rentalEarnings
    ? rentalEarnings.data.reduce((acc, num) => acc + num, 0)
    : 0;

  const previousMonthRentalTotal = rentalPrevious
    ? rentalPrevious.data.reduce((acc, num) => acc + num, 0)
    : 0;

  const rentalMonthlyTrend =
    previousMonthRentalTotal > 0
      ? ((thisMonthRentalTotal - previousMonthRentalTotal) / previousMonthRentalTotal) * 100
      : 0;

  return (
    <div className={styles.wideCard}>
      {/* Segmented Control with Sliding Indicator */}
      <div className={styles.segmentedControlContainer}>
        <div className={styles.tabContainer}>
          {/* Sliding indicator background */}
          <div 
            className={styles.tabIndicator}
            style={{
              transform: `translateX(calc(${activeTabIndex * 100}% + ${activeTabIndex * 4}px))`,
              width: `calc(${100 / tabs.length}% - ${4 * (tabs.length - 1) / tabs.length}px)`
            }}
          />
          
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${selectedTab === tab ? styles.tabButtonActive : ''}`}
              onClick={() => handleSegmentChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Wrapper */}
      <div className={styles.contentWrapper}>
        {selectedTab === "Bus Earnings" && (
          <>
            <div className={styles.heading}>Bus Operations Total Earning</div>
            
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <LoadingModal />
              </div>
            ) : earnings ? (
              <div className={styles.tabContent} key={selectedTab}>
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

                <div className={styles.chartContainer}>
                  <ThisMonthGraph
                    earnings={{ ...earnings, day: todayDay }}
                    previousMonthTotal={previousMonthTotal}
                    thisMonthTotal={thisMonthTotal}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.reportCard}>
                <p>No earnings data available</p>
              </div>
            )}

            {/* Bus Rentals Section */}
            <div className={styles.heading} style={{ marginTop: '48px' }}>Bus Rentals Total Earning</div>
            
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <LoadingModal />
              </div>
            ) : rentalEarnings ? (
              <div className={styles.tabContent}>
                <div className={styles.statsGrid}>
                  <div className={styles.reportCard}>
                    <p className={styles.cardTitle}>
                       Today ({monthString(rentalEarnings.month)} {todayDay})
                    </p>
                    <h3 className={styles.amount}>₱ {todayRentalEarnings.toLocaleString()}</h3>
                    <p className={`${styles.trend} ${todayRentalEarnings >= yesterdayRentalEarnings ? styles.trendUp : styles.trendDown}`}>
                      {todayRentalEarnings >= yesterdayRentalEarnings ? "+" : "−"}
                      {Math.abs(rentalYesterdayChange).toFixed(2)}% from yesterday
                    </p>
                  </div>

                  <div className={styles.reportCard}>
                    <p className={styles.cardTitle}> This week</p>
                    <h3 className={styles.amount}>₱ {thisWeekRentalEarnings.toLocaleString()}</h3>
                    <p className={`${styles.trend} ${rentalWeeklyTrend >= 0 ? styles.trendUp : styles.trendDown}`}>
                      {rentalWeeklyTrend >= 0 ? "+" : "−"}
                      {Math.abs(rentalWeeklyTrend).toFixed(2)}% from last week
                    </p>
                  </div>

                  <div className={styles.reportCard}>
                    <p className={styles.cardTitle}>
                       This month ({monthString(rentalEarnings.month)})
                    </p>
                    <h3 className={styles.amount}>
                      ₱ {thisMonthRentalTotal.toLocaleString()}
                    </h3>
                    <p className={`${styles.trend} ${rentalMonthlyTrend >= 0 ? styles.trendUp : styles.trendDown}`}>
                      {rentalMonthlyTrend >= 0 ? "+" : "−"}
                      {Math.abs(rentalMonthlyTrend).toFixed(2)}% {rentalMonthlyTrend >= 0 ? "higher" : "lower"} than last month
                    </p>
                  </div>
                </div>

                <div className={styles.chartContainer}>
                  <ThisMonthGraph
                    earnings={{ ...rentalEarnings, day: todayDay }}
                    previousMonthTotal={previousMonthRentalTotal}
                    thisMonthTotal={thisMonthRentalTotal}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.reportCard}>
                <p>No rental earnings data available</p>
              </div>
            )}
          </>
        )}

        {selectedTab === "Bus Status" && (
          <>
            <div className={styles.heading}> Bus Status Summary</div>
            
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <LoadingModal />
              </div>
            ) : busStatus ? (
              <div className={styles.tabContent} key={selectedTab}>
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
                    
                    <div className={styles.reportCard}>
                      <p className={styles.cardTitle}>
                        <span className={`${styles.statusIcon}`} style={{ background: '#3b82f6', boxShadow: '0 0 8px rgba(59, 130, 246, 0.4)' }}></span>
                        In Rental
                      </p>
                      <h3 className={styles.amount} style={{ color: '#3b82f6' }}>
                        {busStatus.InRental ?? 0}
                      </h3>
                    </div>
                  </div>

                  {/* Pie Chart */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <PieChart
                      series={[
                        {
                          data: [
                            { id: 0, value: busStatus.NotReady ?? 0, label: "Not Ready", color: "#961C1E" },
                            { id: 1, value: busStatus.InOperation ?? 0, label: "In Operation", color: "#0a8969" },
                            { id: 2, value: busStatus.NotStarted ?? 0, label: "Not Started", color: "#888" },
                            { id: 3, value: busStatus.InRental ?? 0, label: "In Rental", color: "#3b82f6" },
                          ],
                        },
                      ]}
                      width={400}
                      height={300}
                    />
                  </div>
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
              <div className={styles.loadingContainer}>
                <LoadingModal />
              </div>
            ) : topRoutes ? (
              <div className={styles.tabContent} key={selectedTab}>
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
              </div>
            ) : (
              <div className={styles.reportCard}>
                <p>No route performance data available</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;