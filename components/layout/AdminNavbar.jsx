'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Settings, Bell, User2, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef(null);

  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  // Close navbar when clicking outside (for mobile menu)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navbarRef}
      className={`sticky top-0 z-50  backdrop-blur-md border-b border-border transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Left side: Search bar */}
          <div className="flex-1 lg:flex-none">
            <div className="relative max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full lg:w-64 pl-10 pr-3 py-1.5 rounded-md border border-border text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/50"
              />
            </div>
          </div>

          {/* Right side: Settings + Notifications + Profile + Logout */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Settings */}
            <button
              className="p-2 rounded-full border border-border hover:bg-muted hover:scale-105 transition-all duration-200 hover:shadow-md"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4 transition-transform duration-200 hover:rotate-90" />
            </button>

            {/* Notifications */}
            <button
              className="p-2 rounded-full border border-border hover:bg-muted hover:scale-105 transition-all duration-200 hover:shadow-md relative group"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 transition-transform duration-200 group-hover:shake" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-secondary transition-all duration-300 hover:scale-125" />
            </button>

            {/* User Profile */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/40 hover:bg-muted hover:scale-105 transition-all duration-200 hover:shadow-md group">
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                <User2 className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-sm font-medium transition-colors duration-200 group-hover:text-primary">
                Admin
              </span>
            </button>

            {/* Logout -> link to "/" */}
            <Link href="/">
              <Button
                variant="ghost"
                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 hover:scale-105 transition-all duration-200 hover:shadow-md group"
              >
                <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                Logout
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden rounded-md p-2 transition-all duration-300 text-gray-800 hover:bg-primary hover:text-white hover:scale-105 hover:shadow-md"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileMenuOpen
              ? 'max-h-64 opacity-100 pb-3 border-t border-border'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-3 pt-3">
            {/* Search - moved to top for better mobile UX */}
            <div className="transition-all duration-300 delay-100">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-200" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-3 py-2 rounded-md border border-border text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/50"
                />
              </div>
            </div>

            {/* Icons row */}
            <div className="flex items-center justify-between gap-3 transition-all duration-300 delay-200">
              <div className="flex items-center gap-3">
                <button
                  className="p-2 rounded-full border border-border hover:bg-muted hover:scale-105 transition-all duration-200 hover:shadow-md"
                  aria-label="Settings"
                >
                  <Settings className="w-4 h-4 transition-transform duration-200 hover:rotate-90" />
                </button>

                <button
                  className="p-2 rounded-full border border-border hover:bg-muted hover:scale-105 transition-all duration-200 hover:shadow-md relative group"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4 transition-transform duration-200 group-hover:shake" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-secondary transition-all duration-300 hover:scale-125" />
                </button>

                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/40 hover:bg-muted hover:scale-105 transition-all duration-200 hover:shadow-md group">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <User2 className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="text-sm font-medium transition-colors duration-200 group-hover:text-primary">
                    Admin
                  </span>
                </button>
              </div>

              {/* Logout -> link to "/" */}
              <Link href="/">
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 hover:scale-105 transition-all duration-200 hover:shadow-md group"
                >
                  <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }
        .hover\\:shake:hover {
          animation: shake 0.5s ease-in-out;
        }
        .group:hover .group-hover\\:shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </nav>
  );
}
