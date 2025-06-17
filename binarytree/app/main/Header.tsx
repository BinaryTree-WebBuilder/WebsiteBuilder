'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react' // Icons from Lucide

export const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev)
  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" onClick={closeMenu}>
              <img
                src="/binarytree-logo.png"
                alt="BinaryTree Logo"
                className="h-8 object-contain cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:!flex items-center space-x-10 text-base">
            <Link href="/main/features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
            <Link href="/main/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
            <Link href="/main/portfolio" className="text-gray-600 hover:text-gray-900 transition-colors">Portfolio</Link>
            <Link href="/main/faq" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</Link>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:!flex items-center space-x-5">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="cursor-pointer text-base px-5 py-6">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="cursor-pointer bg-gradient-primary hover:opacity-90 text-white text-base px-5 py-6" size="sm">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-gray-900 focus:outline-none">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 px-2 pb-4 animate-slide-down">
            <Link href="/main/features" onClick={closeMenu} className="py-4 block text-gray-700 hover:text-gray-900 text-base">Features</Link>
            <Link href="/main/pricing" onClick={closeMenu} className="py-4 block text-gray-700 hover:text-gray-900 text-base">Pricing</Link>
            <Link href="/main/portfolio" onClick={closeMenu} className="py-4 block text-gray-700 hover:text-gray-900 text-base">Portfolio</Link>
            <Link href="/main/faq" onClick={closeMenu} className="py-4 block text-gray-700 hover:text-gray-900 text-base">FAQ</Link>
            <hr className="my-4" />
            <Link href="/auth/login" className="py-4 block text-gray-700 hover:text-gray-900 text-base text-center" onClick={closeMenu}>
              <Button variant="ghost" className="">Login</Button>
            </Link>
            <Link href="/auth/register" onClick={closeMenu} className="">
              <Button className="p-6 bg-gradient-primary w-full text-white ">Get Started Free</Button>
            </Link>

          </div>
        )}
      </div>
    </header>
  )
}
