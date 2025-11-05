'use client';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './add-work-details.module.css';
import '../../../../styles/globals.css';
import AddWorkDetailsModal from '@/components/modal/Add-Work-Details-Modal/AddWorkDetailsModal';
import ViewWorkDetailsModal from '@/components/modal/View-Work-Details-Modal/ViewWorkDetailsModal';

// --- Shared imports ---
import { Loading, FilterDropdown, PaginationComponent, Swal, LoadingModal } from '@/shared/imports';
import type { FilterSection } from '@/shared/imports';

const BASE_URL = process.env.NEXT_PUBLIC_Backend_BaseURL?.replace(/['"]/g, "");
const MAINTENANCE_WORK_URL = `${BASE_URL}/api/maintenance-work`;

interface MaintenanceRecord {
  id: string; // Changed to string to match MaintenanceWorkID
  work_no?: string;
  work_title?: string;
  bus_no: string;
  priority?: string;
  start_date?: string;
  due_date?: string;
  status?: string;
  damageReport?: {
    damageReportId: string;
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
    checkDate: string;
    reportedBy: string;
  };
  reportedBy?: string;
  workRemarks?: string;
  assignedTo?: string;
  estimatedCost?: number;
  actualCost?: number;
}

const MaintenancePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceRecord[]>([]);
  const [displayedData, setDisplayedData] = useState<MaintenanceRecord[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    sortBy: string;
    priorityFilter?: string;
    statusFilter?: string;
  }>({
    sortBy: 'work_no_asc'
  });

  // Modal states
  const [showAddWorkModal, setShowAddWorkModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MaintenanceRecord | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewRecord, setViewRecord] = useState<MaintenanceRecord | null>(null);

  const filterSections: FilterSection[] = [
    {
      id: 'sortBy',
      title: 'Sort By',
      type: 'radio',
      options: [
        { id: 'work_no_asc', label: 'Work No. (A-Z)' },
        { id: 'work_no_desc', label: 'Work No. (Z-A)' },
        { id: 'bus_no_asc', label: 'Bus No. (A-Z)' },
        { id: 'bus_no_desc', label: 'Bus No. (Z-A)' },
        { id: 'start_date_newest', label: 'Start Date (Newest First)' },
        { id: 'start_date_oldest', label: 'Start Date (Oldest First)' },
        { id: 'due_date_nearest', label: 'Due Date (Nearest First)' },
        { id: 'due_date_farthest', label: 'Due Date (Farthest First)' }
      ],
      defaultValue: 'work_no_asc'
    },
    {
      id: 'priorityFilter',
      title: 'Priority',
      type: 'radio',
      options: [
        { id: 'High', label: 'High' },
        { id: 'Medium', label: 'Medium' },
        { id: 'Low', label: 'Low' },
        { id: 'Emergency', label: 'Emergency' }
      ]
    },
    {
      id: 'statusFilter',
      title: 'Status',
      type: 'radio',
      options: [
        { id: 'Pending', label: 'Pending' },
        { id: 'In Progress', label: 'In Progress' },
        { id: 'Completed', label: 'Completed' }
      ]
    }
  ];
  
  // Fetch maintenance works function (moved outside useEffect for reusability)
  const fetchMaintenanceWorks = async () => {
    setLoading(true);
    try {
      const response = await fetch(MAINTENANCE_WORK_URL, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch maintenance works');
      }

      const data = await response.json();

      // Transform API data to match frontend interface
      const transformedData: MaintenanceRecord[] = data.map((item: any, index: number) => ({
        id: item.MaintenanceWorkID, // Use actual ID instead of index
        work_no: item.WorkNo,
        work_title: item.WorkTitle || '', // New field from schema
        bus_no: item.BusID,
        priority: item.Priority,
        start_date: item.ScheduledDate || item.CreatedAt,
        due_date: item.DueDate || '', // New field from schema
        status: item.Status,
        damageReport: {
          damageReportId: item.DamageReport.DamageReportID,
          battery: item.DamageReport.Battery,
          lights: item.DamageReport.Lights,
          oil: item.DamageReport.Oil,
          water: item.DamageReport.Water,
          brake: item.DamageReport.Brake,
          air: item.DamageReport.Air,
          gas: item.DamageReport.Gas,
          engine: item.DamageReport.Engine,
          tireCondition: item.DamageReport.TireCondition,
          notes: item.DamageReport.Note || '',
          checkDate: item.DamageReport.CheckDate,
          reportedBy: item.DamageReport.CreatedBy || 'System'
        },
        reportedBy: item.DamageReport.CreatedBy || 'System',
        workRemarks: item.WorkNotes || '',
        assignedTo: item.AssignedTo || '',
        estimatedCost: item.EstimatedCost,
        actualCost: item.ActualCost
      }));

      setMaintenanceData(transformedData);
    } catch (error) {
      console.error('Error fetching maintenance works:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load maintenance works. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaintenanceWorks();
  }, []);

  const handleApplyFilters = (filterValues: Record<string, any>) => {
    setActiveFilters({
      sortBy: filterValues.sortBy || 'work_no_asc',
      priorityFilter: filterValues.priorityFilter,
      statusFilter: filterValues.statusFilter
    });
  };

  useEffect(() => {
    let filtered = [...maintenanceData];

    // Search filter
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(record =>
        record.work_no?.toLowerCase().includes(lower) ||
        record.work_title?.toLowerCase().includes(lower) ||
        record.bus_no.toLowerCase().includes(lower) ||
        record.priority?.toLowerCase().includes(lower) ||
        record.status?.toLowerCase().includes(lower)
      );
    }

    // Priority filter
    if (activeFilters.priorityFilter) {
      filtered = filtered.filter(record => record.priority === activeFilters.priorityFilter);
    }

    // Status filter
    if (activeFilters.statusFilter) {
      filtered = filtered.filter(record => record.status === activeFilters.statusFilter);
    }

    // Sorting
    switch (activeFilters.sortBy) {
      case 'work_no_asc':
        filtered.sort((a, b) => (a.work_no || '').localeCompare(b.work_no || ''));
        break;
      case 'work_no_desc':
        filtered.sort((a, b) => (b.work_no || '').localeCompare(a.work_no || ''));
        break;
      case 'bus_no_asc':
        filtered.sort((a, b) => a.bus_no.localeCompare(b.bus_no));
        break;
      case 'bus_no_desc':
        filtered.sort((a, b) => b.bus_no.localeCompare(a.bus_no));
        break;
      case 'start_date_newest':
        filtered.sort((a, b) => new Date(b.start_date || 0).getTime() - new Date(a.start_date || 0).getTime());
        break;
      case 'start_date_oldest':
        filtered.sort((a, b) => new Date(a.start_date || 0).getTime() - new Date(b.start_date || 0).getTime());
        break;
      case 'due_date_nearest':
        filtered.sort((a, b) => new Date(a.due_date || 0).getTime() - new Date(b.due_date || 0).getTime());
        break;
      case 'due_date_farthest':
        filtered.sort((a, b) => new Date(b.due_date || 0).getTime() - new Date(a.due_date || 0).getTime());
        break;
      default:
        break;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedData(filtered.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filtered.length / pageSize));
  }, [maintenanceData, searchQuery, activeFilters, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddWorkDetails = (record: MaintenanceRecord) => {
    setSelectedRecord(record);
    setIsUpdateMode(false);
    setShowAddWorkModal(true);
  };

  const handleUpdateWorkDetails = (record: MaintenanceRecord) => {
    setSelectedRecord(record);
    setIsUpdateMode(true);
    setShowAddWorkModal(true);
  };

  const handleViewDetails = (record: MaintenanceRecord) => {
  setViewRecord(record);
  setShowViewModal(true);
  };


  const handleSaveWorkDetails = async (data: {
    workNo: string;
    workTitle: string;
    workRemarks: string;
    priority: string;
    startDate: string;
    dueDate: string;
    assignedTo: string;
  }) => {
    try {
      setLoadingModal(true);

      if (!selectedRecord) {
        throw new Error('No record selected');
      }

      // Call the backend API to update maintenance work
      const response = await fetch(
        `${MAINTENANCE_WORK_URL}?maintenanceWorkId=${selectedRecord.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Use cookies for authentication
          body: JSON.stringify({
            workTitle: data.workTitle,
            priority: data.priority,
            scheduledDate: data.startDate,
            dueDate: data.dueDate,
            workNotes: data.workRemarks,
            assignedTo: data.assignedTo,
            status: 'InProgress', // Update status when work details are added
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save work details');
      }

      // Refresh the data from the backend
      await fetchMaintenanceWorks();

      setLoadingModal(false);

      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: isUpdateMode ? 'Work order updated successfully!' : 'Work details added successfully!',
      });

      setShowAddWorkModal(false);
      setSelectedRecord(null);
      setIsUpdateMode(false);
    } catch (error) {
      setLoadingModal(false);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to save work details. Please try again.',
      });
    }
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        <h2 className={styles.stopTitle}>Maintenance Work Details</h2>

        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <i className="ri-search-2-line"></i>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search maintenance records..."
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
          Manage and track maintenance work details for all buses.
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
                  <th>Work No.</th>
                  <th>Work Title</th>
                  <th>Bus No.</th>
                  <th>Priority</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th className={styles.centeredColumn}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.length > 0 ? (
                  displayedData.map((record) => (
                    <tr key={record.id}>
                      <td>{record.work_no || '-'}</td>
                      <td>{record.work_title || '—'}</td>
                      <td>{record.bus_no}</td>
                      <td>
                        {record.priority ? (
                          <span
                            className={
                              record.priority === 'High' || record.priority === 'Emergency'
                                ? styles.priorityHigh
                                : record.priority === 'Medium'
                                ? styles.priorityMedium
                                : styles.priorityLow
                            }
                          >
                            {record.priority}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>{record.start_date ? new Date(record.start_date).toLocaleDateString() : '—'}</td>
                      <td>{record.due_date ? new Date(record.due_date).toLocaleDateString() : '—'}</td>
                      <td>
                        <span
                          className={
                            record.status === 'Completed'
                              ? styles.statusCompleted
                              : record.status === 'In Progress'
                              ? styles.statusInProgress
                              : styles.statusPending
                          }
                        >
                          {record.status || 'Pending'}
                        </span>
                      </td>
                      <td className={styles.centeredColumn}>
                        <div className={styles.actionButtons}>
                          {!record.work_title ? (
                            // No work details yet - show Add button
                            <button
                              className={`${styles.actionBtn} ${styles.addBtn}`}
                              onClick={() => handleAddWorkDetails(record)}
                              title="Add Work Details"
                            >
                              Add Work Details
                            </button>
                          ) : record.status === 'Completed' ? (
                            // Completed - only show View button
                            <button
                              className={`${styles.actionBtn} ${styles.viewBtn}`}
                              onClick={() => handleViewDetails(record)}
                              title="View Details"
                            >
                              View Details
                            </button>
                          ) : (
                            // Pending or In Progress - show Update and View buttons
                            <>
                              <button
                                className={`${styles.actionBtn} ${styles.updateBtn}`}
                                onClick={() => handleUpdateWorkDetails(record)}
                                title="Update Work Details"
                              >
                                Update Work Details
                              </button>
                              <button
                                className={`${styles.actionBtn} ${styles.viewBtn}`}
                                onClick={() => handleViewDetails(record)}
                                title="View Details"
                              >
                                View Details
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className={styles.noRecords}>
                      No maintenance records found.
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

        {/* Add/Update Work Details Modal */}
        {selectedRecord && selectedRecord.damageReport && (
          <AddWorkDetailsModal
            show={showAddWorkModal}
            onClose={() => {
              setShowAddWorkModal(false);
              setSelectedRecord(null);
              setIsUpdateMode(false);
            }}
            damageReport={selectedRecord.damageReport}
            busNo={selectedRecord.bus_no}
            onSave={handleSaveWorkDetails}
            isUpdateMode={isUpdateMode}
            existingData={isUpdateMode ? {
              workNo: selectedRecord.work_no || '',
              workTitle: selectedRecord.work_title || '',
              workRemarks: selectedRecord.workRemarks || '',
              priority: selectedRecord.priority || 'Medium',
              startDate: selectedRecord.start_date || '',
              dueDate: selectedRecord.due_date || '',
              assignedTo: selectedRecord.assignedTo || ''
            } : undefined}
          />
        )}

        {/* View Work Details Modal */}
                {viewRecord && (
                  <ViewWorkDetailsModal
                    show={showViewModal}
                    onClose={() => {
                      setShowViewModal(false);
                      setViewRecord(null);
                    }}
                    record={viewRecord}
                  />
                )}

                {loadingModal && <LoadingModal />}
              </div>
            </div>
          );
        };

export default MaintenancePage;