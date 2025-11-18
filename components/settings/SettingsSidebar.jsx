'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Bell,
  Shield,
  Eye,
  Database,
  Users,
  Zap,
  Settings as SettingsIcon,
  User,
} from 'lucide-react';

const iconMap = {
  all: <SettingsIcon className="w-4 h-4" />,
  account: <User className="w-4 h-4" />,
  notifications: <Bell className="w-4 h-4" />,
  security: <Shield className="w-4 h-4" />,
  privacy: <Eye className="w-4 h-4" />,
  data: <Database className="w-4 h-4" />,
  collaboration: <Users className="w-4 h-4" />,
  performance: <Zap className="w-4 h-4" />,
};

const SettingsSidebar = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <Card className="lg:col-span-1 border border-slate-200 shadow-sm bg-white">
      <CardContent className="p-6 space-y-1">
        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
          Configuration Categories
        </h3>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                isActive
                  ? 'bg-secondary text-chart-1 border border-border'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={
                    isActive
                      ? 'text-chart-1'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }
                >
                  {iconMap[cat.id] || iconMap.all}
                </span>
                <span className="font-medium">{cat.label}</span>
              </div>
              {cat.count > 0 && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isActive
                      ? 'bg-chart-1 text-card'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SettingsSidebar;
