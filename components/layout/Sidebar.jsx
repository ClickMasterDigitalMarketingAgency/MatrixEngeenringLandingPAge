'use client';

import {
  LayoutDashboard,
  FolderKanban,
  Package,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  User,
  BarChart3,
  Settings,
  Truck,
  ClipboardList,
  Users,
  Building,
  HelpCircle,
  Phone,
  FileText,
  Target,
  ListTree,
  History,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

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
  {
    title: 'Overview',
    icon: LayoutDashboard,
    children: [
      {
        title: 'Dashboard',
        url: '/admin/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'Analytics',
        url: '/admin/analytics',
        icon: BarChart3,
      },
    ],
  },
  {
    title: 'Inventory Management',
    icon: Package,
    children: [
      {
        title: 'Material Items',
        url: '/admin/inventory/materials',
        icon: Package,
      },
      {
        title: 'Stock In / Stock Out',
        url: '/admin/inventory/stock-transactions',
        icon: ClipboardList,
      },
      {
        title: 'Inventory History',
        url: '/admin/inventory/history',
        icon: History,
      },
      {
        title: 'Material Categories',
        url: '/admin/inventory/categories',
        icon: ListTree,
      },
      {
        title: 'Vendors & Suppliers',
        url: '/admin/inventory/vendors',
        icon: Truck,
      },
      {
        title: 'Purchase Orders',
        url: '/admin/inventory/purchase-orders',
        icon: ShoppingCart,
      },
    ],
  },
  {
    title: 'Project Management',
    icon: FolderKanban,
    children: [
      {
        title: 'All Projects',
        url: '/admin/project-management/projects',
        icon: FolderKanban,
      },
      // {
      //   title: 'Project Details',
      //   url: '/admin/projects/details',
      //   icon: FileText,
      //   children: [
      //     {
      //       title: 'Assigned Material',
      //       url: '/admin/projects/assigned-material',
      //     },
      //     {
      //       title: 'Tasks & Milestones',
      //       url: '/admin/projects/tasks-milestones',
      //     },
      //     {
      //       title: 'Team Members',
      //       url: '/admin/projects/team-members',
      //     },
      //     {
      //       title: 'Site Surveys',
      //       url: '/admin/projects/site-surveys',
      //     },
      //     {
      //       title: 'Project Reports',
      //       url: '/admin/projects/reports',
      //     },
      //   ],
      // },
      {
        title: 'Task Management',
        url: '/admin/project-management/tasks',
        icon: ClipboardList,
      },
      {
        title: 'Material Allocation',
        url: '/admin/project-management/material-allocation',
        icon: Package,
      },
      {
        title: 'Project Progress Tracking',
        url: '/admin/project-management/progress',
        icon: Target,
      },
    ],
  },
  {
    title: 'Users & Roles',
    icon: Users,
    children: [
      {
        title: 'All Users',
        url: '/admin/users/allUsers',
        icon: Users,
      },
      {
        title: 'Roles & Permissions',
        url: '/admin/users/roles',
        icon: Settings,
      },
      {
        title: 'Activity Logs',
        url: '/admin/users/activity-logs',
        icon: History,
      },
    ],
  },
  {
    title: 'Company Management',
    icon: Building,
    children: [
      {
        title: 'Departments',
        url: '/admin/company/departments',
        icon: Building,
      },
      {
        title: 'Teams',
        url: '/admin/company/teams',
        icon: Users,
      },
      {
        title: 'Clients',
        url: '/admin/company/clients',
        icon: User,
      },
    ],
  },
  {
    title: 'Settings',
    icon: Settings,
    children: [
      {
        title: 'System Settings',
        url: '/admin/settings/system',
        icon: Settings,
      },
      {
        title: 'Profile Settings',
        url: '/admin/settings/profile',
        icon: User,
      },
      {
        title: 'Notifications',
        url: '/admin/settings/notifications',
        icon: ClipboardList,
      },
    ],
  },
  {
    title: 'Support',
    icon: HelpCircle,
    children: [
      {
        title: 'Help Center',
        url: '/admin/support/help',
        icon: HelpCircle,
      },
      {
        title: 'Contact Support',
        url: '/admin/support/contact',
        icon: Phone,
      },
    ],
  },
];

// Flatten the menu structure for easier navigation
const flattenMenuItems = (items) => {
  const flatItems = [];
  
  items.forEach(item => {
    if (item.children) {
      item.children.forEach(child => {
        if (child.children) {
          // Handle nested children (like in Project Details)
          child.children.forEach(nestedChild => {
            flatItems.push({
              ...nestedChild,
              url: nestedChild.url,
            });
          });
        } else {
          flatItems.push({
            ...child,
            url: child.url,
          });
        }
      });
    }
  });
  
  return flatItems;
};

export default function DashboardSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  const [isCollapsing, setIsCollapsing] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggle = () => {
    setIsCollapsing(true);
    toggleSidebar();
    setTimeout(() => setIsCollapsing(false), 300);
  };

  const isActive = (url) => {
    if (!url) return false;
    return pathname === url || pathname.startsWith(url);
  };

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isSectionOpen = (title) => {
    return openSections[title] ?? false;
  };

  const renderMenuItems = (items, level = 0) => {
    return items.map((item, index) => {
      const hasChildren = !!item.children?.length;
      const sectionOpen = hasChildren ? isSectionOpen(item.title) : false;
      const Icon = item.icon;

      const sectionActive = hasChildren && 
        item.children.some(child => {
          if (child.children) {
            return child.children.some(nestedChild => isActive(nestedChild.url));
          }
          return isActive(child.url);
        });

      // Simple item with URL
      if (!hasChildren && item.url) {
        const active = isActive(item.url);

        return (
          <SidebarMenuItem
            key={item.title}
            className="mb-2 slide-in-item"
            style={{ 
              animationDelay: `${index * 0.05}s`,
              marginLeft: level > 0 ? `${level * 12}px` : '0'
            }}
          >
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
                    onMouseEnter={() => setHoveredItem(item.title)}
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
                            'text-sky-400 scale-110'
                        )}
                      />
                    </div>

                    {state === 'expanded' && (
                      <span className={cn(
                        "text-sm font-medium menu-text",
                        level > 0 && "menu-text-child"
                      )}>
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
      }

      // Parent item with children
      return (
        <div
          key={item.title}
          className="mb-2 slide-in-item"
          style={{ 
            animationDelay: `${index * 0.05}s`,
            marginLeft: level > 0 ? `${level * 12}px` : '0'
          }}
        >
          <SidebarMenuItem className="mb-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    'nav-item p-0 border-0 cursor-pointer',
                    sectionActive && 'active'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(item.title)}
                    onMouseEnter={() => setHoveredItem(item.title)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn(
                      'flex items-center justify-between gap-2 w-full px-3 py-3 relative overflow-hidden rounded-lg font-medium',
                      sectionActive
                        ? 'text-slate-800'
                        : 'text-foreground-50/90 hover:bg-foreground/15'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="icon-container p-1.5 rounded-md flex items-center justify-center flex-shrink-0">
                        <Icon
                          className={cn(
                            'h-4 w-4 transition-transform duration-300',
                            sectionActive
                              ? 'text-sky-500'
                              : 'text-foreground',
                            hoveredItem === item.title &&
                              'text-sky-400 scale-110'
                          )}
                        />
                      </div>

                      {state === 'expanded' && (
                        <span className="text-sm font-medium menu-text flex-1">
                          {item.title}
                        </span>
                      )}
                    </div>

                    {state === 'expanded' && (
                      <div className="flex items-center flex-shrink-0">
                        {sectionOpen ? (
                          <ChevronUp className="h-4 w-4 text-slate-500 transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-500 transition-transform duration-300" />
                        )}
                      </div>
                    )}
                  </button>
                </SidebarMenuButton>
              </TooltipTrigger>
              {state !== 'expanded' && (
                <TooltipContent side="right" className="text-xs">
                  {item.title}
                </TooltipContent>
              )}
            </Tooltip>
          </SidebarMenuItem>

          {/* Children list with animation */}
          {sectionOpen && item.children && (
            <div
              className={cn(
                'ml-2 border-l border-white/30 pl-1 space-y-1',
                'dropdown-enter'
              )}
            >
              {renderMenuItems(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <style>{`
        .mobile-sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 40;
          display: none;
        }
        
        .mobile-sidebar-overlay.active {
          display: block;
        }
        
        .sidebar-container {
          height: 100vh;
          position: relative;
          z-index: 50;
        }
        
        @media (max-width: 768px) {
          .sidebar-container {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            z-index: 50 !important;
          }
          
          .sidebar-inner {
            height: 100vh !important;
            width: 280px !important;
            animation: none !important;
            transform: none !important;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1) !important;
          }
        }

        .sidebar-inner {
          background: linear-gradient(135deg, #e0f2fe 0%, #e0f2fe 50%, #bae6fd 100%) !important;
          position: relative;
          overflow: hidden;
          border: none !important;
        }

        .nav-item {
          transition: all 0.3s ease;
          position: relative;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          min-height: 44px;
        }

        .nav-item:hover {
          transform: translateX(6px);
          color: #0ea5e9; 
          box-shadow: -3px 3px 15px rgba(0, 0, 0, 0.15);
        }

        .nav-item.active {
          background: rgba(255, 255, 255, 0.95) !important;
          color: #1e293b !important;
          border: 1px solid #e5e7eb !important;
          border-left: 3px solid #0ea5e9 !important;
          border-radius: 6px;
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.14);
        }

        /* Text truncation for long menu items */
        .menu-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 160px;
          display: block;
          transition: all 0.3s ease;
        }

        .menu-text-child {
          max-width: 140px;
        }

        /* Smooth animations for dropdown */
        .dropdown-enter {
          animation: dropdownEnter 0.3s ease-out forwards;
        }

        .dropdown-exit {
          animation: dropdownExit 0.2s ease-in forwards;
        }

        @keyframes dropdownEnter {
          from {
            opacity: 0;
            transform: translateY(-10px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px;
          }
        }

        @keyframes dropdownExit {
          from {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px;
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
            max-height: 0;
          }
        }

        /* Slide in animation for menu items */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .slide-in-item {
          animation: slideIn 0.2s ease-out forwards;
        }

        /* Mobile touch improvements */
        @media (max-width: 768px) {
          .nav-item {
            min-height: 48px !important;
          }
          
          .nav-item:hover {
            transform: none;
          }

          .menu-text {
            max-width: 200px;
          }

          .menu-text-child {
            max-width: 180px;
          }
        }

        @media (hover: none) {
          .nav-item:hover {
            transform: none;
          }
        }
      `}</style>

      {/* Mobile overlay */}
      {isMobile && state === 'expanded' && (
        <div className="mobile-sidebar-overlay active" onClick={handleToggle} />
      )}

      <TooltipProvider delayDuration={100}>
        <div className="sidebar-container">
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
                    <h1 className="text-xs text-foreground/70">Admin Panel</h1>
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
            <SidebarContent className="px-2 py-4">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2">
                    {renderMenuItems(menuItems)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="p-3">
              {state === 'expanded' ? (
                <div className="animate-in fade-in-50 duration-300">
                  <div className="flex items-center gap-2 p-2 backdrop-blur-sm border-t border-foreground/15 rounded-lg">
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