// app/admin/layout.jsx
'use client';

import AdminSidebar from '../../components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Navbar as AdminNavbar } from '@/components/layout/AdminNavbar';
import { Toaster } from '@/components/ui/sonner';


export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 h-full sticky top-0 border-r bg-background">
          <AdminSidebar />
        </aside>

        {/* Right side */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <AdminNavbar />
          <main className="flex-1 overflow-y-auto">
            {children}
            <Toaster position="top-right"  richColors />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
