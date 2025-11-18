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
  ListTodo,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Edit,
  Trash2,
  User,
  FolderOpen,
  Calendar,
  ArrowUpRight,
  ListChecks,
} from 'lucide-react';

import {
  getStatusColor,
  getPriorityColor,
  getProgressColor,
  getDaysRemaining,
} from './utils';

export default function SubtasksList({
  subtasks,
  tasksData,
  projectsData,
  onEditSubtask,
  onDeleteSubtask,
  onOpenProgress,
  router,
}) {
  if (subtasks.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="text-center py-12 bg-white shadow-sm lg:col-span-2">
          <CardContent>
            <div className="text-slate-400 mb-4">
              <ListTodo className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              No subtasks found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filter criteria, or create a new
              subtask.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="h-3 w-3" />;
      case 'In Progress':
        return <Clock className="h-3 w-3" />;
      case 'Blocked':
        return <AlertCircle className="h-3 w-3" />;
      default:
        return <ListTodo className="h-3 w-3" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {subtasks.map((subtask, index) => {
        const task = tasksData.find((t) => t.id === subtask.taskId);
        const project = projectsData.find((p) => p.id === task?.projectId);

        const daysRemaining = getDaysRemaining(subtask.dueDate);
        const isOverdue =
          !Number.isNaN(daysRemaining) &&
          daysRemaining < 0 &&
          subtask.status !== 'Completed';

        return (
          <Card
            key={subtask.id}
            className="hover:shadow-xl transition-all duration-300 bg-white border border-slate-200"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3 flex-wrap">
                    <CardTitle className="text-xl text-slate-800 leading-tight">
                      {subtask.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        className={`${getStatusColor(
                          subtask.status
                        )} font-semibold gap-1`}
                      >
                        {getStatusIcon(subtask.status)}
                        {subtask.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getPriorityColor(subtask.priority)}
                      >
                        {subtask.priority} Priority
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
                    {subtask.description}
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
                      onClick={() => onEditSubtask(subtask)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit Subtask
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={() => onOpenProgress(subtask)}
                    >
                      <ListChecks className="h-4 w-4" />
                      Update Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-red-600"
                      onClick={() => onDeleteSubtask(subtask.id, subtask.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Subtask
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-3 border-t border-slate-100">
              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-slate-500">Assignee</p>
                    <p className="font-medium text-slate-800">
                      {subtask.assignee}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ListTodo className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-slate-500">Parent Task</p>
                    <p className="font-medium text-slate-800">
                      {task ? task.name : '—'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-slate-500">Project</p>
                    <p className="font-medium text-slate-800">
                      {project?.name || '—'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-slate-500">Due Date</p>
                    <p className="font-medium text-slate-800">
                      {subtask.dueDate || '—'}
                    </p>
                    {subtask.dueDate && subtask.status !== 'Completed' && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {Number.isNaN(daysRemaining)
                          ? '—'
                          : isOverdue
                          ? `${Math.abs(daysRemaining)} days overdue`
                          : `${daysRemaining} days left`}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Progress</span>
                  <span
                    className={`font-bold ${
                      subtask.progress === 100
                        ? 'text-green-600'
                        : subtask.progress >= 70
                        ? 'text-blue-600'
                        : 'text-orange-600'
                    }`}
                  >
                    {subtask.progress}%
                  </span>
                </div>
                <Progress
                  value={subtask.progress}
                  className={`h-2.5 ${getProgressColor(subtask.status)}`}
                />
              </div>

              {/* Quick navigation */}
              <div className="flex flex-wrap gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() =>
                    router.push(`/admin/tasks?id=${subtask.taskId}`)
                  }
                >
                  <ArrowUpRight className="h-3 w-3" />
                  View Parent Task
                </Button>
                {project && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() =>
                      router.push(`/admin/projects?id=${project.id}`)
                    }
                  >
                    <FolderOpen className="h-3 w-3" />
                    View Project
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
