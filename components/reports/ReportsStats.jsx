'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, ShoppingCart, Activity } from 'lucide-react';

const colorMap = {
  blue: {
    border: 'border-l-blue-500',
    bg: 'bg-blue-100',
    icon: <DollarSign className="h-6 w-6 text-blue-600" />,
  },
  green: {
    border: 'border-l-green-500',
    bg: 'bg-green-100',
    icon: <Users className="h-6 w-6 text-green-600" />,
  },
  purple: {
    border: 'border-l-purple-500',
    bg: 'bg-purple-100',
    icon: <ShoppingCart className="h-6 w-6 text-purple-600" />,
  },
  red: {
    border: 'border-l-red-500',
    bg: 'bg-red-100',
    icon: <Activity className="h-6 w-6 text-red-600" />,
  },
};

const ReportsStats = ({ statsData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => {
        const cfg = colorMap[stat.color] ?? colorMap.blue;

        return (
          <Card
            key={index}
            className={`bg-white border-l-4 ${cfg.border} shadow-sm hover:shadow-md transition-all duration-200`}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 ${cfg.bg} rounded-xl`}>{cfg.icon}</div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600">{stat.title}</div>
                  <Badge
                    variant="outline"
                    className={
                      stat.trend === 'up'
                        ? 'bg-green-50 text-green-700 border-green-200 mt-1'
                        : 'bg-red-50 text-red-700 border-red-200 mt-1'
                    }
                  >
                    {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ReportsStats;
