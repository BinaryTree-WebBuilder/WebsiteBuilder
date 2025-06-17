'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, BookOpen, Briefcase, FileText, X } from 'lucide-react';
import {
  Eye,
} from "lucide-react"

const navItems = [
  { label: 'Personal Info', icon: User, href: '/builder/sections/personalinfo' },
  { label: 'Education', icon: BookOpen, href: '/builder/sections/education' },
  { label: 'Experience', icon: Briefcase, href: '/builder/sections/experience' },
  { label: 'Projects', icon: FileText, href: '/builder/sections/projects' },
];

export default function Sidebar({ closeSidebar }: { closeSidebar?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="h-full w-64 flex flex-col bg-white border-r shadow-sm px-2 py-6">
      {/* Close button on mobile */}
      <div className="md:!hidden flex justify-end mb-4">
        <button onClick={closeSidebar}>
          <X className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Logo */}
      <div className="mb-4 flex justify-center">
        <img src="/binarytree-logo.png" alt="Logo" className="rounded-full p-4" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {navItems.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            onClick={closeSidebar}
            className={`flex items-center space-x-3 px-4 py-4 rounded-md text-base font-medium ${
              pathname === href
                ? 'bg-blue-100 text-blue-600'
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
        <Link href="/builder">
          <button className="flex justify-center items-center gap-2 align-middle cursor-pointer w-full bg-gradient-primary-1 hover:bg-blue-700 text-white text-md p-4 rounded-md">
            <Eye className="w-5 h-5" />
            Preview Portfolio
          </button>
        </Link>
      </div>
    </div>
  );
}
