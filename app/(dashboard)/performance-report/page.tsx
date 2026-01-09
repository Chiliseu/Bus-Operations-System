"use client";

import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bus, MapPin, Award, Download, DollarSign, Activity } from 'lucide-react';
import styles from './performance-report.module.css';

const PerformanceDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('last_30_days');
  const [busType, setBusType] = useState('all');
  const [routeFilter, setRouteFilter] = useState('all');

  // === SAMPLE DATA ===
  const topDrivers = [
    { name: 'Juan Cruz', trips: 145, revenue: 87500, punctuality: 96 },
    { name: 'Maria Santos', trips: 138, revenue: 82800, punctuality: 94 },
    { name: 'Pedro Reyes', trips: 132, revenue: 79200, punctuality: 92 }
  ];

  const lowDrivers = [
    { name: 'Carlos Diaz', trips: 45, revenue: 27000, punctuality: 78 },
    { name: 'Luis Torres', trips: 52, revenue: 31200, punctuality: 81 }
  ];

  const topConductors = [
    { name: 'Ana Garcia', trips: 150, revenue: 90000, punctuality: 98 },
    { name: 'Rosa Mendoza', trips: 142, revenue: 85200, punctuality: 95 },
    { name: 'Elena Cruz', trips: 135, revenue: 81000, punctuality: 93 }
  ];

  const lowConductors = [
    { name: 'Mario Reyes', trips: 48, revenue: 28800, punctuality: 79 },
    { name: 'Jose Santos', trips: 55, revenue: 33000, punctuality: 82 }
  ];

  const topRoutes = [
    { name: 'Manila - Quezon City', trips: 456, revenue: 273600 },
    { name: 'Makati - Pasig', trips: 423, revenue: 253800 },
    { name: 'BGC - Ortigas', trips: 398, revenue: 238800 }
  ];

  const lowRoutes = [
    { name: 'Taguig - Paranaque', trips: 89, revenue: 53400 },
    { name: 'Mandaluyong - Pasay', trips: 95, revenue: 57000 }
  ];

  const mlTopPairs = [
    { driver: 'Juan Cruz', conductor: 'Ana Garcia', tripsAsTeam: 98, revenueAsTeam: 58800 },
    { driver: 'Maria Santos', conductor: 'Rosa Mendoza', tripsAsTeam: 92, revenueAsTeam: 55200 },
    { driver: 'Pedro Reyes', conductor: 'Elena Cruz', tripsAsTeam: 87, revenueAsTeam: 52200 }
  ];

  const monthlyTrend = [
    { month: 'Apr', revenue: 450000, trips: 750 },
    { month: 'May', revenue: 520000, trips: 867 },
    { month: 'Jun', revenue: 480000, trips: 800 },
    { month: 'Jul', revenue: 590000, trips: 983 },
    { month: 'Aug', revenue: 620000, trips: 1033 },
    { month: 'Sep', revenue: 680000, trips: 1133 }
  ];

  const revenueByRoute = [
    { route: 'Route 1', revenue: 273600 },
    { route: 'Route 3', revenue: 253800 },
    { route: 'Route 5', revenue: 238800 },
    { route: 'Route 7', revenue: 186500 },
    { route: 'Route 2', revenue: 165200 }
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, [dateRange, busType, routeFilter]);

  // === PDF EXPORT FUNCTION ===
  const handleExport = async () => {
    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yPosition = margin;

      // Helper function to check if we need a new page
      const checkPageBreak = (requiredHeight: number) => {
        if (yPosition + requiredHeight > pageHeight - margin - 10) {
          pdf.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      };

      // === HEADER (Red background like modal) ===
      pdf.setFillColor(150, 28, 30); // #961c1e
      pdf.rect(0, 0, pageWidth, 35, 'F');
      
      // Logo in the center
      const logoSize = 40;
      const logoX = pageWidth / 2;
      const logoY = 17.5;
      
      // Load and add logo image
      try {
        const logoImg = await new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = '/assets/images/agilalogoforpdf.png';
        });
        pdf.addImage(logoImg, 'PNG', logoX - logoSize / 2, logoY - logoSize / 2, logoSize, logoSize);
      } catch (error) {
        console.log('Logo could not be loaded, continuing without it');
      }
      
      // Title on the left
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Performance Report', margin, 14);
      
      // Generated and Period info on the left, stacked
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, margin, 22);
      pdf.text(`Period: ${dateRange.replace(/_/g, ' ').toUpperCase()}`, margin, 28);
      
      yPosition = 45;

    // === OVERVIEW SECTION ===
    pdf.setFillColor(248, 249, 250); // Light gray background like modal sections
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 35, 'F');
    pdf.setDrawColor(233, 236, 239);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 35, 'S');
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(73, 80, 87);
    pdf.text('Overview', margin + 3, yPosition + 6);
    
    // Stats in simple boxes
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(73, 80, 87);
    
    const stats = [
      ['Total Trips', '1,133', '+12.5%'],
      ['Total Revenue', '₱680,000', '+9.7%'],
      ['Avg Punctuality', '92%', '+3%'],
      ['Active Routes', '12', 'All operational']
    ];

    stats.forEach((stat, idx) => {
      const xPos = margin + 5 + (idx % 2) * 85;
      const yPos = yPosition + 12 + Math.floor(idx / 2) * 10;
      
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${stat[0]}:`, xPos, yPos);
      pdf.setFont('helvetica', 'normal');
      const displayValue = stat[1].replace('₱', 'PHP ');
      pdf.text(displayValue, xPos + 35, yPos);
      pdf.setTextColor(5, 150, 105);
      pdf.text(stat[2], xPos + 60, yPos);
      pdf.setTextColor(73, 80, 87);
    });

    yPosition += 40;

    // === TOP PERFORMING DRIVERS ===
    checkPageBreak(65);
    
    pdf.setFillColor(248, 249, 250);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 60, 'F');
    pdf.setDrawColor(233, 236, 239);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 60, 'S');
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(73, 80, 87);
    pdf.text('Top Performing Drivers', margin + 3, yPosition + 6);
    
    yPosition += 12;
    
    // Table header (Red background like modal)
    pdf.setFillColor(150, 28, 30);
    pdf.rect(margin + 3, yPosition, pageWidth - 2 * margin - 6, 8, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Name', margin + 6, yPosition + 5.5);
    pdf.text('Trips', margin + 70, yPosition + 5.5);
    pdf.text('Revenue', margin + 100, yPosition + 5.5);
    pdf.text('Punctuality', margin + 150, yPosition + 5.5);
    
    yPosition += 8;
    
    // Table rows
    pdf.setFontSize(8);
    topDrivers.forEach((driver, idx) => {
      if (idx % 2 === 0) {
        pdf.setFillColor(255, 255, 255);
        pdf.rect(margin + 3, yPosition, pageWidth - 2 * margin - 6, 7, 'F');
      }
      
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(73, 80, 87);
      pdf.text(driver.name, margin + 6, yPosition + 5);
      pdf.text(driver.trips.toString(), margin + 70, yPosition + 5);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(150, 28, 30);
      pdf.text(`PHP ${driver.revenue.toLocaleString()}`, margin + 100, yPosition + 5);
      
      pdf.setTextColor(5, 150, 105);
      pdf.text(`${driver.punctuality}%`, margin + 150, yPosition + 5);
      
      yPosition += 7;
    });

    yPosition += 10;

    // === TOP PERFORMING CONDUCTORS ===
    checkPageBreak(65);
    
    pdf.setFillColor(248, 249, 250);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 60, 'F');
    pdf.setDrawColor(233, 236, 239);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 60, 'S');
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(73, 80, 87);
    pdf.text('Top Performing Conductors', margin + 3, yPosition + 6);
    
    yPosition += 12;
    
    pdf.setFillColor(150, 28, 30);
    pdf.rect(margin + 3, yPosition, pageWidth - 2 * margin - 6, 8, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Name', margin + 6, yPosition + 5.5);
    pdf.text('Trips', margin + 70, yPosition + 5.5);
    pdf.text('Revenue', margin + 100, yPosition + 5.5);
    pdf.text('Punctuality', margin + 150, yPosition + 5.5);
    
    yPosition += 8;
    
    pdf.setFontSize(8);
    topConductors.forEach((conductor, idx) => {
      if (idx % 2 === 0) {
        pdf.setFillColor(255, 255, 255);
        pdf.rect(margin + 3, yPosition, pageWidth - 2 * margin - 6, 7, 'F');
      }
      
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(73, 80, 87);
      pdf.text(conductor.name, margin + 6, yPosition + 5);
      pdf.text(conductor.trips.toString(), margin + 70, yPosition + 5);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(150, 28, 30);
      pdf.text(`PHP ${conductor.revenue.toLocaleString()}`, margin + 100, yPosition + 5);
      
      pdf.setTextColor(5, 150, 105);
      pdf.text(`${conductor.punctuality}%`, margin + 150, yPosition + 5);
      
      yPosition += 7;
    });

    yPosition += 10;

    // === TOP PERFORMING ROUTES ===
    checkPageBreak(65);
    
    pdf.setFillColor(248, 249, 250);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 60, 'F');
    pdf.setDrawColor(233, 236, 239);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 60, 'S');
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(73, 80, 87);
    pdf.text('Top Performing Routes', margin + 3, yPosition + 6);
    
    yPosition += 12;
    
    pdf.setFillColor(150, 28, 30);
    pdf.rect(margin + 3, yPosition, pageWidth - 2 * margin - 6, 8, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Route', margin + 6, yPosition + 5.5);
    pdf.text('Trips', margin + 110, yPosition + 5.5);
    pdf.text('Revenue', margin + 145, yPosition + 5.5);
    
    yPosition += 8;
    
    pdf.setFontSize(8);
    topRoutes.forEach((route, idx) => {
      if (idx % 2 === 0) {
        pdf.setFillColor(255, 255, 255);
        pdf.rect(margin + 3, yPosition, pageWidth - 2 * margin - 6, 7, 'F');
      }
      
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(73, 80, 87);
      pdf.text(route.name, margin + 6, yPosition + 5);
      pdf.text(route.trips.toString(), margin + 110, yPosition + 5);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(150, 28, 30);
      pdf.text(`PHP ${route.revenue.toLocaleString()}`, margin + 145, yPosition + 5);
      
      yPosition += 7;
    });

    yPosition += 10;

    // === ML INSIGHTS ===
    checkPageBreak(65);
    
    pdf.setFillColor(248, 249, 250);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 50, 'F');
    pdf.setDrawColor(233, 236, 239);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 50, 'S');
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(73, 80, 87);
    pdf.text('ML Insights - Top Driver-Conductor Pairs', margin + 3, yPosition + 6);
    
    yPosition += 12;
    
    pdf.setFillColor(150, 28, 30);
    pdf.rect(margin + 3, yPosition, pageWidth - 2 * margin - 6, 8, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Driver', margin + 6, yPosition + 5.5);
    pdf.text('Conductor', margin + 60, yPosition + 5.5);
    pdf.text('Team Trips', margin + 115, yPosition + 5.5);
    pdf.text('Team Revenue', margin + 145, yPosition + 5.5);
    
    yPosition += 8;
    
    pdf.setFontSize(8);
    mlTopPairs.forEach((pair, idx) => {
      if (idx % 2 === 0) {
        pdf.setFillColor(255, 255, 255);
        pdf.rect(margin + 3, yPosition, pageWidth - 2 * margin - 6, 7, 'F');
      }
      
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(73, 80, 87);
      pdf.text(pair.driver, margin + 6, yPosition + 5);
      pdf.text(pair.conductor, margin + 60, yPosition + 5);
      pdf.text(pair.tripsAsTeam.toString(), margin + 115, yPosition + 5);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(150, 28, 30);
      pdf.text(`PHP ${pair.revenueAsTeam.toLocaleString()}`, margin + 145, yPosition + 5);
      
      yPosition += 7;
    });

      // === FOOTER ===
      pdf.setFillColor(248, 249, 250);
      pdf.rect(0, pageHeight - 15, pageWidth, 15, 'F');
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(108, 117, 125);
      pdf.text(
        `Generated on ${new Date().toLocaleString()}`,
        pageWidth / 2,
        pageHeight - 5,
        { align: 'center' }
      );

      pdf.save(`Performance_Report_${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };


  const LoadingSkeleton = () => (
    <div className={styles.statsGrid}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={`${styles.reportCard} ${styles.loading}`}>
          <div style={{ height: '20px', marginBottom: '12px' }}></div>
          <div style={{ height: '40px', marginBottom: '8px' }}></div>
          <div style={{ height: '16px' }}></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.wideCard} id="performance-dashboard">
      {/* === HEADER === */}
      <div className={styles.headerContainer}>
        <div>
          <h1 className={styles.heading}>Performance Report</h1>
          <p className={styles.subheading}>Overview of drivers, conductors, and routes with ML insights</p>
        </div>
        <button onClick={handleExport} className={styles.exportButton}>
          <Download className={styles.icon} />
          Export Report
        </button>
      </div>

      {/* === FILTERS === */}
      <div className={styles.filtersContainer}>
        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className={styles.filterSelect}>
          <option value="last_7_days">Last 7 Days</option>
          <option value="last_30_days">Last 30 Days</option>
          <option value="last_90_days">Last 90 Days</option>
        </select>

        <select value={busType} onChange={(e) => setBusType(e.target.value)} className={styles.filterSelect}>
          <option value="all">All Bus Types</option>
          <option value="air_conditioned">Air Conditioned</option>
          <option value="ordinary">Ordinary</option>
        </select>

        <select value={routeFilter} onChange={(e) => setRouteFilter(e.target.value)} className={styles.filterSelect}>
          <option value="all">All Routes</option>
          <option value="route_1">Route 1</option>
          <option value="route_3">Route 3</option>
          <option value="route_5">Route 5</option>
        </select>
      </div>

      {/* === OVERVIEW === */}
      <h2 className={styles.sectionTitle}>Overview</h2>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className={styles.statsGrid}>
            <div className={styles.reportCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Total Trips</span>
                <Bus className={styles.cardIcon} style={{ color: '#3b82f6' }} />
              </div>
              <p className={styles.amount}>1,133</p>
              <p className={`${styles.trend} ${styles.trendUp}`}>+12.5% from last period</p>
            </div>

            <div className={styles.reportCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Total Revenue</span>
                <DollarSign className={styles.cardIcon} style={{ color: '#10b981' }} />
              </div>
              <p className={styles.amount}>₱680,000</p>
              <p className={`${styles.trend} ${styles.trendUp}`}>+9.7% from last period</p>
            </div>

            <div className={styles.reportCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Avg Punctuality</span>
                <Activity className={styles.cardIcon} style={{ color: '#8b5cf6' }} />
              </div>
              <p className={styles.amount}>92%</p>
              <p className={`${styles.trend} ${styles.trendUp}`}>+3% from last period</p>
            </div>

            <div className={styles.reportCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Active Routes</span>
                <MapPin className={styles.cardIcon} style={{ color: '#f59e0b' }} />
              </div>
              <p className={styles.amount}>12</p>
              <p className={styles.cardSubtext}>All operational</p>
            </div>
          </div>

          <div className={styles.chartsGrid}>
            <div className={styles.chartContainer}>
              <h3 className={styles.chartTitle}>Monthly Trends</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue (₱)" strokeWidth={2} />
                  <Line type="monotone" dataKey="trips" stroke="#10b981" name="Trips" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.chartContainer}>
              <h3 className={styles.chartTitle}>Revenue by Route</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueByRoute}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="route" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#961c1e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* === ML INSIGHTS === */}
      <h2 className={styles.sectionTitle}>ML Insights</h2>
      <div className={styles.mlInsightsCard}>
        <div className={styles.mlHeader}>
          <Award className={styles.mlIcon} />
          <div>
            <h2 className={styles.mlTitle}>Top Earning Driver-Conductor Pairs</h2>
            <p className={styles.mlSubtitle}>Based on trips worked together and team revenue</p>
          </div>
        </div>

        <div className={styles.pairsGrid}>
          {mlTopPairs.map((pair, idx) => (
            <div key={idx} className={styles.pairCard}>
              <div className={styles.pairRank}>#{idx + 1}</div>
              <div className={styles.pairMembers}>
                <div className={styles.pairMember}>
                  <span className={styles.memberDot} style={{ background: '#3b82f6' }}></span>
                  <span className={styles.memberName}>{pair.driver}</span>
                </div>
                <div className={styles.pairMember}>
                  <span className={styles.memberDot} style={{ background: '#10b981' }}></span>
                  <span className={styles.memberName}>{pair.conductor}</span>
                </div>
              </div>
              <div className={styles.pairStats}>
                <div className={styles.pairStat}>
                  <span className={styles.statLabel}>Trips as Team:</span>
                  <span className={styles.statValue}>{pair.tripsAsTeam}</span>
                </div>
                <div className={styles.pairStat}>
                  <span className={styles.statLabel}>Team Revenue:</span>
                  <span className={`${styles.statValue} ${styles.statRevenue}`}>₱{pair.revenueAsTeam.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === TABLES === */}
      <h2 className={styles.sectionTitle}>Drivers</h2>
      <div className={styles.tablesGrid}>
        <div className={styles.tableCard}>
          <h3 className={styles.tableTitle}>Top Performing Drivers</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Trips</th>
                <th>Revenue</th>
                <th>Punctuality</th>
              </tr>
            </thead>
            <tbody>
              {topDrivers.map((d, i) => (
                <tr key={i}>
                  <td>{d.name}</td>
                  <td>{d.trips}</td>
                  <td className={styles.revenue}>₱{d.revenue.toLocaleString()}</td>
                  <td><span className={`${styles.badge} ${styles.badgeSuccess}`}>{d.punctuality}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.tableCard}>
          <h3 className={styles.tableTitle}>Low Performing Drivers</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Trips</th>
                <th>Revenue</th>
                <th>Punctuality</th>
              </tr>
            </thead>
            <tbody>
              {lowDrivers.map((d, i) => (
                <tr key={i}>
                  <td>{d.name}</td>
                  <td>{d.trips}</td>
                  <td className={styles.revenue}>₱{d.revenue.toLocaleString()}</td>
                  <td><span className={`${styles.badge} ${styles.badgeWarning}`}>{d.punctuality}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* === CONDUCTORS === */}
      <h2 className={styles.sectionTitle}>Conductors</h2>
      <div className={styles.tablesGrid}>
        <div className={styles.tableCard}>
          <h3 className={styles.tableTitle}>Top Performing Conductors</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Trips</th>
                <th>Revenue</th>
                <th>Punctuality</th>
              </tr>
            </thead>
            <tbody>
              {topConductors.map((c, i) => (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{c.trips}</td>
                  <td className={styles.revenue}>₱{c.revenue.toLocaleString()}</td>
                  <td><span className={`${styles.badge} ${styles.badgeSuccess}`}>{c.punctuality}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.tableCard}>
          <h3 className={styles.tableTitle}>Low Performing Conductors</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Trips</th>
                <th>Revenue</th>
                <th>Punctuality</th>
              </tr>
            </thead>
            <tbody>
              {lowConductors.map((c, i) => (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{c.trips}</td>
                  <td className={styles.revenue}>₱{c.revenue.toLocaleString()}</td>
                  <td><span className={`${styles.badge} ${styles.badgeWarning}`}>{c.punctuality}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* === ROUTES === */}
      <h2 className={styles.sectionTitle}>Routes</h2>
      <div className={styles.tablesGrid}>
        <div className={styles.tableCard}>
          <h3 className={styles.tableTitle}>Top Performing Routes</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Route</th>
                <th>Trips</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topRoutes.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.trips}</td>
                  <td className={styles.revenue}>₱{r.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.tableCard}>
          <h3 className={styles.tableTitle}>Low Performing Routes</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Route</th>
                <th>Trips</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {lowRoutes.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.trips}</td>
                  <td className={styles.revenue}>₱{r.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
