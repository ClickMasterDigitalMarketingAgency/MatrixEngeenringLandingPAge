'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
  Save,
  X,
} from 'lucide-react';
import { useMemo } from 'react';

// Local Label
function Label({ className = '', ...props }) {
  return (
    <label
      className={`text-sm font-medium leading-none text-slate-700 ${className}`}
      {...props}
    />
  );
}

const ProfileCard = ({
  userProfile,
  editedProfile,
  setEditedProfile,
  isEditingProfile,
  setIsEditingProfile,
  onSaveProfile,
  onCancelEdit,
}) => {
  const fullName = useMemo(
    () => `${userProfile.firstName} ${userProfile.lastName}`,
    [userProfile.firstName, userProfile.lastName]
  );

  return (
    <Card className="border border-slate-200 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Icon + title + description */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg border border-primary/10 bg-primary/5">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl text-slate-900">
                Profile Information
              </CardTitle>
              <CardDescription className="text-slate-600 text-sm sm:text-base">
                Manage your personal and professional details
              </CardDescription>
            </div>
          </div>

          {/* Right: Edit button */}
          {!isEditingProfile && (
            <div className="w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setIsEditingProfile(true)}
                className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {isEditingProfile ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label>First Name</Label>
                <input
                  value={editedProfile.firstName}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      firstName: e.target.value,
                    })
                  }
                  className="border border-slate-300 focus:border-primary/50 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="space-y-3">
                <Label>Last Name</Label>
                <input
                  value={editedProfile.lastName}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      lastName: e.target.value,
                    })
                  }
                  className="border border-slate-300 focus:border-primary/50 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address
                </Label>
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      email: e.target.value,
                    })
                  }
                  className="border border-slate-300 focus:border-primary/50 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone Number
                </Label>
                <input
                  value={editedProfile.phone}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      phone: e.target.value,
                    })
                  }
                  className="border border-slate-300 focus:border-primary/50 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Street Address
              </Label>
              <input
                value={editedProfile.address}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    address: e.target.value,
                  })
                }
                className="border border-slate-300 focus:border-primary/50 rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-3 md:col-span-2">
                <Label>City</Label>
                <input
                  value={editedProfile.city}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      city: e.target.value,
                    })
                  }
                  className="border border-slate-300 focus:border-primary/50 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="space-y-3">
                <Label>State</Label>
                <input
                  value={editedProfile.state}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      state: e.target.value,
                    })
                  }
                  className="border border-slate-300 focus:border-primary/50 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="space-y-3">
                <Label>ZIP Code</Label>
                <input
                  value={editedProfile.zipCode}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      zipCode: e.target.value,
                    })
                  }
                  className="border border-slate-300 focus:border-primary/50 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Building className="w-4 h-4" /> Company
                </Label>
                <input
                  value={editedProfile.company}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      company: e.target.value,
                    })
                  }
                  className="border border-slate-300 focus:border-primary/50 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="space-y-3">
                <Label>Job Title</Label>
                <input
                  value={editedProfile.jobTitle}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      jobTitle: e.target.value,
                    })
                  }
                  className="border border-slate-300 focus:border-primary/50 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label>Department</Label>
                <input
                  value={editedProfile.department}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      department: e.target.value,
                    })
                  }
                  className="border border-slate-300 focus:border-primary/50 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Timezone
                </Label>
                <input
                  value={editedProfile.timezone}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      timezone: e.target.value,
                    })
                  }
                  className="border border-slate-300 focus:border-primary/50 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <Button
                onClick={onSaveProfile}
                className="bg-slate-900 hover:bg-slate-800 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={onCancelEdit}
                className="border-slate-300 text-slate-700"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <Label className="text-sm text-slate-500">Full Name</Label>
                <p className="text-md text-slate-900 mt-1">{fullName}</p>
              </div>
              <div>
                <Label className="text-sm text-slate-500 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </Label>
                <p className="text-md text-primary mt-1">{userProfile.email}</p>
              </div>
              <div>
                <Label className="text-sm text-slate-500 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone
                </Label>
                <p className="text-md text-slate-900 mt-1">
                  {userProfile.phone}
                </p>
              </div>
              <div>
                <Label className="text-sm text-slate-500 flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Timezone
                </Label>
                <p className="text-md text-slate-800 mt-1">
                  {userProfile.timezone}
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <Label className="text-md text-slate-500 flex items-center gap-2">
                  <Building className="w-4 h-4" /> Company
                </Label>
                <p className="text-sm text-slate-900 mt-1">
                  {userProfile.company}
                </p>
              </div>
              <div>
                <Label className="text-sm text-slate-500">Job Title</Label>
                <p className="text-sm text-slate-900 mt-1">
                  {userProfile.jobTitle}
                </p>
              </div>
              <div>
                <Label className="text-sm text-slate-500">Department</Label>
                <p className="text-sm text-slate-800 mt-1">
                  {userProfile.department}
                </p>
              </div>
              <div>
                <Label className="text-sm text-slate-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Location
                </Label>
                <p className="text-sm text-slate-800 mt-1">
                  {userProfile.city}, {userProfile.state} {userProfile.zipCode}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
