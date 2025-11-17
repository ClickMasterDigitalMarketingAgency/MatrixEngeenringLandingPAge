'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  FolderPlus,
  Trash2,
  Calendar,
  Users,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Clock,
  AlertCircle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const initialProjects = [
  {
    id: 'p1',
    name: 'Bridge Construction Project',
    description:
      'Design and construction of a 4-lane river bridge with modern engineering standards and safety protocols.',
    status: 'active',
    assignedTo: ['Ali', 'Sara', 'Mike'],
    startDate: '2025-01-10',
    endDate: '2025-06-30',
    progress: 40,
    priority: 'high',
  },
  {
    id: 'p2',
    name: 'Highway Expansion',
    description:
      'Widening existing highway to support increased traffic flow and improve transportation efficiency.',
    status: 'on-hold',
    assignedTo: ['Bilal'],
    startDate: '2024-11-01',
    endDate: '2025-09-15',
    progress: 25,
    priority: 'medium',
  },
  {
    id: 'p3',
    name: 'Metro Station Upgrade',
    description:
      'Structural and electrical upgrade of metro stations including accessibility improvements.',
    status: 'completed',
    assignedTo: ['Team A', 'Team B'],
    startDate: '2024-05-01',
    endDate: '2024-12-01',
    progress: 100,
    priority: 'low',
  },
];

const ProjectManagement = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'active',
    assignedTo: [],
    startDate: '',
    endDate: '',
    progress: 0,
    priority: 'medium',
  });

  // Filter projects based on search and status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddProject = () => {
    if (!newProject.name || !newProject.startDate || !newProject.endDate) {
      toast.error('Missing required fields', {
        description: 'Please fill in project name, start date, and end date.',
      });
      return;
    }

    if (new Date(newProject.startDate) > new Date(newProject.endDate)) {
      toast.error('Invalid dates', {
        description: 'Start date cannot be after end date.',
      });
      return;
    }

    const projectToAdd = {
      id: `p${Date.now()}`,
      ...newProject,
    };

    setProjects((prev) => [projectToAdd, ...prev]);

    toast.success('Project created successfully', {
      description: `${newProject.name} has been added to your projects.`,
    });

    setNewProject({
      name: '',
      description: '',
      status: 'active',
      assignedTo: [],
      startDate: '',
      endDate: '',
      progress: 0,
      priority: 'medium',
    });
    setOpen(false);
  };

  const handleDeleteProject = (id, name) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast.info('Project deleted', {
      description: `${name} has been removed from your projects.`,
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-500 text-white',
      completed: 'bg-blue-500 text-white',
      'on-hold': 'bg-yellow-500 text-white',
    };
    return colors[status] || 'bg-gray-500 text-white';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            Project Management
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Track and manage engineering projects with real-time progress
            monitoring
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <FolderPlus className="mr-2 h-5 w-5" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl animate-scale-in bg-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-800">
                Create New Project
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                Add a new engineering project to the management system
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <Label
                  htmlFor="project-name"
                  className="text-sm font-medium text-slate-700"
                >
                  Project Name *
                </Label>
                <Input
                  id="project-name"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                  placeholder="Bridge Construction Project"
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-slate-700"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  placeholder="Detailed project description, objectives, and key deliverables..."
                  rows={4}
                  className="focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="start-date"
                    className="text-sm font-medium text-slate-700"
                  >
                    Start Date *
                  </Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        startDate: e.target.value,
                      })
                    }
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="end-date"
                    className="text-sm font-medium text-slate-700"
                  >
                    End Date *
                  </Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={newProject.endDate}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        endDate: e.target.value,
                      })
                    }
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="status"
                    className="text-sm font-medium text-slate-700"
                  >
                    Status
                  </Label>
                  <Select
                    value={newProject.status}
                    onValueChange={(value) =>
                      setNewProject({ ...newProject, status: value })
                    }
                  >
                    <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="priority"
                    className="text-sm font-medium text-slate-700"
                  >
                    Priority
                  </Label>
                  <Select
                    value={newProject.priority}
                    onValueChange={(value) =>
                      setNewProject({ ...newProject, priority: value })
                    }
                  >
                    <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddProject}>Create Project</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white border-l-4 border-l-blue-500 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-800">
              {projects.length}
            </div>
            <div className="text-sm text-slate-600">Total Projects</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-l-4 border-l-green-500 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-800">
              {projects.filter((p) => p.status === 'active').length}
            </div>
            <div className="text-sm text-slate-600">Active Projects</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-l-4 border-l-yellow-500 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-800">
              {projects.filter((p) => p.status === 'on-hold').length}
            </div>
            <div className="text-sm text-slate-600">On Hold</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-l-4 border-l-blue-500 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-800">
              {projects.filter((p) => p.status === 'completed').length}
            </div>
            <div className="text-sm text-slate-600">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 focus:ring-2 focus:ring-blue-500 border-slate-300"
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-slate-500" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6">
        {filteredProjects.length === 0 ? (
          <Card className="text-center py-12 bg-white shadow-sm">
            <CardContent>
              <div className="text-slate-400 mb-4">
                <FolderPlus className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-slate-600 mb-2">
                No projects found
              </h3>
              <p className="text-slate-500">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by creating your first project'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredProjects.map((project, index) => {
            const daysRemaining = getDaysRemaining(project.endDate);
            const isOverdue =
              daysRemaining < 0 && project.status !== 'completed';

            return (
              <Card
                key={project.id}
                className="hover:shadow-xl transition-all duration-300 animate-fade-in bg-white border border-slate-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3 flex-wrap">
                        <CardTitle className="text-xl text-slate-800 leading-tight">
                          {project.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            className={`${getStatusColor(
                              project.status
                            )} font-semibold`}
                          >
                            {project.status.charAt(0).toUpperCase() +
                              project.status.slice(1)}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(project.priority)}
                          >
                            {project.priority} Priority
                          </Badge>
                          {isOverdue && (
                            <Badge
                              variant="outline"
                              className="bg-red-100 text-red-800 border-red-200"
                            >
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Overdue
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardDescription className="text-slate-600 text-base leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-red-600"
                          onClick={() =>
                            handleDeleteProject(project.id, project.name)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-4 border-t border-slate-100">
                  {/* Project Team */}
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">Team:</span>
                    <div className="flex items-center gap-1">
                      {project.assignedTo.map((member, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(project.startDate).toLocaleDateString()} -{' '}
                      {new Date(project.endDate).toLocaleDateString()}
                    </span>
                    {project.status !== 'completed' && (
                      <Badge variant="outline" className="ml-2">
                        <Clock className="h-3 w-3 mr-1" />
                        {isOverdue
                          ? `${Math.abs(daysRemaining)} days overdue`
                          : `${daysRemaining} days left`}
                      </Badge>
                    )}
                  </div>

                  {/* Progress */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">
                        Project Progress
                      </span>
                      <span
                        className={`font-bold ${
                          project.progress === 100
                            ? 'text-green-600'
                            : project.progress >= 70
                            ? 'text-blue-600'
                            : 'text-orange-600'
                        }`}
                      >
                        {project.progress}%
                      </span>
                    </div>
                    <Progress
                      value={project.progress}
                      className={`h-3 ${
                        project.progress === 100
                          ? 'bg-green-100'
                          : project.progress >= 70
                          ? 'bg-blue-100'
                          : 'bg-orange-100'
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;
