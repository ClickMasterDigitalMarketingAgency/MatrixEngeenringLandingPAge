'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { goalsData, projectsData } from '../data';

// Static components
import GoalsHeader from '@/components/project-management/goals/GoalsHeader';
import CreateGoalDialog from '@/components/project-management/goals/CreateGoalDialog';
import EditGoalDialog from '@/components/project-management/goals/EditGoalDialog';
import UpdateProgressDialog from '@/components/project-management/goals/UpdateProgressDialog';

// 🔹 Lazy-loaded components
const GoalsStats = dynamic(
  () => import('@/components/project-management/goals/GoalsStats'),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    ),
  }
);

const GoalsFilters = dynamic(
  () => import('@/components/project-management/goals/GoalsFilters'),
  {
    loading: () => <div className="h-16 rounded-lg bg-muted animate-pulse" />,
  }
);

const GoalsGrid = dynamic(
  () => import('@/components/project-management/goals/GoalsGrid'),
  {
    loading: () => (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-64 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    ),
  }
);

const normalize = (value) => value.toLowerCase().replace(/\s+/g, '');

const Goals = () => {
  const router = useRouter();

  const [goals, setGoals] = useState(goalsData);

  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Create Goal dialog
  const [createOpen, setCreateOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    description: '',
    owner: '',
    startDate: '',
    targetDate: '',
    status: 'On Track',
    progress: 0,
    relatedProjectIds: [],
  });

  // Edit Goal dialog
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);

  // Update Progress dialog
  const [progressOpen, setProgressOpen] = useState(false);
  const [progressGoal, setProgressGoal] = useState(null);
  const [progressInput, setProgressInput] = useState('0');

  // ───────── FILTERED GOALS ─────────
  const filteredGoals = goals.filter((goal) => {
    const matchesSearch =
      goal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProject =
      projectFilter === 'all' || goal.relatedProjectIds.includes(projectFilter);

    const matchesStatus =
      statusFilter === 'all' ||
      normalize(goal.status) === normalize(statusFilter);

    return matchesSearch && matchesProject && matchesStatus;
  });

  const countByStatus = (status) =>
    goals.filter((g) => g.status === status).length;

  // ───────── CREATE GOAL ─────────
  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.owner || !newGoal.targetDate) {
      toast.error('Missing required fields', {
        description: 'Please fill in goal name, owner, and target date.',
      });
      return;
    }

    if (
      newGoal.startDate &&
      new Date(newGoal.startDate) > new Date(newGoal.targetDate)
    ) {
      toast.error('Invalid dates', {
        description: 'Start date cannot be after target date.',
      });
      return;
    }

    const goalToAdd = {
      id: `g${Date.now()}`,
      ...newGoal,
    };

    setGoals((prev) => [goalToAdd, ...prev]);

    toast.success('Goal created successfully', {
      description: `${newGoal.name} has been added to your goals.`,
    });

    setNewGoal({
      name: '',
      description: '',
      owner: '',
      startDate: '',
      targetDate: '',
      status: 'On Track',
      progress: 0,
      relatedProjectIds: [],
    });
    setCreateOpen(false);
  };

  const handleDeleteGoal = (id, name) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    toast.info('Goal deleted', {
      description: `${name} has been removed from your goals.`,
    });
  };

  // ───────── EDIT GOAL ─────────
  const openEditGoal = (goal) => {
    setEditForm({
      ...goal,
      relatedProjectIds: goal.relatedProjectIds || [],
    });
    setEditOpen(true);
  };

  const handleUpdateGoal = () => {
    if (!editForm?.name || !editForm?.owner || !editForm?.targetDate) {
      toast.error('Missing required fields', {
        description: 'Please fill in goal name, owner, and target date.',
      });
      return;
    }

    if (
      editForm.startDate &&
      new Date(editForm.startDate) > new Date(editForm.targetDate)
    ) {
      toast.error('Invalid dates', {
        description: 'Start date cannot be after target date.',
      });
      return;
    }

    setGoals((prev) =>
      prev.map((g) => (g.id === editForm.id ? { ...g, ...editForm } : g))
    );

    toast.success('Goal updated', {
      description: `${editForm.name} has been updated.`,
    });

    setEditOpen(false);
    setEditForm(null);
  };

  // ───────── PROGRESS UPDATE ─────────
  const openProgressDialog = (goal) => {
    setProgressGoal(goal);
    setProgressInput(String(goal.progress ?? 0));
    setProgressOpen(true);
  };

  const handleUpdateProgress = () => {
    if (!progressGoal) return;

    let value = parseInt(progressInput, 10);
    if (Number.isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > 100) value = 100;

    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== progressGoal.id) return g;

        const nextStatus =
          value === 100
            ? 'Completed'
            : g.status === 'Completed'
            ? 'On Track'
            : g.status;

        return { ...g, progress: value, status: nextStatus };
      })
    );

    toast.success('Goal progress updated', {
      description: `"${progressGoal.name}" is now ${value}% complete.`,
    });

    setProgressOpen(false);
    setProgressGoal(null);
  };

  // ───────── NAV HELPERS ─────────
  const handleOpenTasks = (goalId) => {
    router.push(`/admin/tasks?goalId=${goalId}`);
  };

  const handleOpenProject = (projectId) => {
    router.push(`/admin/projects?id=${projectId}`);
  };

  // ───────── UI ─────────
  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header + Create Dialog trigger */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <GoalsHeader />
        <CreateGoalDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          newGoal={newGoal}
          setNewGoal={setNewGoal}
          projects={projectsData}
          onSubmit={handleAddGoal}
        />
      </div>

      {/* Stats */}
      <GoalsStats
        onTrackCount={countByStatus('On Track')}
        atRiskCount={countByStatus('At Risk')}
        completedCount={countByStatus('Completed')}
      />

      {/* Search / Filter */}
      <GoalsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        projectFilter={projectFilter}
        onProjectFilterChange={setProjectFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        projects={projectsData}
      />

      {/* Goals List / Grid */}
      <GoalsGrid
        goals={filteredGoals}
        projects={projectsData}
        onEditGoal={openEditGoal}
        onDeleteGoal={handleDeleteGoal}
        onUpdateProgress={openProgressDialog}
        onOpenTasks={handleOpenTasks}
        onOpenProject={handleOpenProject}
      />

      {/* Edit Goal Dialog */}
      <EditGoalDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        editForm={editForm}
        setEditForm={setEditForm}
        projects={projectsData}
        onSubmit={handleUpdateGoal}
      />

      {/* Update Progress Dialog */}
      <UpdateProgressDialog
        open={progressOpen}
        onOpenChange={setProgressOpen}
        progressGoal={progressGoal}
        progressInput={progressInput}
        setProgressInput={setProgressInput}
        onSubmit={handleUpdateProgress}
      />
    </div>
  );
};

export default Goals;
