'use client';
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreVertical, Edit, Trash2, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Teams = () => {
  const [teams, setTeams] = useState([
    { id: 1, name: "Alpha Team", lead: "John Doe", members: 8, project: "Bridge Construction" },
    { id: 2, name: "Beta Team", lead: "Jane Smith", members: 10, project: "Highway Expansion" },
    { id: 3, name: "Gamma Team", lead: "Mike Johnson", members: 6, project: "Building Renovation" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState({
    name: "", lead: "", members: 0, project: ""
  });

  const stats = [
    { label: "Total Teams", value: teams.length, border: "border-l-primary", bg: "bg-primary/10" },
    { label: "With Members", value: teams.filter(t => t.members > 0).length, border: "border-l-emerald-500", bg: "bg-emerald-100" },
  ];

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.lead.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTeam) {
      setTeams(teams.map(t => t.id === editingTeam.id ? { ...formData, id: t.id } : t));
    } else {
      const newId = teams.length ? Math.max(...teams.map(t => t.id)) + 1 : 1;
      setTeams([...teams, { ...formData, id: newId }]);
    }
    resetForm();
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setFormData(team);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => setTeams(teams.filter(t => t.id !== id));

  const resetForm = () => {
    setFormData({ name: "", lead: "", members: 0, project: "" });
    setEditingTeam(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Teams</h1>
          <p className="text-muted-foreground">Manage project teams</p>
        </div>

        {/* Add/Edit Team Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="gap-2">
              <Plus className="h-4 w-4" /> Add Team
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingTeam ? "Edit Team" : "Add New Team"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Team Name</Label>
                <Input id="name" placeholder="Enter team name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lead">Team Lead</Label>
                <Input id="lead" placeholder="Enter team lead name" value={formData.lead} onChange={(e) => setFormData({ ...formData, lead: e.target.value })} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="members">Members</Label>
                  <Input id="members" type="number" placeholder="Number of members" value={formData.members} onChange={(e) => setFormData({ ...formData, members: Number(e.target.value) })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project">Project</Label>
                  <Input id="project" placeholder="Project name" value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} required />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">{editingTeam ? "Update" : "Create"}</Button>
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
                <Users className="h-6 w-6 text-slate-700" />
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
        <Input placeholder="Search teams..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-semibold">
                  {team.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold">{team.name}</h3>
                  <p className="text-sm text-muted-foreground">Lead: {team.lead}</p>
                  <Badge variant="secondary" className="mt-1">{team.members} Members</Badge>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card">
                  <DropdownMenuItem onClick={() => handleEdit(team)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(team.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-2 text-sm pt-3 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Members:</span>
                <span className="font-medium">{team.members}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Project:</span>
                <span className="font-medium">{team.project}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Teams;
