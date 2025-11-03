'use client';

import React, { useState, useEffect } from 'react';
import styles from './view-task-modal.module.css';

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
    task_type: 'General' as 'General' | 'Repair',
    assignee: '',
    status: 'Pending' as 'Pending' | 'In Progress' | 'Done'
  });
  const [saving, setSaving] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString('en-US', { hour12: true })
  );

  useEffect(() => {
    if (show) {
      setTasks([...workOrder.tasks]);
      setShowAddTaskForm(false);
      setNewTask({
        task_name: '',
        task_type: 'General',
        assignee: '',
        status: 'Pending'
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

  const handleTaskStatusChange = (taskId: number, newStatus: 'Pending' | 'In Progress' | 'Done') => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
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

  const handleAddNewTask = async () => {
    if (!newTask.task_name.trim() || !newTask.assignee.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      await onAddTask(newTask);
      setShowAddTaskForm(false);
      setNewTask({
        task_name: '',
        task_type: 'General',
        assignee: '',
        status: 'Pending'
      });
    } finally {
      setSaving(false);
    }
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
                      placeholder="e.g., Replace tire"
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
                      onChange={(e) => setNewTask({ ...newTask, task_type: e.target.value as 'General' | 'Repair' })}
                      disabled={saving}
                    >
                      <option value="General">General</option>
                      <option value="Repair">Repair</option>
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
                    <label className={styles.label}>Status <span className={styles.required}>*</span></label>
                    <select
                      className={styles.select}
                      value={newTask.status}
                      onChange={(e) => setNewTask({ ...newTask, status: e.target.value as 'Pending' | 'In Progress' | 'Done' })}
                      disabled={saving}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                </div>

                <button
                  className={styles.submitTaskBtn}
                  onClick={handleAddNewTask}
                  disabled={saving}
                >
                  {saving ? 'Adding...' : 'Add Task'}
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
                  </tr>
                </thead>
                <tbody>
                  {tasks.length > 0 ? (
                    tasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.task_no}</td>
                        <td>{task.task_name}</td>
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
                            onChange={(e) => handleTaskStatusChange(task.id, e.target.value as 'Pending' | 'In Progress' | 'Done')}
                            disabled={saving}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className={styles.noTasks}>
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