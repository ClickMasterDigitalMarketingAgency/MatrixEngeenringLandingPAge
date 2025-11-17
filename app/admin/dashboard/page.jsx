'use client';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  UserPlus,
  Trash2,
  Users,
  Package,
  FolderKanban,
  TrendingUp,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Eye,
  Download,
  Mail,
  Phone,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Shield,
  Settings,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const initialUsers = [
  {
    id: '1',
    name: 'Ali Khan',
    email: 'ali.khan@matrix.com',
    role: 'admin',
    department: 'IT',
    status: 'active',
    lastLogin: '2024-11-20T08:30:00',
    createdAt: '2024-01-15',
    phone: '+1-555-0101',
  },
  {
    id: '2',
    name: 'Sara Ahmed',
    email: 'sara.ahmed@matrix.com',
    role: 'manager',
    department: 'Operations',
    status: 'active',
    lastLogin: '2024-11-20T09:15:00',
    createdAt: '2024-02-20',
    phone: '+1-555-0102',
  },
  {
    id: '3',
    name: 'Bilal Hussain',
    email: 'bilal.hussain@matrix.com',
    role: 'engineer',
    department: 'Engineering',
    status: 'active',
    lastLogin: '2024-11-19T14:20:00',
    createdAt: '2024-03-10',
    phone: '+1-555-0103',
  },
  {
    id: '4',
    name: 'Guest User',
    email: 'guest@matrix.com',
    role: 'viewer',
    department: 'External',
    status: 'inactive',
    lastLogin: '2024-11-10T11:00:00',
    createdAt: '2024-04-05',
    phone: '+1-555-0104',
  },
];

const initialProjects = [
  {
    id: 'p1',
    name: 'Tower Upgrade',
    description: '4G to 5G upgrade for key sites',
    status: 'active',
    assignedTo: ['1', '3'],
    startDate: '2025-01-10',
    endDate: '2025-03-15',
    progress: 45,
    priority: 'high',
  },
  {
    id: 'p2',
    name: 'Fiber Rollout',
    description: 'Metro fiber expansion phase 2',
    status: 'completed',
    assignedTo: ['2'],
    startDate: '2024-09-01',
    endDate: '2024-12-20',
    progress: 100,
    priority: 'medium',
  },
  {
    id: 'p3',
    name: 'IBS Project',
    description: 'In-building solution for mall',
    status: 'on-hold',
    assignedTo: ['3'],
    startDate: '2025-02-01',
    endDate: '2025-05-30',
    progress: 20,
    priority: 'high',
  },
];

const initialInventory = [
  {
    id: 'i1',
    name: 'RF Antenna',
    category: 'RF Equipment',
    quantity: 15,
    unit: 'pcs',
    minimumStock: 10,
    location: 'Warehouse A',
    lastUpdated: '2025-03-01',
    status: 'in-stock',
  },
  {
    id: 'i2',
    name: 'Fiber Patch Cord',
    category: 'Fiber',
    quantity: 8,
    unit: 'pcs',
    minimumStock: 15,
    location: 'Warehouse B',
    lastUpdated: '2025-03-02',
    status: 'low-stock',
  },
  {
    id: 'i3',
    name: 'Rack Mount Switch',
    category: 'Networking',
    quantity: 4,
    unit: 'pcs',
    minimumStock: 5,
    location: 'Warehouse C',
    lastUpdated: '2025-03-03',
    status: 'critical',
  },
  {
    id: 'i4',
    name: 'Battery Bank',
    category: 'Power',
    quantity: 20,
    unit: 'pcs',
    minimumStock: 10,
    location: 'Warehouse A',
    lastUpdated: '2025-03-04',
    status: 'in-stock',
  },
];

const UserManagement = () => {
  // local dummy data, no context
  const [users, setUsers] = useState(initialUsers);
  const [projects] = useState(initialProjects);
  const [inventory] = useState(initialInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'viewer',
    department: '',
    phone: '',
  });

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus =
      statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error('Missing Required Fields', {
        description: 'Please fill in name and email address.',
      });
      return;
    }

    const userToAdd = {
      ...newUser,
      id: Date.now().toString(),
      status: 'active',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUsers((prev) => [...prev, userToAdd]);

    toast.success('User Added Successfully', {
      description: `${newUser.name} has been added to the system.`,
    });

    setNewUser({
      name: '',
      email: '',
      role: 'viewer',
      department: '',
      phone: '',
    });
    setOpen(false);
  };

  const handleDeleteUser = (id, name) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.info('User Removed', {
      description: `${name} has been removed from the system.`,
    });
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-800 border-red-200',
      manager: 'bg-blue-100 text-blue-800 border-blue-200',
      engineer: 'bg-green-100 text-green-800 border-green-200',
      viewer: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[role] ?? 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200',
      suspended: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status] ?? 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Analytics data
  const roleDistribution = [
    {
      name: 'Admin',
      value: users.filter((u) => u.role === 'admin').length,
      color: '#ef4444',
    },
    {
      name: 'Manager',
      value: users.filter((u) => u.role === 'manager').length,
      color: '#3b82f6',
    },
    {
      name: 'Engineer',
      value: users.filter((u) => u.role === 'engineer').length,
      color: '#10b981',
    },
    {
      name: 'Viewer',
      value: users.filter((u) => u.role === 'viewer').length,
      color: '#6b7280',
    },
  ];

  const projectStatusData = [
    {
      name: 'Active',
      value: projects.filter((p) => p.status === 'active').length,
      color: '#10b981',
    },
    {
      name: 'Completed',
      value: projects.filter((p) => p.status === 'completed').length,
      color: '#3b82f6',
    },
    {
      name: 'On Hold',
      value: projects.filter((p) => p.status === 'on-hold').length,
      color: '#f59e0b',
    },
  ];

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

  function getCategoryColor(category) {
    const colors = {
      'RF Equipment': '#8b5cf6',
      Fiber: '#06b6d4',
      Networking: '#f59e0b',
      Power: '#ef4444',
    };
    return colors[category] || '#6b7280';
  }

  const lowStockItems = inventory.filter(
    (item) => item.quantity <= item.minimumStock
  ).length;
  const activeUsers = users.filter((u) => u.status === 'active').length;
  const activeProjects = projects.filter((p) => p.status === 'active').length;

  const systemHealthData = [
    { name: 'Users', value: (activeUsers / users.length) * 100 },
    { name: 'Projects', value: (activeProjects / projects.length) * 100 },
    {
      name: 'Inventory',
      value: ((inventory.length - lowStockItems) / inventory.length) * 100,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Comprehensive system overview and user management
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-300">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white hover-scale shadow-lg">
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="animate-scale-in bg-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-slate-800">
                  Add New User
                </DialogTitle>
                <DialogDescription className="text-slate-600">
                  Create a new user account with specified role and permissions
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-3">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-700"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    placeholder="John Doe"
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    placeholder="john@matrix.com"
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-slate-700"
                  >
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phone: e.target.value })
                    }
                    placeholder="+1-555-0100"
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="department"
                    className="text-sm font-medium text-slate-700"
                  >
                    Department
                  </Label>
                  <Input
                    id="department"
                    value={newUser.department}
                    onChange={(e) =>
                      setNewUser({ ...newUser, department: e.target.value })
                    }
                    placeholder="Engineering"
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="role"
                    className="text-sm font-medium text-slate-700"
                  >
                    Role
                  </Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) =>
                      setNewUser({ ...newUser, role: value })
                    }
                  >
                    <SelectTrigger
                      id="role"
                      className="focus:ring-2 focus:ring-blue-500"
                    >
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="engineer">Engineer</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleAddUser}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  Add User
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  {users.length}
                </div>
                <div className="text-sm text-slate-600">Total Users</div>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200 mt-1"
                >
                  {activeUsers} active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FolderKanban className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  {projects.length}
                </div>
                <div className="text-sm text-slate-600">Total Projects</div>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 mt-1"
                >
                  {activeProjects} active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  {inventory.length}
                </div>
                <div className="text-sm text-slate-600">Inventory Items</div>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200 mt-1"
                >
                  {inventoryByCategory.length} categories
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  {lowStockItems}
                </div>
                <div className="text-sm text-slate-600">Low Stock Alerts</div>
                <Badge
                  variant="outline"
                  className="bg-red-50 text-red-700 border-red-200 mt-1"
                >
                  Needs attention
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              User Role Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of users by access level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={100}
                  innerRadius={60}
                  dataKey="value"
                >
                  {roleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Project Status Overview
            </CardTitle>
            <CardDescription>Current state of all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-600" />
              Inventory by Category
            </CardTitle>
            <CardDescription>Stock levels across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={inventoryByCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis
                  dataKey="category"
                  type="category"
                  stroke="#64748b"
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="quantity" radius={[0, 4, 4, 0]}>
                  {inventoryByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              System Health Monitor
            </CardTitle>
            <CardDescription>
              Overall system performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealthData.map((item, index) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {item.name}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {item.value.toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={item.value}
                    className={`h-2 ${
                      item.value >= 80
                        ? 'bg-green-100'
                        : item.value >= 60
                        ? 'bg-yellow-100'
                        : 'bg-red-100'
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Section */}
      <Card className="bg-white shadow-sm border-slate-200">
        <CardHeader>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-slate-800">User Management</CardTitle>
              <CardDescription>
                Manage user accounts, roles, and permissions
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:min-w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[140px] bg-white border-slate-300 focus:ring-2 focus:ring-blue-500">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="engineer">Engineer</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] bg-white border-slate-300 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">
                No users found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredUsers.map((user, index) => (
                <Card
                  key={user.id}
                  className="border border-slate-200 hover:shadow-md transition-all duration-200 animate-fade-in"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-800 text-lg">
                          {user.name}
                        </h3>
                        <p className="text-slate-600 text-sm">
                          {user.department}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center gap-2 text-red-600"
                            onClick={() => handleDeleteUser(user.id, user.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-slate-400" />
                        <span className="text-slate-600 truncate">
                          {user.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-slate-400" />
                        <span className="text-slate-600">{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <span className="text-slate-600">
                          Joined {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getStatusBadgeColor(user.status)}
                      >
                        {user.status === 'active' ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {user.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
