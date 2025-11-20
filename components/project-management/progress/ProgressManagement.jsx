'use client';
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, MoreVertical, TrendingUp, Edit, Activity } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ProjectProgressPage = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Bridge Construction Project", status: "Active", progress: 68, phase: "Foundation & Structure", budget: 5200000, spent: 3536000, team: "Team Alpha", endDate: "2025-06-15" },
    { id: 2, name: "Highway Expansion", status: "Active", progress: 45, phase: "Planning & Design", budget: 3800000, spent: 1710000, team: "Team Beta", endDate: "2025-08-20" },
    { id: 3, name: "Water Treatment Plant", status: "On Hold", progress: 25, phase: "Site Preparation", budget: 7500000, spent: 1875000, team: "Team Gamma", endDate: "2025-12-30" },
    { id: 4, name: "Metro Station Development", status: "Completed", progress: 100, phase: "Final Inspection", budget: 8900000, spent: 8812000, team: "Team Delta", endDate: "2024-11-10" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProgress, setNewProgress] = useState(0);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Average Progress", value: `${Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%`, icon: Activity, border: "border-l-primary", bg: "bg-primary/10" },
    { label: "Active Projects", value: projects.filter(p => p.status === "Active").length, icon: TrendingUp, border: "border-l-emerald-500", bg: "bg-emerald-100" },
    { label: "Total Budget", value: `$${(projects.reduce((sum, p) => sum + p.budget, 0) / 1000000).toFixed(1)}M`, icon: TrendingUp, border: "border-l-blue-500", bg: "bg-blue-100" },
  ];

  const handleUpdateProgress = (e) => {
    e.preventDefault();
    if (editingProject) {
      setProjects(projects.map(p =>
        p.id === editingProject.id ? { ...p, progress: newProgress } : p
      ));
      setIsDialogOpen(false);
      setEditingProject(null);
      setNewProgress(0);
    }
  };

  const openEditDialog = (project) => {
    setEditingProject(project);
    setNewProgress(project.progress);
    setIsDialogOpen(true);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Active": return "bg-emerald-500 text-white";
      case "Completed": return "bg-blue-500 text-white";
      case "On Hold": return "bg-yellow-500 text-white";
      default: return "bg-muted";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Project Progress</h1>
        <p className="text-muted-foreground">Monitor and update project progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
      </div>

      {/* Project List */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Current Phase: {project.phase}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card">
                  <DropdownMenuItem onClick={() => openEditDialog(project)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Update Progress
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Progress & Budget */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Budget Used</span>
                  <span className="font-semibold">{Math.round((project.spent / project.budget) * 100)}%</span>
                </div>
                <Progress value={(project.spent / project.budget) * 100} className="h-3" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-4 border-t text-sm">
              <div>
                <p className="text-muted-foreground">Budget</p>
                <p className="font-semibold">${(project.budget / 1000000).toFixed(2)}M</p>
              </div>
              <div>
                <p className="text-muted-foreground">Spent</p>
                <p className="font-semibold">${(project.spent / 1000000).toFixed(2)}M</p>
              </div>
              <div>
                <p className="text-muted-foreground">Team</p>
                <p className="font-semibold">{project.team}</p>
              </div>
              <div>
                <p className="text-muted-foreground">End Date</p>
                <p className="font-semibold">{project.endDate}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Update Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Progress: {editingProject?.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateProgress} className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="progress">Progress: {newProgress}%</Label>
              <Input
                id="progress"
                type="range"
                min="0"
                max="100"
                value={newProgress}
                onChange={(e) => setNewProgress(parseInt(e.target.value))}
                className="w-full"
              />
              <Progress value={newProgress} className="h-3" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectProgressPage;
