'use client';
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreVertical, Edit, Trash2, Building2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Departments = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Engineering", head: "John Doe", employees: 25, projects: 8 },
    { id: 2, name: "Operations", head: "Jane Smith", employees: 15, projects: 5 },
    { id: 3, name: "Safety", head: "Mike Johnson", employees: 8, projects: 12 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [formData, setFormData] = useState({
    name: "", head: "", employees: 0, projects: 0
  });

  const stats = [
    { label: "Total Departments", value: departments.length, border: "border-l-primary", bg: "bg-primary/10" },
    { label: "With Projects", value: departments.filter(d => d.projects > 0).length, border: "border-l-emerald-500", bg: "bg-emerald-100" },
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDept) {
      setDepartments(departments.map(d => d.id === editingDept.id ? { ...formData, id: d.id } : d));
    } else {
      const newId = departments.length ? Math.max(...departments.map(d => d.id)) + 1 : 1;
      setDepartments([...departments, { ...formData, id: newId }]);
    }
    resetForm();
  };

  const handleEdit = (dept) => {
    setEditingDept(dept);
    setFormData(dept);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => setDepartments(departments.filter(d => d.id !== id));

  const resetForm = () => {
    setFormData({ name: "", head: "", employees: 0, projects: 0 });
    setEditingDept(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
  <div>
    <h1>Departments</h1>
    <p className="text-muted-foreground">Manage company departments</p>
  </div>

  {/* Add/Edit Department Dialog */}
  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <DialogTrigger asChild>
      <Button onClick={resetForm} className="gap-2">
        <Plus className="h-4 w-4" /> Add Department
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[600px] w-full">
      <DialogHeader>
        <DialogTitle>{editingDept ? "Edit Department" : "Add New Department"}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Department Name</Label>
          <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="head">Head</Label>
          <Input id="head" value={formData.head} onChange={(e) => setFormData({ ...formData, head: e.target.value })} required />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="employees">Employees</Label>
            <Input id="employees" type="number" value={formData.employees} onChange={(e) => setFormData({ ...formData, employees: Number(e.target.value) })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projects">Projects</Label>
            <Input id="projects" type="number" value={formData.projects} onChange={(e) => setFormData({ ...formData, projects: Number(e.target.value) })} required />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button type="submit">{editingDept ? "Update" : "Create"}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className={`border-l-4 ${stat.border} bg-white shadow-sm hover:shadow-md transition-all`}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 ${stat.bg} rounded-lg`}>
                <Building2 className="h-6 w-6 text-slate-700" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search departments..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((dept) => (
          <Card key={dept.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-semibold">
                  {dept.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold">{dept.name}</h3>
                  <p className="text-sm text-muted-foreground">Head: {dept.head}</p>
                  <Badge variant="secondary" className="mt-1">{dept.employees} Employees</Badge>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card">
                  <DropdownMenuItem onClick={() => handleEdit(dept)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(dept.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-2 text-sm pt-3 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Employees:</span>
                <span className="font-medium">{dept.employees}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Projects:</span>
                <span className="font-medium">{dept.projects}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Departments;
