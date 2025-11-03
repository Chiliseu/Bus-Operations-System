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

interface MaintenanceRecord {
  id: number;
  work_no?: string;
  work_title?: string;
  bus_no: string;
  priority?: string;
  start_date?: string;
  due_date?: string;
  status?: string;
  damageReport?: {
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
  };
  reportedBy?: string;
  workRemarks?: string;
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
  

  // Hardcoded sample data with damage reports
  const sampleData: MaintenanceRecord[] = [
    {
      id: 1,
      work_no: 'WRK-001',
      work_title: 'Engine Oil Change',
      bus_no: 'BUS-101',
      priority: 'High',
      start_date: '2024-11-01',
      due_date: '2024-11-05',
      status: 'Completed',
      damageReport: {
        battery: true,
        lights: true,
        oil: false,
        water: true,
        brake: true,
        air: true,
        gas: true,
        engine: false,
        tireCondition: true,
        notes: 'Engine oil level low, needs immediate change'
      },
      reportedBy: 'John Doe',
      workRemarks: 'Regular maintenance checkup'
    },
    {
      id: 2,
      work_no: 'WRK-002',
      work_title: 'Brake Inspection',
      bus_no: 'BUS-102',
      priority: 'High',
      start_date: '2024-11-02',
      due_date: '2024-11-06',
      status: 'In Progress',
      damageReport: {
        battery: true,
        lights: true,
        oil: true,
        water: true,
        brake: false,
        air: true,
        gas: true,
        engine: true,
        tireCondition: true,
        notes: 'Brake pads worn out, squeaking noise when braking'
      },
      reportedBy: 'Jane Smith',
      workRemarks: 'Replace brake pads and inspect brake system'
    },
    {
      id: 3,
      bus_no: 'BUS-103',
      status: 'Pending',
      damageReport: {
        battery: true,
        lights: true,
        oil: true,
        water: true,
        brake: false,
        air: true,
        gas: true,
        engine: false,
        tireCondition: false,
        notes: 'Engine making knocking noise; tire worn out'
      }
    },
    {
      id: 4,
      bus_no: 'BUS-104',
      status: 'Pending',
      damageReport: {
        battery: false,
        lights: true,
        oil: true,
        water: true,
        brake: true,
        air: false,
        gas: true,
        engine: true,
        tireCondition: true,
        notes: 'Battery dead, AC not working properly'
      }
    },
    {
      id: 5,
      work_no: 'WRK-005',
      work_title: 'Battery Replacement',
      bus_no: 'BUS-105',
      priority: 'High',
      start_date: '2024-11-05',
      due_date: '2024-11-08',
      status: 'In Progress',
      damageReport: {
        battery: false,
        lights: true,
        oil: true,
        water: true,
        brake: true,
        air: true,
        gas: true,
        engine: true,
        tireCondition: true,
        notes: 'Battery not holding charge, needs replacement'
      },
      reportedBy: 'Mike Johnson',
      workRemarks: 'Replace battery and check alternator'
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setMaintenanceData(sampleData);
      setLoading(false);
    }, 500);
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
    reportedBy: string;
    startDate: string;
    dueDate: string;
  }) => {
    try {
      setLoadingModal(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update the record with new work details
      const updatedData = maintenanceData.map(record => {
        if (record.id === selectedRecord?.id) {
          return {
            ...record,
            work_no: data.workNo,
            work_title: data.workTitle,
            workRemarks: data.workRemarks,
            priority: data.priority,
            reportedBy: data.reportedBy,
            start_date: data.startDate,
            due_date: data.dueDate,
            status: record.status === 'Completed' ? 'Completed' : 'Pending'
          };
        }
        return record;
      });

      setMaintenanceData(updatedData);
      setLoadingModal(false);

      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: isUpdateMode ? 'Work order updated successfully!' : 'Work order created successfully!',
      });

      setShowAddWorkModal(false);
      setSelectedRecord(null);
      setIsUpdateMode(false);
    } catch (error) {
      setLoadingModal(false);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save work details. Please try again.',
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
              reportedBy: selectedRecord.reportedBy || '',
              startDate: selectedRecord.start_date || '',
              dueDate: selectedRecord.due_date || ''
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