'use client';

import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';

const ReportsHeader = ({ onExport, onAdvancedFilter }) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div className="flex-1">
        <h1>
          Analytics Dashboard
        </h1>
        <p className="text-slate-600 mt-2 text-lg">
          Comprehensive business intelligence and performance metrics
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="border-slate-300"
          onClick={onExport}
        >
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
        <Button onClick={onAdvancedFilter}>
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </Button>
      </div>
    </div>
  );
};

export default ReportsHeader;
