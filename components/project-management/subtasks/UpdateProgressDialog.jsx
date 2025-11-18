'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function UpdateProgressDialog({
  open,
  setOpen,
  subtask,
  progressInput,
  setProgressInput,
  onUpdate,
}) {
  if (!subtask) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
      }}
    >
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Update Progress
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Set progress for{' '}
            <span className="font-semibold">{subtask.name}</span>.
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
              Enter a value between 0 and 100. When progress is 100%, the
              subtask will be marked as completed.
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
}
