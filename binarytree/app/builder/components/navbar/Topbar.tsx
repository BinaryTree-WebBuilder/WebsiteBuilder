'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, UserCircle, Menu } from 'lucide-react';
import LogoutButton from '@/app/auth/components/logoutbutton';

export default function Topbar({
  toggleSidebar,
  isOverlaying = false,
}: {
  toggleSidebar: () => void;
  isOverlaying?: boolean;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-4 py-3 bg-gray-50 border-b shadow-sm transition-all ${
        isOverlaying ? 'z-[30]' : 'z-[40]' // keep consistent
      }`}
    >
      {/* Hamburger for mobile */}
      <div className="md:hidden">
        <button onClick={toggleSidebar}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div className="flex items-center space-x-4 ml-auto">
        <button className="bg-gradient-primary hover:bg-gradient-secondary text-white text-md py-3 px-6 font-semibold cursor-pointer rounded-md">
          Upgrade
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-1 text-gray-700 hover:text-black focus:outline-none"
          >
            <UserCircle className="w-8 h-8" />
            <ChevronDown className="w-6 h-6" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50">
              <ul className="text-md text-gray-700">
                <li className="p-4 hover:bg-gray-100 cursor-pointer">Settings</li>
                <li className="p-4 cursor-pointer hover:bg-gray-100">
                  <LogoutButton />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
