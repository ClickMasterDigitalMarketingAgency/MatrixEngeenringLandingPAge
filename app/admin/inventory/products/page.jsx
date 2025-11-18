'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InventoryHeader = dynamic(
  () => import('@/components/inventory/products/InventoryHeader'),
  {
    loading: () => (
      <div className="h-20 rounded-lg bg-muted/40 animate-pulse" />
    ),
  }
);

const InventoryStats = dynamic(
  () => import('@/components/inventory/products/InventoryStats'),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-muted/40 animate-pulse" />
        ))}
      </div>
    ),
  }
);

const InventoryFilters = dynamic(
  () => import('@/components/inventory/products/InventoryFilters'),
  {
    loading: () => (
      <div className="h-14 rounded-lg bg-muted/40 animate-pulse" />
    ),
  }
);

const ProductDialog = dynamic(
  () => import('@/components/inventory/products/ProductDialog'),
  {
    loading: () => null,
    ssr: false,
  }
);

const ProductsTable = dynamic(
  () => import('@/components/inventory/products/ProductsTable'),
  {
    loading: () => (
      <div className="rounded-lg bg-white shadow-sm border border-slate-200 p-6">
        <div className="h-6 w-40 bg-muted/40 rounded mb-4" />
        <div className="h-40 bg-muted/40 rounded animate-pulse" />
      </div>
    ),
  }
);

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
  { id: '1', name: 'SteelCo Industries' },
  { id: '2', name: 'HydroTech Solutions' },
  { id: '3', name: 'SafeGuard Equipment' },
];

export default function ProductsInventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [vendors] = useState(initialVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [openItem, setOpenItem] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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

  const isLowStock = (item) => item.quantity <= item.minimumStock;

  const lowStockCount = inventory.filter(isLowStock).length;
  const totalInventoryValue = inventory.reduce(
    (sum, item) => sum + (item.value || 0),
    0
  );
  const uniqueCategories = Array.from(
    new Set(inventory.map((i) => i.category))
  );

  const normalizeVendorId = (vendorId) =>
    vendorId === 'none' ? undefined : vendorId;

  const getVendorName = (vendorId) => {
    if (!vendorId || vendorId === 'none') return 'N/A';
    return vendors.find((v) => v.id === vendorId)?.name || 'N/A';
  };

  const getStockLevel = (item) => {
    if (!item.minimumStock) return 'good';
    const percentage = (item.quantity / item.minimumStock) * 100;
    if (percentage <= 100) return 'critical';
    if (percentage <= 150) return 'low';
    return 'good';
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
  };

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

    setOpenItem(false);
    resetItemForm();
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

  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      <InventoryHeader />

      <InventoryStats
        totalProducts={inventory.length}
        lowStockCount={lowStockCount}
        categoriesCount={uniqueCategories.length}
        totalInventoryValue={totalInventoryValue}
      />

      <Tabs defaultValue="list" className="space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <InventoryFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            uniqueCategories={uniqueCategories}
          />

          {/* Optional TabsList if you want more views later */}
          <TabsList className="hidden lg:flex">
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="list" className="space-y-4">
          <ProductDialog
            openItem={openItem}
            setOpenItem={setOpenItem}
            editingItem={editingItem}
            itemFormData={itemFormData}
            setItemFormData={setItemFormData}
            vendors={vendors}
            onSubmit={handleSubmitItem}
            onResetForm={resetItemForm}
          />

          <ProductsTable
            filteredInventory={filteredInventory}
            getStockLevel={getStockLevel}
            getVendorName={getVendorName}
            handleEditItem={handleEditItem}
            handleDeleteItem={handleDeleteItem}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
