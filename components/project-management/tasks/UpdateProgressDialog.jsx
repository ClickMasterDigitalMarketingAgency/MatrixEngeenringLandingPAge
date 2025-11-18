'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const UpdateProgressDialog = ({
  open,
  setOpen,
  task,
  progressInput,
  setProgressInput,
  onUpdate,
}) => {
  if (!task) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(openState) => {
        setOpen(openState);
      }}
    >
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Update Progress
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Set progress for <span className="font-semibold">{task.name}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="progress">Progress (%)</Label>
            <Input
              id="progress"
              type="number"
              min={0}
              max={100}
              value={progressInput}
              onChange={(e) => setProgressInput(e.target.value)}
            />
            <p className="text-xs text-slate-500">
              Enter a value between 0 and 100. When progress is 100%, the task
              will be marked as completed.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={onUpdate}>Update</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProgressDialog;
