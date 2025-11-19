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
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Building2,
  MoreVertical,
  Edit,
  Trash2,
  Star,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  User,
  TrendingUp,
  Users,
  Award,
  Activity,
  Calendar,
  Package,
} from 'lucide-react';

const initialVendors = [
  {
    id: '1',
    name: 'SteelCo Industries',
    contactPerson: 'Michael Chen',
    email: 'michael@steelco.com',
    phone: '+1-555-0101',
    category: 'Structural Materials',
    rating: 4.8,
    itemsSupplied: 24,
    status: 'preferred',
    lastOrder: '2024-01-15',
  },
  {
    id: '2',
    name: 'HydroTech Solutions',
    contactPerson: 'Sarah Williams',
    email: 'sarah@hydrotech.com',
    phone: '+1-555-0102',
    category: 'Fluids & Chemicals',
    rating: 4.5,
    itemsSupplied: 12,
    status: 'active',
    lastOrder: '2024-01-10',
  },
  {
    id: '3',
    name: 'SafeGuard Equipment',
    contactPerson: 'James Brown',
    email: 'james@safeguard.com',
    phone: '+1-555-0103',
    category: 'Safety Equipment',
    rating: 4.9,
    itemsSupplied: 18,
    status: 'preferred',
    lastOrder: '2024-01-12',
  },
];

// Enhanced Stat Card Component
const StatCard = ({ title, value, icon: Icon, color, description, trend }) => {
  const colorClasses = {
    blue: 'border-l-primary  bg-secoundry 50',
    emerald: 'border-l-emerald-500 bg-emerald-50/50',
    amber: 'border-l-amber-500 bg-amber-50/50',
    violet: 'border-l-violet-500 bg-violet-50/50',
  };

  const iconColors = {
    blue: 'text-primary/60  bg-primary/10 ',
    emerald: 'text-emerald-600 bg-emerald-100',
    amber: 'text-amber-600 bg-amber-100',
    violet: 'text-violet-600 bg-violet-100',
  };

  return (
    <Card
      className={`border-l-4 ${colorClasses[color]} shadow-sm hover:shadow-md transition-all duration-300`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            {description && (
              <p className="text-xs text-slate-500">{description}</p>
            )}
            {trend && (
              <div
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  trend.value > 0
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                <TrendingUp
                  className={`h-3 w-3 ${trend.value > 0 ? '' : 'rotate-180'}`}
                />
                {trend.value > 0 ? '+' : ''}
                {trend.value}%
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl ${iconColors[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function VendorsManagementPage() {
  const [vendors, setVendors] = useState(initialVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [openVendor, setOpenVendor] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [vendorFormData, setVendorFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: '',
    rating: 5,
  });

  // Get unique categories for filter
  const categories = [...new Set(vendors.map((vendor) => vendor.category))];

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || vendor.status === statusFilter;
    const matchesCategory =
      categoryFilter === 'all' || vendor.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const preferredCount = vendors.filter((v) => v.status === 'preferred').length;
  const activeCount = vendors.filter((v) => v.status === 'active').length;
  const totalItemsSupplied = vendors.reduce(
    (sum, vendor) => sum + vendor.itemsSupplied,
    0
  );
  const averageRating =
    vendors.reduce((sum, vendor) => sum + vendor.rating, 0) / vendors.length;

  const resetVendorForm = () => {
    setVendorFormData({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      category: '',
      rating: 5,
    });
    setEditingVendor(null);
    setOpenVendor(false);
  };

  const handleSubmitVendor = () => {
    if (
      !vendorFormData.name ||
      !vendorFormData.contactPerson ||
      !vendorFormData.email ||
      !vendorFormData.phone
    ) {
      toast.error('Missing Required Fields', {
        description: 'Please fill in all required fields',
      });
      return;
    }

    if (editingVendor) {
      setVendors((prev) =>
        prev.map((v) =>
          v.id === editingVendor.id ? { ...v, ...vendorFormData } : v
        )
      );
      toast.success('Vendor Updated Successfully', {
        description: `${vendorFormData.name} has been updated`,
      });
    } else {
      const newVendor = {
        ...vendorFormData,
        id: Date.now().toString(),
        itemsSupplied: 0,
        status: 'active',
        lastOrder: new Date().toISOString().split('T')[0],
      };
      setVendors((prev) => [...prev, newVendor]);
      toast.success('Vendor Added Successfully', {
        description: `${vendorFormData.name} has been added`,
      });
    }

    resetVendorForm();
  };

  const handleEditVendor = (vendor) => {
    setEditingVendor(vendor);
    setVendorFormData({
      name: vendor.name,
      contactPerson: vendor.contactPerson,
      email: vendor.email,
      phone: vendor.phone,
      category: vendor.category,
      rating: vendor.rating,
    });
    setOpenVendor(true);
  };

  const handleDeleteVendor = (id, name) => {
    setVendors((prev) => prev.filter((v) => v.id !== id));
    toast.info('Vendor Removed', {
      description: `${name} has been removed`,
    });
  };

  const toggleVendorStatus = (id, currentStatus) => {
    setVendors((prev) =>
      prev.map((vendor) =>
        vendor.id === id
          ? {
              ...vendor,
              status: currentStatus === 'preferred' ? 'active' : 'preferred',
            }
          : vendor
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1>Vendor Management</h1>
          <p className="text-slate-600 mt-2 text-lg">
            Manage supplier relationships, performance, and contracts in one
            place.
          </p>
        </div>
        <Dialog open={openVendor} onOpenChange={setOpenVendor}>
          <DialogTrigger asChild>
            <Button onClick={resetVendorForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white rounded-xl border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900">
                {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                {editingVendor ? 'Update' : 'Add new'} vendor to your supplier
                directory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700">
                  Company Name *
                </Label>
                <Input
                  value={vendorFormData.name}
                  onChange={(e) =>
                    setVendorFormData({
                      ...vendorFormData,
                      name: e.target.value,
                    })
                  }
                  placeholder="SteelCo Industries"
                  className="focus:ring-2 focus:ring-primary/50  border-slate-300 transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700">
                  Contact Person *
                </Label>
                <Input
                  value={vendorFormData.contactPerson}
                  onChange={(e) =>
                    setVendorFormData({
                      ...vendorFormData,
                      contactPerson: e.target.value,
                    })
                  }
                  placeholder="John Doe"
                  className="focus:ring-2 focus:ring-primary/50  border-slate-300 transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700">
                  Email *
                </Label>
                <Input
                  type="email"
                  value={vendorFormData.email}
                  onChange={(e) =>
                    setVendorFormData({
                      ...vendorFormData,
                      email: e.target.value,
                    })
                  }
                  placeholder="contact@vendor.com"
                  className="focus:ring-2 focus:ring-primary/50  border-slate-300 transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700">
                  Phone *
                </Label>
                <Input
                  value={vendorFormData.phone}
                  onChange={(e) =>
                    setVendorFormData({
                      ...vendorFormData,
                      phone: e.target.value,
                    })
                  }
                  placeholder="+1-555-0100"
                  className="focus:ring-2 focus:ring-primary/50  border-slate-300 transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700">
                  Category
                </Label>
                <Input
                  value={vendorFormData.category}
                  onChange={(e) =>
                    setVendorFormData({
                      ...vendorFormData,
                      category: e.target.value,
                    })
                  }
                  placeholder="Structural Materials"
                  className="focus:ring-2 focus:ring-primary/50  border-slate-300 transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700">
                  Rating (1-5)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={vendorFormData.rating}
                    onChange={(e) =>
                      setVendorFormData({
                        ...vendorFormData,
                        rating: parseFloat(e.target.value) || 5,
                      })
                    }
                    className="focus:ring-2 focus:ring-primary/50  border-slate-300 transition-all duration-200"
                  />
                  <div className="flex items-center gap-1 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-amber-700">
                      {vendorFormData.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={resetVendorForm}
                className="flex-1 border-slate-300 hover:bg-slate-50 transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitVendor}
                className="flex-1 bg-gradient-to-r from-primary/60  to-primary/70  hover:from-primary/70  hover:to-primary/80  text-white transition-all duration-200 transform hover:scale-105"
              >
                {editingVendor ? 'Update Vendor' : 'Add Vendor'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Vendors"
          value={vendors.length}
          icon={Users}
          color="blue"
          description="All suppliers"
          trend={{ value: 12 }}
        />
        <StatCard
          title="Preferred Vendors"
          value={preferredCount}
          icon={Award}
          color="emerald"
          description="Top performers"
          trend={{ value: 8 }}
        />
        <StatCard
          title="Active Vendors"
          value={activeCount}
          icon={Activity}
          color="amber"
          description="Currently working with"
        />
        <StatCard
          title="Total Items Supplied"
          value={totalItemsSupplied}
          icon={Package}
          color="violet"
          description="Across all vendors"
          trend={{ value: 15 }}
        />
      </div>

      {/* Search and Filters */}
      <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search vendors, categories, contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-slate-300 focus:ring-2 focus:ring-primary/50  transition-all duration-200"
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary/50  focus:border-primary/50  transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="preferred">Preferred</option>
                    <option value="active">Active</option>
                  </select>
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary/50  focus:border-primary/50  transition-all duration-200 bg-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Badge
                variant="secondary"
                className="bg-primary/10  text-primary/70  border-primary/20  shadow-sm"
              >
                {vendors.length} total
              </Badge>
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm"
              >
                {preferredCount} preferred
              </Badge>
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-700 border-amber-200 shadow-sm"
              >
                Avg: {averageRating.toFixed(1)} ⭐
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendors Grid */}
      <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-4 border-b border-slate-100">
          <CardTitle className="text-slate-900 text-xl flex items-center gap-2">
            <Users className="h-5 w-5 text-primary " />
            Vendor Directory
          </CardTitle>
          <CardDescription>
            All suppliers and their performance metrics •{' '}
            {filteredVendors.length} vendors found
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {filteredVendors.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">
                No vendors found
              </h3>
              <p className="text-slate-500 mb-4">
                Try adjusting your search filters or add a new vendor.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
                variant="outline"
                className="border-slate-300 hover:bg-slate-50"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <Card
                  key={vendor.id}
                  className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:border-primary/30  group cursor-pointer bg-gradient-to-br from-white to-slate-50/50"
                >
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center   shadow-sm">
                          <Building2 className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 text-lg group-hover:text-primary  transition-colors line-clamp-1">
                            {vendor.name}
                          </h3>
                          <p className="text-slate-600 text-sm">
                            {vendor.category}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-slate-100"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="border-slate-200 shadow-lg"
                        >
                          <DropdownMenuItem
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => handleEditVendor(vendor)}
                          >
                            <Edit className="h-4 w-4" />
                            Edit Vendor
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() =>
                              toggleVendorStatus(vendor.id, vendor.status)
                            }
                          >
                            <Star className="h-4 w-4" />
                            {vendor.status === 'preferred'
                              ? 'Remove Preferred'
                              : 'Mark as Preferred'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center gap-2 text-red-600 cursor-pointer"
                            onClick={() =>
                              handleDeleteVendor(vendor.id, vendor.name)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Vendor
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Status Badge */}
                    <div className="mb-4">
                      <Badge
                        variant={
                          vendor.status === 'preferred'
                            ? 'default'
                            : 'secondary'
                        }
                        className={
                          vendor.status === 'preferred'
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-sm hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all duration-200'
                        }
                      >
                        {vendor.status === 'preferred' && (
                          <Star className="h-3 w-3 fill-current mr-1" />
                        )}
                        {vendor.status.charAt(0).toUpperCase() +
                          vendor.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 mb-4 text-sm">
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50/50 hover:bg-slate-100 transition-colors duration-200">
                        <User className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-700 font-medium">
                          {vendor.contactPerson}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50/50 hover:bg-slate-100 transition-colors duration-200">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-700 truncate">
                          {vendor.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50/50 hover:bg-slate-100 transition-colors duration-200">
                        <Phone className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-700">{vendor.phone}</span>
                      </div>
                    </div>

                    {/* Footer Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-lg border border-amber-200">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-amber-700 text-sm">
                            {vendor.rating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-slate-500 text-xs">rating</span>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-slate-900 text-lg">
                          {vendor.itemsSupplied}
                        </div>
                        <div className="text-slate-500 text-xs">
                          items supplied
                        </div>
                      </div>
                    </div>

                    {/* Last Order */}
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="h-3 w-3" />
                        Last order:{' '}
                        {new Date(vendor.lastOrder).toLocaleDateString()}
                      </div>
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
}
