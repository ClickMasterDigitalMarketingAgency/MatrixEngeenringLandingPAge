'use client';

import { useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BarChart3, Layers, Package, AlertTriangle } from 'lucide-react';

const initialInventory = [
  {
    id: '1',
    name: 'Steel Beams I-Type',
    category: 'Structural',
    quantity: 150,
    unit: 'units',
    minimumStock: 50,
    location: 'Warehouse A',
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
    value: 8000,
  },
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categorySummary = useMemo(() => {
    const map = new Map();
    initialInventory.forEach((item) => {
      const key = item.category || 'Uncategorized';
      if (!map.has(key)) {
        map.set(key, {
          category: key,
          items: 0,
          totalQuantity: 0,
          totalValue: 0,
          lowStock: 0,
        });
      }
      const entry = map.get(key);
      entry.items += 1;
      entry.totalQuantity += item.quantity;
      entry.totalValue += item.value || 0;
      if (item.minimumStock && item.quantity <= item.minimumStock) {
        entry.lowStock += 1;
      }
    });
    return Array.from(map.values());
  }, []);

  const filteredProducts =
    selectedCategory === 'All'
      ? initialInventory
      : initialInventory.filter((i) => i.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex-1">
          <h1>Material Category</h1>
          <p className="text-slate-600 mt-2 text-lg">
            See inventory grouped by categories with stock and value impact.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-l-4 border-l-primary shadow-sm animate-scale-in">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {categorySummary.length}
              </div>
              <div className="text-sm text-slate-600">Active Categories</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-l-4 border-l-blue-500 shadow-sm animate-scale-in">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {initialInventory.length}
              </div>
              <div className="text-sm text-slate-600">Products</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-l-4 border-l-emerald-500 shadow-sm animate-scale-in">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                $
                {(
                  categorySummary.reduce((sum, c) => sum + c.totalValue, 0) /
                  1000
                ).toFixed(1)}
                k
              </div>
              <div className="text-sm text-slate-600">Total Value</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4 lg:col-span-1">
          <Card className="bg-white border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 text-lg">
                Categories Overview
              </CardTitle>
              <CardDescription>
                Click a category to see its products.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm flex items-center justify-between transition hover:shadow-sm ${
                  selectedCategory === 'All'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>All Categories</span>
                <Badge
                  variant="outline"
                  className="border-primary/30 text-primary"
                >
                  {initialInventory.length} items
                </Badge>
              </button>

              {categorySummary.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => setSelectedCategory(cat.category)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm flex flex-col gap-2 transition hover:shadow-sm ${
                    selectedCategory === cat.category
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{cat.category}</span>
                    <Badge variant="outline" className="border-slate-200">
                      {cat.items} items
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Total Qty: {cat.totalQuantity}</span>
                    <span>Value: ${cat.totalValue.toLocaleString()}</span>
                  </div>
                  {cat.lowStock > 0 && (
                    <div className="flex items-center gap-2 text-xs text-red-600">
                      <AlertTriangle className="h-3 w-3" />
                      <span>{cat.lowStock} low stock</span>
                    </div>
                  )}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Products under selected category */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 text-lg">
                {selectedCategory === 'All'
                  ? 'All Products'
                  : `${selectedCategory} Products`}
              </CardTitle>
              <CardDescription>
                Products mapped under this category hierarchy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredProducts.length === 0 ? (
                <div className="py-10 text-center text-slate-500">
                  No products mapped to this category yet.
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Stock Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((item) => {
                      const percent =
                        item.minimumStock && item.minimumStock > 0
                          ? (item.quantity / item.minimumStock) * 100
                          : 100;
                      const level =
                        percent <= 100
                          ? 'critical'
                          : percent <= 150
                          ? 'low'
                          : 'good';

                      return (
                        <TableRow key={item.id} className="animate-fade-in">
                          <TableCell className="font-medium text-slate-800">
                            {item.name}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-primary/5 text-primary border-primary/20"
                            >
                              {item.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold">
                              {item.quantity}
                            </span>
                            <span className="ml-1 text-sm text-slate-500">
                              {item.unit}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-24">
                                <Progress
                                  value={percent}
                                  className={`h-2 ${
                                    level === 'critical'
                                      ? 'bg-red-100'
                                      : level === 'low'
                                      ? 'bg-yellow-100'
                                      : 'bg-emerald-100'
                                  }`}
                                />
                              </div>
                              <Badge
                                className={
                                  level === 'critical'
                                    ? 'bg-red-500 text-white'
                                    : level === 'low'
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-emerald-500 text-white'
                                }
                              >
                                {level}
                              </Badge>
                            </div>
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
                            ${item.value.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
