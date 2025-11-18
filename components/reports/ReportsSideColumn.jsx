'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  PieChart as PieChartIcon,
  Activity as ActivityIcon,
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const ReportsSideColumn = ({ resourceData, systemHealthData }) => {
  return (
    <div className="space-y-6">
      {/* Resource Distribution */}
      <Card className="bg-white shadow-sm border-slate-200">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
              <PieChartIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl text-slate-800">
                Resource Distribution
              </CardTitle>
              <CardDescription className="text-slate-600">
                Departmental resource breakdown
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={resourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {resourceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card className="bg-white shadow-sm border-slate-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <ActivityIcon className="h-5 w-5 text-orange-600" />
            System Health Monitor
          </CardTitle>
          <CardDescription>Overall system performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemHealthData.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    {item.name}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {item.value}%
                  </span>
                </div>
                <Progress value={item.value} className={`h-2 ${item.color}`} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSideColumn;
