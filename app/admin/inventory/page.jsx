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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

import {
  PackagePlus,
  Trash2,
  AlertTriangle,
  Edit,
  Building2,
  Star,
  Search,
  Filter,
  MoreVertical,
  Package,
  Truck,
  BarChart3,
  Download,
  Upload,
  Eye,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// ------- LOCAL MOCK DATA (NO CONTEXT) -------

const initialInventory = [
  {
    id: '1',
    name: 'Steel Beams I-Type',
    category: 'Structural',
    quantity: 150,
    unit: 'units',
    minimumStock: 50,
    location: 'Warehouse A',
    lastUpdated: '2024-11-15',
    vendorId: '1',
    status: 'in-stock',
    value: 45000,
  },
  {
    id: '2',
    name: 'Hydraulic Fluid ISO 46',
    category: 'Fluids',
    quantity: 500,
    unit: 'liters',
    minimumStock: 200,
    location: 'Storage Room B',
    lastUpdated: '2024-11-16',
    vendorId: '2',
    status: 'in-stock',
    value: 2500,
  },
  {
    id: '3',
    name: 'Safety Helmets',
    category: 'Safety',
    quantity: 45,
    unit: 'units',
    minimumStock: 100,
    location: 'Safety Equipment',
    lastUpdated: '2024-11-17',
    vendorId: '3',
    status: 'low-stock',
    value: 900,
  },
  {
    id: '4',
    name: 'Concrete Mix Type II',
    category: 'Construction',
    quantity: 2000,
    unit: 'kg',
    minimumStock: 1000,
    location: 'Warehouse C',
    lastUpdated: '2024-11-14',
    vendorId: '1',
    status: 'in-stock',
    value: 8000,
  },
];

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
  },
];

const InventoryManagement = () => {
  // local state instead of context
  const [inventory, setInventory] = useState(initialInventory);
  const [vendors, setVendors] = useState(initialVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [openItem, setOpenItem] = useState(false);
  const [openVendor, setOpenVendor] = useState(false);

  const [editingItem, setEditingItem] = useState(null);
  const [editingVendor, setEditingVendor] = useState(null);

  const [itemFormData, setItemFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    unit: '',
    minimumStock: 0,
    location: '',
    vendorId: 'none',
    value: 0,
  });

  const [vendorFormData, setVendorFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: '',
    rating: 5,
  });

  // Filter inventory
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Filter vendors
  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const normalizeVendorId = (vendorId) =>
    vendorId === 'none' ? undefined : vendorId;

  // ---------- INVENTORY HANDLERS ----------

  const handleSubmitItem = () => {
    if (
      !itemFormData.name ||
      !itemFormData.category ||
      !itemFormData.unit ||
      !itemFormData.location
    ) {
      toast.error('Missing Required Fields', {
        description: 'Please fill in all required fields',
      });
      return;
    }

    const payload = {
      ...itemFormData,
      vendorId: normalizeVendorId(itemFormData.vendorId),
      status:
        itemFormData.quantity <= itemFormData.minimumStock
          ? 'low-stock'
          : 'in-stock',
    };

    if (editingItem) {
      setInventory((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                ...payload,
                lastUpdated: new Date().toISOString().split('T')[0],
              }
            : item
        )
      );
      toast.success('Item Updated Successfully', {
        description: `${itemFormData.name} has been updated in inventory`,
      });
    } else {
      const newItem = {
        ...payload,
        id: Date.now().toString(),
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      setInventory((prev) => [...prev, newItem]);
      toast.success('Item Added Successfully', {
        description: `${itemFormData.name} has been added to inventory`,
      });
    }

    resetItemForm();
  };

  const resetItemForm = () => {
    setItemFormData({
      name: '',
      category: '',
      quantity: 0,
      unit: '',
      minimumStock: 0,
      location: '',
      vendorId: 'none',
      value: 0,
    });
    setEditingItem(null);
    setOpenItem(false);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setItemFormData({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      minimumStock: item.minimumStock,
      location: item.location,
      vendorId: item.vendorId || 'none',
      value: item.value || 0,
    });
    setOpenItem(true);
  };

  const handleDeleteItem = (id, name) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
    toast.info('Item Removed', {
      description: `${name} has been removed from inventory`,
    });
  };

  const isLowStock = (item) => item.quantity <= item.minimumStock;
  const lowStockCount = inventory.filter(isLowStock).length;
  const totalInventoryValue = inventory.reduce(
    (sum, item) => sum + (item.value || 0),
    0
  );

  const getVendorName = (vendorId) => {
    if (!vendorId || vendorId === 'none') return 'N/A';
    return vendors.find((v) => v.id === vendorId)?.name || 'N/A';
  };

  const getStockLevel = (item) => {
    const percentage = (item.quantity / item.minimumStock) * 100;
    if (percentage <= 100) return 'critical';
    if (percentage <= 150) return 'low';
    return 'good';
  };

  // ---------- VENDOR HANDLERS ----------

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
      };
      setVendors((prev) => [...prev, newVendor]);
      toast.success('Vendor Added Successfully', {
        description: `${vendorFormData.name} has been added to vendors`,
      });
    }

    resetVendorForm();
  };

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
      description: `${name} has been removed from vendors`,
    });
  };

  // ---------- UI ----------

  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            Inventory & Vendor Management
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Track stock levels and manage supplier relationships efficiently
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-300">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" className="border-slate-300">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-l-4 border-l-blue-500 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  {inventory.length}
                </div>
                <div className="text-sm text-slate-600">Total Items</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-l-4 border-l-red-500 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  {lowStockCount}
                </div>
                <div className="text-sm text-slate-600">Low Stock</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-l-4 border-l-green-500 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  {vendors.length}
                </div>
                <div className="text-sm text-slate-600">Vendors</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-l-4 border-l-purple-500 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  ${(totalInventoryValue / 1000).toFixed(1)}k
                </div>
                <div className="text-sm text-slate-600">Total Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockCount > 0 && (
        <Card className="border border-red-200 bg-red-50 animate-pulse">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800">Low Stock Alert</h3>
                <p className="text-red-700 text-sm">
                  {lowStockCount} item{lowStockCount > 1 ? 's are' : ' is'}{' '}
                  below minimum stock level and may need reordering
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-red-300 text-red-700"
              >
                View Items
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="inventory" className="space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <TabsList className="bg-white border border-slate-200 p-1">
            <TabsTrigger
              value="inventory"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
            >
              <Package className="h-4 w-4 mr-2" />
              Inventory Items
            </TabsTrigger>
            <TabsTrigger
              value="vendors"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Vendors
            </TabsTrigger>
          </TabsList>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:min-w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px] bg-white border-slate-300 focus:ring-2 focus:ring-blue-500">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Structural">Structural</SelectItem>
                  <SelectItem value="Fluids">Fluids</SelectItem>
                  <SelectItem value="Safety">Safety</SelectItem>
                  <SelectItem value="Construction">Construction</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-white border-slate-300 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Inventory Items
              </h2>
              <p className="text-slate-600">
                Manage and track all inventory items
              </p>
            </div>
            <Dialog open={openItem} onOpenChange={setOpenItem}>
              <DialogTrigger asChild>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white hover-scale shadow-lg"
                  onClick={resetItemForm}
                >
                  <PackagePlus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl animate-scale-in bg-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-slate-800">
                    {editingItem ? 'Edit' : 'Add'} Inventory Item
                  </DialogTitle>
                  <DialogDescription className="text-slate-600">
                    {editingItem ? 'Update' : 'Add new'} item to the inventory
                    system
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  <div className="space-y-3">
                    <Label
                      htmlFor="item-name"
                      className="text-sm font-medium text-slate-700"
                    >
                      Item Name *
                    </Label>
                    <Input
                      id="item-name"
                      value={itemFormData.name}
                      onChange={(e) =>
                        setItemFormData({
                          ...itemFormData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Steel Beams"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="category"
                      className="text-sm font-medium text-slate-700"
                    >
                      Category *
                    </Label>
                    <Input
                      id="category"
                      value={itemFormData.category}
                      onChange={(e) =>
                        setItemFormData({
                          ...itemFormData,
                          category: e.target.value,
                        })
                      }
                      placeholder="Structural"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="quantity"
                      className="text-sm font-medium text-slate-700"
                    >
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={itemFormData.quantity}
                      onChange={(e) =>
                        setItemFormData({
                          ...itemFormData,
                          quantity: parseInt(e.target.value) || 0,
                        })
                      }
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="unit"
                      className="text-sm font-medium text-slate-700"
                    >
                      Unit *
                    </Label>
                    <Input
                      id="unit"
                      value={itemFormData.unit}
                      onChange={(e) =>
                        setItemFormData({
                          ...itemFormData,
                          unit: e.target.value,
                        })
                      }
                      placeholder="units, kg, liters"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="minimum"
                      className="text-sm font-medium text-slate-700"
                    >
                      Minimum Stock
                    </Label>
                    <Input
                      id="minimum"
                      type="number"
                      value={itemFormData.minimumStock}
                      onChange={(e) =>
                        setItemFormData({
                          ...itemFormData,
                          minimumStock: parseInt(e.target.value) || 0,
                        })
                      }
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="location"
                      className="text-sm font-medium text-slate-700"
                    >
                      Location *
                    </Label>
                    <Input
                      id="location"
                      value={itemFormData.location}
                      onChange={(e) =>
                        setItemFormData({
                          ...itemFormData,
                          location: e.target.value,
                        })
                      }
                      placeholder="Warehouse A"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="value"
                      className="text-sm font-medium text-slate-700"
                    >
                      Value ($)
                    </Label>
                    <Input
                      id="value"
                      type="number"
                      value={itemFormData.value}
                      onChange={(e) =>
                        setItemFormData({
                          ...itemFormData,
                          value: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="vendor"
                      className="text-sm font-medium text-slate-700"
                    >
                      Vendor
                    </Label>
                    <Select
                      value={itemFormData.vendorId}
                      onValueChange={(value) =>
                        setItemFormData({ ...itemFormData, vendorId: value })
                      }
                    >
                      <SelectTrigger
                        id="vendor"
                        className="focus:ring-2 focus:ring-blue-500"
                      >
                        <SelectValue placeholder="Select vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {vendors.map((vendor) => (
                          <SelectItem key={vendor.id} value={vendor.id}>
                            {vendor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={handleSubmitItem}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  {editingItem ? 'Update' : 'Add'} Item
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="border border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-slate-800">
                Current Inventory
              </CardTitle>
              <CardDescription>
                All items in stock with real-time status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredInventory.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">
                    No items found
                  </h3>
                  <p className="text-slate-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Item Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Stock Level</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.map((item, index) => (
                      <TableRow
                        key={item.id}
                        className="animate-fade-in border-b border-slate-100 last:border-0"
                      >
                        <TableCell className="font-medium text-slate-800">
                          {item.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {item.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">{item.quantity}</span>
                          <span className="text-slate-500 text-sm ml-1">
                            {item.unit}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16">
                              <Progress
                                value={
                                  (item.quantity / item.minimumStock) * 100
                                }
                                className={`h-2 ${
                                  getStockLevel(item) === 'critical'
                                    ? 'bg-red-100'
                                    : getStockLevel(item) === 'low'
                                    ? 'bg-yellow-100'
                                    : 'bg-green-100'
                                }`}
                              />
                            </div>
                            <Badge
                              className={
                                getStockLevel(item) === 'critical'
                                  ? 'bg-red-500 text-white'
                                  : getStockLevel(item) === 'low'
                                  ? 'bg-yellow-500 text-white'
                                  : 'bg-green-500 text-white'
                              }
                            >
                              {getStockLevel(item)}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-700">
                          {getVendorName(item.vendorId)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-slate-50 text-slate-700 border-slate-200"
                          >
                            {item.location}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-slate-800">
                          ${item.value?.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
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
                              <DropdownMenuItem
                                className="flex items-center gap-2"
                                onClick={() => handleEditItem(item)}
                              >
                                <Edit className="h-4 w-4" />
                                Edit Item
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex items-center gap-2 text-red-600"
                                onClick={() =>
                                  handleDeleteItem(item.id, item.name)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete Item
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vendors Tab */}
        <TabsContent value="vendors" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Vendor Directory
              </h2>
              <p className="text-slate-600">
                Manage supplier relationships and performance
              </p>
            </div>
            <Dialog open={openVendor} onOpenChange={setOpenVendor}>
              <DialogTrigger asChild>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white hover-scale shadow-lg"
                  onClick={resetVendorForm}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Add Vendor
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl animate-scale-in bg-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-slate-800">
                    {editingVendor ? 'Edit' : 'Add'} Vendor
                  </DialogTitle>
                  <DialogDescription className="text-slate-600">
                    {editingVendor ? 'Update' : 'Add new'} vendor to the system
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  <div className="space-y-3">
                    <Label
                      htmlFor="vendor-name"
                      className="text-sm font-medium text-slate-700"
                    >
                      Company Name *
                    </Label>
                    <Input
                      id="vendor-name"
                      value={vendorFormData.name}
                      onChange={(e) =>
                        setVendorFormData({
                          ...vendorFormData,
                          name: e.target.value,
                        })
                      }
                      placeholder="SteelCo Industries"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="contact"
                      className="text-sm font-medium text-slate-700"
                    >
                      Contact Person *
                    </Label>
                    <Input
                      id="contact"
                      value={vendorFormData.contactPerson}
                      onChange={(e) =>
                        setVendorFormData({
                          ...vendorFormData,
                          contactPerson: e.target.value,
                        })
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
                      value={vendorFormData.email}
                      onChange={(e) =>
                        setVendorFormData({
                          ...vendorFormData,
                          email: e.target.value,
                        })
                      }
                      placeholder="contact@vendor.com"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-slate-700"
                    >
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      value={vendorFormData.phone}
                      onChange={(e) =>
                        setVendorFormData({
                          ...vendorFormData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+1-555-0100"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="vendor-category"
                      className="text-sm font-medium text-slate-700"
                    >
                      Category
                    </Label>
                    <Input
                      id="vendor-category"
                      value={vendorFormData.category}
                      onChange={(e) =>
                        setVendorFormData({
                          ...vendorFormData,
                          category: e.target.value,
                        })
                      }
                      placeholder="Structural Materials"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="rating"
                      className="text-sm font-medium text-slate-700"
                    >
                      Rating (1-5)
                    </Label>
                    <Input
                      id="rating"
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
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSubmitVendor}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  {editingVendor ? 'Update' : 'Add'} Vendor
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="border border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-slate-800">Vendor Directory</CardTitle>
              <CardDescription>
                All suppliers and their performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredVendors.length === 0 ? (
                <div className="text-center py-12">
                  <Building2 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">
                    No vendors found
                  </h3>
                  <p className="text-slate-500">
                    Try adjusting your search criteria
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredVendors.map((vendor, index) => (
                    <Card
                      key={vendor.id}
                      className="border border-slate-200 hover:shadow-md transition-all duration-200 animate-fade-in"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-slate-800 text-lg">
                              {vendor.name}
                            </h3>
                            <p className="text-slate-600 text-sm">
                              {vendor.category}
                            </p>
                          </div>
                          <Badge
                            className={
                              vendor.status === 'preferred'
                                ? 'bg-green-500 text-white'
                                : 'bg-blue-500 text-white'
                            }
                          >
                            {vendor.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-slate-700">
                              Contact:
                            </span>
                            <span className="text-slate-600">
                              {vendor.contactPerson}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-slate-700">
                              Email:
                            </span>
                            <span className="text-slate-600">
                              {vendor.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-slate-700">
                              Phone:
                            </span>
                            <span className="text-slate-600">
                              {vendor.phone}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span className="font-semibold text-slate-800">
                              {vendor.rating.toFixed(1)}
                            </span>
                          </div>
                          <div className="text-sm text-slate-600">
                            {vendor.itemsSupplied} items
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
                              <DropdownMenuItem
                                className="flex items-center gap-2"
                                onClick={() => handleEditVendor(vendor)}
                              >
                                <Edit className="h-4 w-4" />
                                Edit Vendor
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex items-center gap-2 text-red-600"
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryManagement;
