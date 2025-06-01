'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import DropdownButton from '@/components/ui/DropdownButton';
import { Route } from '@/app/interface'; // Importing the Route interface
import { fetchRoutesModalWithToken } from '@/lib/apiCalls/route';

const AssignRouteModal = ({ 
  onClose,
  onAssign, 
}: { 
  onClose: () => void;
  onAssign: (route: Route) => void; 
}) => {
  const [routes, setRoutes] = useState<Route[]>([]); // State for all routes
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]); // State for filtered routes
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // Fetch routes from the database
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data: Route[] = await fetchRoutesModalWithToken();
        setRoutes(data); // Set the fetched routes
        setFilteredRoutes(data); // Initialize filtered routes
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  const dropdownItems = [
    {
      name: 'Alphabetical',
      action: () => {
        const sorted = [...filteredRoutes].sort((a, b) => a.RouteName.localeCompare(b.RouteName));
        setFilteredRoutes(sorted);
      },
    },
    {
      name: 'Show All',
      action: () => {
        setFilteredRoutes(routes);
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/20" style={{ zIndex: 1060 }}>
      <main className="w-[720px] h-[600px] rounded-lg bg-white shadow-lg p-4 flex flex-col">
        {/* Search Bar */}
        <header className='mb-4'>  
          <SearchBar 
            placeholder='Search Route' 
            value={searchTerm}
            onChange={(e) => {
              const text = e.target.value;
              setSearchTerm(text);

              // Filter routes based on search term
              const filtered = routes.filter((route) =>
                route.RouteName.toLowerCase().includes(text.toLowerCase()) ||
                route.StartStop?.StopName.toLowerCase().includes(text.toLowerCase()) ||
                route.EndStop?.StopName.toLowerCase().includes(text.toLowerCase())
              );
              setFilteredRoutes(filtered);
            }}
          ></SearchBar>
        </header>

        {/* Title and Filter section */}
        <nav className='px-3 flex justify-between items-center mb-2'>
          <div className='font-medium text-lg'>Routes</div>
          <div className='flex items-center'>
            <div className='font-medium mr-3'>Filter</div>
            <DropdownButton dropdownItems={dropdownItems}></DropdownButton>
          </div>
        </nav>

        {/* Route List Section */}
        <section className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 mb-4">
          {filteredRoutes.map((route, index) => (
            <article key={index} className="rounded-lg my-1 px-3 flex items-center h-20 bg-gray-50 hover:bg-gray-100 cursor-pointer text-black justify-between">
              {/* Route Info */}
              <div className="flex items-center gap-3">
                <div className="bg-gray-200 rounded-2xl h-20 w-20 flex items-center relative overflow-hidden">
                  <Image
                    src={'/assets/images/bus-fallback.png'}
                    alt="Bus"
                    className="object-cover"
                    fill
                  />
                </div>
                <div className='flex flex-col items-start'>
                  <div className="flex gap-2 items-center">
                    <div>{route.RouteName}</div>
                  </div>
                  <div className="text-sm text-gray-400">{`Start: ${route.StartStop?.StopName}`}</div>
                  <div className="text-sm text-gray-400">{`End: ${route.EndStop?.StopName}`}</div>
                </div>
              </div>

              {/* Assign Button */}
              <Button
                text='Assign'
                onClick={() => onAssign(route)}
              ></Button>
            </article>
          ))}
        </section>

        {/* Cancel button */}
        <footer className='flex justify-end'>
          <Button onClick={onClose} text='Cancel' bgColor='bg-gray-200' textColor='text-gray-700'></Button>
        </footer>
      </main>
    </div>
  );
};

export default AssignRouteModal;