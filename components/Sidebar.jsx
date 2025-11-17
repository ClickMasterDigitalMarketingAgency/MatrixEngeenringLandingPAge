'use client';

import {
  Users,
  FolderKanban,
  Package,
  ChevronLeft,
  ChevronRight,
  User,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const menuItems = [
  { title: 'Dashboard', url: '/admin/dashboard', icon: Users },
  { title: 'Projects', url: '/admin/projects', icon: FolderKanban },
  { title: 'Inventory', url: '/admin/inventory', icon: Package },
];

export default function DashboardSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const handleToggle = () => {
    setIsCollapsing(true);
    toggleSidebar();
    setTimeout(() => setIsCollapsing(false), 300);
  };

  const isActive = (url) => {
    return pathname === url || pathname.startsWith(url);
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-5px) rotateY(1deg); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 15px rgba(14, 165, 233, 0.3), 0 0 30px rgba(14, 165, 233, 0.2); }
          50% { box-shadow: 0 0 25px rgba(14, 165, 233, 0.5), 0 0 45px rgba(14, 165, 233, 0.3); }
        }

        @keyframes shimmer {
          0% { background-position: -800px 0; }
          100% { background-position: 800px 0; }
        }

        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateX(-15px) rotateY(-8deg);
          }
          to { 
            opacity: 1; 
            transform: translateX(0) rotateY(0deg);
          }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        .sidebar-3d {
          perspective: 800px;
          transform-style: preserve-3d;
        }

        .sidebar-inner {
          background: linear-gradient(135deg, #e0f2fe
 0%, #e0f2fe
 50%, #bae6fd 100%) !important;
          position: relative;
          overflow: hidden;
          animation: float 8s ease-in-out infinite;
          box-shadow: 
            0 8px 30px rgba(14, 165, 233, 0.3),
            inset 0 0 40px rgba(255, 255, 255, 0.1),
            inset 0 0 70px rgba(255, 255, 255, 0.05);
          border: none !important;
        }

        .sidebar-inner::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 70%
          );
          animation: shimmer 4s infinite;
        }

        .sidebar-inner::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .nav-item {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          transform-style: preserve-3d;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .nav-item:nth-child(1) { animation-delay: 0.1s; }
        .nav-item:nth-child(2) { animation-delay: 0.15s; }
        .nav-item:nth-child(3) { animation-delay: 0.2s; }

        .nav-item:hover {
          transform: translateX(6px) translateZ(15px) scale(1.03);
            color: #0ea5e9; 
            padding: 18px 0 ;
          box-shadow: 
            -3px 3px 15px rgba(0, 0, 0, 0.15),
            inset 0 0 15px rgba(255, 255, 255, 0.15);
        }

        .nav-item.active {
          background: rgba(255, 255, 255, 0.95) !important;
          color: #1e293b !important; /* text-gray-800 */
          padding: 20px 0 !important; /* padding handled by inner Link */
          font-size: 15px !important;
          transform: translateZ(12px) scale(1.02);

          border: 1px solid #e5e7eb !important; /* gray-200 */
          border-left: 3px solid #0ea5e9 !important; /* sky left line */
          border-radius: 6px;

          box-shadow:
            0 8px 20px rgba(14, 165, 233, 0.14),
            0 16px 32px rgba(14, 165, 233, 0.08);

          transition: all 0.25s ease;
        }

        .nav-item.active .icon-container {
          background: none !important;
          border: none !important;
          display: flex;
          align-items: center;
          
        }

        .nav-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s;
        }

        .nav-item:hover::before {
          left: 100%;
          color: #38bdf8; 
        }

        .sparkle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #0ea5e9;
          border-radius: 50%;
          animation: sparkle 3s ease-in-out infinite;
          pointer-events: none;
        }

        .sparkle:nth-child(1) { top: 15%; left: 8%; animation-delay: 0s; }
        .sparkle:nth-child(2) { top: 35%; right: 8%; animation-delay: 1s; }
        .sparkle:nth-child(3) { bottom: 25%; left: 12%; animation-delay: 2s; }
        .sparkle:nth-child(4) { top: 55%; right: 12%; animation-delay: 1.5s; }
      `}</style>

      <TooltipProvider delayDuration={100}>
        <div className="sidebar-3d h-full">
          <UISidebar collapsible="icon" className="sidebar-inner border-none">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary/20 relative z-10">
              {state === 'expanded' && (
                <div className="flex items-center gap-2 animate-in slide-in-from-left-6 duration-300">
                  <div className="logo-glow p-1.5 rounded-lg">
                    <Image
                      src="/logo.png"
                      alt="Industrial steel manufacturing"
                      width={64}
                      height={64}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover"
                      priority
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-primary drop-shadow">
                      MATRIX ENGINEERING
                    </h2>
                    <p className="text-xs text-foreground/70">Admin Panel</p>
                  </div>
                </div>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleToggle}
                    className={cn(
                      'ml-auto rounded-full border border-white/40 bg-white/10 text-white hover:bg-white/20 transition-transform',
                      isCollapsing && 'scale-95'
                    )}
                  >
                    {state === 'expanded' ? (
                      <ChevronLeft className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs">
                  {state === 'expanded' ? 'Collapse' : 'Expand'}
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Menu */}
            <SidebarContent className="px-2 py-4 ">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2">
                    {menuItems.map((item) => {
                      const active = isActive(item.url);
                      const Icon = item.icon;

                      return (
                        <SidebarMenuItem key={item.title} className="mb-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <SidebarMenuButton
                                asChild
                                className={cn(
                                  'nav-item p-0 border-0',
                                  active && 'active'
                                )}
                              >
                                <Link
                                  href={item.url}
                                  onMouseEnter={() =>
                                    setHoveredItem(item.title)
                                  }
                                  onMouseLeave={() => setHoveredItem(null)}
                                  className={cn(
                                    'flex items-center gap-3 w-full px-3 py-3 relative overflow-hidden rounded-lg font-medium',
                                    active
                                      ? 'text-slate-800'
                                      : 'text-foreground-50/90 hover:bg-foreground/15'
                                  )}
                                >
                                  <div className="icon-container p-1.5 rounded-md flex items-center justify-center">
                                    <Icon
                                      className={cn(
                                        'h-4 w-4 transition-transform duration-300',
                                        active
                                          ? 'text-sky-500'
                                          : 'text-foreground',
                                        hoveredItem === item.title &&
                                          'text-sky-400 scale-110 rotate-6'
                                      )}
                                    />
                                  </div>

                                  {state === 'expanded' && (
                                    <span className="animate-in slide-in-from-left-3 duration-300 text-sm font-medium">
                                      {item.title}
                                    </span>
                                  )}
                                </Link>
                              </SidebarMenuButton>
                            </TooltipTrigger>
                            {state !== 'expanded' && (
                              <TooltipContent side="right" className="text-xs">
                                {item.title}
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="p-3">
              {state === 'expanded' ? (
                <div className="animate-in fade-in-50 duration-300">
                  <div className="flex items-center gap-2 p-2  backdrop-blur-sm border-t border-foreground/15 rounded-lg">
                    <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center">
                      <User className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        Admin
                      </p>
                      <p className="text-xs text-foreground/70 truncate">
                        admin@matrix.com
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center border border-primary/20">
                    <User className="h-3.5 w-3.5 text-foreground" />
                  </div>
                </div>
              )}
            </SidebarFooter>
          </UISidebar>
        </div>
      </TooltipProvider>
    </>
  );
}
