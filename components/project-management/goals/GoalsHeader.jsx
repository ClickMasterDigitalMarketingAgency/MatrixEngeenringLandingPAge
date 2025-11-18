import { Badge } from '@/components/ui/badge';

const GoalsHeader = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-2">
        <h1>Goals</h1>
      </div>
      <p className="text-slate-600 text-lg">
        Set and track organization-wide objectives across multiple projects.
      </p>
      <Badge variant="secondary">Connected to Projects</Badge>
    </div>
  );
};

export default GoalsHeader;
