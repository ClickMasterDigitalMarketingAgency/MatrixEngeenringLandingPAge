'use client';

import { useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { subtasksData, tasksData, projectsData } from '../data';
import dynamic from 'next/dynamic';
// Components
const SubtasksHeader = dynamic(
  () => import('@/components/project-management/subtasks/SubtasksHeader'),
  {
    loading: () => (
      <div className="h-24 rounded-lg bg-muted/40 animate-pulse" />
    ),
  }
);

const SubtasksStats = dynamic(
  () => import('@/components/project-management/subtasks/SubtasksStats'),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-lg bg-muted/40 animate-pulse" />
        ))}
      </div>
    ),
  }
);

const SubtasksFilters = dynamic(
  () => import('@/components/project-management/subtasks/SubtasksFilters'),
  {
    loading: () => (
      <div className="h-16 rounded-lg bg-muted/40 animate-pulse" />
    ),
  }
);

const SubtasksList = dynamic(
  () => import('@/components/project-management/subtasks/SubtasksList'),
  {
    loading: () => (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-64 rounded-lg bg-muted/40 animate-pulse" />
        ))}
      </div>
    ),
  }
);

const EditSubtaskDialog = dynamic(
  () => import('@/components/project-management/subtasks/EditSubtaskDialog'),
  {
    loading: () => null, // dialog skeleton not needed
    ssr: false, // dialogs usually safe to render client-only
  }
);

const UpdateProgressDialog = dynamic(
  () => import('@/components/project-management/subtasks/UpdateProgressDialog'),
  {
    loading: () => null,
    ssr: false,
  }
);


const SubtasksPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const taskIdFromUrl = searchParams.get('taskId') || 'all';
  const projectIdFromUrl = searchParams.get('projectId') || 'all';

  const [subtasks, setSubtasks] = useState(subtasksData);
  const [openCreate, setOpenCreate] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [taskFilter, setTaskFilter] = useState(taskIdFromUrl);
  const [projectFilter, setProjectFilter] = useState(projectIdFromUrl);
  const [statusFilter, setStatusFilter] = useState('all');

  const [newSubtask, setNewSubtask] = useState({
    name: '',
    description: '',
    taskId: '',
    assignee: '',
    status: 'Not Started',
    progress: 0,
    priority: 'Medium',
    dueDate: '',
  });

  // Edit dialog
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);

  // Progress dialog
  const [progressOpen, setProgressOpen] = useState(false);
  const [progressSubtask, setProgressSubtask] = useState(null);
  const [progressInput, setProgressInput] = useState('0');

  const normalize = (value) => value.toLowerCase().replace(/\s+/g, '');

  // 🔍 Filtered subtasks
  const filteredSubtasks = useMemo(
    () =>
      subtasks.filter((subtask) => {
        const task = tasksData.find((t) => t.id === subtask.taskId);

        const matchesSearch =
          subtask.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          subtask.assignee.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesTask =
          taskFilter === 'all' || subtask.taskId === taskFilter;

        const matchesProject =
          projectFilter === 'all' || (task && task.projectId === projectFilter);

        const matchesStatus =
          statusFilter === 'all' ||
          normalize(subtask.status) === normalize(statusFilter);

        return matchesSearch && matchesTask && matchesProject && matchesStatus;
      }),
    [subtasks, searchTerm, taskFilter, projectFilter, statusFilter]
  );

  // 📊 Stats
  const stats = useMemo(() => {
    const total = subtasks.length;
    const completed = subtasks.filter((st) => st.status === 'Completed').length;
    const inProgress = subtasks.filter(
      (st) => st.status === 'In Progress'
    ).length;
    const notStarted = subtasks.filter(
      (st) => st.status === 'Not Started'
    ).length;

    return { total, completed, inProgress, notStarted };
  }, [subtasks]);

  // ➕ Add Subtask
  const handleAddSubtask = () => {
    if (!newSubtask.name || !newSubtask.taskId || !newSubtask.assignee) {
      toast.error('Missing required fields', {
        description: 'Please fill in subtask name, parent task, and assignee.',
      });
      return;
    }

    const subtaskToAdd = {
      id: `st${Date.now()}`,
      ...newSubtask,
    };

    setSubtasks((prev) => [subtaskToAdd, ...prev]);

    toast.success('Subtask created successfully', {
      description: `${newSubtask.name} has been added.`,
    });

    setNewSubtask({
      name: '',
      description: '',
      taskId: '',
      assignee: '',
      status: 'Not Started',
      progress: 0,
      priority: 'Medium',
      dueDate: '',
    });
    setOpenCreate(false);
  };

  // 🗑 Delete
  const handleDeleteSubtask = (id, name) => {
    setSubtasks((prev) => prev.filter((st) => st.id !== id));
    toast.info('Subtask deleted', {
      description: `${name} has been removed.`,
    });
  };

  // ✏️ Edit
  const openEditSubtask = (subtask) => {
    setEditForm({ ...subtask });
    setEditOpen(true);
  };

  const handleUpdateSubtask = () => {
    if (!editForm?.name || !editForm?.taskId || !editForm?.assignee) {
      toast.error('Missing required fields', {
        description: 'Please fill in subtask name, parent task, and assignee.',
      });
      return;
    }

    setSubtasks((prev) =>
      prev.map((st) => (st.id === editForm.id ? { ...st, ...editForm } : st))
    );

    toast.success('Subtask updated', {
      description: `${editForm.name} has been updated.`,
    });

    setEditOpen(false);
    setEditForm(null);
  };

  // 📈 Progress
  const openProgressDialog = (subtask) => {
    setProgressSubtask(subtask);
    setProgressInput(String(subtask.progress ?? 0));
    setProgressOpen(true);
  };

  const handleUpdateProgress = () => {
    if (!progressSubtask) return;

    let value = parseInt(progressInput, 10);
    if (Number.isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > 100) value = 100;

    setSubtasks((prev) =>
      prev.map((st) => {
        if (st.id !== progressSubtask.id) return st;

        const nextStatus =
          value === 100
            ? 'Completed'
            : st.status === 'Completed'
            ? 'In Progress'
            : st.status;

        return { ...st, progress: value, status: nextStatus };
      })
    );

    toast.success('Progress updated', {
      description: `"${progressSubtask.name}" is now ${value}% complete.`,
    });

    setProgressOpen(false);
    setProgressSubtask(null);
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <SubtasksHeader
        open={openCreate}
        setOpen={setOpenCreate}
        newSubtask={newSubtask}
        setNewSubtask={setNewSubtask}
        tasksData={tasksData}
        onAddSubtask={handleAddSubtask}
      />

      <SubtasksStats stats={stats} />

      <SubtasksFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        projectFilter={projectFilter}
        onProjectFilterChange={setProjectFilter}
        taskFilter={taskFilter}
        onTaskFilterChange={setTaskFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        projectsData={projectsData}
        tasksData={tasksData}
      />

      <SubtasksList
        subtasks={filteredSubtasks}
        tasksData={tasksData}
        projectsData={projectsData}
        onEditSubtask={openEditSubtask}
        onDeleteSubtask={handleDeleteSubtask}
        onOpenProgress={openProgressDialog}
        router={router}
      />

      <EditSubtaskDialog
        open={editOpen}
        setOpen={setEditOpen}
        editForm={editForm}
        setEditForm={setEditForm}
        tasksData={tasksData}
        onSave={handleUpdateSubtask}
      />

      <UpdateProgressDialog
        open={progressOpen}
        setOpen={setProgressOpen}
        subtask={progressSubtask}
        progressInput={progressInput}
        setProgressInput={setProgressInput}
        onUpdate={handleUpdateProgress}
      />
    </div>
  );
};

export default SubtasksPage;
