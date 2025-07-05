'use client';

import Topbar from '@/app/builder/components/navbar/Topbar';
import Sidebar from '@/app/builder/components/navbar/Sidebar';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from "sonner";


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
  const [previewMode, setPreviewMode] = useState(false); // 👈 new state
  const isMobile = useMediaQuery('(max-width: 768px)');

  const toggleSidebar = () => {
    if (isMobile) setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  const togglePreviewMode = () => setPreviewMode(prev => !prev); // 👈 toggle function

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
      {/* 🧭 Toggle Button */}
      <button
        onClick={togglePreviewMode}
        className="fixed bottom-4 right-4 z-[100] bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        {previewMode ? 'Exit Full View' : 'Preview Full View'}
      </button>

      {/* Sidebar hidden in preview mode */}
      {!isMobile && !previewMode && (
        <div className="h-full w-64 z-[60] bg-white border-r shadow-md">
          <Sidebar isMobile={false} />
        </div>
      )}

      {isMobile ? (
        <>
          <AnimatePresence>
            {!previewMode && isSidebarOpen && (
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

          <motion.div
            animate={{ x: isSidebarOpen && !previewMode ? 256 : 0 }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="flex-1 flex flex-col overflow-hidden relative z-[40] bg-gray-50"
          >
            {!previewMode && (
              <Topbar toggleSidebar={toggleSidebar} isOverlaying={isSidebarOpen} />
            )}
            <main className="py-4 my-15 min-h-screen overflow-auto">{children}</main>
          </motion.div>
        </>
      ) : (
        <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
          {!previewMode && (
            <Topbar toggleSidebar={toggleSidebar} isOverlaying={false} />
          )}
          <main className="p-4 mt-20">{children}</main>
        </div>
      )}

      <Toaster richColors position="bottom-right" />
    </div>
  );
}
