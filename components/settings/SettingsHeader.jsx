'use client';

import { Badge } from '@/components/ui/badge';

const SettingsHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div>
            <h1>Settings & Preferences</h1>
            <p className="text-slate-600 mt-1">
              Manage your account, security, and platform preferences
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-secondary text-primary hover:bg-primary/10 border-0">
            <div className="w-2 h-2 bg-primary rounded-full mr-2" />
            Secure Configuration
          </Badge>
          <span className="text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;
