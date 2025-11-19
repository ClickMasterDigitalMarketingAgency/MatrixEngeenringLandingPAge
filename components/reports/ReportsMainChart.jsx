'use client';

import {
  LineChart,
  Line,
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
import { BarChart3, DollarSign, Activity } from 'lucide-react';
import { COLORS } from '@/components/reports/ReportModule'; // adjust path if different

const getReportTypeIcon = (type) => {
  switch (type) {
    case 'overview':
      return <BarChart3 className="h-5 w-5 text-blue-600" />;
    case 'sales':
      return <DollarSign className="h-5 w-5 text-green-600" />;
    case 'performance':
      return <Activity className="h-5 w-5 text-purple-600" />;
    default:
      return <BarChart3 className="h-5 w-5 text-blue-600" />;
  }
};

const ReportsMainChart = ({ performanceData, reportType }) => {
  const title =
    reportType === 'sales'
      ? 'Revenue & Orders Trend'
      : reportType === 'performance'
      ? 'Performance Metrics'
      : 'Business Overview Trends';

  return (
    <Card className="lg:col-span-2 bg-white shadow-sm border-slate-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
              {getReportTypeIcon(reportType)}
            </div>
            <div>
              <CardTitle className="text-xl text-slate-800">{title}</CardTitle>
              <CardDescription className="text-slate-600">
                Monthly performance analysis and growth metrics
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={performanceData}>
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
                fontSize: '14px',
              }}
              labelStyle={{
                color: '#1e293b',
                fontWeight: '600',
                marginBottom: '8px',
              }}
            />
            <Legend />
            {reportType === 'sales' ? (
              <>
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke={COLORS.chart.emerald}
                  strokeWidth={3}
                  dot={{
                    fill: COLORS.chart.emerald,
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{ r: 6, fill: COLORS.chart.emerald }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke={COLORS.chart.blue}
                  strokeWidth={3}
                  dot={{ fill: COLORS.chart.blue, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: COLORS.chart.blue }}
                />
              </>
            ) : reportType === 'performance' ? (
              <>
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke={COLORS.chart.blue}
                  strokeWidth={3}
                  dot={{ fill: COLORS.chart.blue, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: COLORS.chart.blue }}
                />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke={COLORS.chart.cyan}
                  strokeWidth={3}
                  dot={{ fill: COLORS.chart.cyan, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: COLORS.chart.cyan }}
                />
              </>
            ) : (
              <>
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke={COLORS.chart.emerald}
                  strokeWidth={3}
                  dot={{
                    fill: COLORS.chart.emerald,
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{ r: 6, fill: COLORS.chart.emerald }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke={COLORS.chart.violet}
                  strokeWidth={3}
                  dot={{
                    fill: COLORS.chart.violet,
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{ r: 6, fill: COLORS.chart.violet }}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ReportsMainChart;
