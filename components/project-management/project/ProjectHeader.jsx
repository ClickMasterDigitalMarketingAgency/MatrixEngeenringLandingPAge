'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FolderPlus } from 'lucide-react';

export default function ProjectHeader({
  open,
  setOpen,
  newProject,
  setNewProject,
  onAddProject,
}) {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div className="flex-1">
        <h1>
          Project Management
        </h1>
        <p className="text-slate-600 mt-2 text-lg">
          Track projects, tasks, subtasks, and goals in one workspace.
        </p>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <FolderPlus className="mr-2 h-5 w-5" />
            New Project
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800">
              Create New Project
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Add a new engineering project to the management system.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label htmlFor="project-name">Project Name *</Label>
              <Input
                id="project-name"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
                placeholder="Bridge Construction Project"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="description">Description</Label>
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
                className="resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="start-date">Start Date *</Label>
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
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="end-date">End Date *</Label>
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
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label>Status</Label>
                <Select
                  value={newProject.status}
                  onValueChange={(value) =>
                    setNewProject({ ...newProject, status: value })
                  }
                >
                  <SelectTrigger>
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
                <Label>Priority</Label>
                <Select
                  value={newProject.priority}
                  onValueChange={(value) =>
                    setNewProject({ ...newProject, priority: value })
                  }
                >
                  <SelectTrigger>
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

            <Button onClick={onAddProject}>Create Project</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
