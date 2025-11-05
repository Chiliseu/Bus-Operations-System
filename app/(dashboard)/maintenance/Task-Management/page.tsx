'use client';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './task-management.module.css';
import '../../../../styles/globals.css';
import ViewTasksModal from '@/components/modal/View-Task-Modal/ViewTasksModal';

// --- Shared imports ---
import { Loading, FilterDropdown, PaginationComponent, Swal, LoadingModal } from '@/shared/imports';
import type { FilterSection } from '@/shared/imports';

const BASE_URL = process.env.NEXT_PUBLIC_Backend_BaseURL?.replace(/['"]/g, "");
const MAINTENANCE_WORK_URL = `${BASE_URL}/api/maintenance-work`;
const TASKS_URL = `${BASE_URL}/api/tasks`;

interface MaintenanceRecord {
  id: string;
  work_no?: string;
  work_title?: string;
  bus_no: string;
  priority?: string;
  start_date?: string;
  due_date?: string;
  status?: string;
  assignedTo?: string;
  workRemarks?: string;
  estimatedCost?: number;
  actualCost?: number;
}

const TaskManagementPage: React.FC = () => {
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
  const [showViewTasksModal, setShowViewTasksModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MaintenanceRecord | null>(null);

  const filterSections: FilterSection[] = [
    {
      id: 'sortBy',
      title: 'Sort By',
      type: 'radio',
      options: [
        { id: 'work_no_asc', label: 'Work No. (A-Z)' },
        { id: 'work_no_desc', label: 'Work No. (Z-A)' },
        { id: 'work_title_asc', label: 'Work Title (A-Z)' },
        { id: 'work_title_desc', label: 'Work Title (Z-A)' },
        { id: 'bus_no_asc', label: 'Bus No. (A-Z)' },
        { id: 'bus_no_desc', label: 'Bus No. (Z-A)' }
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
      title: 'Overall Status',
      type: 'radio',
      options: [
        { id: 'Pending', label: 'Pending' },
        { id: 'In Progress', label: 'In Progress' },
        { id: 'Done', label: 'Done' }
      ]
    }
  ];

  // Fetch maintenance works function
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
      const transformedData: MaintenanceRecord[] = data.map((item: any) => ({
        id: item.MaintenanceWorkID,
        work_no: item.WorkNo,
        work_title: item.WorkTitle || '',
        bus_no: item.BusID,
        priority: item.Priority,
        start_date: item.ScheduledDate || item.CreatedAt,
        due_date: item.DueDate || '',
        status: item.Status,
        assignedTo: item.AssignedTo || '',
        workRemarks: item.WorkNotes || '',
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
        record.status?.toLowerCase().includes(lower) ||
        record.assignedTo?.toLowerCase().includes(lower)
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
      case 'work_title_asc':
        filtered.sort((a, b) => (a.work_title || '').localeCompare(b.work_title || ''));
        break;
      case 'work_title_desc':
        filtered.sort((a, b) => (b.work_title || '').localeCompare(a.work_title || ''));
        break;
      case 'bus_no_asc':
        filtered.sort((a, b) => a.bus_no.localeCompare(b.bus_no));
        break;
      case 'bus_no_desc':
        filtered.sort((a, b) => b.bus_no.localeCompare(a.bus_no));
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

  const handleViewTasks = async (record: MaintenanceRecord) => {
    setSelectedRecord(record);
    setShowViewTasksModal(true);
  };

  const handleUpdateTasks = async (tasks: any[]) => {
    if (!selectedRecord) return;

    try {
      setLoadingModal(true);

      // Separate new tasks from existing tasks
      const newTasks = tasks.filter(task => task.isNew);
      const existingTasks = tasks.filter(task => !task.isNew && task.id);

      console.log('Selected Record ID:', selectedRecord.id);
      console.log('New tasks to create:', newTasks);
      console.log('Existing tasks to update:', existingTasks);

      // Create new tasks in batch
      if (newTasks.length > 0) {
        const tasksToCreate = newTasks.map(task => ({
          taskName: task.task_name,
          taskType: task.task_type,
          taskDescription: task.task_description,
          assignee: task.assignee,
          status: task.status,
          priority: task.priority,
          estimatedHours: task.estimated_hours
        }));

        console.log('Creating tasks with payload:', {
          maintenanceWorkId: selectedRecord.id,
          tasks: tasksToCreate
        });

        const createResponse = await fetch(TASKS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            maintenanceWorkId: selectedRecord.id,
            tasks: tasksToCreate
          }),
        });

        console.log('Create response status:', createResponse.status);
        
        if (!createResponse.ok) {
          const errorData = await createResponse.json();
          console.error('Create error response:', errorData);
          throw new Error(errorData.error || 'Failed to create tasks');
        }

        const createResult = await createResponse.json();
        console.log('Tasks created successfully:', createResult);
      }

      // Update existing tasks
      for (const task of existingTasks) {
        const updateResponse = await fetch(`${TASKS_URL}?taskId=${task.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            taskName: task.task_name,
            taskType: task.task_type,
            taskDescription: task.task_description,
            assignedTo: task.assignee,
            status: task.status,
            priority: task.priority,
            estimatedHours: task.estimated_hours
          }),
        });

        if (!updateResponse.ok) {
          throw new Error(`Failed to update task ${task.id}`);
        }
      }

      // Refresh maintenance data
      await fetchMaintenanceWorks();

      setLoadingModal(false);

      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Tasks saved successfully!',
      });

      setShowViewTasksModal(false);
      setSelectedRecord(null);
    } catch (error) {
      setLoadingModal(false);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to save tasks. Please try again.',
      });
    }
  };

  const handleAddTask = async (task: any) => {
    // This is called when adding a single task immediately
    // For now, we'll just return as we're using batch save
    console.log('Add task called:', task);
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        <h2 className={styles.pageTitle}>Task Management</h2>

        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <i className="ri-search-2-line"></i>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search work orders..."
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
          Manage tasks for maintenance work orders.
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
                  <th>Assigned To</th>
                  <th>Status</th>
                  <th className={styles.centeredColumn}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.length > 0 ? (
                  displayedData.map((record) => (
                    <tr key={record.id}>
                      <td>{record.work_no || '—'}</td>
                      <td>{record.work_title || '—'}</td>
                      <td>{record.bus_no}</td>
                      <td>
                        {record.priority ? (
                          <span
                            className={
                              record.priority === 'High' || record.priority === 'Critical'
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
                      <td>{record.assignedTo || '—'}</td>
                      <td>
                        <span
                          className={
                            record.status === 'Completed'
                              ? styles.statusDone
                              : record.status === 'InProgress'
                              ? styles.statusInProgress
                              : styles.statusPending
                          }
                        >
                          {record.status === 'InProgress' ? 'In Progress' : record.status || 'Pending'}
                        </span>
                      </td>
                      <td className={styles.centeredColumn}>
                        <button
                          className={`${styles.actionBtn} ${styles.viewTasksBtn}`}
                          onClick={() => handleViewTasks(record)}
                          title="View Tasks"
                        >
                          View Tasks
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className={styles.noRecords}>
                      No work orders found.
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

        {/* View Tasks Modal - Fully functional */}
        {selectedRecord && (
          <ViewTasksModal
            show={showViewTasksModal}
            onClose={() => {
              setShowViewTasksModal(false);
              setSelectedRecord(null);
            }}
            workOrder={{
              id: parseInt(selectedRecord.id) || 0,
              work_no: selectedRecord.work_no || '',
              work_title: selectedRecord.work_title || '',
              bus_no: selectedRecord.bus_no,
              priority: selectedRecord.priority || 'Medium',
              overall_status: selectedRecord.status === 'InProgress' ? 'In Progress' : (selectedRecord.status === 'Completed' ? 'Done' : 'Pending'),
              tasks: [], // Tasks will be fetched in the modal
              maintenanceWorkId: selectedRecord.id // Pass the actual ID
            }}
            onUpdateTasks={handleUpdateTasks}
            onAddTask={handleAddTask}
          />
        )}

        {loadingModal && <LoadingModal />}
      </div>
    </div>
  );
};

export default TaskManagementPage;