'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import '@/styles/style.css';
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className={`app-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          <div className="layout-right">
            <Topbar />
            <div className="layout-content">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}