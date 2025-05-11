/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect } from 'react';
import cuid from 'cuid'; // Install cuid if not already installed: npm install cuid
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './route-management.module.css';
import ShowStopsModal from '@/components/modal/ShowStopsModal';
import AssignBusModal from '@/components/modal/AssignBusModal';
import { Stop, Route } from '@/app/interface'; //Importing the Stop interface

import '../../../../styles/globals.css';

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';


// interface Route {
//   name: string;
//   startStop: string;
//   endStop: string;
//   stopsBetween: string[];
// }

// interface Stop {
//   StopID: string;
//   StopName: string;
//   Location: string;
//   image: string | null;
// }

// const mockRoutes: Route[] = Array.from({ length: 100 }, (_, i) => ({
//   name: `Route ${i + 1}`,
//   startStop: 'Cell',
//   endStop: 'Cell',
//   stopsBetween: ['Cell', 'Cell'],
// }));

const ITEMS_PER_PAGE = 10;

const CreateRoutePage: React.FC = () => {
  const [displayedroutes, setDisplayedRoutes] = useState<Route[]>([]);
  const [routeName, setRouteName] = useState('');
  const [startStop, setStartStop] = useState('');
  const [endStop, setEndStop] = useState('');
  const [stopsBetween, setStopsBetween] = useState<string[]>([]);
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
    setStopsBetween([...stopsBetween, '']);
  };

  const handleRemoveStop = (index: number) => {
    setStopsBetween(stopsBetween.filter((_, i) => i !== index));
  };

  const handleStopChange = (value: string, index: number) => {
    const updatedStops = [...stopsBetween];
    updatedStops[index] = value;
    setStopsBetween(updatedStops);
  };

  const handleAddRoute = async () => {
    if (!routeName || !selectedStartStop || !selectedEndStop) {
      alert('Please fill in all required fields.');
      return;
    }
  
    // Prepare the RouteStops array with StopID and StopOrder
    const routeStops = stopsBetween.map((stopID, index) => ({
      RouteStopID: cuid(), // Generate a unique ID for each RouteStop
      StopID: stopID, // Assuming stopsBetween contains StopIDs
      StopOrder: index + 1, // Assign the order of the stop
    }));
  
    const newRoute = {
      RouteName: routeName,
      StartStopID: selectedStartStop.StopID,
      EndStopID: selectedEndStop.StopID,
      RouteStops: routeStops, // Include the RouteStops array
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
        const errorText = await response.text(); // Get error details from the response
        console.error('Backend error:', errorText); // Debugging
        throw new Error('Failed to add route');
      }
  
      alert('Route added successfully!');
      setRouteName('');
      setStartStop('');
      setEndStop('');
      setStopsBetween(['']);
      fetchRoutes(); // Refresh the list of routes
    } catch (error) {
      console.error('Error adding route:', error); // Debugging
      alert('Failed to add route. Please try again.');
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
          <h2 className={styles.stopTitle}>CREATE ROUTE</h2>
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
                                value={stop}
                                onChange={(e) => handleStopChange(e.target.value, index)}
                                onClick={() => {
                                  setStopType('between');
                                  setSelectedStopIndex(index);
                                  setShowStopsModal(true);
                                }}
                              />
                              <button className="btn btn-danger" onClick={() => handleRemoveStop(index)}>
                                <img src="/assets/images/close-line.png" alt="Remove Stop" className="icon-small" />
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
                <img src="/assets/images/add-line.png" alt="Add Stop" className="icon-small" />
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
                <img src="/assets/images/eraser-line.png" alt="Clear" className="icon-small" />
                Clear
              </button>
              <button className="btn btn-success me-2" onClick={handleAddRoute}>
                <img src="/assets/images/add-line.png" alt="Add" className="icon-small"/>
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
                <th>Route Name</th>
                <th>Start Stop</th>
                <th>End Stop</th>
                <th>No. of Stops Between</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRoutes.map((route) => (
                <tr key={route.RouteID}>
                  <td>{route.RouteName}</td>
                  <td>{route.StartStop?.StopName}</td>
                  <td>{route.EndStop?.StopName}</td>
                  <td>{route.RouteStops?.length ?? 0}</td> {/* Defaults to zero */}
                  <td className="text-center">
                    <div className="d-inline-flex align-items-center gap-1">
                      <button className="btn btn-sm btn-primary p-1">
                        <img src="/assets/images/edit-white.png" alt="Edit" width={25} height={25} />
                      </button>
                      <button className="btn btn-sm btn-danger p-1">
                        <img src="/assets/images/delete-white.png" alt="Delete" width={25} height={25} />
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
                  setSelectedStartStop(stop);  // optionally store the whole object
                } else if (stopType === 'end') {
                  setEndStop(stop.StopName);
                  setSelectedEndStop(stop);
                } else if (stopType === 'between' && selectedStopIndex !== null) {
                  const updatedStops = [...stopsBetween];
                  updatedStops[selectedStopIndex] = stop.StopID;
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
