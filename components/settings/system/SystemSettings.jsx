'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, Save } from "lucide-react";

const SystemSettings = () => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50/30">
      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
          
            <div>
              <h1>System Settings</h1>
              <p className="text-gray-600">Configure system preferences and global settings</p>
            </div>
          </div>

          {/* General Settings Card */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="">
              <CardTitle className="text-xl font-semibold text-gray-900">General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="space-y-1">
                  <Label className="text-base font-medium text-gray-900">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive email alerts for system events</p>
                </div>
                <Switch className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300" />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="space-y-1">
                  <Label className="text-base font-medium text-gray-900">Auto Backup</Label>
                  <p className="text-sm text-gray-500">Automatically backup data daily</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300" />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="space-y-1">
                  <Label className="text-base font-medium text-gray-900">Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Put system in maintenance mode</p>
                </div>
                <Switch className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300" />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="space-y-1">
                  <Label className="text-base font-medium text-gray-900">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Require 2FA for all users</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300" />
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="space-y-1">
                  <Label className="text-base font-medium text-gray-900">Audit Logging</Label>
                  <p className="text-sm text-gray-500">Log all system activities</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300" />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings Card */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="space-y-1">
                  <Label className="text-base font-medium text-gray-900">Session Timeout</Label>
                  <p className="text-sm text-gray-500">Automatically log out inactive users after 30 minutes</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300" />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="space-y-1">
                  <Label className="text-base font-medium text-gray-900">IP Whitelisting</Label>
                  <p className="text-sm text-gray-500">Restrict access to specific IP addresses</p>
                </div>
                <Switch className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300" />
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="space-y-1">
                  <Label className="text-base font-medium text-gray-900">API Rate Limiting</Label>
                  <p className="text-sm text-gray-500">Limit API requests to prevent abuse</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300" />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
                <Save className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SystemSettings;