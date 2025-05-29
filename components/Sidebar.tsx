'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image'; // Import Image

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} id="sidebar">
      <div>
        <div className="logo">
          <Image src="/assets/images/agilalogo.png" alt="Agila Logo" width={100} height={100} />
        </div>

        <div className="nav-links">
          {/* Assignment (direct link to bus-assignment) */}
          <Link
            href="/bus-assignment"
            className={`nav-item module ${activeItem === 'assignment' ? 'active' : ''}`}
            onClick={() => setActiveItem('assignment')}
          >
            <Image src="/assets/images/assignmentbus.png" alt="Assignment" className="nav-icon" width={24} height={24} />
            <span className="nav-text">Assignment</span>
          </Link>

          {/* Route Management */}
          <div
            className={`nav-item module ${openSubMenu === 'route-management-submenu' ? 'active' : ''} ${activeItem === 'route-management' ? 'active' : ''}`}
            onClick={() => {
              setOpenSubMenu(prev => (prev === 'route-management-submenu' ? null : 'route-management-submenu'));
              setActiveItem('route-management');
            }}
          >
            <Image src="/assets/images/routemanagement.png" alt="Route Management" className="nav-icon" width={24} height={24} />
            <span className="nav-text">Route Management</span>
          </div>
          {openSubMenu === 'route-management-submenu' && (
            <div className="sub-menu active">
              <Link
                href="/route-management/Create-Stop"
                className={`sub-item ${activeItem === 'create-stop' ? 'active' : ''}`}
                onClick={() => setActiveItem('create-stop')}
              >
                Create Stop
              </Link>
              <Link
                href="/route-management/Create-Route"
                className={`sub-item ${activeItem === 'create-route' ? 'active' : ''}`}
                onClick={() => setActiveItem('create-route')}
              >
                Create Route
              </Link>
            </div>
          )}

          {/* GPS */}
          <Link
            href="/gps"
            className={`nav-item ${activeItem === 'gps' ? 'active' : ''}`}
            onClick={() => setActiveItem('gps')}
          >
            <Image src="/assets/images/GPS.png" alt="GPS" className="nav-icon" width={24} height={24} />
            <span className="nav-text">GPS</span>
          </Link>

        {/* Bus Operation*/}
        <div
          className={`nav-item module ${openSubMenu === 'bus-operation-submenu' ? 'active' : ''} ${activeItem === 'bus-operation' ? 'active' : ''}`}
          onClick={() => {
            setOpenSubMenu(prev => (prev === 'bus-operation-submenu' ? null : 'bus-operation-submenu'));
            setActiveItem('bus-operation');
          }}
        >
          <img src="/assets/images/busoperation.png" alt="Bus Operation" className="nav-icon" />
          <span className="nav-text">Bus Operation</span>
        </div>
        {openSubMenu === 'bus-operation-submenu' && (
          <div className="sub-menu active">
            <Link
              href="/bus-operation/Pre-Dispatch"
              className={`sub-item ${activeItem === 'pre-dispatch' ? 'active' : ''}`}
              onClick={() => setActiveItem('pre-dispatch')}
            >
              Pre-Dispatch
            </Link>
            <Link
              href="/bus-operation/Dispatch"
              className={`sub-item ${activeItem === 'dispatch' ? 'active' : ''}`}
              onClick={() => setActiveItem('dispatch')}
            >
              Dispatch
            </Link>
            <Link
              href="/bus-operation/Post-Dispatch"
              className={`sub-item ${activeItem === 'post-dispatch' ? 'active' : ''}`}
              onClick={() => setActiveItem('post-dispatch')}
            >
              Post-Dispatch
            </Link>
          </div>
        )}

          {/* Bus Rental */}
          <Link
            href="/bus-rental"
            className={`nav-item ${activeItem === 'bus-rental' ? 'active' : ''}`}
            onClick={() => setActiveItem('bus-rental')}
          >
            <Image src="/assets/images/busrental.png" alt="Bus Rental" className="nav-icon" width={24} height={24} />
            <span className="nav-text">Bus Rental</span>
          </Link>

          {/* Performance Report */}
          <Link
            href="/performance-report"
            className={`nav-item ${activeItem === 'performance-report' ? 'active' : ''}`}
            onClick={() => setActiveItem('performance-report')}
          >
            <Image src="/assets/images/performancereport.png" alt="Performance Report" className="nav-icon" width={24} height={24} />
            <span className="nav-text">Performance Report</span>
          </Link>
        </div>
      </div>

      {/* Logout */}
      <div className="logout">
        <a href="#">
          <Image src="/assets/images/logout.png" alt="Logout" className="nav-icon" width={24} height={24} />
          <span className="nav-text">Logout</span>
        </a>
      </div>

      {/* Sidebar Toggle Button */}
      <div className="toggle-btn" onClick={toggleSidebar}>
        <Image
          src={isCollapsed ? '/assets/images/arrow-right-line.png' : '/assets/images/arrow-left-line.png'}
          alt="Sidebar Toggle"
          id="arrow"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export default Sidebar;
