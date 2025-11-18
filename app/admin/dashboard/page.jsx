'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Users, FolderKanban, Package, AlertTriangle } from 'lucide-react';

import dynamic from 'next/dynamic';

// Lazy-loaded components (unchanged)
const AdminHeader = dynamic(
  () => import('@/components/dashboard/AdminHeader'),
  {
    loading: () => (
      <div className="h-16 rounded-lg bg-muted animate-pulse mb-4" />
    ),
  }
);

const StatsCards = dynamic(() => import('@/components/dashboard/StatsCards'), {
  loading: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-28 rounded-lg bg-muted animate-pulse" />
      ))}
    </div>
  ),
});

const AnalyticsCharts = dynamic(
  () => import('@/components/dashboard/AnalyticsCharts'),
  {
    loading: () => (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-80 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    ),
  }
);

const UserManagementSection = dynamic(
  () => import('@/components/dashboard/UserManagementSection'),
  {
    loading: () => <div className="h-96 rounded-lg bg-muted animate-pulse" />,
  }
);

// MOCK DATA (unchanged)
const initialUsers = [
  /* ... same as yours ... */
];
const initialProjects = [
  /* ... same as yours ... */
];
const initialInventory = [
  /* ... same as yours ... */
];

function getCategoryColor(category) {
  const colors = {
    'RF Equipment': '#8b5cf6',
    Fiber: '#06b6d4',
    Networking: '#f59e0b',
    Power: '#ef4444',
  };
  return colors[category] || '#6b7280';
}

const UserManagementPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [projects] = useState(initialProjects);
  const [inventory] = useState(initialInventory);

  // derived values (unchanged)
  const activeUsers = users.filter((u) => u.status === 'active').length;
  const activeProjects = projects.filter((p) => p.status === 'active').length;
  const lowStockItems = inventory.filter(
    (item) => item.quantity <= item.minimumStock
  ).length;

  const inventoryByCategory = inventory.reduce((acc, item) => {
    const existing = acc.find((i) => i.category === item.category);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      acc.push({
        category: item.category,
        quantity: item.quantity,
        color: getCategoryColor(item.category),
      });
    }
    return acc;
  }, []);

  const roleDistribution = [
    /* ... unchanged ... */
  ];
  const projectStatusData = [
    /* ... unchanged ... */
  ];
  const systemHealthData = [
    /* ... unchanged ... */
  ];

  // handlers (unchanged)
  const handleAddUser = (payload) => {
    const userToAdd = {
      ...payload,
      id: Date.now().toString(),
      status: 'active',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUsers((prev) => [...prev, userToAdd]);

    toast.success('User Added Successfully', {
      description: `${payload.name} has been added to the system.`,
    });
  };

  const handleDeleteUser = (id, name) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.info('User Removed', {
      description: `${name} has been removed from the system.`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      <AdminHeader onAddUser={handleAddUser} />

      {/* Responsive Stats Grid */}
      <StatsCards
        usersCount={users.length}
        activeUsers={activeUsers}
        projectsCount={projects.length}
        activeProjects={activeProjects}
        inventoryCount={inventory.length}
        categoryCount={inventoryByCategory.length}
        lowStockItems={lowStockItems}
      />

      {/* Responsive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCharts
          roleDistribution={roleDistribution}
          projectStatusData={projectStatusData}
          inventoryByCategory={inventoryByCategory}
          systemHealthData={systemHealthData}
        />
      </div>

      {/* User table – ensure the component itself is responsive */}
      <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
        <UserManagementSection users={users} onDeleteUser={handleDeleteUser} />
      </div>
    </div>
  );
};

export default UserManagementPage;
