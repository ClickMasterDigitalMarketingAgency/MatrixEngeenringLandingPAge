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
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';

const CreateGoalDialog = ({
  open,
  onOpenChange,
  newGoal,
  setNewGoal,
  projects,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-5 w-5" />
          New Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            Create New Goal
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Define a new strategic goal for your organization.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label htmlFor="goal-name">Goal Name *</Label>
            <Input
              id="goal-name"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              placeholder="Increase customer satisfaction score to 95%"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newGoal.description}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  description: e.target.value,
                })
              }
              placeholder="Detailed goal description, key objectives, and success metrics..."
              rows={4}
              className="resize-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="owner">Owner *</Label>
              <Input
                id="owner"
                value={newGoal.owner}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, owner: e.target.value })
                }
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-3">
              <Label>Status</Label>
              <Select
                value={newGoal.status}
                onValueChange={(value) =>
                  setNewGoal({ ...newGoal, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="On Track">On Track</SelectItem>
                  <SelectItem value="At Risk">At Risk</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={newGoal.startDate}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    startDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="target-date">Target Date *</Label>
              <Input
                id="target-date"
                type="date"
                value={newGoal.targetDate}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    targetDate: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label>Related Projects</Label>
            <Select
              onValueChange={(value) => {
                if (value && !newGoal.relatedProjectIds.includes(value)) {
                  setNewGoal({
                    ...newGoal,
                    relatedProjectIds: [...newGoal.relatedProjectIds, value],
                  });
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select projects" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {newGoal.relatedProjectIds.map((projectId) => {
                const project = projects.find((p) => p.id === projectId);
                return project ? (
                  <Badge key={projectId} variant="secondary" className="gap-1">
                    {project.name}
                    <button
                      type="button"
                      onClick={() =>
                        setNewGoal({
                          ...newGoal,
                          relatedProjectIds: newGoal.relatedProjectIds.filter(
                            (id) => id !== projectId
                          ),
                        })
                      }
                      className="ml-1 hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
          <Button onClick={onSubmit}>Create Goal</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGoalDialog;
