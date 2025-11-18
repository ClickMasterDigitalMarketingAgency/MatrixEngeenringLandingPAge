'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Lock, Eye, Database, Users, Zap } from 'lucide-react';

const iconMap= {
  bell: <Bell className="w-5 h-5" />,
  lock: <Lock className="w-5 h-5" />,
  eye: <Eye className="w-5 h-5" />,
  database: <Database className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
};

const SettingsList = ({ settings, onToggleSetting }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Platform Preferences
        </h2>
        <Badge variant="secondary" className="bg-slate-100 text-slate-700">
          {settings.length} settings
        </Badge>
      </div>
      <div className="grid gap-4">
        {settings.map((setting) => (
          <Card
            key={setting.id}
            className="border border-slate-200 shadow-sm bg-white hover:border-slate-300 transition-all duration-200"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={`p-3 rounded-xl border mt-1 ${
                      setting.enabled
                        ? 'bg-card border-primary/20 text-primary'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    {iconMap[setting.iconName] ?? <Zap className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-lg">
                      {setting.label}
                    </h3>
                    <p className="text-slate-600 mt-2 leading-relaxed">
                      {setting.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onToggleSetting(setting.id)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
                    setting.enabled ? 'bg-primary/60' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      setting.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SettingsList;
