'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key } from 'lucide-react';

function Label({ className = '', ...props }) {
  return (
    <label
      className={`text-sm font-medium leading-none text-slate-700 ${className}`}
      {...props}
    />
  );
}

const ApiConfigCard = ({
  apiKey,
  showApiKey,
  setShowApiKey,
  onCopyApiKey,
  onRegenerateApiKey,
}) => {
  return (
    <Card className="border border-slate-200 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="p-2 rounded-lg border border-primary/10 bg-primary/5 w-fit">
            <Key className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg sm:text-xl text-slate-900">
              API Configuration
            </CardTitle>
            <CardDescription className="text-slate-600 text-sm sm:text-base">
              Manage your API keys and integration settings
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* API Key Row */}
        <div className="space-y-3">
          <Label>Live API Key</Label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              readOnly
              className="flex-1 border border-slate-300 font-mono text-sm bg-slate-50 rounded-md px-3 py-2 outline-none w-full"
            />
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setShowApiKey(!showApiKey)}
                className="border-slate-300 text-slate-700 w-full sm:w-auto"
              >
                {showApiKey ? 'Hide' : 'Show'}
              </Button>
              <Button
                onClick={onCopyApiKey}
                className="bg-slate-900 hover:bg-slate-800 text-white w-full sm:w-auto"
              >
                Copy Key
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onRegenerateApiKey}
            className="border-slate-300 text-slate-700 w-full sm:w-auto"
          >
            Regenerate Key
          </Button>
          <Button
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-50 w-full sm:w-auto"
          >
            Revoke Key
          </Button>
        </div>

        {/* Warning Box */}
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> Keep this key secure and never share it
            publicly. This key provides full access to your account and data.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiConfigCard;
