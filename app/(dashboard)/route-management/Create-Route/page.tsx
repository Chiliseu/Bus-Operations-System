'use client';

import React, { useState, useEffect } from 'react';
import cuid from 'cuid'; // Install cuid if not already installed: npm install cuid
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './route-management.module.css';
import ShowStopsModal from '@/components/modal/ShowStopsModal';
import AssignBusModal from '@/components/modal/AssignBusModal';
import { Stop, Route } from '@/app/interface'; //Importing the Stop interface
import Image from 'next/image';

import { generateFormattedID } from '../../../../lib/idGenerator';
import '@/styles/globals.css';



import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

const ITEMS_PER_PAGE = 10;

const CreateRoutePage: React.FC = () => {
  const [displayedroutes, setDisplayedRoutes] = useState<Route[]>([]);
  const [isEditMode, setIsEditMode] = useState(false); // Track if in edit mode
  const [editingRouteID, setEditingRouteID] = useState<string | null>(null); // Track the route being edited
  const [routeName, setRouteName] = useState('');
  const [startStopID, setStartStopID] = useState<string | null>(null); // Track StartStopID
  const [endStopID, setEndStopID] = useState<string | null>(null); // Track EndStopID
  const [startStop, setStartStop] = useState('');
  const [endStop, setEndStop] = useState('');
  const [stopsBetween, setStopsBetween] = useState<{ StopID: string; StopName: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Use State for modal
  const [showStopsModal, setShowStopsModal] = useState(false);
  const [showAssignBusModal, setShowAssignBusModal] = useState(false);

  // Current record
  const [selectedStartStop, setSelectedStartStop] = useState<Stop | null>(null);
  const [selectedEndStop, setSelectedEndStop] = useState<Stop | null>(null);
  const [selectedStopBetween, setSelectedStopBetween] = useState<Stop | null>(null);
  const [stopType, setStopType] = useState<'start' | 'end' | 'between' | null>(null);
  const [selectedStopIndex, setSelectedStopIndex] = useState<number | null>(null); // for between stops

  // Fetch routes from the backend
  const fetchRoutes = async () => {
    try {
      const response = await fetch('/api/route-management'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch routes');
      }
      const data: Route[] = await response.json();
      setDisplayedRoutes(data);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  // Fetch routes when the component mounts
  useEffect(() => {
    fetchRoutes();
  }, []);

  const totalPages = Math.ceil(displayedroutes.length / ITEMS_PER_PAGE);
  const currentRoutes = displayedroutes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(stopsBetween);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    setStopsBetween(reordered);
  };

  const handleAddStop = () => {
    setStopsBetween([...stopsBetween, { StopID: '', StopName: '' }]);
  };

  const handleRemoveStop = (index: number) => {
    setStopsBetween(stopsBetween.filter((_, i) => i !== index));
  };

  const handleStopChange = (value: string, index: number) => {
    const updatedStops = [...stopsBetween];
    updatedStops[index] = { ...updatedStops[index], StopName: value }; // Update only the StopName
    setStopsBetween(updatedStops);
  };

  const handleAddRoute = async () => {
    if (!routeName || !selectedStartStop || !selectedEndStop) {
      alert('Please fill in all required fields.');
      return;
    }
  
    // Prepare the RouteStops array with StopID and StopOrder
    const routeStops = stopsBetween.map((stopID, index) => ({
      StopID: stopID, 
      StopOrder: index + 1, 
    }));
  
    const newRoute = {
      RouteName: routeName,
      StartStopID: selectedStartStop.StopID,
      EndStopID: selectedEndStop.StopID,
      RouteStops: routeStops, 
    };
  
    console.log('Payload being sent to the backend:', newRoute); // Debugging
  
    try {
      const response = await fetch('/api/route-management', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRoute),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unknown error occurred');
      }

      alert('Route added successfully!');
      setRouteName('');
      setStartStop('');
      setEndStop('');
      setStopsBetween([]);
      fetchRoutes(); // Refresh the list of routes
    } catch (error) {
      console.error('Error adding route:', error);
      // Show the actual error message returned by the backend
      alert(error instanceof Error ? error.message : 'Failed to add route. Please try again.');
    }
  }

  const handleDeleteRoute = async (routeID: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this route?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`/api/route-management/${routeID}`, { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isDeleted: true }), 
      });

      if (!response.ok) {
        throw new Error(`Failed to delete route: ${response.statusText}`);
      }

      alert('Route deleted successfully!');
      fetchRoutes();
    } catch (error) {
      console.error('Error deleting route:', error);
      alert('Failed to delete route. Please try again.');
    }
  };

  const handleEditRoute = (route: Route) => {
    setIsEditMode(true); // Enable edit mode
    setEditingRouteID(route.RouteID); // Set the route being edited
    setRouteName(route.RouteName); // Populate input fields
    setStartStopID(route.StartStop?.StopID || null); // Set StartStopID
    setEndStopID(route.EndStop?.StopID || null); // Set EndStopID
    setStartStop(route.StartStop?.StopName || '');
    setEndStop(route.EndStop?.StopName || '');

    // Debugging: Log the RouteStops data
    console.log('RouteStops:', route.RouteStops);

    // Populate stopsBetween with StopIDs and StopNames from RouteStops
    const routeStops = route.RouteStops?.map((routeStop) => ({
      StopID: routeStop.StopID, // Use StopID from RouteStops
      StopName: routeStop.Stop?.StopName || '', // Use StopName from the Stop object, fallback to an empty string
    })) || [];
    setStopsBetween(routeStops);
  };

  const handleSaveRoute = async () => {
    if (!routeName || !startStop || !endStop) {
      alert('Please fill in all fields with valid values.');
      return;
    }

    // Prepare the RouteStops array with StopID and StopOrder
    const routeStops = stopsBetween.map((stop, index) => ({
      StopID: stop.StopID, 
      StopOrder: index + 1, 
    }));
    
    const updatedRoute = {
      RouteID: editingRouteID, // Ensure this matches the backend's expected field name
      RouteName: routeName,
      StartStopID: startStopID, // Send StartStopID
      EndStopID: endStopID, // Send EndStopID
      RouteStops: routeStops, // Send RouteStops
    };

    console.log('Request body:', updatedRoute); // Debugging

      try {
        const response = await fetch(`/api/route-management/${editingRouteID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRoute),
        });

      if (!response.ok) {
        // Try to get error message from response JSON
        let errorMsg = `Failed to update route: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMsg = errorData.error;
          }
        } catch {
          // ignore JSON parsing errors, fallback to statusText
        }
        throw new Error(errorMsg);
      }

      alert('Route updated successfully!');
      setIsEditMode(false);
      setEditingRouteID(null);
      handleClear();
      fetchRoutes();
    } catch (error) {
      console.error('Error updating route:', error);
      // Safe error message extraction
      const message = error instanceof Error ? error.message : 'Failed to update route. Please try again.';
      alert(message);
    }
  };
  
  const handleClear = () => {
    setRouteName('');
    setStartStop('');
    setEndStop('');
    setStopsBetween([]);
    setSelectedStartStop(null);
    setSelectedEndStop(null);
    setSelectedStopBetween(null);
    setStopType(null);
    setSelectedStopIndex(null);
  };

  return (
    <div className={`card mx-auto ${styles.wideCard}`}>
      <div className="card mx-auto w-100" style={{ maxWidth: '1700px' }}>
        <div className="card-body">
          {/* Create Route Section */}
          <h2 className={styles.stopTitle}>
            {isEditMode ? 'EDIT ROUTE' : 'CREATE ROUTE'}
          </h2>
          {/* <button className={styles.saveButton} onClick={() => setShowAssignBusModal(true)}>
            + Assign Bus
          </button>
          <button className={styles.saveButton} onClick={() => setShowStopsModal(true)}>
            + Assign Stop
          </button> */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Route Name"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Start Stop"
                value={startStop}
                onChange={(e) => setStartStop(e.target.value)}
                onClick={() => {
                  setStopType('start');
                  setShowStopsModal(true);
                }}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="End Stop"
                value={endStop}
                onChange={(e) => setEndStop(e.target.value)}
                onClick={() => {
                  setStopType('end');
                  setShowStopsModal(true);
                }}
              />
            </div>
          </div>

          {/* Stops Between Section */}
          <h5 className="mb-2">Stops Between</h5>
          <div className="stops-scroll-container">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="stops">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {stopsBetween.length === 0 ? (
                      <p className="text-muted">Click + button to add stops.</p>
                    ) : (
                      stopsBetween.map((stop, index) => (
                        <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
                          {(provided) => (
                            <div
                              className="d-flex align-items-center mb-2"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <span {...provided.dragHandleProps} className="me-2">⋮⋮</span>
                              <input
                                type="text"
                                className="form-control me-2"
                                placeholder={`Stop ${index + 1}`}
                                value={stop.StopName}
                                onChange={(e) => handleStopChange(e.target.value, index)}
                                onClick={() => {
                                  setStopType('between');
                                  setSelectedStopIndex(index);
                                  setShowStopsModal(true);
                                }}
                              />
                              <button className="btn btn-danger" onClick={() => handleRemoveStop(index)}>
                                <Image src="/assets/images/close-line.png" alt="Remove Stop" className="icon-small" width={20} height={20} />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="my-2">
            <button className="btn btn-success" onClick={handleAddStop}>
              <Image src="/assets/images/add-line.png" alt="Add Stop" className="icon-small" width={20} height={20} />
            </button>
          </div>

          {/* Routes Table Section */}
          <h2 className="card-title mb-3">Routes</h2>
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
                <Image src="/assets/images/eraser-line.png" alt="Clear" className="icon-small" width={20} height={20} />
                Clear
              </button>
              {isEditMode ? (
                <>
                  <button className="btn btn-success me-2" onClick={handleSaveRoute}>
                    <Image src="/assets/images/save-line.png" alt="Save" width={20} height={20} />
                    Save
                  </button>
                  <button className="btn btn-secondary me-2" onClick={() => {
                      setIsEditMode(false); // Exit edit mode
                      setEditingRouteID(null); // Clear the editing stop ID
                      handleClear(); // Clear input fields
                    }}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-success me-2" onClick={handleAddRoute}>
                  <Image src="/assets/images/add-line.png" alt="Add" width={20} height={20} />
                  Add
                </button>
              )}
              <button className="btn btn-danger me-2">
                <Image src="/assets/images/export.png" alt="Export" className="icon-small" width={20} height={20} />
                Export CSV
              </button>
              <button className="btn btn-danger text-white">
                <Image src="/assets/images/import.png" alt="Import" className="icon-small" width={20} height={20} />
                Import CSV
              </button>
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeadRow}>
                <th>Route Name</th>
                <th>Start Stop</th>
                <th>End Stop</th>
                <th>No. of Stops Between</th>
                <th className={styles.actions}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRoutes.length > 0 ? (
                currentRoutes.map((route) => (
                  <tr key={route.RouteID} className={styles.tableRow}>
                    <td>{route.RouteName}</td>
                    <td>{route.StartStop?.StopName}</td>
                    <td>{route.EndStop?.StopName}</td>
                    <td>{route.RouteStops?.length ?? 0}</td>
                    <td className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEditRoute(route)}
                      >
                        <Image
                          src="/assets/images/edit-white.png"
                          alt="Edit"
                          width={25}
                          height={25}
                        />
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteRoute(route.RouteID)}
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
                  <td colSpan={5} className={styles.noRecords}>
                    No routes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
              </li>
              {Array.from({ length: totalPages }).map((_, i) => (
                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
              </li>
            </ul>
          </nav>

          {/* Modals */}
          {showStopsModal && (
            <ShowStopsModal 
              onClose={() => setShowStopsModal(false) } 
              onAssign={(stop) => {
                if (stopType === 'start') {
                  setStartStop(stop.StopName); // or however you want to use it
                  setStartStopID(stop.StopID); // Update StartStop ID
                  setSelectedStartStop(stop);  // optionally store the whole object
                } else if (stopType === 'end') {
                  setEndStop(stop.StopName);
                  setEndStopID(stop.StopID); // Update EndStop ID
                  setSelectedEndStop(stop);
                } else if (stopType === 'between' && selectedStopIndex !== null) {
                  const updatedStops = [...stopsBetween];
                  if (selectedStopIndex !== null) {
                    updatedStops[selectedStopIndex] = { StopID: stop.StopID, StopName: stop.StopName }; // Update both StopID and StopName
                  }
                  setStopsBetween(updatedStops);
                  // optionally setSelectedStopBetween(stop); if you want to track them
                }
              
                // Reset modal and selection state
                setStopType(null);
                setSelectedStopIndex(null);
                setShowStopsModal(false);
              }}
            />
          )}
          {showAssignBusModal && (
            <AssignBusModal 
              onClose={() => setShowAssignBusModal(false) } 
              onAssign={(bus) => {
                alert(`Assigned Bus: ${bus.busId}`);
                setShowAssignBusModal(false); // close modal
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateRoutePage;
