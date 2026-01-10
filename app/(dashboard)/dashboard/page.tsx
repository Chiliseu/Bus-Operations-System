"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { BarChart, PieChart } from "@mui/x-charts";
import styles from "./dashboard.module.css";
import ThisMonthGraph from "./ThisMonthGraph";
import { fetchDashboardSummary } from "@/lib/apiCalls/dashboard";
import { fetchTripHistory, TripHistoryItem, TripHistoryResponse } from "@/lib/apiCalls/bus-operation";
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
  const [tripHistoryLoading, setTripHistoryLoading] = useState(false);
  const [tripHistory, setTripHistory] = useState<TripHistoryResponse | null>(null);
  const [tripHistoryPage, setTripHistoryPage] = useState(1);
  const [selectedTrip, setSelectedTrip] = useState<TripHistoryItem | null>(null);

  const tabs = ["Bus Earnings", "Trip History", "Bus Status", "Top Performing Routes"];
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

  // Fetch trip history when tab is selected or page changes
  useEffect(() => {
    if (selectedTab === "Trip History") {
      setTripHistoryLoading(true);
      fetchTripHistory(tripHistoryPage, 15)
        .then(setTripHistory)
        .catch(console.error)
        .finally(() => setTripHistoryLoading(false));
    }
  }, [selectedTab, tripHistoryPage]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedTrip) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedTrip]);

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
            ) : topRoutes && Object.keys(topRoutes).length > 0 ? (
              <div className={styles.tabContent} key={selectedTab}>
                {/* Top 3 Podium */}
                <div className={styles.topThreeContainer}>
                  {Object.entries(topRoutes)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 3)
                    .map(([routeName, earnings], index) => (
                      <div 
                        key={routeName} 
                        className={`${styles.podiumCard} ${styles[`rank${index + 1}`]}`}
                      >
                        <div className={styles.podiumRank}>
                          {index === 0 && <i className="ri-trophy-fill"></i>}
                          {index === 1 && <i className="ri-medal-fill"></i>}
                          {index === 2 && <i className="ri-award-fill"></i>}
                        </div>
                        <div className={styles.podiumPosition}>#{index + 1}</div>
                        <div className={styles.podiumRouteName}>{routeName}</div>
                        <div className={styles.podiumEarnings}>
                          ₱{earnings.toLocaleString()}
                        </div>
                      </div>
                    ))}
                </div>

                {/* Other Routes List */}
                {Object.entries(topRoutes).length > 3 && (
                  <div className={styles.otherRoutesSection}>
                    <h4 className={styles.otherRoutesTitle}>Other Routes</h4>
                    <div className={styles.otherRoutesList}>
                      {Object.entries(topRoutes)
                        .sort(([, a], [, b]) => b - a)
                        .slice(3)
                        .map(([routeName, earnings], index) => (
                          <div key={routeName} className={styles.otherRouteItem}>
                            <span className={styles.otherRouteRank}>#{index + 4}</span>
                            <span className={styles.otherRouteName}>{routeName}</span>
                            <span className={styles.otherRouteEarnings}>
                              ₱{earnings.toLocaleString()}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Bar Chart */}
                <div className={styles.chartCard}>
                  <h4 className={styles.chartTitle}>
                    <i className="ri-bar-chart-2-fill"></i>
                    Earnings Comparison
                  </h4>
                  <div className={styles.chartContainer}>
                    <BarChart
                      xAxis={[
                        {
                          data: Object.keys(topRoutes),
                          scaleType: 'band',
                        },
                      ]}
                      series={[{ 
                        data: Object.values(topRoutes),
                        color: '#961c1e',
                      }]}
                      height={320}
                      margin={{ top: 20, bottom: 60, left: 80, right: 20 }}
                      sx={{
                        '.MuiChartsAxis-tickLabel': {
                          fontSize: '12px !important',
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.reportCard}>
                <p>No route performance data available</p>
              </div>
            )}
          </>
        )}

        {selectedTab === "Trip History" && (
          <>
            <div className={styles.heading}>Completed Bus Trips History</div>
            
            {tripHistoryLoading ? (
              <div className={styles.loadingContainer}>
                <LoadingModal />
              </div>
            ) : tripHistory && tripHistory.trips.length > 0 ? (
              <div className={styles.tabContent} key={selectedTab}>
                <div className={styles.tripCardsGrid}>
                  {tripHistory.trips.map((trip) => {
                    const completedDate = trip.CompletedAt ? new Date(trip.CompletedAt) : null;
                    const dispatchedDate = trip.DispatchedAt ? new Date(trip.DispatchedAt) : null;
                    
                    return (
                      <div 
                        key={trip.BusTripID} 
                        className={styles.tripCard}
                        onClick={() => setSelectedTrip(trip)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className={styles.tripCardHeader}>
                          <div className={styles.tripBusInfo}>
                            <span className={styles.tripBusNumber}>
                              {trip.busLicensePlate || '-'}
                            </span>
                            <span className={styles.tripRoute}>
                              {trip.regularBusAssignment?.BusAssignment?.Route?.RouteName || '-'}
                            </span>
                          </div>
                          <div className={styles.tripDateTime}>
                            {completedDate 
                              ? completedDate.toLocaleDateString('en-US', { 
                                  month: 'short', day: 'numeric', year: 'numeric'
                                }) 
                              : '-'}
                          </div>
                        </div>
                        
                        <div className={styles.tripSalesHighlight}>
                          <span className={styles.tripSalesLabel}>Sales</span>
                          <span className={styles.tripSalesValue}>
                            ₱{trip.Sales?.toLocaleString() || '0'}
                          </span>
                        </div>
                        
                        <div className={styles.tripCardFooter}>
                          <div className={styles.tripCrewInfo}>
                            <i className="ri-user-line"></i>
                            <span>{trip.driverName || 'Unknown Driver'}</span>
                          </div>
                          <div className={styles.tripTimeInfo}>
                            {completedDate && (
                              <span className={styles.tripDuration}>
                                {(() => {
                                  const now = new Date();
                                  const diffMs = now.getTime() - completedDate.getTime();
                                  const diffMins = Math.floor(diffMs / (1000 * 60));
                                  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                                  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                                  
                                  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
                                  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
                                  if (diffDays === 1) return 'Yesterday';
                                  return `${diffDays} days ago`;
                                })()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Pagination */}
                {tripHistory.pagination.totalPages > 1 && (
                  <div className={styles.tripHistoryPagination}>
                    <button 
                      onClick={() => setTripHistoryPage(p => Math.max(1, p - 1))}
                      disabled={tripHistoryPage === 1}
                      className={styles.paginationBtn}
                    >
                      Previous
                    </button>
                    <span className={styles.paginationInfo}>
                      Page {tripHistory.pagination.page} of {tripHistory.pagination.totalPages}
                    </span>
                    <button 
                      onClick={() => setTripHistoryPage(p => Math.min(tripHistory.pagination.totalPages, p + 1))}
                      disabled={tripHistoryPage === tripHistory.pagination.totalPages}
                      className={styles.paginationBtn}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.reportCard}>
                <p>No completed trips found</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Trip Detail Modal */}
      {selectedTrip && createPortal(
        <div className={styles.modalOverlay} onClick={() => setSelectedTrip(null)}>
          <div className={styles.tripDetailModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Trip Details</h3>
              <button className={styles.modalCloseBtn} onClick={() => setSelectedTrip(null)}>
                <i className="ri-close-line"></i>
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.detailSection}>
                <h4>Bus & Route</h4>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Bus</span>
                    <span className={styles.detailValue}>{selectedTrip.busLicensePlate || '-'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Route</span>
                    <span className={styles.detailValue}>
                      {selectedTrip.regularBusAssignment?.BusAssignment?.Route?.RouteName || '-'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.detailSection}>
                <h4>Crew</h4>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Driver</span>
                    <span className={styles.detailValue}>{selectedTrip.driverName || '-'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Conductor</span>
                    <span className={styles.detailValue}>{selectedTrip.conductorName || '-'}</span>
                  </div>
                </div>
              </div>

              <div className={styles.detailSection}>
                <h4>Timing</h4>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Dispatched</span>
                    <span className={styles.detailValue}>
                      {selectedTrip.DispatchedAt 
                        ? new Date(selectedTrip.DispatchedAt).toLocaleString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          }) 
                        : '-'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Completed</span>
                    <span className={styles.detailValue}>
                      {selectedTrip.CompletedAt 
                        ? new Date(selectedTrip.CompletedAt).toLocaleString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          }) 
                        : '-'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Duration</span>
                    <span className={styles.detailValue}>
                      {selectedTrip.DispatchedAt && selectedTrip.CompletedAt
                        ? `${Math.round((new Date(selectedTrip.CompletedAt).getTime() - new Date(selectedTrip.DispatchedAt).getTime()) / (1000 * 60 * 60))} hours`
                        : '-'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.detailSection}>
                <h4>Financials</h4>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Sales</span>
                    <span className={`${styles.detailValue} ${styles.salesHighlight}`}>
                      ₱{selectedTrip.Sales?.toLocaleString() || '0'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Trip Expense</span>
                    <span className={styles.detailValue}>
                      ₱{selectedTrip.TripExpense?.toLocaleString() || '0'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Payment Method</span>
                    <span className={styles.detailValue}>{selectedTrip.Payment_Method || '-'}</span>
                  </div>
                </div>
              </div>

              {selectedTrip.Remarks && (
                <div className={styles.detailSection}>
                  <h4>Remarks</h4>
                  <p className={styles.remarksText}>{selectedTrip.Remarks}</p>
                </div>
              )}

              {selectedTrip.DamageReports && selectedTrip.DamageReports.length > 0 && (
                <div className={styles.detailSection}>
                  <h4>Vehicle Check</h4>
                  <div className={styles.damageReportsList}>
                    {selectedTrip.DamageReports.map((report, idx) => (
                      <div key={idx} className={styles.damageReportItem}>
                        <span className={styles.damageDescription}>Report #{idx + 1}</span>
                        <span className={`${styles.damageStatus} ${styles[`status${report.Status}`]}`}>
                          {report.Status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default DashboardPage;