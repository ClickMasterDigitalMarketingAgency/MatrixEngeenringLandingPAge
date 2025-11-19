'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Save, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function Label({ className = '', ...props }) {
  return (
    <label
      className={`text-sm font-medium leading-none text-slate-700 ${className}`}
      {...props}
    />
  );
}

const SecurityCard = ({
  showPasswordForm,
  setShowPasswordForm,
  passwordForm,
  setPasswordForm,
  onChangePassword,
}) => {
  return (
    <Card className="border border-slate-200 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left side: Icon + title */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg border border-primary/10 bg-primary/5">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl text-slate-900">
                Security Settings
              </CardTitle>
              <CardDescription className="text-slate-600 text-sm sm:text-base">
                Manage your password and account security
              </CardDescription>
            </div>
          </div>

          {/* Right side: Button */}
          {!showPasswordForm && (
            <div className="w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setShowPasswordForm(true)}
                className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Change Password
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {showPasswordForm ? (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Current Password</Label>
              <input
                type="password"
                value={passwordForm.current}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    current: e.target.value,
                  })
                }
                placeholder="Enter your current password"
                className="border border-slate-300 focus:border-primary/50 rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>
            <div className="space-y-3">
              <Label>New Password</Label>
              <input
                type="password"
                value={passwordForm.new}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    new: e.target.value,
                  })
                }
                placeholder="Enter new password (min 8 characters)"
                className="border border-slate-300 focus:border-primary/50 rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>
            <div className="space-y-3">
              <Label>Confirm New Password</Label>
              <input
                type="password"
                value={passwordForm.confirm}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirm: e.target.value,
                  })
                }
                placeholder="Confirm your new password"
                className="border border-slate-300 focus:border-primary/50 rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>
            <p className="text-xs text-slate-500">
              Password must be at least 8 characters long with uppercase,
              lowercase, and numbers
            </p>
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <Button
                onClick={onChangePassword}
                className="bg-slate-900 hover:bg-slate-800 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Update Password
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordForm({ current: '', new: '', confirm: '' });
                }}
                className="border-slate-300 text-slate-700"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <p className="font-medium text-slate-900">Password Security</p>
                <p className="text-sm text-slate-600 mt-1">
                  Last changed: 45 days ago
                </p>
              </div>
              <Badge className="bg-green-50 text-green-700 border-0">
                Secure
              </Badge>
            </div>
            <p className="text-sm text-slate-600">
              We recommend changing your password every 90 days for optimal
              security.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityCard;
