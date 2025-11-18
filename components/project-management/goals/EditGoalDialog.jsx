'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const EditGoalDialog = ({
  open,
  onOpenChange,
  editForm,
  setEditForm,
  projects,
  onSubmit,
}) => {
  if (!editForm) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(openVal) => {
        onOpenChange(openVal);
        if (!openVal) setEditForm(null);
      }}
    >
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            Edit Goal
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Update goal details, owner, dates, and related projects.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label htmlFor="edit-goal-name">Goal Name *</Label>
            <Input
              id="edit-goal-name"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={editForm.description}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  description: e.target.value,
                })
              }
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="edit-owner">Owner *</Label>
              <Input
                id="edit-owner"
                value={editForm.owner}
                onChange={(e) =>
                  setEditForm({ ...editForm, owner: e.target.value })
                }
              />
            </div>
            <div className="space-y-3">
              <Label>Status</Label>
              <Select
                value={editForm.status}
                onValueChange={(value) =>
                  setEditForm({ ...editForm, status: value })
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
              <Label htmlFor="edit-start-date">Start Date</Label>
              <Input
                id="edit-start-date"
                type="date"
                value={editForm.startDate || ''}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    startDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="edit-target-date">Target Date *</Label>
              <Input
                id="edit-target-date"
                type="date"
                value={editForm.targetDate || ''}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
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
                if (value && !editForm.relatedProjectIds.includes(value)) {
                  setEditForm({
                    ...editForm,
                    relatedProjectIds: [...editForm.relatedProjectIds, value],
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
              {editForm.relatedProjectIds.map((projectId) => {
                const project = projects.find((p) => p.id === projectId);
                return project ? (
                  <Badge key={projectId} variant="secondary" className="gap-1">
                    {project.name}
                    <button
                      type="button"
                      onClick={() =>
                        setEditForm({
                          ...editForm,
                          relatedProjectIds: editForm.relatedProjectIds.filter(
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

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                setEditForm(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={onSubmit}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditGoalDialog;
