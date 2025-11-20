'use client';
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreVertical, Edit, Trash2, Shield, Users, Key } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

const RolesPermissions = () => {
  const allPermissions = [
    "View Projects", "Create Projects", "Edit Projects", "Delete Projects",
    "View Materials", "Create Materials", "Edit Materials", "Delete Materials",
    "View Users", "Create Users", "Edit Users", "Delete Users",
    "View Reports", "Generate Reports", "Manage Settings"
  ];

  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", description: "Full system access", userCount: 5, permissions: allPermissions },
    { id: 2, name: "Project Manager", description: "Manage projects and teams", userCount: 12, permissions: ["View Projects", "Create Projects", "Edit Projects", "View Materials", "View Users", "View Reports"] },
    { id: 3, name: "Engineer", description: "Technical project work", userCount: 28, permissions: ["View Projects", "Edit Projects", "View Materials", "Create Materials"] },
    { id: 4, name: "Viewer", description: "Read-only access", userCount: 15, permissions: ["View Projects", "View Materials", "View Reports"] },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    userCount: 0,
    permissions: [] 
  });

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRole) {
      setRoles(roles.map(r => r.id === editingRole.id ? { ...formData, id: r.id } : r));
    } else {
      const newId = roles.length ? Math.max(...roles.map(r => r.id)) + 1 : 1;
      setRoles([...roles, { ...formData, id: newId }]);
    }
    resetForm();
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setFormData(role);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => setRoles(roles.filter(r => r.id !== id));

  const resetForm = () => {
    setFormData({ name: "", description: "", userCount: 0, permissions: [] });
    setEditingRole(null);
    setIsDialogOpen(false);
  };

  const togglePermission = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const stats = [
    { label: "Total Roles", value: roles.length, icon: Shield, color: "bg-chart-4" },
    { label: "Total Users", value: roles.reduce((sum, r) => sum + r.userCount, 0), icon: Users, color: "bg-chart-5" },
    { label: "Total Permissions", value: allPermissions.length, icon: Key, color: "bg-primary" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
  <div>
    <h1>Roles & Permissions</h1>
    <p className="text-muted-foreground">Manage user roles and access control</p>
  </div>

  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <DialogTrigger asChild>
      <Button onClick={resetForm} className="gap-2">
        <Plus className="h-4 w-4" /> Add Role
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[700px] w-full max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{editingRole ? "Edit Role" : "Create New Role"}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Role Name</Label>
          <Input id="name" placeholder="Enter role name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" placeholder="Enter description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
        </div>
        <div className="space-y-3">
          <Label>Permissions</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allPermissions.map((permission) => (
              <div key={permission} className="flex items-center space-x-2">
                <Checkbox
                  id={permission}
                  checked={formData.permissions.includes(permission)}
                  onCheckedChange={() => togglePermission(permission)}
                />
                <label htmlFor={permission} className="text-sm cursor-pointer">{permission}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button type="submit">{editingRole ? "Update" : "Create"}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search roles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
      </div>

      {/* Roles Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <Card key={role.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="border p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{role.name}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card">
                  <DropdownMenuItem onClick={() => handleEdit(role)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(role.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Users with this role</span>
                <Badge variant="secondary">{role.userCount} users</Badge>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Permissions ({role.permissions.length})</p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.slice(0, 6).map((permission) => (
                    <Badge key={permission} variant="outline" className="text-xs">{permission}</Badge>
                  ))}
                  {role.permissions.length > 6 && (
                    <Badge variant="outline" className="text-xs">+{role.permissions.length - 6} more</Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RolesPermissions;
