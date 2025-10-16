'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import '@/styles/sidebar.css';
import {logoutUser} from '@/lib/apiCalls/logout'

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const routeToItem: { [key: string]: string } = {
    '/dashboard': 'dashboard',
    '/bus-assignment': 'assignment',
    '/gps': 'gps',
    '/bus-rental': 'bus-rental',
    '/performance-report': 'performance-report',
    '/route-management/Create-Stop': 'create-stop',
    '/route-management/Create-Route': 'create-route',
    '/bus-operation/Pre-Dispatch': 'pre-dispatch',
    '/bus-operation/Dispatch': 'dispatch',
    '/bus-operation/Post-Dispatch': 'post-dispatch',
  };

  const routeManagementSubItems = [
    '/route-management/Create-Stop',
    '/route-management/Create-Route',
  ];
  const busOperationSubItems = [
    '/bus-operation/Pre-Dispatch',
    '/bus-operation/Dispatch',
    '/bus-operation/Post-Dispatch',
  ];

  // Set activeItem based on pathname
  useEffect(() => {
    setActiveItem(routeToItem[pathname] || null);
  }, [pathname]);

  // Auto-open submenu if active route inside submenu
  useEffect(() => {
    if (routeManagementSubItems.includes(pathname)) {
      setOpenSubMenu('route-management-submenu');
    } else if (busOperationSubItems.includes(pathname)) {
      setOpenSubMenu('bus-operation-submenu');
    } else {
      setOpenSubMenu(null);
    }
  }, [pathname]);

  const toggleSubMenu = (id: string) => {
    setOpenSubMenu((prev) => (prev === id ? null : id));
  };

  const handleLogout = async () => {
    console.log('Logging out...');
    await logoutUser(); 
  };

  const isRouteManagementActive = routeManagementSubItems.includes(pathname);
  const isBusOperationActive = busOperationSubItems.includes(pathname);

  return (
    <div className="sidebar shadow-lg" id="sidebar">
      <div className="sidebar-content">
        <div className="logo-img">
          <img src="/assets/images/agilalogo.png" alt="Agila Logo" />
        </div>

        <div className="nav-links">
          <Link
            href="/dashboard"
            className={`nav-item ${activeItem === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveItem('dashboard')}
          >
            <Image
              src="/assets/images/dashboard.png"
              alt="dashboard"
              className="nav-icon"
              width={24}
              height={24}
            />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/bus-assignment"
            className={`nav-item ${activeItem === 'assignment' ? 'active' : ''}`}
            onClick={() => setActiveItem('assignment')}
          >
            <Image
              src="/assets/images/assignmentbus.png"
              alt="Assignment"
              className="nav-icon"
              width={24}
              height={24}
            />
            <span>Assignment</span>
          </Link>

          <div
            className={`nav-item module ${isRouteManagementActive ? 'active' : ''}`}
            onClick={() => toggleSubMenu('route-management-submenu')}
          >
            <Image
              src="/assets/images/routemanagement.png"
              alt="Route Management"
              className="nav-icon"
              width={24}
              height={24}
            />
            <span>Route Management</span>
            <i
              className={`dropdown-arrow ri-arrow-down-s-line ${
                openSubMenu === 'route-management-submenu' ? 'rotate' : ''
              }`}
            />
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

          {/* <Link
            href="/gps"
            className={`nav-item ${activeItem === 'gps' ? 'active' : ''}`}
            onClick={() => setActiveItem('gps')}
          >
            <Image
              src="/assets/images/GPS.png"
              alt="GPS"
              className="nav-icon"
              width={24}
              height={24}
            />
            <span>GPS</span>
          </Link> */}

          <div
            className={`nav-item module ${isBusOperationActive ? 'active' : ''}`}
            onClick={() => toggleSubMenu('bus-operation-submenu')}
          >
            <Image
              src="/assets/images/busoperation.png"
              alt="Bus Operation"
              className="nav-icon"
              width={24}
              height={24}
            />
            <span>Bus Operation</span>
            <i
              className={`dropdown-arrow ri-arrow-down-s-line ${
                openSubMenu === 'bus-operation-submenu' ? 'rotate' : ''
              }`}
            />
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

          <Link
            href="/bus-rental"
            className={`nav-item ${activeItem === 'bus-rental' ? 'active' : ''}`}
            onClick={() => setActiveItem('bus-rental')}
          >
            <Image
              src="/assets/images/busrental.png"
              alt="Bus Rental"
              className="nav-icon"
              width={24}
              height={24}
            />
            <span>Bus Rental</span>
          </Link>

          { <Link
            href="/performance-report"
            className={`nav-item ${activeItem === 'performance-report' ? 'active' : ''}`}
            onClick={() => setActiveItem('performance-report')}
          >
            <Image
              src="/assets/images/performancereport.png"
              alt="Performance Report"
              className="nav-icon"
              width={24}
              height={24}
            />
            <span>Performance Report</span>
          </Link>}
        </div>

        <div className="logout">
          <a onClick={handleLogout}>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
