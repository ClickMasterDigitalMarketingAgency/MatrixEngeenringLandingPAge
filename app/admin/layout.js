// app/admin/layout.jsx
'use client';

import AdminSidebar from '../../components/layout/Sidebar';
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { Navbar as AdminNavbar } from '@/components/layout/AdminNavbar';
import { Toaster } from '@/components/ui/sonner';
import { useState, useEffect } from 'react';

// Mobile sidebar trigger component
function MobileSidebarTrigger() {
  const { toggleSidebar } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <button
      onClick={toggleSidebar}
      className="md:hidden p-2 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}

export default function AdminLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Hidden on mobile by default */}
        <aside
          className={`
          h-full border-r bg-background
          ${
            isMobile
              ? 'fixed inset-y-0 left-0 z-50 hidden data-[state=expanded]:block'
              : 'sticky top-0 w-64'
          }
        `}
        >
          <AdminSidebar />
        </aside>

        {/* Mobile overlay */}
        {isMobile && (
          <div
            className="fixed inset-0 bg-black/50 z-40 hidden data-[state=expanded]:block"
            data-sidebar="overlay"
          />
        )}

        {/* Right side */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex items-center gap-4 p-4 border-b md:hidden">
            <MobileSidebarTrigger />
            <h1 className="text-xl font-semibold">Admin Panel</h1>
          </div>
          <AdminNavbar />
          <main className="flex-1 overflow-y-auto">
            {children}
            <Toaster position="top-right" richColors />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
