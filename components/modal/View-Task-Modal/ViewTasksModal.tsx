'use client';

import React, { useState, useEffect } from 'react';
import styles from './view-task-modal.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_Backend_BaseURL?.replace(/['"]/g, "");
const TASKS_URL = `${BASE_URL}/api/tasks`;

interface Task {
  id?: string; // Optional because new tasks don't have IDs yet
  task_no?: string;
  task_name: string;
  task_type: string;
  task_description?: string;
  assignee: string;
  status: 'Pending' | 'InProgress' | 'Completed';
  priority?: string;
  estimated_hours?: number;
  isNew?: boolean; // Flag for newly added tasks not yet saved
}

interface WorkOrder {
  id: number;
  work_no: string;
  work_title: string;
  bus_no: string;
  priority: string;
  overall_status: 'Pending' | 'In Progress' | 'Done';
  tasks: Task[];
  maintenanceWorkId?: string; // Add this to pass the actual ID
}

interface ViewTasksModalProps {
  show: boolean;
  onClose: () => void;
  workOrder: WorkOrder;
  onUpdateTasks: (tasks: Task[]) => Promise<void>;
  onAddTask: (task: Omit<Task, 'id' | 'task_no'>) => Promise<void>;
}

const ViewTasksModal: React.FC<ViewTasksModalProps> = ({
  show,
  onClose,
  workOrder,
  onUpdateTasks,
  onAddTask
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    task_name: '',
    task_type: 'General',
    task_description: '',
    assignee: '',
    status: 'Pending' as 'Pending' | 'InProgress' | 'Completed',
    priority: '',
    estimated_hours: undefined as number | undefined
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString('en-US', { hour12: true })
  );

  // Fetch tasks when modal opens
  const fetchTasks = async () => {
    // Use maintenanceWorkId if provided, otherwise use work_no
    const maintenanceWorkId = workOrder.maintenanceWorkId || workOrder.work_no;
    
    if (!maintenanceWorkId) return;

    setLoading(true);
    try {
      const response = await fetch(`${TASKS_URL}?maintenanceWorkId=${maintenanceWorkId}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();

      // Transform API data to match frontend interface
      const transformedTasks: Task[] = data.map((task: any) => ({
        id: task.TaskID,
        task_no: task.TaskNumber,
        task_name: task.TaskName,
        task_type: task.TaskType || 'General',
        task_description: task.TaskDescription,
        assignee: task.AssignedTo || '',
        status: task.Status,
        priority: task.Priority,
        estimated_hours: task.EstimatedHours,
        isNew: false // Existing tasks from DB
      }));

      setTasks(transformedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Don't show error, just log it - user can still add tasks
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchTasks(); // Fetch tasks from API
      setShowAddTaskForm(false);
      setNewTask({
        task_name: '',
        task_type: 'General',
        task_description: '',
        assignee: '',
        status: 'Pending',
        priority: workOrder.priority || '', // Inherit from work order
        estimated_hours: undefined
      });
    }
  }, [show, workOrder]);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  const handleTaskStatusChange = (taskIndex: number, newStatus: 'Pending' | 'InProgress' | 'Completed') => {
    const updatedTasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskIndex: number) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
  };

  const handleSaveTasks = async () => {
    setSaving(true);
    try {
      await onUpdateTasks(tasks);
    } finally {
      setSaving(false);
    }
  };

  const handleAddNewTask = () => {
    if (!newTask.task_name.trim() || !newTask.assignee.trim()) {
      alert('Please fill in Task Name and Assignee');
      return;
    }

    // Generate temporary task number for display
    const taskNumber = `${workOrder.work_no}-T-${String(tasks.length + 1).padStart(3, '0')}`;

    const taskToAdd: Task = {
      task_no: taskNumber,
      task_name: newTask.task_name,
      task_type: newTask.task_type,
      task_description: newTask.task_description || undefined,
      assignee: newTask.assignee,
      status: newTask.status,
      priority: newTask.priority || undefined,
      estimated_hours: newTask.estimated_hours,
      isNew: true // Flag to indicate this task hasn't been saved to DB yet
    };

    setTasks([...tasks, taskToAdd]);
    
    // Reset form
    setNewTask({
      task_name: '',
      task_type: 'General',
      task_description: '',
      assignee: '',
      status: 'Pending',
      priority: workOrder.priority || '',
      estimated_hours: undefined
    });
    
    setShowAddTaskForm(false);
  };

  if (!show) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Manage Tasks</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close" disabled={saving}>
            ×
          </button>
        </div>

        <div className={styles.body}>
          {/* Work Order Info */}
          <div className={styles.workOrderInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Work No:</span>
              <span className={styles.infoValue}>{workOrder.work_no}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Work Title:</span>
              <span className={styles.infoValue}>{workOrder.work_title}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Bus No:</span>
              <span className={styles.infoValue}>{workOrder.bus_no}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Priority:</span>
              <span className={`${styles.infoValue} ${styles.priority}`}>{workOrder.priority}</span>
            </div>
          </div>

          <hr className={styles.divider} />

          {/* Tasks List */}
          <div className={styles.tasksSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Tasks ({tasks.length})</h3>
              <button
                className={styles.addTaskBtn}
                onClick={() => setShowAddTaskForm(!showAddTaskForm)}
                disabled={saving}
              >
                {showAddTaskForm ? '− Cancel' : '+ Add Task'}
              </button>
            </div>

            {/* Add Task Form */}
            {showAddTaskForm && (
              <div className={styles.addTaskForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Task Name <span className={styles.required}>*</span></label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="e.g., Replace brake pads"
                      value={newTask.task_name}
                      onChange={(e) => setNewTask({ ...newTask, task_name: e.target.value })}
                      disabled={saving}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Task Type <span className={styles.required}>*</span></label>
                    <select
                      className={styles.select}
                      value={newTask.task_type}
                      onChange={(e) => setNewTask({ ...newTask, task_type: e.target.value })}
                      disabled={saving}
                    >
                      <option value="General">General</option>
                      <option value="Repair">Repair</option>
                      <option value="Inspection">Inspection</option>
                      <option value="Replacement">Replacement</option>
                      <option value="Testing">Testing</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Assignee <span className={styles.required}>*</span></label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Mechanic name"
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                      disabled={saving}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Priority</label>
                    <select
                      className={styles.select}
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      disabled={saving}
                    >
                      <option value="">Same as work order</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Status</label>
                    <select
                      className={styles.select}
                      value={newTask.status}
                      onChange={(e) => setNewTask({ ...newTask, status: e.target.value as 'Pending' | 'InProgress' | 'Completed' })}
                      disabled={saving}
                    >
                      <option value="Pending">Pending</option>
                      <option value="InProgress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Estimated Hours</label>
                    <input
                      type="number"
                      className={styles.input}
                      placeholder="e.g., 2.5"
                      step="0.5"
                      min="0"
                      value={newTask.estimated_hours || ''}
                      onChange={(e) => setNewTask({ ...newTask, estimated_hours: e.target.value ? parseFloat(e.target.value) : undefined })}
                      disabled={saving}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Task Description</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Additional details about this task..."
                    value={newTask.task_description}
                    onChange={(e) => setNewTask({ ...newTask, task_description: e.target.value })}
                    rows={3}
                    disabled={saving}
                  />
                </div>

                <button
                  className={styles.submitTaskBtn}
                  onClick={handleAddNewTask}
                  disabled={saving}
                >
                  Add Task to List
                </button>
              </div>
            )}

            {/* Tasks Table */}
            <div className={styles.tasksTableWrapper}>
              <table className={styles.tasksTable}>
                <thead>
                  <tr>
                    <th>Task No.</th>
                    <th>Task Name</th>
                    <th>Type</th>
                    <th>Assignee</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                      <tr key={index} className={task.isNew ? styles.newTaskRow : ''}>
                        <td>{task.task_no || '—'}</td>
                        <td>
                          {task.task_name}
                          {task.isNew && <span className={styles.newBadge}>New</span>}
                        </td>
                        <td>
                          <span className={task.task_type === 'Repair' ? styles.typeRepair : styles.typeGeneral}>
                            {task.task_type}
                          </span>
                        </td>
                        <td>{task.assignee}</td>
                        <td>
                          <select
                            className={styles.statusSelect}
                            value={task.status}
                            onChange={(e) => handleTaskStatusChange(index, e.target.value as 'Pending' | 'InProgress' | 'Completed')}
                            disabled={saving}
                          >
                            <option value="Pending">Pending</option>
                            <option value="InProgress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleDeleteTask(index)}
                            disabled={saving}
                            title="Delete task"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className={styles.noTasks}>
                        No tasks added yet. Click &quot;Add Task&quot; to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <small className={styles.currentTime}>{currentTime}</small>
          <button
            className={styles.saveBtn}
            onClick={handleSaveTasks}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTasksModal;