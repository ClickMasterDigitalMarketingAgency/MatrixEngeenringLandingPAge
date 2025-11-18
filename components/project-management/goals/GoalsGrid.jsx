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
  ListTodo,
  MoreVertical,
  Target,
  Trash2,
  User,
  Eye,
  Edit,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function getStatusColor(status) {
  const colors = {
    'On Track': 'bg-blue-100 text-blue-800 border-blue-200',
    'At Risk': 'bg-red-100 text-red-800 border-red-200',
    Completed: 'bg-green-100 text-green-800 border-green-200',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
}

function getStatusIcon(status) {
  switch (status) {
    case 'Completed':
      return <CheckCircle2 className="h-4 w-4" />;
    case 'At Risk':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Target className="h-4 w-4" />;
  }
}

function getDaysRemaining(targetDate) {
  if (!targetDate) return NaN;
  const today = new Date();
  const target = new Date(targetDate);
  const diffTime = target.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// 🔹 Colour both text & bar based on progress %
function getProgressClasses(progress) {
  if (progress >= 100) {
    return {
      text: 'text-emerald-600',
      track: 'bg-emerald-50',
    };
  }
  if (progress >= 70) {
    return {
      text: 'text-sky-600',
      track: 'bg-sky-50',
    };
  }
  if (progress >= 40) {
    return {
      text: 'text-amber-600',
      track: 'bg-amber-50',
    };
  }
  return {
    text: 'text-rose-600',
    track: 'bg-rose-50',
  };
}

export default function GoalsGrid({
  goals,
  projects,
  onEditGoal,
  onDeleteGoal,
  onUpdateProgress,
  onOpenTasks,
  onOpenProject,
}) {
  if (!goals.length) {
    return (
      <Card className="text-center py-12 bg-white shadow-sm lg:col-span-2">
        <CardContent>
          <div className="text-slate-400 mb-4">
            <Target className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            No goals found
          </h3>
          <p className="text-slate-500">
            Get started by creating your first goal or adjust your filters.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {goals.map((goal, index) => {
        const daysRemaining = getDaysRemaining(goal.targetDate);
        const isOverdue =
          !Number.isNaN(daysRemaining) &&
          daysRemaining < 0 &&
          goal.status !== 'Completed';

        const relatedProjects = projects.filter((p) =>
          (goal.relatedProjectIds || []).includes(p.id)
        );

        const { text: progressTextColor, track: progressTrackColor } =
          getProgressClasses(goal.progress ?? 0);

        return (
          <Card
            key={goal.id}
            className="hover:shadow-xl transition-all duration-300 bg-white border border-slate-200"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3 flex-wrap">
                    <CardTitle className="text-xl text-slate-800 leading-tight">
                      {goal.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        className={`${getStatusColor(
                          goal.status
                        )} font-semibold gap-1`}
                      >
                        {getStatusIcon(goal.status)}
                        {goal.status}
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
                    {goal.description}
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
                      onClick={() => onEditGoal(goal)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit Goal
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={() => onUpdateProgress(goal)}
                    >
                      <ListTodo className="h-4 w-4" />
                      Update Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-red-600"
                      onClick={() => onDeleteGoal(goal.id, goal.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Goal
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
                    <p className="text-slate-500">Owner</p>
                    <p className="font-medium text-slate-800">{goal.owner}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-slate-500">Start Date</p>
                    <p className="font-medium text-slate-800">
                      {goal.startDate || '—'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-slate-500">Target Date</p>
                    <p className="font-medium text-slate-800">
                      {goal.targetDate || '—'}
                    </p>
                    {goal.targetDate && goal.status !== 'Completed' && (
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

                <div>
                  <p className="text-slate-500 mb-2">Related Projects</p>
                  <div className="flex flex-wrap gap-1">
                    {relatedProjects.map((p) => (
                      <Badge
                        key={p.id}
                        variant="outline"
                        className="text-xs bg-white hover:bg-gray-50 gap-1"
                      >
                        <FolderOpen className="h-3 w-3" />
                        {p.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    Goal Progress
                  </span>
                  <span className={`font-bold ${progressTextColor}`}>
                    {goal.progress}%
                  </span>
                </div>
                <Progress
                  value={goal.progress}
                  className={`h-2.5 ${progressTrackColor}`}
                />
              </div>

              {/* Quick navigation */}
              <div className="flex flex-wrap gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  // onClick={() => onOpenTasks(goal.id)}
                >
                  <ListTodo className="h-3 w-3" />
                  View Related Tasks
                </Button>
                {relatedProjects.map((project) => (
                  <Button
                    key={project.id}
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    //onClick={() => onOpenProject(project.id)}
                  >
                    <FolderOpen className="h-3 w-3" />
                    {project.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
