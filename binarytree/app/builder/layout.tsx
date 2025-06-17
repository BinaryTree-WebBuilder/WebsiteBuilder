'use client';

import Topbar from '@/app/builder/components/Topbar'
import Sidebar from '@/app/builder/components/Sidebar'
import { useState } from 'react';

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`
          transition-transform transform bg-white shadow-md w-64
          fixed inset-y-0 left-0 z-51 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:!static md:!translate-x-0 md:!block
        `}
      >
        <Sidebar closeSidebar={closeSidebar} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-auto">
        <Topbar toggleSidebar={toggleSidebar} />
        <main className="p-4 mt-20">{children}</main>
      </div>
    </div>
  );
}
