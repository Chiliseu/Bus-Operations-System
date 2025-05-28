'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './route-management.module.css';
import '../../../styles/globals.css';
import { Stop } from '@/app/interface';
import Image from 'next/image';

const ITEMS_PER_PAGE = 10;

const RouteManagementPage: React.FC = () => {
  // Pagination & data states
  const [currentPage, setCurrentPage] = useState(1);
  const [stops, setStops] = useState<Stop[]>([]);
  const [displayedStops, setDisplayedStops] = useState<Stop[]>([]);
  
  // Form input states
  const [stopName, setStopName] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  
  // Filtering & sorting states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  
  // Edit mode control states
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingStopID, setEditingStopID] = useState<string | null>(null);
  
  // Loading indicator & pagination total pages
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Handle page change with bounds check
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Effect: filter, sort, and paginate stops whenever dependencies change
  useEffect(() => {
    const sortedStops = [...stops];

    if (sortOrder === 'A-Z') {
      sortedStops.sort((a, b) => a.StopName.localeCompare(b.StopName));
    } else if (sortOrder === 'Z-A') {
      sortedStops.sort((a, b) => b.StopName.localeCompare(a.StopName));
    }

    // Filter stops based on search query matching name or coordinates
    const filteredStops = sortedStops.filter((stop) =>
      stop.StopName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stop.longitude?.toString().includes(searchQuery) ||
      stop.latitude?.toString().includes(searchQuery)
    );

    // Pagination logic
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    setDisplayedStops(filteredStops.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filteredStops.length / ITEMS_PER_PAGE));

    // Reset to page 1 if current page is out of bounds after filtering
    if (currentPage > Math.ceil(filteredStops.length / ITEMS_PER_PAGE)) {
      setCurrentPage(1);
    }
  }, [currentPage, stops, searchQuery, sortOrder]);

  // Fetch stops data from API
  const fetchStops = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stops');
      if (!response.ok) {
        throw new Error(`Failed to fetch stops: ${response.statusText}`);
      }
      const data = await response.json();
      setStops(data);
    } catch (error) {
      console.error('Error fetching stops:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchStops();
  }, []);

  // Add new stop handler
  const handleAddStop = async () => {
    if (!stopName || !longitude || !latitude) {
      alert('Please fill in all fields with valid values.');
      return;
    }

    const newStop = {
      StopName: stopName,
      longitude: longitude,
      latitude: latitude,
    };

    try {
      const response = await fetch('/api/stops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStop),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        throw new Error('Failed to add stop');
      }

      alert('Stop added successfully!');
      handleClear();
      fetchStops();
    } catch (error) {
      console.error('Error adding stop:', error);
      alert('Failed to add stop. Please try again.');
    }
  };

  // Edit button handler - populate form with stop data
  const handleEdit = (stop: Stop) => {
    setIsEditMode(true);
    setEditingStopID(stop.StopID);
    setStopName(stop.StopName);
    setLongitude(stop.longitude);
    setLatitude(stop.latitude);
  };

  // Save updated stop handler
  const handleSave = async () => {
    if (!stopName || !longitude || !latitude) {
      alert('Please fill in all fields with valid values.');
      return;
    }

    const updatedStop = {
      StopID: editingStopID,
      StopName: stopName,
      longitude: longitude,
      latitude: latitude,
    };

    try {
      const response = await fetch('/api/stops', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStop),
      });

      if (!response.ok) {
        throw new Error(`Failed to update stop: ${response.statusText}`);
      }

      alert('Stop updated successfully!');
      setIsEditMode(false);
      setEditingStopID(null);
      handleClear();
      fetchStops();
    } catch (error) {
      console.error('Error updating stop:', error);
      alert('Failed to update stop. Please try again.');
    }
  };

  // Delete stop handler (soft delete with PATCH)
  const handleDelete = async (stopID: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this stop?');
    if (!confirmDelete) return;

    try {
      const response = await fetch('/api/stops', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stopID, isDeleted: true }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete stop: ${response.statusText}`);
      }

      alert('Stop deleted successfully!');
      fetchStops();
    } catch (error) {
      console.error('Error deleting stop:', error);
      alert('Failed to delete stop. Please try again.');
    }
  };

  // Clear form inputs
  const handleClear = () => {
    setStopName('');
    setLongitude('');
    setLatitude('');
  };

  return (
    <div className={`card mx-auto ${styles.wideCard}`}>
      <div className="card mx-auto w-100" style={{ maxWidth: '1700px' }}>
        <div className="card-body">

          {/* CREATE / EDIT STOP FORM */}
          <h2 className={styles.stopTitle}>
            {isEditMode ? 'EDIT STOP' : 'CREATE STOP'}
          </h2>

          <div className="row g-3 mb-4">
            {/* Stop Name Input */}
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Stop Name"
                value={stopName}
                onChange={(e) => setStopName(e.target.value)}
              />
            </div>

            {/* Longitude Input */}
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>

            {/* Latitude Input */}
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
          </div>

          {/* STOPS TABLE & CONTROLS */}
          <h2 className="card-title mb-3">Stops</h2>

          {/* Search, Sort, and Action Buttons */}
          <div className="row g-2 align-items-center mb-3">
            {/* Search Box */}
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort Order Select */}
            <div className="col-md-3">
              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="A-Z">Name: A-Z</option>
                <option value="Z-A">Name: Z-A</option>
              </select>
            </div>

            {/* Buttons: Clear, Add/Save, Cancel, Print */}
            <div className="col-md-5 text-end">
              {/* Clear Form Button */}
              <button className="btn btn-primary me-2" onClick={handleClear}>
                <Image
                  src="/assets/images/eraser-line.png"
                  alt="Clear"
                  className="icon-small"
                  width={20}
                  height={20}
                />
                Clear
              </button>

              {/* Conditional Add / Save / Cancel Buttons */}
              {isEditMode ? (
                <>
                  {/* Save Edited Stop */}
                  <button
                    className="btn btn-success me-2"
                    onClick={handleSave}
                  >
                    <Image
                      src="/assets/images/save-line.png"
                      alt="Save"
                      className="icon-small"
                      width={20}
                      height={20}
                    />
                    Save
                  </button>

                  {/* Cancel Editing */}
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => {
                      setIsEditMode(false);
                      setEditingStopID(null);
                      handleClear();
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                /* Add New Stop */
                <button
                  className="btn btn-success me-2"
                  onClick={handleAddStop}
                >
                  <Image
                    src="/assets/images/add-line.png"
                    alt="Add"
                    className="icon-small"
                    width={20}
                    height={20}
                  />
                  Add
                </button>
              )}

              {/* Print Button (no handler implemented) */}
              <button className="btn btn-danger me-2">
                <Image
                  src="/assets/images/export.png"
                  alt="Export"
                  className="icon-small"
                  width={20}
                  height={20}
                />
                Print
              </button>
            </div>
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            /* Stops Data Table */
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeadRow}>
                  <th>Stop Name</th>
                  <th>Longitude</th>
                  <th>Latitude</th>
                  <th className={styles.actions}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedStops.length > 0 ? (
                  displayedStops.map((stop) => (
                    <tr key={stop.StopID} className={styles.tableRow}>
                      <td>{stop.StopName}</td>
                      <td>{stop.longitude}</td>
                      <td>{stop.latitude}</td>
                      <td className={styles.actions}>
                        {/* Edit Button */}
                        <button
                          className={styles.editBtn}
                          onClick={() => handleEdit(stop)}
                        >
                          <Image
                            src="/assets/images/edit-white.png"
                            alt="Edit"
                            width={25}
                            height={25}
                          />
                        </button>

                        {/* Delete Button */}
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(stop.StopID)}
                        >
                          <Image
                            src="/assets/images/delete-white.png"
                            alt="Delete"
                            width={25}
                            height={25}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {/* Pagination Controls */}
          {displayedStops.length > 0 && (
            <nav>
              <ul className="pagination justify-content-center">
                {/* Previous Button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }).map((_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                {/* Next Button */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default RouteManagementPage;
