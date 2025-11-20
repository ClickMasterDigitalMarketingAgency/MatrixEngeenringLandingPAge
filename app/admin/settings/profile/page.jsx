'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProfileSettings = () => {
  return (
  
      <div className="flex min-h-screen w-full">
     
        <main className="flex-1 overflow-auto">
          
          <div className="p-6 space-y-6">
            <div>
              <h1>Profile Settings</h1>
              <p className="text-muted-foreground">Update your profile information</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input defaultValue="Admin User" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" defaultValue="admin@matrix.com" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input defaultValue="+1234567890" />
                </div>
                <Button className="w-full">Update Profile</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
  
  );
};

export default ProfileSettings;
