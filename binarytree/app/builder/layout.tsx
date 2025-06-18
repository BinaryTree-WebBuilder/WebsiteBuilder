'use client';

import Topbar from '@/app/builder/components/Topbar';
import Sidebar from '@/app/builder/components/Sidebar';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const toggleSidebar = () => {
    if (isMobile) setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  // Lock scroll on mobile when sidebar is open
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isSidebarOpen]);

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="h-full w-64 z-[60] bg-white border-r shadow-md">
          <Sidebar isMobile={false} />
        </div>
      )}

      {/* Mobile Sidebar + Push Content */}
      {isMobile ? (
        <>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                key="sidebar"
                className="fixed top-0 left-0 h-full w-64 z-[60] bg-white border-r shadow-md"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.25 }}
              >
                <Sidebar closeSidebar={closeSidebar} isMobile={true} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pushable Content */}
          <motion.div
            animate={{ x: isSidebarOpen ? 256 : 0 }} // 256px = 64 * 4 (Tailwind w-64)
            transition={{ type: 'tween', duration: 0.25 }}
            className="flex-1 flex flex-col overflow-hidden relative z-[40] bg-gray-50"
          >
            <Topbar toggleSidebar={toggleSidebar} isOverlaying={isSidebarOpen} />
            <main className="p-4 mt-20 min-h-screen">{children}</main>
          </motion.div>
        </>
      ) : (
        // Desktop Content
        <div className="flex-1 flex flex-col overflow-auto">
          <Topbar toggleSidebar={toggleSidebar} isOverlaying={false} />
          <main className="p-4 mt-20 bg-gray-50 min-h-screen">{children}</main>
        </div>
      )}
    </div>
  );
}
