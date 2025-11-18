'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FolderPlus,
  MoreVertical,
  Edit,
  Trash2,
  Users,
  Calendar,
  Clock,
  ListTodo,
  ListChecks,
  Target,
  AlertCircle,
} from 'lucide-react';

import {
  getStatusColor,
  getPriorityColor,
  getDaysRemaining,
  getProgressBarClasses,
} from './utils';

function getProjectStats(projectId, tasksData, subtasksData, goalsData) {
  const projectTasks = tasksData.filter((t) => t.projectId === projectId);
  const projectTaskIds = projectTasks.map((t) => t.id);
  const projectSubtasks = subtasksData.filter((st) =>
    projectTaskIds.includes(st.taskId)
  );
  const projectGoals = goalsData.filter((g) =>
    g.relatedProjectIds.includes(projectId)
  );

  return {
    taskCount: projectTasks.length,
    subtaskCount: projectSubtasks.length,
    goalCount: projectGoals.length,
  };
}

export default function ProjectList({
  projects,
  tasksData,
  subtasksData,
  goalsData,
  onDeleteProject,
  onEditProject,
  onOpenProgress,
  router,
}) {
  if (projects.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="text-center py-12 bg-white shadow-sm lg:col-span-2">
          <CardContent>
            <div className="text-slate-400 mb-4">
              <FolderPlus className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              No projects found
            </h3>
            <p className="text-slate-500">
              Get started by creating your first project or adjust filters.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {projects.map((project, index) => {
        const daysRemaining = getDaysRemaining(project.endDate);
        const isOverdue =
          !Number.isNaN(daysRemaining) &&
          daysRemaining < 0 &&
          project.status !== 'completed';

        const { taskCount, subtaskCount, goalCount } = getProjectStats(
          project.id,
          tasksData,
          subtasksData,
          goalsData
        );

        return (
          <Card
            key={project.id}
            className="hover:shadow-xl transition-all duration-300 bg-white border border-slate-200"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3 flex-wrap">
                    <CardTitle className="text-xl text-slate-800 leading-tight">
                      {project.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        className={`${getStatusColor(
                          project.status
                        )} font-semibold`}
                      >
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getPriorityColor(project.priority)}
                      >
                        {project.priority} Priority
                      </Badge>
                      {isOverdue && (
                        <Badge
                          variant="outline"
                          className="bg-red-100 text-red-800 border-red-200"
                        >
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Overdue
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-slate-600 text-base">
                    {project.description}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={() => onEditProject(project)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={() => onOpenProgress(project)}
                    >
                      <ListTodo className="h-4 w-4" />
                      Update Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-red-600"
                      onClick={() => onDeleteProject(project.id, project.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-3 border-t border-slate-100">
              {/* Team */}
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users className="h-4 w-4" />
                <span className="font-medium">Team:</span>
                <div className="flex items-center gap-1 flex-wrap">
                  {project.assignedTo?.map((member, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {member}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="h-4 w-4" />
                <span>
                  {project.startDate
                    ? new Date(project.startDate).toLocaleDateString()
                    : '—'}{' '}
                  -{' '}
                  {project.endDate
                    ? new Date(project.endDate).toLocaleDateString()
                    : '—'}
                </span>
                {project.status !== 'completed' && project.endDate && (
                  <Badge variant="outline" className="ml-2">
                    <Clock className="h-3 w-3 mr-1" />
                    {Number.isNaN(daysRemaining)
                      ? '—'
                      : isOverdue
                      ? `${Math.abs(daysRemaining)} days overdue`
                      : `${daysRemaining} days left`}
                  </Badge>
                )}
              </div>

              {/* Linked entities summary */}
              <div className="flex flex-wrap gap-3 text-sm">
                <Badge variant="outline" className="gap-1">
                  <ListTodo className="h-3 w-3" />
                  {taskCount} Tasks
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <ListChecks className="h-3 w-3" />
                  {subtaskCount} Subtasks
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Target className="h-3 w-3" />
                  {goalCount} Goals
                </Badge>
              </div>

              {/* Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    Project Progress
                  </span>
                  <span
                    className={`font-bold ${
                      project.progress === 100
                        ? 'text-green-600'
                        : project.progress >= 70
                        ? 'text-blue-600'
                        : 'text-orange-600'
                    }`}
                  >
                    {project.progress}%
                  </span>
                </div>
                <Progress
                  value={project.progress}
                  className={getProgressBarClasses(project.progress)}
                />
              </div>

              {/* Quick navigation */}
              <div className="flex flex-wrap gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  // onClick={() =>
                  //   router.push(`/admin/tasks?projectId=${project.id}`)
                  // }
                >
                  <ListTodo className="h-3 w-3" />
                  View Tasks
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  // onClick={() =>
                  //   router.push(`/admin/subtasks?projectId=${project.id}`)
                  // }
                >
                  <ListChecks className="h-3 w-3" />
                  View Subtasks
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  // onClick={() =>
                  //   router.push(`/admin/goals?projectId=${project.id}`)
                  // }
                >
                  <Target className="h-3 w-3" />
                  View Goals
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
