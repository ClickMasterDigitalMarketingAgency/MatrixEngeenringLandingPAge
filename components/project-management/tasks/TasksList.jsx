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
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  FolderOpen,
  ListChecks,
  ListTodo,
  MoreVertical,
  User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const TasksList = ({
  tasks,
  projectsData,
  subtasksData,
  router,
  onEditTask,
  onDeleteTask,
  onOpenProgress,
  getProgressColor,
  getDaysRemaining,
}) => {
  const getStatusColor = (status) => {
    const colors = {
      Completed: 'bg-green-100 text-green-800 border-green-200',
      'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
      Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Blocked: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

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

  const getPriorityColor = (priority) => {
    const colors = {
      High: 'bg-red-100 text-red-800 border-red-200',
      Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Low: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (tasks.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="text-center py-12 bg-white shadow-sm lg:col-span-3">
          <CardContent>
            <div className="text-slate-400 mb-4">
              <ListTodo className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              No tasks found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filter criteria, or create your first
              task.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {tasks.map((task, index) => {
        const project = projectsData.find((p) => p.id === task.projectId);
        const subtaskCount = subtasksData.filter(
          (st) => st.taskId === task.id
        ).length;
        const daysRemaining = getDaysRemaining(task.dueDate);
        const isOverdue =
          !Number.isNaN(daysRemaining) &&
          daysRemaining < 0 &&
          task.status !== 'Completed';

        return (
          <Card
            key={task.id}
            className="hover:shadow-xl transition-all duration-300 bg-white border border-slate-200"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3 flex-wrap">
                    <CardTitle className="text-xl text-slate-800 leading-tight">
                      {task.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        className={`${getStatusColor(
                          task.status
                        )} font-semibold gap-1`}
                      >
                        {getStatusIcon(task.status)}
                        {task.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getPriorityColor(task.priority)}
                      >
                        {task.priority} Priority
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
                    {task.description}
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
                      onClick={() => onEditTask(task)}
                    >
                      <EditIcon />
                      Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={() => onOpenProgress(task)}
                    >
                      <ListChecks className="h-4 w-4" />
                      Update Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-red-600"
                      onClick={() => onDeleteTask(task.id, task.name)}
                    >
                      <Trash2Icon />
                      Delete Task
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
                      {task.assignee}
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
                      {task.dueDate || '—'}
                    </p>
                    {task.dueDate && task.status !== 'Completed' && (
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

                <div className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-slate-500">Subtasks</p>
                    <Button
                      variant="link"
                      className="p-0 h-auto font-medium text-slate-800"
                      onClick={() =>
                        router.push(`/admin/subtasks?taskId=${task.id}`)
                      }
                    >
                      {subtaskCount} subtasks
                    </Button>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    Task Progress
                  </span>
                  <span
                    className={`font-bold ${
                      task.progress === 100
                        ? 'text-green-600'
                        : task.progress >= 70
                        ? 'text-blue-600'
                        : 'text-orange-600'
                    }`}
                  >
                    {task.progress}%
                  </span>
                </div>
                <Progress
                  value={task.progress}
                  className={`h-2.5 ${getProgressColor(task.status)}`}
                />
              </div>

              {/* Quick navigation */}
              <div className="flex flex-wrap gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() =>
                    router.push(`/admin/subtasks?taskId=${task.id}`)
                  }
                >
                  <ListChecks className="h-3 w-3" />
                  View Subtasks
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
};

import { Edit, Trash2 } from 'lucide-react';

const EditIcon = () => <Edit className="h-4 w-4" />;
const Trash2Icon = () => <Trash2 className="h-4 w-4" />;

export default TasksList;
