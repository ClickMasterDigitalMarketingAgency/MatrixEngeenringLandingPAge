'use client';

import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, BarChart3, Package } from 'lucide-react';

const InventoryStats = ({
  totalProducts,
  lowStockCount,
  categoriesCount,
  totalInventoryValue,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-white border-l-4 border-l-primary shadow-sm animate-scale-in">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">
              {totalProducts}
            </div>
            <div className="text-sm text-slate-600">Total Products</div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-l-4 border-l-red-500 shadow-sm animate-scale-in">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">
              {lowStockCount}
            </div>
            <div className="text-sm text-slate-600">Low Stock Items</div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-l-4 border-l-blue-500 shadow-sm animate-scale-in">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">
              {categoriesCount}
            </div>
            <div className="text-sm text-slate-600">Categories</div>
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
              ${(totalInventoryValue / 1000).toFixed(1)}k
            </div>
            <div className="text-sm text-slate-600">Inventory Value</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryStats;
