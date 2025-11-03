'use client';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './task-management.module.css';
import '../../../../styles/globals.css';
import ViewTasksModal from '@/components/modal/View-Task-Modal/ViewTasksModal';

// --- Shared imports ---
import { Loading, FilterDropdown, PaginationComponent, Swal, LoadingModal } from '@/shared/imports';
import type { FilterSection } from '@/shared/imports';

interface Task {
  id: number;
  task_no: string;
  task_name: string;
  task_type: 'General' | 'Repair';
  assignee: string;
  status: 'Pending' | 'In Progress' | 'Done';
}

interface WorkOrder {
  id: number;
  work_no: string;
  work_title: string;
  bus_no: string;
  priority: string;
  overall_status: 'Pending' | 'In Progress' | 'Done';
  tasks: Task[];
}

const TaskManagementPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [workOrderData, setWorkOrderData] = useState<WorkOrder[]>([]);
  const [displayedData, setDisplayedData] = useState<WorkOrder[]>([]);
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
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);

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

  // Sample data with work orders and tasks
  const sampleData: WorkOrder[] = [
    {
      id: 1,
      work_no: 'WRK-001',
      work_title: 'Engine Oil Change',
      bus_no: 'BUS-101',
      priority: 'High',
      overall_status: 'Done',
      tasks: [
        {
          id: 1,
          task_no: 'TSK-001-1',
          task_name: 'Drain old engine oil',
          task_type: 'General',
          assignee: 'John Mechanic',
          status: 'Done'
        },
        {
          id: 2,
          task_no: 'TSK-001-2',
          task_name: 'Replace oil filter',
          task_type: 'Repair',
          assignee: 'John Mechanic',
          status: 'Done'
        },
        {
          id: 3,
          task_no: 'TSK-001-3',
          task_name: 'Add new engine oil',
          task_type: 'General',
          assignee: 'John Mechanic',
          status: 'Done'
        }
      ]
    },
    {
      id: 2,
      work_no: 'WRK-002',
      work_title: 'Brake Inspection',
      bus_no: 'BUS-102',
      priority: 'High',
      overall_status: 'In Progress',
      tasks: [
        {
          id: 4,
          task_no: 'TSK-002-1',
          task_name: 'Inspect brake pads',
          task_type: 'General',
          assignee: 'Jane Smith',
          status: 'Done'
        },
        {
          id: 5,
          task_no: 'TSK-002-2',
          task_name: 'Replace worn brake pads',
          task_type: 'Repair',
          assignee: 'Jane Smith',
          status: 'In Progress'
        },
        {
          id: 6,
          task_no: 'TSK-002-3',
          task_name: 'Test brake system',
          task_type: 'General',
          assignee: 'Jane Smith',
          status: 'Pending'
        }
      ]
    },
    {
      id: 3,
      work_no: 'WRK-005',
      work_title: 'Battery Replacement',
      bus_no: 'BUS-105',
      priority: 'High',
      overall_status: 'In Progress',
      tasks: [
        {
          id: 7,
          task_no: 'TSK-005-1',
          task_name: 'Remove old battery',
          task_type: 'General',
          assignee: 'Mike Johnson',
          status: 'Done'
        },
        {
          id: 8,
          task_no: 'TSK-005-2',
          task_name: 'Install new battery',
          task_type: 'Repair',
          assignee: 'Mike Johnson',
          status: 'In Progress'
        },
        {
          id: 9,
          task_no: 'TSK-005-3',
          task_name: 'Check alternator',
          task_type: 'General',
          assignee: 'Mike Johnson',
          status: 'Pending'
        }
      ]
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWorkOrderData(sampleData);
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
    let filtered = [...workOrderData];

    // Search filter
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(order =>
        order.work_no.toLowerCase().includes(lower) ||
        order.work_title.toLowerCase().includes(lower) ||
        order.bus_no.toLowerCase().includes(lower) ||
        order.priority.toLowerCase().includes(lower) ||
        order.overall_status.toLowerCase().includes(lower)
      );
    }

    // Priority filter
    if (activeFilters.priorityFilter) {
      filtered = filtered.filter(order => order.priority === activeFilters.priorityFilter);
    }

    // Status filter
    if (activeFilters.statusFilter) {
      filtered = filtered.filter(order => order.overall_status === activeFilters.statusFilter);
    }

    // Sorting
    switch (activeFilters.sortBy) {
      case 'work_no_asc':
        filtered.sort((a, b) => a.work_no.localeCompare(b.work_no));
        break;
      case 'work_no_desc':
        filtered.sort((a, b) => b.work_no.localeCompare(a.work_no));
        break;
      case 'work_title_asc':
        filtered.sort((a, b) => a.work_title.localeCompare(b.work_title));
        break;
      case 'work_title_desc':
        filtered.sort((a, b) => b.work_title.localeCompare(a.work_title));
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
  }, [workOrderData, searchQuery, activeFilters, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewTasks = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setShowViewTasksModal(true);
  };

  const handleUpdateTasks = async (updatedTasks: Task[]) => {
    try {
      setLoadingModal(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if all tasks are done
      const allTasksDone = updatedTasks.every(task => task.status === 'Done');
      const newOverallStatus: 'Pending' | 'In Progress' | 'Done' = allTasksDone 
        ? 'Done' 
        : updatedTasks.some(task => task.status === 'In Progress') 
        ? 'In Progress' 
        : 'Pending';

      // Update work order with new tasks and status
      const updatedData = workOrderData.map(order => {
        if (order.id === selectedWorkOrder?.id) {
          return {
            ...order,
            tasks: updatedTasks,
            overall_status: newOverallStatus
          };
        }
        return order;
      });

      setWorkOrderData(updatedData);
      setLoadingModal(false);

      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: allTasksDone 
          ? 'All tasks completed! Work order marked as Done.' 
          : 'Tasks updated successfully!',
      });

      setShowViewTasksModal(false);
      setSelectedWorkOrder(null);
    } catch (error) {
      setLoadingModal(false);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update tasks. Please try again.',
      });
    }
  };

  const handleAddTask = async (newTask: Omit<Task, 'id' | 'task_no'>) => {
    if (!selectedWorkOrder) return;

    try {
      setLoadingModal(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate new task number
      const taskCount = selectedWorkOrder.tasks.length + 1;
      const newTaskNo = `${selectedWorkOrder.work_no.replace('WRK', 'TSK')}-${taskCount}`;

      const taskToAdd: Task = {
        id: Date.now(), // Temporary ID generation
        task_no: newTaskNo,
        ...newTask
      };

      // Update work order with new task
      const updatedTasks = [...selectedWorkOrder.tasks, taskToAdd];
      
      // Update overall status based on new tasks
      const allTasksDone = updatedTasks.every(task => task.status === 'Done');
      const newOverallStatus: 'Pending' | 'In Progress' | 'Done' = allTasksDone 
        ? 'Done' 
        : updatedTasks.some(task => task.status === 'In Progress') 
        ? 'In Progress' 
        : 'Pending';

      const updatedData = workOrderData.map(order => {
        if (order.id === selectedWorkOrder.id) {
          return {
            ...order,
            tasks: updatedTasks,
            overall_status: newOverallStatus
          };
        }
        return order;
      });

      setWorkOrderData(updatedData);
      setSelectedWorkOrder({
        ...selectedWorkOrder,
        tasks: updatedTasks,
        overall_status: newOverallStatus
      });
      setLoadingModal(false);

      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Task added successfully!',
      });
    } catch (error) {
      setLoadingModal(false);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add task. Please try again.',
      });
    }
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
                  <th>Overall Status</th>
                  <th className={styles.centeredColumn}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.length > 0 ? (
                  displayedData.map((order) => (
                    <tr key={order.id}>
                      <td>{order.work_no}</td>
                      <td>{order.work_title}</td>
                      <td>{order.bus_no}</td>
                      <td>
                        <span
                          className={
                            order.priority === 'High' || order.priority === 'Emergency'
                              ? styles.priorityHigh
                              : order.priority === 'Medium'
                              ? styles.priorityMedium
                              : styles.priorityLow
                          }
                        >
                          {order.priority}
                        </span>
                      </td>
                      <td>
                        <span
                          className={
                            order.overall_status === 'Done'
                              ? styles.statusDone
                              : order.overall_status === 'In Progress'
                              ? styles.statusInProgress
                              : styles.statusPending
                          }
                        >
                          {order.overall_status}
                        </span>
                      </td>
                      <td className={styles.centeredColumn}>
                        <button
                          className={`${styles.actionBtn} ${styles.viewTasksBtn}`}
                          onClick={() => handleViewTasks(order)}
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

        {/* View Tasks Modal */}
        {selectedWorkOrder && (
          <ViewTasksModal
            show={showViewTasksModal}
            onClose={() => {
              setShowViewTasksModal(false);
              setSelectedWorkOrder(null);
            }}
            workOrder={selectedWorkOrder}
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