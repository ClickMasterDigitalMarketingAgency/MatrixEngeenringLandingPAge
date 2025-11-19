'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { projectsData, tasksData, subtasksData, goalsData } from '../data';

// 🔹 Lazy-loaded components
const ProjectHeader = dynamic(
  () => import('@/components/project-management/project/ProjectHeader'),
  {
    loading: () => <div className="h-10" />,
  }
);

const ProjectStats = dynamic(
  () => import('@/components/project-management/project/ProjectStats'),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2" />
    ),
  }
);

const ProjectFilters = dynamic(
  () => import('@/components/project-management/project/ProjectFilters'),
  {
    loading: () => (
      <div className="h-16 bg-white rounded-lg shadow-sm border" />
    ),
  }
);

const ProjectList = dynamic(
  () => import('@/components/project-management/project/ProjectList'),
  {
    loading: () => <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" />,
  }
);

const EditProjectDialog = dynamic(
  () => import('@/components/project-management/project/EditProjectDialog'),
  {
    loading: () => null,
  }
);

const UpdateProgressDialog = dynamic(
  () => import('@/components/project-management/project/UpdateProgressDialog'),
  {
    loading: () => null,
  }
);

const ProjectManagement = () => {
  const router = useRouter();

  const [projects, setProjects] = useState(projectsData);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'active',
    assignedTo: [],
    startDate: '',
    endDate: '',
    progress: 0,
    priority: 'medium',
  });

  // ✏️ Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);

  // 📈 Update progress dialog state
  const [progressOpen, setProgressOpen] = useState(false);
  const [progressProject, setProgressProject] = useState(null);
  const [progressInput, setProgressInput] = useState('0');

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const matchesSearch =
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
          statusFilter === 'all' || project.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [projects, searchTerm, statusFilter]
  );

  const handleAddProject = () => {
    if (!newProject.name || !newProject.startDate || !newProject.endDate) {
      toast.error('Missing required fields', {
        description: 'Please fill in project name, start date, and end date.',
      });
      return;
    }

    if (new Date(newProject.startDate) > new Date(newProject.endDate)) {
      toast.error('Invalid dates', {
        description: 'Start date cannot be after end date.',
      });
      return;
    }

    const projectToAdd = {
      id: `p${Date.now()}`,
      ...newProject,
    };

    setProjects((prev) => [projectToAdd, ...prev]);

    toast.success('Project created successfully', {
      description: `${newProject.name} has been added to your projects.`,
    });

    setNewProject({
      name: '',
      description: '',
      status: 'active',
      assignedTo: [],
      startDate: '',
      endDate: '',
      progress: 0,
      priority: 'medium',
    });
    setOpen(false);
  };

  const handleDeleteProject = (id, name) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast.info('Project deleted', {
      description: `${name} has been removed from your projects.`,
    });
  };

  // ✏️ open edit dialog
  const openEditProject = (project) => {
    setEditForm({ ...project });
    setEditOpen(true);
  };

  const handleUpdateProject = () => {
    if (!editForm?.name || !editForm?.startDate || !editForm?.endDate) {
      toast.error('Missing required fields', {
        description: 'Please fill in project name, start date, and end date.',
      });
      return;
    }

    if (new Date(editForm.startDate) > new Date(editForm.endDate)) {
      toast.error('Invalid dates', {
        description: 'Start date cannot be after end date.',
      });
      return;
    }

    setProjects((prev) =>
      prev.map((p) => (p.id === editForm.id ? { ...p, ...editForm } : p))
    );

    toast.success('Project updated', {
      description: `${editForm.name} has been updated.`,
    });

    setEditOpen(false);
    setEditForm(null);
  };

  // 📈 open progress dialog
  const openProgressDialog = (project) => {
    setProgressProject(project);
    setProgressInput(String(project.progress ?? 0));
    setProgressOpen(true);
  };

  const handleUpdateProgress = () => {
    if (!progressProject) return;

    let value = parseInt(progressInput, 10);
    if (Number.isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > 100) value = 100;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== progressProject.id) return p;

        const nextStatus =
          value === 100
            ? 'completed'
            : p.status === 'completed'
            ? 'active'
            : p.status;

        return { ...p, progress: value, status: nextStatus };
      })
    );

    toast.success('Project progress updated', {
      description: `"${progressProject.name}" is now ${value}% complete.`,
    });

    setProgressOpen(false);
    setProgressProject(null);
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <ProjectHeader
        open={open}
        setOpen={setOpen}
        newProject={newProject}
        setNewProject={setNewProject}
        onAddProject={handleAddProject}
      />

      <ProjectStats projects={projects} />

      <ProjectFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <ProjectList
        projects={filteredProjects}
        tasksData={tasksData}
        subtasksData={subtasksData}
        goalsData={goalsData}
        onDeleteProject={handleDeleteProject}
        onEditProject={openEditProject}
        onOpenProgress={openProgressDialog}
        router={router}
      />

      <EditProjectDialog
        open={editOpen}
        setOpen={setEditOpen}
        editForm={editForm}
        setEditForm={setEditForm}
        onSave={handleUpdateProject}
      />

      <UpdateProgressDialog
        open={progressOpen}
        setOpen={setProgressOpen}
        project={progressProject}
        progressInput={progressInput}
        setProgressInput={setProgressInput}
        onUpdate={handleUpdateProgress}
      />
    </div>
  );
};

export default ProjectManagement;
