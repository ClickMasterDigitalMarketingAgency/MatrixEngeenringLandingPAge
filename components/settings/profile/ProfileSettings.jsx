'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Camera } from "lucide-react";

const ProfileSettings = () => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50/30">
      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
          
            <div>
              <h1>Profile Settings</h1>
              <p className="text-gray-600">Update your personal information and profile details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Picture Card */}
            <Card className="bg-white border border-gray-200 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      AU
                    </div>
                    <button className="absolute bottom-2 right-2 p-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow">
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    JPG, GIF or PNG. Max size 5MB
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 border-gray-300">
                    Remove
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Upload New
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information Card */}
            <Card className="bg-white border border-gray-200 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-900">First Name</Label>
                    <Input 
                      defaultValue="Admin" 
                      placeholder="Enter your first name"
                      className="border-gray-300 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-900">Last Name</Label>
                    <Input 
                      defaultValue="User" 
                      placeholder="Enter your last name"
                      className="border-gray-300 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    Email Address
                  </Label>
                  <Input 
                    type="email" 
                    defaultValue="admin@matrix.com" 
                    placeholder="Enter your email address"
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    Phone Number
                  </Label>
                  <Input 
                    defaultValue="+1234567890" 
                    placeholder="Enter your phone number"
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-900">Job Title</Label>
                  <Input 
                    defaultValue="System Administrator" 
                    placeholder="Enter your job title"
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-900">Department</Label>
                  <Input 
                    defaultValue="IT" 
                    placeholder="Enter your department"
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="border-gray-300 flex-1">
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 flex-1">
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Settings Card */}
          <Card className="bg-white border border-gray-200 max-w-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900">Language</Label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900">Time Zone</Label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option>UTC-05:00 Eastern Time (ET)</option>
                  <option>UTC-08:00 Pacific Time (PT)</option>
                  <option>UTC+00:00 Greenwich Mean Time (GMT)</option>
                  <option>UTC+01:00 Central European Time (CET)</option>
                </select>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;