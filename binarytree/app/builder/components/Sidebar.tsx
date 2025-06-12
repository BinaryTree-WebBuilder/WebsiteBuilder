'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, BookOpen, Briefcase, FileText } from 'lucide-react';

const navItems = [
  { label: 'Personal Info', icon: User, href: '/builder/sections/personalinfo' },
  { label: 'Education', icon: BookOpen, href: '/builder/sections/education' },
  { label: 'Experience', icon: Briefcase, href: '/experience' },
  { label: 'Projects', icon: FileText, href: '/projects' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 flex flex-col bg-white border-r shadow-sm px-4 py-6">
      {/* Logo */}
      <div className="mb-10 flex justify-center">
        <Image src="/binarytree-logo.png" alt="Logo" width={80} height={80} className="rounded-full" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {navItems.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center space-x-3 px-4 py-4 rounded-md text-md font-medium ${
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
        <button className="w-full bg-gradient-primary-1 hover:bg-blue-700 text-white text-md p-4 rounded-md">
          Preview Portfolio
        </button>
        </Link>

      </div>
    </div>
  );
}
