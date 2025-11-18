'use client';

import { useMemo, useState } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Truck, Package, DollarSign, PlusCircle } from 'lucide-react';

const initialInventory = [
  {
    id: '1',
    name: 'Steel Beams I-Type',
    category: 'Structural',
    quantity: 150,
    unit: 'units',
  },
  {
    id: '2',
    name: 'Hydraulic Fluid ISO 46',
    category: 'Fluids',
    quantity: 500,
    unit: 'liters',
  },
  {
    id: '3',
    name: 'Safety Helmets',
    category: 'Safety',
    quantity: 45,
    unit: 'units',
  },
];

const initialVendors = [
  { id: '1', name: 'SteelCo Industries' },
  { id: '2', name: 'HydroTech Solutions' },
  { id: '3', name: 'SafeGuard Equipment' },
];

export default function PurchaseStocksPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [vendors] = useState(initialVendors);
  const [purchases, setPurchases] = useState([]);

  const [form, setForm] = useState({
    vendorId: '',
    productId: '',
    quantity: '',
    unitPrice: '',
  });

  const totalSpend = useMemo(
    () => purchases.reduce((sum, p) => sum + p.quantity * p.unitPrice, 0),
    [purchases]
  );

  const handleCreatePurchase = () => {
    if (
      !form.vendorId ||
      !form.productId ||
      !form.quantity ||
      !form.unitPrice
    ) {
      toast.error('Missing Required Fields', {
        description: 'Please select vendor, product, quantity, and unit price.',
      });
      return;
    }

    const product = inventory.find((i) => i.id === form.productId);
    const vendor = vendors.find((v) => v.id === form.vendorId);

    const quantity = parseFloat(form.quantity);
    const unitPrice = parseFloat(form.unitPrice);

    if (!product || !vendor || quantity <= 0 || unitPrice <= 0) {
      toast.error('Invalid Values', {
        description: 'Please check quantity and unit price.',
      });
      return;
    }

    // Update inventory
    setInventory((prev) =>
      prev.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
      )
    );

    // Add purchase record
    const newPurchase = {
      id: Date.now().toString(),
      vendorId: vendor.id,
      vendorName: vendor.name,
      productId: product.id,
      productName: product.name,
      quantity,
      unitPrice,
      amount: quantity * unitPrice,
      createdAt: new Date().toISOString(),
    };

    setPurchases((prev) => [newPurchase, ...prev]);

    toast.success('Purchase Order Recorded', {
      description: `${quantity} ${product.unit} of ${product.name} purchased from ${vendor.name}.`,
    });

    setForm({
      vendorId: '',
      productId: '',
      quantity: '',
      unitPrice: '',
    });
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1>Purchase Stock</h1>
          <p className="text-slate-600 mt-2 text-lg">
            Create purchase orders that automatically update inventory
            quantities.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-l-4 border-l-primary shadow-sm animate-scale-in">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {purchases.length}
              </div>
              <div className="text-sm text-slate-600">Purchase Orders</div>
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
                {inventory.length}
              </div>
              <div className="text-sm text-slate-600">Tracked Products</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-l-4 border-l-emerald-500 shadow-sm animate-scale-in">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                ${totalSpend.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Total Spend</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form + inventory snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">
              Create Purchase Order
            </CardTitle>
            <CardDescription>
              Select vendor, product, quantity, and unit price to create a stock
              purchase.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Vendor *
                </Label>
                <Select
                  value={form.vendorId}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, vendorId: value }))
                  }
                >
                  <SelectTrigger className="bg-white border-slate-300 focus:ring-2 focus:ring-primary/60">
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Product *
                </Label>
                <Select
                  value={form.productId}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, productId: value }))
                  }
                >
                  <SelectTrigger className="bg-white border-slate-300 focus:ring-2 focus:ring-primary/60">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {inventory.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} ({p.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Quantity *
                </Label>
                <Input
                  type="number"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, quantity: e.target.value }))
                  }
                  placeholder="Enter quantity"
                  className="bg-white border-slate-300 focus:ring-2 focus:ring-primary/60"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Unit Price ($) *
                </Label>
                <Input
                  type="number"
                  value={form.unitPrice}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, unitPrice: e.target.value }))
                  }
                  placeholder="Enter unit price"
                  className="bg-white border-slate-300 focus:ring-2 focus:ring-primary/60"
                />
              </div>
            </div>
            <Button
              onClick={handleCreatePurchase}
              className="mt-2 w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:scale-105 transition-transform"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Purchase
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800 text-base">
              Inventory Snapshot
            </CardTitle>
            <CardDescription>
              Quick view of current quantities for purchased products.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {inventory.map((item) => (
              <div
                key={item.id}
                className="border border-slate-100 rounded-lg p-3 flex items-center justify-between text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-800">{item.name}</p>
                  <p className="text-slate-500 text-xs">{item.category}</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {item.quantity} {item.unit}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Purchase history */}
      <Card className="border border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-800 text-base">
            Recent Purchase Orders
          </CardTitle>
          <CardDescription>
            The latest stock purchases and their financial impact.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {purchases.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-sm">
              No purchase orders yet. Create your first purchase above.
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchases.map((p) => (
                  <TableRow key={p.id} className="animate-fade-in">
                    <TableCell className="text-sm text-slate-600">
                      {new Date(p.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>{p.vendorName}</TableCell>
                    <TableCell>{p.productName}</TableCell>
                    <TableCell>
                      {p.quantity}{' '}
                      <span className="text-xs text-slate-500">
                        (
                        {inventory.find((i) => i.id === p.productId)?.unit ||
                          ''}
                        )
                      </span>
                    </TableCell>
                    <TableCell>${p.unitPrice.toFixed(2)}</TableCell>
                    <TableCell className="font-semibold text-slate-800">
                      ${p.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
