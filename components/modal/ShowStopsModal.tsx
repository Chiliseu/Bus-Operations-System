'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import SearchBar from '@/components/ui/SearchBar';
import DropdownButton from '../ui/DropdownButton';
import { Stop } from '@/app/interface'; // Importing the Stop interface
import { fetchStopsWithToken } from '@/lib/apiCalls/stops';

// OLD STOP INTERFACE
// interface Stop {
//   StopID: string;
//   StopName: string;
//   Location: string;
//   image: string | null;
// }

const ShowStopsModal = ({ 
  onClose,
  onAssign, 
}: { 
  onClose: () => void;
  onAssign: (stop: Stop) => void; 
}) => {

  const [stops, setStops] = useState<Stop[]>([]);

  useEffect(() => {
    const loadStops = async () => {
      try {
        const data = await fetchStopsWithToken();
        setStops(data);
        setFilteredStops(data);
      } catch (error) {
        console.error('Error fetching stops:', error);
      }
    };

    loadStops();
  }, []);

  const [filteredStops, setFilteredStops] = useState(stops);
  const [searchTerm, setSearchTerm] = useState('');

  const dropdownItems = [
    {
      name: 'All',
      action: () => {
        setFilteredStops(stops);
      },
    },
    {
      name: 'Alphabetical',
      action: () => {
        const sorted = [...filteredStops].sort((a, b) => a.StopName.localeCompare(b.StopName));
        setFilteredStops(sorted);
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/20" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)", zIndex: 1060 }}>
      <main className="w-[720px] h-[600px] rounded-lg bg-white shadow-xl p-4 flex flex-col border border-gray-300">
        {/* Search Bar */}
        <header className="mb-4">
          <SearchBar
            placeholder="Search Stop"
            value={searchTerm}
            onChange={(e) => {
              const text = e.target.value;
              setSearchTerm(text);
              const filtered = stops.filter((stop) =>
                stop.StopID.toLowerCase().includes(text.toLowerCase()) ||
                stop.StopName.toLowerCase().includes(text.toLowerCase()) ||
                stop.longitude.toLowerCase().includes(text.toLowerCase()) ||
                stop.latitude.toLowerCase().includes(text.toLowerCase())
              );
              setFilteredStops(filtered);
            }}
          />
        </header>

        {/* Title and Filter section */}
        <nav className="px-3 flex justify-between items-center mb-2">
          <div className="font-medium text-lg">Available Stops</div>
          <div className="flex items-center">
            <div className="font-medium mr-3">Filter</div>
            <DropdownButton dropdownItems={dropdownItems} />
          </div>
        </nav>

        {/* Stop List Section */}
        <section className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 mb-4">
          {filteredStops.map((stop, index) => (
            <article
              key={index}
              className="rounded-lg my-1 px-3 flex items-center h-20 bg-gray-50 hover:bg-gray-100 cursor-pointer text-black justify-between"
            >
              <div className="flex items-center gap-3">
                {/* Stop Icon */}
                <div className="bg-gray-200 rounded-2xl h-20 w-20 flex items-center relative overflow-hidden">
                  <Image
                    src={'/assets/images/bus-fallback.png'}
                    alt="Bus"
                    className="object-cover"
                    fill
                  />
                </div>
                {/* Stop Details */}
                <div className='flex flex-col items-start'>
                  <div className="flex gap-2 items-center">
                    <div>{stop.StopName}</div>
                    <div className="text-sm text-gray-400">Stop</div>
                  </div>
                  <div className="text-sm text-gray-400">{`ID: ${stop.StopID}`}</div>
                  <div className="text-sm text-gray-400">{`${stop.latitude} , ${stop.longitude}`}</div>
                </div>
              </div>
              {/* Assign Button */}
              <Button 
                text="Assign"
                onClick={() => onAssign(stop)}
              />
              
            </article>
          ))}
        </section>

        {/* Cancel button */}
        <footer className="flex justify-end">
          <Button
            onClick={onClose}
            text="Cancel"
            bgColor="bg-gray-200"
            textColor="text-gray-700"
          />
        </footer>
      </main>
    </div>
  );
};

export default ShowStopsModal;