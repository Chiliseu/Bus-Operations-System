'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './route-management.module.css';
import '../../../../styles/globals.css';
import { Stop } from '@/app/interface'; // Importing the Stop interface

const ITEMS_PER_PAGE = 10;

const RouteManagementPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10; // Number of items per page
  const [stops, setStops] = useState<Stop[]>([]); // All stops
  const [displayedStops, setDisplayedStops] = useState<Stop[]>([]); // Stops for the current page
  const [stopName, setStopName] = useState(''); // State for Stop Name
  const [longitude, setLongitude] = useState(''); // State for Longitude
  const [latitude, setLatitude] = useState(''); // State for Latitude

  const totalPages = Math.ceil(stops.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Update displayed stops whenever the current page changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedStops(stops.slice(startIndex, endIndex));
  }, [currentPage, stops]);

  const fetchStops = async () => {
    try {
      const response = await fetch('/api/stops');
      if (!response.ok) {
        throw new Error(`Failed to fetch assignments: ${response.statusText}`);
      }
      const data = await response.json();
      setStops(data); // Update the full stops list
    } catch (error) {
      console.error('Error fetching assignments:', error);
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
      Location: `${longitude}, ${latitude}`, // Combine longitude and latitude into a single string
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
          <h2 className={styles.stopTitle}>CREATE STOP</h2>
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
              <input type="text" className="form-control" placeholder="Search..." />
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option>Select item</option>
              </select>
            </div>
            <div className="col-md-5 text-end">
              <button className="btn btn-primary me-2" onClick={handleClear}>
                <img src="/assets/images/eraser-line.png" alt="Clear" className="icon-small" />
                Clear
              </button>
              <button className="btn btn-success me-2" onClick={handleAddStop}>
                <img src="/assets/images/add-line.png" alt="Add" className="icon-small" />
                Add
              </button>
              <button className="btn btn-danger me-2">
                <img src="/assets/images/export.png" alt="Export" className="icon-small" />
                Export CSV
              </button>
              <button className="btn btn-danger text-white">
                <img src="/assets/images/import.png" alt="Import" className="icon-small" />
                Import CSV
              </button>
            </div>
          </div>

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
            {displayedStops.map((stop) => (
                <tr key={stop.StopID}>
                  <td>{stop.StopName}</td>
                  <td>{stop.Location}</td>
                  <td>{stop.Location}</td>
                  <td className="text-center">
                    <div className="d-inline-flex align-items-center gap-1">
                      <button className="btn btn-sm btn-primary p-1">
                        <img
                          src="/assets/images/edit-white.png"
                          alt="Edit"
                          width={25}
                          height={25}
                        />
                      </button>
                      <button className="btn btn-sm btn-danger p-1">
                        <img
                          src="/assets/images/delete-white.png"
                          alt="Delete"
                          width={25}
                          height={25}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
                ))}
            </tbody>
          </table>

          {/* Pagination */}
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
        </div>
      </div>
    </div>
  );
};

export default RouteManagementPage;
