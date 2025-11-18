import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Target } from 'lucide-react';

export default function GoalsStats({
  onTrackCount,
  atRiskCount,
  completedCount,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
      <Card className="bg-white border-l-4 border-l-blue-500 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {onTrackCount}
              </div>
              <div className="text-sm text-slate-600">On Track</div>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-l-4 border-l-red-500 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {atRiskCount}
              </div>
              <div className="text-sm text-slate-600">At Risk</div>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-l-4 border-l-green-500 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {completedCount}
              </div>
              <div className="text-sm text-slate-600">Completed</div>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
