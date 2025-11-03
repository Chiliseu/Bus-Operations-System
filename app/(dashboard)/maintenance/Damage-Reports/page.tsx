'use client';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './damage-reports.module.css';
import '../../../../styles/globals.css';

// --- Shared imports ---
import { Loading, FilterDropdown, PaginationComponent, Swal } from '@/shared/imports';
import type { FilterSection } from '@/shared/imports';

const BASE_URL = process.env.NEXT_PUBLIC_Backend_BaseURL?.replace(/['"]/g, "");
const DAMAGE_REPORTS_URL = `${BASE_URL}/api/damage-report`;

interface DamageReport {
  id: number;
  DamageReportID: string;
  bus_no: string;
  check_date: string;
  battery: boolean;
  lights: boolean;
  oil: boolean;
  water: boolean;
  brake: boolean;
  air: boolean;
  gas: boolean;
  engine: boolean;
  tireCondition: boolean;
  notes: string;
  createdBy: string;
}

const DamageReportsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [damageReports, setDamageReports] = useState<DamageReport[]>([]);
  const [displayedData, setDisplayedData] = useState<DamageReport[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const filterSections: FilterSection[] = [
    {
      id: 'sortBy',
      title: 'Sort By',
      type: 'radio',
      options: [
        { id: 'date_newest', label: 'Check Date (Newest First)' },
        { id: 'date_oldest', label: 'Check Date (Oldest First)' },
        { id: 'bus_asc', label: 'Bus No. (A-Z)' },
        { id: 'bus_desc', label: 'Bus No. (Z-A)' },
      ],
      defaultValue: 'date_newest'
    },
  ];

  const [activeFilters, setActiveFilters] = useState<{
    sortBy: string;
  }>({
    sortBy: 'date_newest'
  });

  useEffect(() => {
    const fetchDamageReports = async () => {
      setLoading(true);
      try {
        const response = await fetch(DAMAGE_REPORTS_URL, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch damage reports');
        }

        const data = await response.json();

        // Transform API data to match frontend interface
        const transformedData: DamageReport[] = data.map((item: any, index: number) => ({
          id: index + 1,
          DamageReportID: item.DamageReportID,
          bus_no: item.RentalBusAssignment?.BusAssignment?.BusID || 'N/A',
          check_date: item.CheckDate,
          battery: item.Battery,
          lights: item.Lights,
          oil: item.Oil,
          water: item.Water,
          brake: item.Brake,
          air: item.Air,
          gas: item.Gas,
          engine: item.Engine,
          tireCondition: item.TireCondition,
          notes: item.Note || '',
          createdBy: item.CreatedBy || 'System',
        }));

        setDamageReports(transformedData);
      } catch (error) {
        console.error('Error fetching damage reports:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load damage reports. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDamageReports();
  }, []);

  const handleApplyFilters = (filterValues: Record<string, any>) => {
    setActiveFilters({
      sortBy: filterValues.sortBy || 'date_newest',
    });
  };

  useEffect(() => {
    let filtered = [...damageReports];

    // Search filter
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(record =>
        record.bus_no.toLowerCase().includes(lower) ||
        record.notes.toLowerCase().includes(lower) ||
        record.DamageReportID.toLowerCase().includes(lower)
      );
    }

    // Sorting
    switch (activeFilters.sortBy) {
      case 'date_newest':
        filtered.sort((a, b) => new Date(b.check_date).getTime() - new Date(a.check_date).getTime());
        break;
      case 'date_oldest':
        filtered.sort((a, b) => new Date(a.check_date).getTime() - new Date(b.check_date).getTime());
        break;
      case 'bus_asc':
        filtered.sort((a, b) => a.bus_no.localeCompare(b.bus_no));
        break;
      case 'bus_desc':
        filtered.sort((a, b) => b.bus_no.localeCompare(a.bus_no));
        break;
      default:
        break;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedData(filtered.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filtered.length / pageSize));
  }, [damageReports, searchQuery, activeFilters, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getDamageItems = (record: DamageReport) => {
    const damaged = [];
    if (!record.battery) damaged.push('Battery');
    if (!record.lights) damaged.push('Lights');
    if (!record.oil) damaged.push('Oil');
    if (!record.water) damaged.push('Water');
    if (!record.brake) damaged.push('Brake');
    if (!record.air) damaged.push('Air');
    if (!record.gas) damaged.push('Gas');
    if (!record.engine) damaged.push('Engine');
    if (!record.tireCondition) damaged.push('Tire Condition');
    
    return damaged.length > 0 ? damaged.join(', ') : 'No damage reported';
  };

  const handleAccept = async (damageReportId: string) => {
    const result = await Swal.fire({
      title: 'Accept Damage Report?',
      text: 'Are you sure you want to accept this damage report?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Accept',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        // TODO: Implement accept API endpoint
        await Swal.fire({
          icon: 'success',
          title: 'Accepted',
          text: 'Damage report has been accepted.',
          timer: 2000,
          showConfirmButton: false
        });
        // Refresh data after acceptance
        // You may want to refetch the data here
      } catch (error) {
        console.error('Error accepting damage report:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to accept damage report. Please try again.',
        });
      }
    }
  };

  const handleReject = async (damageReportId: string) => {
    const result = await Swal.fire({
      title: 'Reject Damage Report?',
      text: 'This will permanently delete the damage report. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${DAMAGE_REPORTS_URL}?damageReportId=${damageReportId}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to delete damage report');
        }

        await Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'Damage report has been deleted.',
          timer: 2000,
          showConfirmButton: false
        });

        // Refresh the data by removing the deleted report from state
        setDamageReports(prevReports => 
          prevReports.filter(report => report.DamageReportID !== damageReportId)
        );
      } catch (error) {
        console.error('Error deleting damage report:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete damage report. Please try again.',
        });
      }
    }
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        <h2 className={styles.stopTitle}>Damage Reports</h2>

        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <i className="ri-search-2-line"></i>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search damage reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <FilterDropdown
            sections={filterSections}
            onApply={handleApplyFilters}
          />
        </div>

        <p className={styles.description}>
          View all damage reports from bus inspections.
        </p>

        {loading ? (
          <div style={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loading />
          </div>
        ) : (
          <div className={styles.styledTableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Bus No.</th>
                  <th>Check Date</th>
                  <th>Damaged Items</th>
                  <th>Notes</th>
                  <th>Reported By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.length > 0 ? (
                  displayedData.map((record) => (
                    <tr key={record.id}>
                      <td>{record.DamageReportID}</td>
                      <td>{record.bus_no}</td>
                      <td>{new Date(record.check_date).toLocaleDateString()}</td>
                      <td>
                        <span className={getDamageItems(record) === 'No damage reported' ? styles.noDamage : styles.hasDamage}>
                          {getDamageItems(record)}
                        </span>
                      </td>
                      <td>{record.notes || '—'}</td>
                      <td>{record.createdBy}</td>
                      <td>
                        <div className={styles.actionButtons}>
                          <button 
                            className={styles.acceptBtn}
                            onClick={() => handleAccept(record.DamageReportID)}
                            title="Accept Report"
                          >
                            Accept
                          </button>
                          <button 
                            className={styles.rejectBtn}
                            onClick={() => handleReject(record.DamageReportID)}
                            title="Reject Report"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className={styles.noRecords}>
                      No damage reports found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={(size: number) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default DamageReportsPage;
