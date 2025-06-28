'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, BookOpen, Briefcase, FileCode, Eye, PocketKnife } from 'lucide-react';

import { useEffect, useRef } from 'react';

const navItems = [
  { label: 'Personal Info', icon: User, href: '/builder/sections/personalinfo' },
  { label: 'Education', icon: BookOpen, href: '/builder/sections/education' },
  { label: 'Experience', icon: Briefcase, href: '/builder/sections/experience' },
  { label: 'Projects', icon: FileCode, href: '/builder/sections/project' },
  { label: 'Skills', icon: PocketKnife, href: '/builder/sections/skill' },
  // { label: 'Language', icon: Speech, href: '/builder/sections/language' },
];

export default function Sidebar({
  closeSidebar,
  isMobile,
}: {
  closeSidebar?: () => void;
  isMobile?: boolean;
}) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile) return;

    function handleClickOutside(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        closeSidebar?.();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, closeSidebar]);

  return (
    <div
      className={`md:h-screen`}
    >
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="relative min-h-screen  w-64 flex flex-col bg-gray-50 border-r shadow-sm px-2 py-6 z-50"
      >
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <img src="/binarytree-logo.png" alt="Logo" className="rounded-full px-4 mb-2" />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {navItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              onClick={closeSidebar}
              className={`flex items-center space-x-3 p-3 rounded-md text-base font-medium ${
                pathname.startsWith(href)
                  ? 'bg-primary-op20 text-gradient-primary-1'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Button */}
        <div className="mt-auto pt-6">
          <Link href="/builder/preview">
            <button className="flex justify-center items-center gap-4 align-middle cursor-pointer w-full bg-gradient-primary-1 hover:bg-blue-700 text-white text-base p-4 rounded-md">
              <Eye className="w-4 h-4" />
              Preview Portfolio
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
