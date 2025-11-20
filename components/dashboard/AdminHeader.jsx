'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Download, UserPlus } from 'lucide-react';

const AdminHeader = ({ onAddUser }) => {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'viewer',
    department: '',
    phone: '',
  });

  const handleSubmit = () => {
    if (!newUser.name || !newUser.email) {
      toast.error('Missing Required Fields', {
        description: 'Please fill in name and email address.',
      });
      return;
    }

    onAddUser(newUser);

    setNewUser({
      name: '',
      email: '',
      role: 'viewer',
      department: '',
      phone: '',
    });
    setOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div className="flex-1">
        <h1>
          Admin Dashboard
        </h1>
        <p className="text-slate-600 mt-2 text-lg">
          Comprehensive system overview and user management
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="border-slate-300">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="animate-scale-in bg-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-800">
                Add New User
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                Create a new user account with specified role and permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="john@matrix.com"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+1-555-0100"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={newUser.department}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      department: e.target.value,
                    }))
                  }
                  placeholder="Engineering"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) =>
                    setNewUser((prev) => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="engineer">Engineer</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Add User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminHeader;
