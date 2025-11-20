'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SystemSettings = () => {
  return (
    
      <div className="flex min-h-screen w-full">
      
        <main className="flex-1 overflow-auto">
        
          <div className="p-6 space-y-6">
            <div>
              <h1>System Settings</h1>
              <p className="text-muted-foreground">Configure system preferences</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Email Notifications</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Auto Backup</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Maintenance Mode</Label>
                  <Switch />
                </div>
                <Button className="w-full mt-4">Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    
  );
};

export default SystemSettings;
