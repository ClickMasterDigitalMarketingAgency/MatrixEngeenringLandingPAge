'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreVertical, Edit, Trash2, PackageOpen, TrendingUp, Clock, TrendingDown, Activity } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const MaterialAllocation = () => {
  const [allocations, setAllocations] = useState([
    { id: 1, project: "Bridge Construction", material: "Steel Beams", quantity: 150, unit: "units", allocatedDate: "2025-11-18", allocatedBy: "John Doe", status: "Delivered" },
    { id: 2, project: "Highway Expansion", material: "Concrete Mix", quantity: 200, unit: "bags", allocatedDate: "2025-11-19", allocatedBy: "Jane Smith", status: "Allocated" },
    { id: 3, project: "Water Treatment Plant", material: "Pipes", quantity: 500, unit: "meters", allocatedDate: "2025-11-20", allocatedBy: "Mike Johnson", status: "Pending" },
    { id: 4, project: "Bridge Construction", material: "Reinforcement Bars", quantity: 300, unit: "units", allocatedDate: "2025-11-17", allocatedBy: "Sarah Wilson", status: "Delivered" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAllocation, setEditingAllocation] = useState(null);
  const [formData, setFormData] = useState({
    project: "",
    material: "",
    quantity: 0,
    unit: "",
    allocatedDate: new Date().toISOString().split('T')[0],
    allocatedBy: "",
    status: "Allocated"
  });

  const stats = [
    { label: "Total Allocations", value: allocations.length, color: "total", icon: PackageOpen },
    { label: "Delivered", value: allocations.filter(a => a.status === "Delivered").length, color: "delivered", icon: TrendingUp },
    { label: "Pending", value: allocations.filter(a => a.status === "Pending").length, color: "pending", icon: PackageOpen },
  ];

  const filteredAllocations = allocations.filter(allocation =>
    allocation.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    allocation.material.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAllocation) {
      setAllocations(allocations.map(a => a.id === editingAllocation.id ? { ...formData, id: a.id } : a));
    } else {
      const newId = allocations.length ? Math.max(...allocations.map(a => a.id)) + 1 : 1;
      setAllocations([...allocations, { ...formData, id: newId }]);
    }
    resetForm();
  };

  const handleEdit = (allocation) => {
    setEditingAllocation(allocation);
    setFormData(allocation);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setAllocations(allocations.filter(a => a.id !== id));
  };

  const resetForm = () => {
    setFormData({
      project: "",
      material: "",
      quantity: 0,
      unit: "",
      allocatedDate: new Date().toISOString().split('T')[0],
      allocatedBy: "",
      status: "Allocated"
    });
    setEditingAllocation(null);
    setIsDialogOpen(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Allocated": return "bg-emerald-500 text-white";
      case "Delivered": return "bg-blue-500 text-white";
      case "Pending": return "bg-red-500 text-white";
      default: return "bg-muted";
    }
  };

  const colorMap = {
    total: { border: 'border-l-primary', bg: 'bg-primary/10', iconColor: 'text-primary' },
    delivered: { border: 'border-l-blue-500', bg: 'bg-blue-100', iconColor: 'text-blue-600' },
    pending: { border: 'border-l-red-500', bg: 'bg-red-100', iconColor: 'text-red-600' },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
  <div>
    <h1>Material Allocation</h1>
    <p className="text-muted-foreground">Allocate materials to projects</p>
  </div>

  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <DialogTrigger asChild>
      <Button onClick={resetForm} className="gap-2">
        <Plus className="h-4 w-4" /> Allocate Material
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[600px] w-full">
      <DialogHeader>
        <DialogTitle>{editingAllocation ? "Edit Allocation" : "Allocate Material"}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Input id="project" placeholder="Enter project name" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="material">Material</Label>
            <Input id="material" placeholder="Enter material name" value={formData.material} onChange={e => setFormData({...formData, material: e.target.value})} required />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" placeholder="Enter quantity" value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Input id="unit" placeholder="Enter unit" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} required />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="allocatedDate">Allocation Date</Label>
            <Input id="allocatedDate" type="date" value={formData.allocatedDate} onChange={e => setFormData({...formData, allocatedDate: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="allocatedBy">Allocated By</Label>
            <Input id="allocatedBy" placeholder="Enter allocator name" value={formData.allocatedBy} onChange={e => setFormData({...formData, allocatedBy: e.target.value})} required />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button type="submit">{editingAllocation ? "Update" : "Allocate"}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</div>


      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const cfg = colorMap[stat.color];
          const Icon = stat.icon;
          return (
            <Card key={i} className={`bg-white border-l-4 ${cfg.border} shadow-sm hover:shadow-md transition-all duration-200`}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 ${cfg.bg} rounded-xl`}>
                  <Icon className={`h-6 w-6 ${cfg.iconColor}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search allocations..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
      </div>

      {/* Allocation List */}
      <div className="space-y-4">
        {filteredAllocations.map(a => (
          <Card key={a.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold">{a.project}</h3>
                  <Badge className={getStatusColor(a.status)}>{a.status}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Material</p>
                    <p className="font-semibold">{a.material}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Quantity</p>
                    <p className="font-semibold">{a.quantity} {a.unit}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Allocated By</p>
                    <p className="font-semibold">{a.allocatedBy}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-semibold">{a.allocatedDate}</p>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card">
                  <DropdownMenuItem onClick={() => handleEdit(a)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(a.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MaterialAllocation;
