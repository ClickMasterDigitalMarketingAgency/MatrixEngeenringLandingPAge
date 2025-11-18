'use client';

import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package, BarChart3, Gauge } from 'lucide-react';

const inventory = [
  {
    id: '1',
    name: 'Steel Beams I-Type',
    category: 'Structural',
    quantity: 150,
    minimumStock: 50,
    unit: 'units',
  },
  {
    id: '2',
    name: 'Hydraulic Fluid ISO 46',
    category: 'Fluids',
    quantity: 500,
    minimumStock: 200,
    unit: 'liters',
  },
  {
    id: '3',
    name: 'Safety Helmets',
    category: 'Safety',
    quantity: 45,
    minimumStock: 100,
    unit: 'units',
  },
  {
    id: '4',
    name: 'Concrete Mix Type II',
    category: 'Construction',
    quantity: 2000,
    minimumStock: 1000,
    unit: 'kg',
  },
];

const getLevel = (item) => {
  const p = (item.quantity / item.minimumStock) * 100;
  if (p <= 100)
    return { level: 'critical', color: 'bg-red-500', barBg: 'bg-red-100' };
  if (p <= 150)
    return { level: 'low', color: 'bg-yellow-500', barBg: 'bg-yellow-100' };
  return { level: 'good', color: 'bg-emerald-500', barBg: 'bg-emerald-100' };
};

export default function StockLevelsPage() {
  const summary = useMemo(() => {
    let critical = 0;
    let low = 0;
    let good = 0;
    inventory.forEach((i) => {
      const { level } = getLevel(i);
      if (level === 'critical') critical++;
      else if (level === 'low') low++;
      else good++;
    });
    return { critical, low, good };
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1>Stock Level Monitor</h1>
          <p className="text-slate-600 mt-2 text-lg">
            Quickly see which items are healthy and which need urgent
            replenishment.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-l-4 border-l-primary shadow-sm animate-scale-in">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {inventory.length}
              </div>
              <div className="text-sm text-slate-600">Tracked Items</div>
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
                {summary.critical}
              </div>
              <div className="text-sm text-slate-600">Critical</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-l-4 border-l-yellow-500 shadow-sm animate-scale-in">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Gauge className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {summary.low}
              </div>
              <div className="text-sm text-slate-600">Low</div>
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
                {summary.good}
              </div>
              <div className="text-sm text-slate-600">Healthy</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* List */}
      <Card className="border border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-800">Item Stock Health</CardTitle>
          <CardDescription>
            Sorted by risk level, so your team knows what to purchase first.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {inventory
            .slice()
            .sort((a, b) => {
              const order = { critical: 0, low: 1, good: 2 };
              return order[getLevel(a).level] - order[getLevel(b).level];
            })
            .map((item) => {
              const { level, color, barBg } = getLevel(item);
              const percentage = (item.quantity / item.minimumStock) * 100;
              return (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-100 rounded-lg p-4 hover:shadow-sm transition animate-fade-in"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-800">
                        {item.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className="bg-primary/5 text-primary border-primary/20"
                      >
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Minimum stock: {item.minimumStock} {item.unit}
                    </p>
                  </div>
                  <div className="flex-1 max-w-md">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>
                        Current: {item.quantity} {item.unit}
                      </span>
                      <span>{percentage.toFixed(0)}% of minimum</span>
                    </div>
                    <Progress
                      value={percentage}
                      className={`h-2 ${barBg} overflow-hidden`}
                    />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className={`${color} text-white capitalize`}>
                      {level}
                    </Badge>
                    {level !== 'good' && (
                      <span className="text-xs text-red-600 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Reorder recommended
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
        </CardContent>
      </Card>
    </div>
  );
}
