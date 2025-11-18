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
import { Plus } from 'lucide-react';

export default function SubtasksHeader({
  open,
  setOpen,
  newSubtask,
  setNewSubtask,
  tasksData,
  onAddSubtask,
}) {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h1>Subtasks</h1>
        </div>
        <p className="text-slate-600 text-lg">
          Break tasks down into smaller, actionable subtasks.
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-5 w-5" />
            New Subtask
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800">
              Create New Subtask
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Add a new subtask to break down complex tasks.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label htmlFor="subtask-name">Subtask Name *</Label>
              <Input
                id="subtask-name"
                value={newSubtask.name}
                onChange={(e) =>
                  setNewSubtask({ ...newSubtask, name: e.target.value })
                }
                placeholder="Create wireframe for dashboard"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newSubtask.description}
                onChange={(e) =>
                  setNewSubtask({
                    ...newSubtask,
                    description: e.target.value,
                  })
                }
                placeholder="Detailed description of the subtask requirements..."
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label>Parent Task *</Label>
                <Select
                  value={newSubtask.taskId}
                  onValueChange={(value) =>
                    setNewSubtask({ ...newSubtask, taskId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent task" />
                  </SelectTrigger>
                  <SelectContent>
                    {tasksData.map((task) => (
                      <SelectItem key={task.id} value={task.id}>
                        [{task.id}] {task.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="assignee">Assignee *</Label>
                <Input
                  id="assignee"
                  value={newSubtask.assignee}
                  onChange={(e) =>
                    setNewSubtask({
                      ...newSubtask,
                      assignee: e.target.value,
                    })
                  }
                  placeholder="Team member name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label>Status</Label>
                <Select
                  value={newSubtask.status}
                  onValueChange={(value) =>
                    setNewSubtask({ ...newSubtask, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Blocked">Blocked</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Priority</Label>
                <Select
                  value={newSubtask.priority}
                  onValueChange={(value) =>
                    setNewSubtask({ ...newSubtask, priority: value })
                  }
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
                  value={newSubtask.dueDate}
                  onChange={(e) =>
                    setNewSubtask({
                      ...newSubtask,
                      dueDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <Button onClick={onAddSubtask}>Create Subtask</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
