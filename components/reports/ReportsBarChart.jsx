'use client';

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { COLORS } from '@/components/reports/ReportModule'; // adjust path if needed

const ReportsBarChart = ({ performanceData, reportType }) => {
  const title =
    reportType === 'sales'
      ? 'Monthly Performance Comparison'
      : reportType === 'performance'
      ? 'System Metrics Overview'
      : 'Operational Performance';

  return (
    <Card className="bg-white shadow-sm border-slate-200">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-slate-800">{title}</CardTitle>
            <CardDescription className="text-slate-600">
              Comparative analysis across time periods
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <ReBarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ color: '#1e293b', fontWeight: '600' }}
            />
            <Legend />
            {reportType === 'sales' ? (
              <>
                <Bar
                  dataKey="revenue"
                  fill={COLORS.chart.emerald}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="orders"
                  fill={COLORS.chart.blue}
                  radius={[4, 4, 0, 0]}
                />
              </>
            ) : reportType === 'performance' ? (
              <>
                <Bar
                  dataKey="performance"
                  fill={COLORS.chart.blue}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="uptime"
                  fill={COLORS.chart.cyan}
                  radius={[4, 4, 0, 0]}
                />
              </>
            ) : (
              <>
                <Bar
                  dataKey="users"
                  fill={COLORS.chart.violet}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="orders"
                  fill={COLORS.chart.blue}
                  radius={[4, 4, 0, 0]}
                />
              </>
            )}
          </ReBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ReportsBarChart;
