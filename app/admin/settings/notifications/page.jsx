'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Notifications = () => {
  return (
  
      <div className="flex min-h-screen w-full">
      
        <main className="flex-1 overflow-auto">
         
          <div className="p-6 space-y-6">
            <div>
              <h1>Notification Preferences</h1>
              <p className="text-muted-foreground">Manage notification settings</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Project Updates</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Task Assignments</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Inventory Alerts</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>System Notifications</Label>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
  
  );
};

export default Notifications;
