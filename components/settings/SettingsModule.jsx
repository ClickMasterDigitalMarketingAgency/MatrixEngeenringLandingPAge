'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';

// Lazy-loaded components
const SettingsHeader = dynamic(
  () => import('@/components/settings/SettingsHeader'),
  {
    loading: () => (
      <div className="h-20 rounded-lg bg-slate-100 animate-pulse mb-4" />
    ),
  }
);

const SettingsSidebar = dynamic(
  () => import('@/components/settings/SettingsSidebar'),
  {
    loading: () => (
      <div className="h-[420px] rounded-lg bg-slate-100 animate-pulse" />
    ),
  }
);

const ProfileCard = dynamic(() => import('@/components/settings/ProfileCard'), {
  loading: () => (
    <div className="h-[420px] rounded-lg bg-slate-100 animate-pulse" />
  ),
});

const SecurityCard = dynamic(
  () => import('@/components/settings/SecurityCard'),
  {
    loading: () => (
      <div className="h-[260px] rounded-lg bg-slate-100 animate-pulse" />
    ),
  }
);

const ApiConfigCard = dynamic(
  () => import('@/components/settings/ApiConfigCard'),
  {
    loading: () => (
      <div className="h-[220px] rounded-lg bg-slate-100 animate-pulse" />
    ),
  }
);

const SettingsList = dynamic(
  () => import('@/components/settings/SettingsList'),
  {
    loading: () => (
      <div className="h-[260px] rounded-lg bg-slate-100 animate-pulse" />
    ),
  }
);

// Professional color palette (kept here if you want to reuse later)
const COLORS = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState([
    {
      id: 'notifications',
      label: 'Email Notifications',
      description:
        'Receive email alerts for important system updates and security events',
      iconName: 'bell',
      category: 'notifications',
      enabled: true,
    },
    {
      id: 'security',
      label: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account with 2FA',
      iconName: 'lock',
      category: 'security',
      enabled: false,
    },
    {
      id: 'visibility',
      label: 'Public Profile',
      description: 'Make your engineering profile visible to team members',
      iconName: 'eye',
      category: 'privacy',
      enabled: true,
    },
    {
      id: 'database',
      label: 'Auto Backup',
      description:
        'Automatic database backups every 24 hours with 30-day retention',
      iconName: 'database',
      category: 'data',
      enabled: true,
    },
    {
      id: 'collaboration',
      label: 'Team Collaboration',
      description: 'Enable real-time team features and shared workspaces',
      iconName: 'users',
      category: 'collaboration',
      enabled: true,
    },
    {
      id: 'performance',
      label: 'Performance Monitoring',
      description:
        'Track system performance metrics and receive optimization suggestions',
      iconName: 'zap',
      category: 'performance',
      enabled: false,
    },
  ]);

  const [userProfile, setUserProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@matrix.engineering',
    phone: '+1 (555) 123-4567',
    address: '123 Engineering Ave',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    company: 'Matrix Engineering Inc',
    jobTitle: 'Senior Engineer',
    department: 'Engineering',
    timezone: 'PST (Pacific Standard Time)',
  });

  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [apiKey, setApiKey] = useState('mk_live_x7x9j2k8l0p3q5r7t9v1w3y5z7a9');
  const [showApiKey, setShowApiKey] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    {
      id: 'all',
      label: 'All Settings',
      type: 'settings',
    },
    {
      id: 'account',
      label: 'Account',
      type: 'account',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      type: 'notifications',
    },
    {
      id: 'security',
      label: 'Security',
      type: 'security',
    },
    {
      id: 'privacy',
      label: 'Privacy',
      type: 'privacy',
    },
    {
      id: 'data',
      label: 'Data',
      type: 'data',
    },
    {
      id: 'collaboration',
      label: 'Collaboration',
      type: 'collaboration',
    },
    {
      id: 'performance',
      label: 'Performance',
      type: 'performance',
    },
  ].map((cat) => ({
    ...cat,
    count:
      cat.id === 'all'
        ? settings.length
        : cat.id === 'account'
        ? 0
        : settings.filter((s) => s.category === cat.id).length,
  }));

  const filteredSettings =
    activeCategory === 'all'
      ? settings
      : activeCategory === 'account'
      ? []
      : settings.filter((s) => s.category === activeCategory);

  const toggleSetting = (id) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );

    const current = settings.find((s) => s.id === id);
    if (!current) return;

    toast.success('Setting updated', {
      description: `${current.label} has been ${
        !current.enabled ? 'enabled' : 'disabled'
      }.`,
    });
  };

  const handleSaveProfile = () => {
    setUserProfile(editedProfile);
    setIsEditingProfile(false);
    toast.success('Profile updated successfully', {
      description: 'Your profile information has been saved.',
    });
  };

  const handleChangePassword = () => {
    if (passwordForm.new !== passwordForm.confirm) {
      toast.error('Passwords do not match', {
        description: 'Please make sure both passwords match.',
      });
      return;
    }
    if (passwordForm.new.length < 8) {
      toast.error('Password too short', {
        description: 'Password must be at least 8 characters long.',
      });
      return;
    }
    toast.success('Password changed successfully', {
      description: 'Your password has been updated.',
    });
    setPasswordForm({ current: '', new: '', confirm: '' });
    setShowPasswordForm(false);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success('API Key copied to clipboard', {
      description: 'The API key has been copied to your clipboard.',
    });
  };

  const regenerateApiKey = () => {
    const newKey = `mk_live_${Math.random().toString(36).substr(2, 24)}`;
    setApiKey(newKey);
    toast.success('API Key regenerated', {
      description: 'A new API key has been generated.',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto space-y-6">
        <SettingsHeader />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <SettingsSidebar
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            {(activeCategory === 'account' || activeCategory === 'all') && (
              <>
                <ProfileCard
                  userProfile={userProfile}
                  editedProfile={editedProfile}
                  setEditedProfile={setEditedProfile}
                  isEditingProfile={isEditingProfile}
                  setIsEditingProfile={setIsEditingProfile}
                  onSaveProfile={handleSaveProfile}
                  onCancelEdit={() => {
                    setIsEditingProfile(false);
                    setEditedProfile(userProfile);
                  }}
                />

                <SecurityCard
                  showPasswordForm={showPasswordForm}
                  setShowPasswordForm={setShowPasswordForm}
                  passwordForm={passwordForm}
                  setPasswordForm={setPasswordForm}
                  onChangePassword={handleChangePassword}
                />
              </>
            )}

            <ApiConfigCard
              apiKey={apiKey}
              showApiKey={showApiKey}
              setShowApiKey={setShowApiKey}
              onCopyApiKey={copyApiKey}
              onRegenerateApiKey={regenerateApiKey}
            />

            {filteredSettings.length > 0 && (
              <SettingsList
                settings={filteredSettings}
                onToggleSetting={toggleSetting}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
