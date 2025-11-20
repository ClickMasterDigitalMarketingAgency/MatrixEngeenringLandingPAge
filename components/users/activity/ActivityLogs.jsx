'use client';
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, FileText, AlertCircle, Activity } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ActivityLogs = () => {
  const [logs] = useState([
    { id: 1, user: "John Doe", action: "Created", target: "Bridge Construction Project", timestamp: "2025-11-20 14:35:22", type: "Create", details: "New project initiated with budget $5.2M" },
    { id: 2, user: "Jane Smith", action: "Updated", target: "Material: Steel Beams", timestamp: "2025-11-20 13:22:15", type: "Update", details: "Quantity changed from 200 to 350 units" },
    { id: 3, user: "Mike Johnson", action: "Deleted", target: "Task: Site Survey", timestamp: "2025-11-20 11:45:30", type: "Delete", details: "Task marked as completed and archived" },
    { id: 4, user: "Sarah Wilson", action: "Accessed", target: "Purchase Order #PO-2025-003", timestamp: "2025-11-20 10:15:42", type: "Access", details: "Viewed purchase order details" },
    { id: 5, user: "John Doe", action: "Created", target: "User: David Brown", timestamp: "2025-11-19 16:30:18", type: "Create", details: "New user added to Engineering department" },
    { id: 6, user: "Jane Smith", action: "Updated", target: "Project Progress: Highway Expansion", timestamp: "2025-11-19 14:20:55", type: "Update", details: "Progress updated from 40% to 45%" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || log.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: "Total Activities", value: logs.length, icon: FileText, border: "border-l-primary", bg: "bg-primary/10" },
    { label: "Created", value: logs.filter(l => l.type === "Create").length, icon: FileText, border: "border-l-emerald-500", bg: "bg-emerald-100" },
    { label: "Updated", value: logs.filter(l => l.type === "Update").length, icon: FileText, border: "border-l-blue-500", bg: "bg-blue-100" },
    { label: "Deleted", value: logs.filter(l => l.type === "Delete").length, icon: AlertCircle, border: "border-l-red-500", bg: "bg-red-100" },
  ];

  const getTypeColor = (type) => {
    switch(type) {
      case "Create": return "bg-emerald-500 text-white";
      case "Update": return "bg-blue-500 text-white";
      case "Delete": return "bg-red-500 text-white";
      case "Access": return "bg-yellow-500 text-white";
      default: return "bg-muted";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1>Activity Logs</h1>
        <p className="text-muted-foreground">Monitor all system activities and changes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className={`border-l-4 ${stat.border} bg-white shadow-sm hover:shadow-md transition-all`}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 ${stat.bg} rounded-lg`}>
                <stat.icon className="h-6 w-6 text-slate-700" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search activity logs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Create">Create</SelectItem>
            <SelectItem value="Update">Update</SelectItem>
            <SelectItem value="Delete">Delete</SelectItem>
            <SelectItem value="Access">Access</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Logs List */}
      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <Card key={log.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              {/* User Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-semibold flex-shrink-0">
                {log.user.split(' ').map(n => n[0]).join('')}
              </div>
              {/* Log Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className={getTypeColor(log.type)}>{log.type}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {log.timestamp}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold">
                    <span className="text-primary">{log.user}</span> {log.action.toLowerCase()} {log.target}
                  </p>
                  <p className="text-sm text-muted-foreground">{log.details}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogs;
