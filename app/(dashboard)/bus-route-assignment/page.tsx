'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './bus-route-assignment.module.css';
import '../../../../styles/globals.css';
import { Stop } from '@/app/interface'; // Importing the Stop interface
import Image from 'next/image';

const ITEMS_PER_PAGE = 10;

const RouteManagementPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10; // Number of items per page
  const [stops, setStops] = useState<Stop[]>([]); // All stops
  const [displayedStops, setDisplayedStops] = useState<Stop[]>([]); // Stops for the current page
  const [stopName, setStopName] = useState(''); // State for Stop Name
  const [longitude, setLongitude] = useState(''); // State for Longitude
  const [latitude, setLatitude] = useState(''); // State for Latitude
  const [searchQuery, setSearchQuery] = useState(''); // State for Search Query
  const [sortOrder, setSortOrder] = useState(''); // State for sorting order
  const [isEditMode, setIsEditMode] = useState(false); // Track if in edit mode
  const [editingStopID, setEditingStopID] = useState<string | null>(null); // Track the stop being edited
  const [loading, setLoading] = useState(false); // Track loading state

  const [totalPages, setTotalPages] = useState(1); // State for total pages

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Update displayed stops whenever the current page changes
  // Update displayed stops whenever the current page or search query changes
  useEffect(() => {
    const sortedStops = [...stops];
  
    // Sort stops based on the selected sortOrder
    if (sortOrder === 'A-Z') {
      sortedStops.sort((a, b) => a.StopName.localeCompare(b.StopName));
    } else if (sortOrder === 'Z-A') {
      sortedStops.sort((a, b) => b.StopName.localeCompare(a.StopName));
    }
  
    const filteredStops = sortedStops.filter((stop) =>
      stop.StopName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stop.longitude?.toString().includes(searchQuery) ||
      stop.latitude?.toString().includes(searchQuery)
    );
  
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
  
    setDisplayedStops(filteredStops.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filteredStops.length / ITEMS_PER_PAGE)); // Update total pages based on filtered stops
  
    // Reset currentPage to 1 if the search query changes
    if (currentPage > Math.ceil(filteredStops.length / ITEMS_PER_PAGE)) {
      setCurrentPage(1);
    }
  }, [currentPage, stops, searchQuery, sortOrder]);

  const fetchStops = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch('/api/stops');
      if (!response.ok) {
        throw new Error(`Failed to fetch assignments: ${response.statusText}`);
      }
      const data = await response.json();
      setStops(data); // Update the full stops list
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchStops();
  }, []);

  const handleAddStop = async () => {
    if (!stopName || !longitude || !latitude) {
      alert('Please fill in all fields with valid values.');
      return;
    }

    console.log(stopName, longitude, latitude); // Debugging
    const newStop = {
      StopName: stopName,
      longitude: longitude,
      latitude: latitude
    };

    try {
      const response = await fetch('/api/stops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStop),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        throw new Error('Failed to add stop');
      }

      alert('Stop added successfully!');
      handleClear(); // Clear input fields after successful addition
      fetchStops(); // Refresh the stops list
    } catch (error) {
      console.error('Error adding stop:', error);
      alert('Failed to add stop. Please try again.');
    } finally {
    }
  };

  const handleEdit = (stop: Stop) => {
    setIsEditMode(true); // Enable edit mode
    setEditingStopID(stop.StopID); // Set the stop being edited
    setStopName(stop.StopName); // Populate input fields
    setLongitude(stop.longitude);
    setLatitude(stop.latitude);
  };

  const handleSave = async () => {
    if (!stopName || !longitude || !latitude) {
      alert('Please fill in all fields with valid values.');
      return;
    }

    // No need to send StopID in body since it’s in the URL
    const updatedStop = {
      StopName: stopName,
      latitude,
      longitude,
    };

    console.log('Request body:', updatedStop);

    try {
      const response = await fetch(`/api/stops/${editingStopID}`, {  // <-- use template literal here
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
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

  const handleDelete = async (stopID: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this stop?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/stops/${stopID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDeleted: true }),  // send only isDeleted in body
      });

      if (!response.ok) throw new Error(`Failed to delete stop: ${response.statusText}`);

      alert('Stop deleted successfully!');
      fetchStops(); // Refresh the stops list
    } catch (error) {
      console.error('Error deleting stop:', error);
      alert('Failed to delete stop. Please try again.');
    }

  }

  const handleClear = () => {
    setStopName(''); // Clear input fields
    setLongitude('');
    setLatitude('');
  }

  return (
    <div className={`card mx-auto ${styles.wideCard}`}>
      <div className="card mx-auto w-100" style={{ maxWidth: '1700px' }}>
        <div className="card-body">
          
          {/* Create Stop Section */}
          <h2 className={styles.stopTitle}>
            {isEditMode ? 'EDIT STOP' : 'CREATE STOP'}
          </h2>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <input type="text"className="form-control" placeholder="Stop Name" value={stopName}
                onChange={(e) => setStopName(e.target.value)}/>
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Longitude" value={longitude}
                onChange={(e) => setLongitude(e.target.value)}/>
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Latitude" value={latitude}
                onChange={(e) => setLatitude(e.target.value)}/>
            </div>
          </div>

          {/* Stops Table Section */}
          <h2 className="card-title mb-3">Stops</h2>
          <div className="row g-2 align-items-center mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery} // Bind to searchQuery state
                onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={sortOrder} // Bind to sortOrder state
                onChange={(e) => setSortOrder(e.target.value)} // Update sortOrder state
              >
                <option value="A-Z">Name: A-Z</option>
                <option value="Z-A">Name: Z-A</option>
              </select>
            </div>
            <div className="col-md-5 text-end">
              <button className="btn btn-primary me-2" onClick={handleClear}>
                <Image src="/assets/images/eraser-line.png" alt="Clear" className="icon-small" width={20} height={20} />
                Clear
              </button>

              {/* Shows Add button as default, shows save button when edit mode */}
              {isEditMode ? (
                <>
                  <button className="btn btn-success me-2" onClick={handleSave}>
                    <Image src="/assets/images/save-line.png" alt="Save" className="icon-small" width={20} height={20} />
                    Save
                  </button>
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => {
                      setIsEditMode(false); // Exit edit mode
                      setEditingStopID(null); // Clear the editing stop ID
                      handleClear(); // Clear input fields
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-success me-2" onClick={handleAddStop}>
                  <Image src="/assets/images/add-line.png" alt="Add" className="icon-small" width={20} height={20} />
                  Add
                </button>
              )}

              <button className="btn btn-danger me-2">
                <Image src="/assets/images/export.png" alt="Export" className="icon-small" width={20} height={20} />
                Print
              </button>
            </div>
          </div>
          
          {loading ? (
            // Render this when loading is true
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ):(
            <table className="table table-striped table-bordered custom-table">
            <thead>
              <tr>
                <th>Stop Name</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedStops.length > 0 ? (
                displayedStops.map((stop) => (
                  <tr key={stop.StopID}>
                    <td>{stop.StopName}</td>
                    <td>{stop.longitude}</td>
                    <td>{stop.latitude}</td>
                    <td className="text-center">
                      <div className="d-inline-flex align-items-center gap-1">
                        <button className="btn btn-sm btn-primary p-1" onClick={() => handleEdit(stop)} // Enable edit mode
                        >
                          <Image
                            src="/assets/images/edit-white.png"
                            alt="Edit"
                            width={25}
                            height={25}
                          />
                        </button>
                        <button
                          className="btn btn-sm btn-danger p-1"
                          onClick={() => handleDelete(stop.StopID)} // Call the delete handler with the StopID
                        >
                          <Image
                            src="/assets/images/delete-white.png"
                            alt="Delete"
                            width={25}
                            height={25}
                          />
                        </button>
                      </div>
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

          {/* Pagination */}
            {displayedStops.length > 0 && (
              <nav>
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <li
                      key={i + 1}
                      className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                    >
                      <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
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
