'use client';

import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';

const ReportsHeader = ({ onExport, onAdvancedFilter }) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 w-full">

      {/* Left section */}
      <div className="flex-1 text-left">
        <h1 className="whitespace-nowrap">
          Analytics Dashboard
        </h1>

        <p className="text-slate-600 mt-1 text-base whitespace-nowrap">
          Comprehensive business intelligence and performance metrics
        </p>
      </div>

      {/* Buttons section */}
      <div
        className="
          w-full 
          flex flex-col sm:flex-row 
          gap-3 
          items-stretch
          sm:items-center
          lg:justify-end
        "
      >
        <Button
          variant="outline"
          className="border-slate-300 w-full sm:w-auto"
          onClick={onExport}
        >
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>

        <Button
          className="w-full sm:w-auto"
          onClick={onAdvancedFilter}
        >
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </Button>
      </div>
    </div>
  );
};

export default ReportsHeader;
