'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

const TasksHeader = ({
  open,
  setOpen,
  newTask,
  setNewTask,
  projectsData,
  onAddTask,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h1>Tasks Management</h1>
        </div>
        <p className="text-slate-600 text-lg">
          Manage and track all project tasks in one place.
        </p>
        <Badge variant="secondary">Linked to Projects & Subtasks</Badge>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-5 w-5" />
            New Task
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800">
              Create New Task
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Add a new task to track work and assign to team members
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label htmlFor="task-name">Task Name *</Label>
              <Input
                id="task-name"
                value={newTask.name}
                onChange={(e) =>
                  setNewTask({ ...newTask, name: e.target.value })
                }
                placeholder="Design user interface mockups"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    description: e.target.value,
                  })
                }
                placeholder="Detailed task description, requirements, and acceptance criteria..."
                rows={4}
                className="resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label>Project *</Label>
                <SelectProject
                  value={newTask.projectId}
                  onChange={(value) =>
                    setNewTask({ ...newTask, projectId: value })
                  }
                  projectsData={projectsData}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="assignee">Assignee *</Label>
                <Input
                  id="assignee"
                  value={newTask.assignee}
                  onChange={(e) =>
                    setNewTask({ ...newTask, assignee: e.target.value })
                  }
                  placeholder="Team member name"
                />
              </div>
            </div>
            <TaskMetaFields newTask={newTask} setNewTask={setNewTask} />
            <Button onClick={onAddTask}>Create Task</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SelectProject = ({ value, onChange, projectsData }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger>
      <SelectValue placeholder="Select project" />
    </SelectTrigger>
    <SelectContent>
      {projectsData.map((project) => (
        <SelectItem key={project.id} value={project.id}>
          {project.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const TaskMetaFields = ({ newTask, setNewTask }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="space-y-3">
      <Label>Status</Label>
      <Select
        value={newTask.status}
        onValueChange={(value) => setNewTask({ ...newTask, status: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Blocked">Blocked</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-3">
      <Label>Priority</Label>
      <Select
        value={newTask.priority}
        onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-3">
      <Label htmlFor="due-date">Due Date</Label>
      <Input
        id="due-date"
        type="date"
        value={newTask.dueDate}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            dueDate: e.target.value,
          })
        }
      />
    </div>
  </div>
);

export default TasksHeader;
