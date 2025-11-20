'use client';
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Bell } from "lucide-react";

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: "Project Updates", 
      description: "Get notified when projects you're following are updated or modified",
      channel: "Email & Push",
      enabled: true,
      category: "Projects"
    },
    { 
      id: 2, 
      type: "Task Assignments", 
      description: "Notifications for new tasks assigned to you and deadline reminders",
      channel: "Push Notification",
      enabled: true,
      category: "Tasks"
    },
    { 
      id: 3, 
      type: "Inventory Alerts", 
      description: "Critical alerts for low stock levels and inventory updates",
      channel: "SMS & Email",
      enabled: false,
      category: "Inventory"
    },
    { 
      id: 4, 
      type: "System Notifications", 
      description: "System maintenance alerts and performance updates",
      channel: "Email",
      enabled: true,
      category: "System"
    },
    { 
      id: 5, 
      type: "Weekly Reports", 
      description: "Weekly performance summaries and analytics reports",
      channel: "Email",
      enabled: false,
      category: "Reports"
    },
    { 
      id: 6, 
      type: "Security Alerts", 
      description: "Immediate security notifications and access changes",
      channel: "Push & SMS",
      enabled: true,
      category: "Security"
    },
  ]);

  const handleToggle = (id) => {
    setNotifications(
      notifications.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n)
    );
  };

  const filteredNotifications = notifications.filter(n =>
    n.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/30 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
           
            <h1 >Notification Settings</h1>
          </div>
          <p className="text-gray-600">Manage how you receive notifications across the platform</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>

        {/* Notifications List */}
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-0">
            {filteredNotifications.map((notif, index) => (
              <div
                key={notif.id}
                className={`flex items-center justify-between p-6 ${
                  index !== filteredNotifications.length - 1 ? 'border-b border-gray-100' : ''
                } hover:bg-gray-50/50 transition-colors`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{notif.type}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {notif.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{notif.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Channel: {notif.channel}</span>
                    <span className={`inline-flex items-center gap-1.5 ${notif.enabled ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${notif.enabled ? 'bg-green-500' : 'bg-gray-400'}`} />
                      {notif.enabled ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Custom Toggle Button */}
                <button
                  onClick={() => handleToggle(notif.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    notif.enabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      notif.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}

            {filteredNotifications.length === 0 && (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary */}
        <div className="mt-6 text-sm text-gray-500">
          {filteredNotifications.length} of {notifications.length} notifications shown
        </div>
      </div>
    </div>
  );
};

export default Notifications;