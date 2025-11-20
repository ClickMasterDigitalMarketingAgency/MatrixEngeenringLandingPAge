
'use client';

import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';

const InventoryHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div className="flex-1">
        <h1>Inventory Material</h1>
        <p className="text-slate-600 mt-2 text-lg">
          Maintain product master data and track stock for each item.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="border-slate-300">
          <BarChart3 className="h-4 w-4 mr-2" />
          View Stock Levels
        </Button>
      </div>
    </div>
  );
};

export default InventoryHeader;
