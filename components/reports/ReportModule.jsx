'use client';

import dynamic from 'next/dynamic';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';

// 🔹 Lazy-loaded components
const ReportsHeader = dynamic(
  () => import('@/components/reports/ReportsHeader'),
  {
    loading: () => (
      <div className="h-20 rounded-lg bg-muted/40 animate-pulse" />
    ),
  }
);

const ReportsStats = dynamic(
  () => import('@/components/reports/ReportsStats'),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-lg bg-muted/40 animate-pulse" />
        ))}
      </div>
    ),
  }
);

const ReportsControls = dynamic(
  () => import('@/components/reports/ReportsControls'),
  {
    loading: () => (
      <div className="h-24 rounded-lg bg-muted/40 animate-pulse" />
    ),
  }
);

// Charts: disable SSR because of Recharts
const ReportsMainChart = dynamic(
  () => import('@/components/reports/ReportsMainChart'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[320px] rounded-lg bg-muted/40 animate-pulse" />
    ),
  }
);

const ReportsSideColumn = dynamic(
  () => import('@/components/reports/ReportsSideColumn'),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-4">
        <div className="h-[220px] rounded-lg bg-muted/40 animate-pulse" />
        <div className="h-[220px] rounded-lg bg-muted/40 animate-pulse" />
      </div>
    ),
  }
);

const ReportsBarChart = dynamic(
  () => import('@/components/reports/ReportsBarChart'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[320px] rounded-lg bg-muted/40 animate-pulse" />
    ),
  }
);

const ReportsRecentTable = dynamic(
  () => import('@/components/reports/ReportsRecentTable'),
  {
    loading: () => (
      <div className="h-[260px] rounded-lg bg-muted/40 animate-pulse" />
    ),
  }
);

// 🔹 Shared color palette for charts / stats
export const COLORS = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  chart: {
    blue: '#3b82f6',
    cyan: '#06b6d4',
    emerald: '#10b981',
    violet: '#8b5cf6',
    amber: '#f59e0b',
    red: '#ef4444',
    purple: '#8b5cf6',
  },
};

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [reportType, setReportType] = useState('overview');
  const [department, setDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const allData = [
    {
      month: 'Jan',
      revenue: 45000,
      orders: 234,
      users: 1200,
      performance: 78,
      efficiency: 65,
      uptime: 99.2,
      growth: 12,
    },
    {
      month: 'Feb',
      revenue: 52000,
      orders: 267,
      users: 1450,
      performance: 82,
      efficiency: 71,
      uptime: 99.5,
      growth: 15,
    },
    {
      month: 'Mar',
      revenue: 61000,
      orders: 312,
      users: 1680,
      performance: 85,
      efficiency: 75,
      uptime: 99.8,
      growth: 18,
    },
    {
      month: 'Apr',
      revenue: 72000,
      orders: 356,
      users: 1920,
      performance: 88,
      efficiency: 82,
      uptime: 99.6,
      growth: 22,
    },
    {
      month: 'May',
      revenue: 85000,
      orders: 401,
      users: 2180,
      performance: 92,
      efficiency: 88,
      uptime: 99.9,
      growth: 25,
    },
    {
      month: 'Jun',
      revenue: 98000,
      orders: 445,
      users: 2547,
      performance: 95,
      efficiency: 92,
      uptime: 99.7,
      growth: 28,
    },
  ];

  const getFilteredData = () => {
    switch (dateRange) {
      case '7d':
        return allData.slice(-1);
      case '30d':
        return allData.slice(-2);
      case '90d':
        return allData.slice(-3);
      case '1y':
        return allData;
      default:
        return allData.slice(-2);
    }
  };

  const performanceData = useMemo(() => getFilteredData(), [dateRange]);

  // Stats cards data
  const statsData = useMemo(() => {
    const lastMonth = performanceData[performanceData.length - 1];
    const prevMonth = performanceData[performanceData.length - 2] || lastMonth;

    return [
      {
        title: 'Total Revenue',
        value: `$${(lastMonth.revenue / 1000).toFixed(0)}K`,
        change: `+${(
          ((lastMonth.revenue - prevMonth.revenue) / prevMonth.revenue) *
          100
        ).toFixed(1)}%`,
        trend: 'up',
        color: 'blue',
      },
      {
        title: 'Active Users',
        value: `${(lastMonth.users / 1000).toFixed(1)}K`,
        change: `+${lastMonth.users - prevMonth.users}`,
        trend: 'up',
        color: 'green',
      },
      {
        title: 'Total Orders',
        value: lastMonth.orders.toString(),
        change: `+${lastMonth.orders - prevMonth.orders}`,
        trend: 'up',
        color: 'purple',
      },
      {
        title: 'System Performance',
        value: `${lastMonth.performance}%`,
        change: `+${lastMonth.performance - prevMonth.performance}%`,
        trend: 'up',
        color: 'red',
      },
    ];
  }, [performanceData]);

  const resourceData = useMemo(() => {
    switch (department) {
      case 'sales':
        return [
          { name: 'Lead Generation', value: 55, fill: COLORS.chart.blue },
          { name: 'Conversion', value: 32, fill: COLORS.chart.cyan },
          { name: 'Retention', value: 13, fill: COLORS.chart.emerald },
        ];
      case 'operations':
        return [
          { name: 'Automation', value: 42, fill: COLORS.chart.blue },
          { name: 'Manual Work', value: 38, fill: COLORS.chart.cyan },
          { name: 'Optimization', value: 20, fill: COLORS.chart.emerald },
        ];
      case 'engineering':
        return [
          { name: 'Development', value: 50, fill: COLORS.chart.blue },
          { name: 'QA', value: 30, fill: COLORS.chart.cyan },
          { name: 'Deployment', value: 20, fill: COLORS.chart.emerald },
        ];
      default:
        return [
          { name: 'Sales & Marketing', value: 35, fill: COLORS.chart.blue },
          { name: 'Operations', value: 28, fill: COLORS.chart.cyan },
          { name: 'Engineering', value: 22, fill: COLORS.chart.emerald },
          { name: 'Support', value: 15, fill: COLORS.chart.violet },
        ];
    }
  }, [department]);

  const systemHealthData = [
    { name: 'Revenue', value: 85, color: 'bg-green-100' },
    { name: 'Users', value: 92, color: 'bg-blue-100' },
    { name: 'Performance', value: 78, color: 'bg-purple-100' },
    { name: 'Uptime', value: 99.7, color: 'bg-emerald-100' },
  ];

  const handleExportReport = () => {
    toast.success('Report exported successfully', {
      description: 'Your analytics report has been downloaded in PDF format.',
    });
  };

  const handleAdvancedFilter = () => {
    toast.info('Advanced filtering', {
      description:
        'Custom filter options will be available in the next update.',
    });
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      <ReportsHeader
        onExport={handleExportReport}
        onAdvancedFilter={handleAdvancedFilter}
      />

      <ReportsStats statsData={statsData} />

      <ReportsControls
        reportType={reportType}
        setReportType={setReportType}
        dateRange={dateRange}
        setDateRange={setDateRange}
        department={department}
        setDepartment={setDepartment}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ReportsMainChart
          performanceData={performanceData}
          reportType={reportType}
        />
        <ReportsSideColumn
          resourceData={resourceData}
          systemHealthData={systemHealthData}
        />
      </div>

      <ReportsBarChart
        performanceData={performanceData}
        reportType={reportType}
      />

      <ReportsRecentTable />
    </div>
  );
}
