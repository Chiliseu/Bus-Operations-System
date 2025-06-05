'use-client'

import React from 'react';
import { useEffect } from "react";
import SearchBar from '@/components/ui/SearchBar';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const BusAssignmentsModal = ({ onClose }: { onClose: ()=> void}) => {

  // Temporary busAssignemnts array
  const busAssignments = [
    {
      bus_assignment_id: "BA001",
      bus_id: "BUS101",
      driver_name: "John Doe",
      conductor_name: "Alice Smith",
    },
    {
      bus_assignment_id: "BA002",
      bus_id: "BUS202",
      driver_name: "Michael Johnson",
      conductor_name: "Emma Brown",
    },
    {
      bus_assignment_id: "BA003",
      bus_id: "BUS303",
      driver_name: "David Wilson",
      conductor_name: "Sophia White",
    },
  ];


  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="flex flex-col modal-header">
            <div className="flex items-center justify-between w-full">
              <h5 className="modal-title">Bus Assignments</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="flex justify-between w-full gap-20 my-2">
              {/* Search Bar */}
              <SearchBar className="w-100" placeholder='Search Bus Assignments'/>
              {/* Filter DropDown */}
             <div className="dropdown">
                <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Filter
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">All</a></li>
                  <li><a className="dropdown-item" href="#">Alphabetical</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusAssignmentsModal;