'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, UserCircle } from 'lucide-react';
import LogoutButton from '@/app/auth/components/logoutbutton'


export default function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full flex justify-end items-center px-6 py-4 bg-white border-b shadow-sm relative">
      <div className="flex items-center space-x-4">
        <span className="text-lg text-gray-600">Your Current Plan: Free</span>
        <button className="bg-gradient-primary hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-md mr-10 cursor-pointer">
          Upgrade
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-1 text-gray-700 hover:text-black focus:outline-none"
          >
            <UserCircle className="w-10 h-10" />
            <ChevronDown className="w-8 h-8" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50">
              <ul className="text-lg text-gray-700">
                <li className="px-6 py-4 hover:bg-gray-100 cursor-pointer">Settings</li>
                <li className="px-6 py-4 cursor-pointer">
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