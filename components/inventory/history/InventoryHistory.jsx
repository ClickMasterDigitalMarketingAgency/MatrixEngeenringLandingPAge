'use client';
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const InventoryHistory = () => {
  const [history] = useState([
    { id: 1, date: "2025-11-20", time: "14:35", action: "Added", material: "Steel Beams", quantity: 200, unit: "units", user: "John Doe", notes: "New shipment received" },
    { id: 2, date: "2025-11-20", time: "11:22", action: "Removed", material: "Concrete Mix", quantity: 50, unit: "bags", user: "Jane Smith", notes: "Allocated to Bridge Project" },
    { id: 3, date: "2025-11-19", time: "16:45", action: "Updated", material: "Reinforcement Bars", quantity: 300, unit: "units", user: "Mike Johnson", notes: "Stock count correction" },
    { id: 4, date: "2025-11-19", time: "09:15", action: "Transferred", material: "Ceramic Tiles", quantity: 120, unit: "boxes", user: "Sarah Wilson", notes: "Moved to Site B warehouse" },
    { id: 5, date: "2025-11-18", time: "13:20", action: "Added", material: "Paint", quantity: 85, unit: "gallons", user: "John Doe", notes: "Purchase order fulfilled" },
    { id: 6, date: "2025-11-18", time: "10:00", action: "Removed", material: "Steel Beams", quantity: 75, unit: "units", user: "Mike Johnson", notes: "Highway project allocation" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState("all");

  const filteredHistory = history.filter(entry => {
    const matchesSearch = entry.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAction === "all" || entry.action === filterAction;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: "Total Events", value: history.length, icon: Activity, border: "border-l-primary", bg: "bg-primary/10" },
    { label: "Items Added", value: history.filter(h => h.action === "Added").length, icon: TrendingUp, border: "border-l-emerald-500", bg: "bg-emerald-100" },
    { label: "Items Removed", value: history.filter(h => h.action === "Removed").length, icon: TrendingDown, border: "border-l-red-500", bg: "bg-red-100" },
    { label: "Updates", value: history.filter(h => h.action === "Updated").length, icon: Clock, border: "border-l-blue-500", bg: "bg-blue-100" },
  ];

  const getActionColor = (action) => {
    switch(action) {
      case "Added": return "bg-emerald-500 text-white";
      case "Removed": return "bg-red-500 text-white";
      case "Updated": return "bg-blue-500 text-white";
      case "Transferred": return "bg-yellow-500 text-white";
      default: return "bg-muted";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Inventory History</h1>
        <p className="text-muted-foreground">Track all inventory changes and movements</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className={`bg-white border-l-4 ${stat.border} shadow-sm animate-scale-in`}>
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

      {/* Search and filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search history..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <Select value={filterAction} onValueChange={setFilterAction}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="Added">Added</SelectItem>
            <SelectItem value="Removed">Removed</SelectItem>
            <SelectItem value="Updated">Updated</SelectItem>
            <SelectItem value="Transferred">Transferred</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* History list */}
      <div className="space-y-4">
        {filteredHistory.map((entry) => (
          <Card key={entry.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{entry.material}</h3>
                  <Badge className={getActionColor(entry.action)}>{entry.action}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{entry.notes}</p>
                {/* Single row for Quantity, Performed by, Action */}
                <div className="flex flex-wrap gap-6 text-sm font-medium">
                  <div>
                    <span className="text-muted-foreground">Quantity:</span> {entry.quantity} {entry.unit}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Performed by:</span> {entry.user}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Action:</span> {entry.action}
                  </div>
                </div>
                {/* Date + time */}
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-4 w-4" /> {entry.date} at {entry.time}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InventoryHistory;
