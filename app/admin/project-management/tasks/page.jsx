'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';

import { tasksData, projectsData, subtasksData } from '../data';

// 🔹 Lazy loaded components
const TasksHeader = dynamic(
  () => import('@/components/project-management/tasks/TasksHeader'),
  {
    loading: () => (
      <div className="h-32 rounded-lg bg-muted/40 animate-pulse" />
    ),
  }
);

const TasksStats = dynamic(
  () => import('@/components/project-management/tasks/TasksStats'),
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

const TasksFilters = dynamic(
  () => import('@/components/project-management/tasks/TasksFilters'),
  {
    loading: () => (
      <div className="h-16 rounded-lg bg-muted/40 animate-pulse" />
    ),
  }
);

const TasksList = dynamic(
  () => import('@/components/project-management/tasks/TasksList'),
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

const EditTaskDialog = dynamic(
  () => import('@/components/project-management/tasks/EditTaskDialog'),
  {
    loading: () => null,
    ssr: false,
  }
);

const UpdateProgressDialog = dynamic(
  () => import('@/components/project-management/tasks/UpdateProgressDialog'),
  {
    loading: () => null,
    ssr: false,
  }
);

const Tasks = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectIdFromUrl = searchParams.get('projectId') || 'all';

  const [tasks, setTasks] = useState(tasksData);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState(projectIdFromUrl);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    projectId: '',
    assignee: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
    progress: 0,
  });

  // ✏️ Edit Task dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);

  // 📈 Update Progress dialog state
  const [progressOpen, setProgressOpen] = useState(false);
  const [progressTask, setProgressTask] = useState(null);
  const [progressInput, setProgressInput] = useState('0');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProject =
      projectFilter === 'all' || task.projectId === projectFilter;

    const matchesStatus =
      statusFilter === 'all' || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'all' || task.priority === priorityFilter;

    return matchesSearch && matchesProject && matchesStatus && matchesPriority;
  });

  const handleProjectFilterChange = (value) => {
    setProjectFilter(value);
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete('projectId');
    } else {
      params.set('projectId', value);
    }
    router.push(`/admin/tasks?${params.toString()}`);
  };

  const handleAddTask = () => {
    if (!newTask.name || !newTask.projectId || !newTask.assignee) {
      toast.error('Missing required fields', {
        description: 'Please fill in task name, project, and assignee.',
      });
      return;
    }

    const taskToAdd = {
      id: `t${Date.now()}`,
      ...newTask,
    };

    setTasks((prev) => [taskToAdd, ...prev]);

    toast.success('Task created successfully', {
      description: `${newTask.name} has been added to your tasks.`,
    });

    setNewTask({
      name: '',
      description: '',
      projectId: '',
      assignee: '',
      status: 'Pending',
      priority: 'Medium',
      dueDate: '',
      progress: 0,
    });
    setOpen(false);
  };

  const handleDeleteTask = (id, name) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.info('Task deleted', {
      description: `${name} has been removed from your tasks.`,
    });
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-blue-500';
      case 'Blocked':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDaysRemaining = (dueDate) => {
    if (!dueDate) return NaN;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = +due - +today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
    const pending = tasks.filter((t) => t.status === 'Pending').length;

    return { total, completed, inProgress, pending };
  };

  const stats = getStats();

  // ✏️ Open Edit dialog
  const openEditTask = (task) => {
    setEditForm({ ...task });
    setEditOpen(true);
  };

  const handleUpdateTask = () => {
    if (!editForm?.name || !editForm?.projectId || !editForm?.assignee) {
      toast.error('Missing required fields', {
        description: 'Please fill in task name, project, and assignee.',
      });
      return;
    }

    setTasks((prev) =>
      prev.map((t) => (t.id === editForm.id ? { ...t, ...editForm } : t))
    );

    toast.success('Task updated', {
      description: `${editForm.name} has been updated.`,
    });

    setEditOpen(false);
    setEditForm(null);
  };

  // 📈 Open progress dialog
  const openProgressDialog = (task) => {
    setProgressTask(task);
    setProgressInput(String(task.progress ?? 0));
    setProgressOpen(true);
  };

  const handleUpdateProgress = () => {
    if (!progressTask) return;

    let value = parseInt(progressInput, 10);
    if (Number.isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > 100) value = 100;

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== progressTask.id) return t;

        const nextStatus =
          value === 100
            ? 'Completed'
            : t.status === 'Completed'
            ? 'In Progress'
            : t.status;

        return { ...t, progress: value, status: nextStatus };
      })
    );

    toast.success('Progress updated', {
      description: `"${progressTask.name}" is now ${value}% complete.`,
    });

    setProgressOpen(false);
    setProgressTask(null);
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <TasksHeader
        open={open}
        setOpen={setOpen}
        newTask={newTask}
        setNewTask={setNewTask}
        projectsData={projectsData}
        onAddTask={handleAddTask}
      />

      <TasksStats stats={stats} />

      <TasksFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        projectFilter={projectFilter}
        onProjectFilterChange={handleProjectFilterChange}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        projectsData={projectsData}
      />

      <TasksList
        tasks={filteredTasks}
        projectsData={projectsData}
        subtasksData={subtasksData}
        router={router}
        onEditTask={openEditTask}
        onDeleteTask={handleDeleteTask}
        onOpenProgress={openProgressDialog}
        getProgressColor={getProgressColor}
        getDaysRemaining={getDaysRemaining}
      />

      <EditTaskDialog
        open={editOpen}
        setOpen={setEditOpen}
        editForm={editForm}
        setEditForm={setEditForm}
        projectsData={projectsData}
        onSave={handleUpdateTask}
      />

      <UpdateProgressDialog
        open={progressOpen}
        setOpen={setProgressOpen}
        task={progressTask}
        progressInput={progressInput}
        setProgressInput={setProgressInput}
        onUpdate={handleUpdateProgress}
      />
    </div>
  );
};

export default Tasks;
