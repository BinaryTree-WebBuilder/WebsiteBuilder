'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, UserCircle } from 'lucide-react';
import LogoutButton from '@/app/auth/components/logoutbutton'


export default function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
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
    <div className="w-full flex justify-end items-center p-2 bg-white border-b shadow-sm relative">
      <div className="flex items-center space-x-4">
        <span className="text-md text-gray-600">Your Current Plan: Free</span>
        <button className="bg-gradient-primary hover:bg-blue-700 text-white text-md p-3 rounded-md mr-10 cursor-pointer">
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

                <li className="p-4 cursor-pointer hover:bg-gray-100 cursor-pointer">
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