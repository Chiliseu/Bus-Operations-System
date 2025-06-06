'use client';

import '@/styles/globals.css';
import '@/styles/style.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import Topbar from '@/components/Topbar/Topbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import Token_Generation from './Token_Generation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* ✅ Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@100;300;400;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Existing external styles */}
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        />
        
        <title>Agila Transport System</title>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <Token_Generation />
        <div className="app-wrapper">
          <Sidebar />
          <div className="layout-right">
            <Topbar />
            <div className="layout-content">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
