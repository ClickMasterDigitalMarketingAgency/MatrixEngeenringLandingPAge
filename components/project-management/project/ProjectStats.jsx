'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function ProjectStats({ projects }) {
  const total = projects.length;
  const active = projects.filter((p) => p.status === 'active').length;
  const onHold = projects.filter((p) => p.status === 'on-hold').length;
  const completed = projects.filter((p) => p.status === 'completed').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
      <Card className="bg-white border-l-4 border-l-blue-500 shadow-sm">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-slate-800">{total}</div>
          <div className="text-sm text-slate-600">Total Projects</div>
        </CardContent>
      </Card>
      <Card className="bg-white border-l-4 border-l-green-500 shadow-sm">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-slate-800">{active}</div>
          <div className="text-sm text-slate-600">Active Projects</div>
        </CardContent>
      </Card>
      <Card className="bg-white border-l-4 border-l-yellow-500 shadow-sm">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-slate-800">{onHold}</div>
          <div className="text-sm text-slate-600">On Hold</div>
        </CardContent>
      </Card>
      <Card className="bg-white border-l-4 border-l-blue-500 shadow-sm">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-slate-800">{completed}</div>
          <div className="text-sm text-slate-600">Completed</div>
        </CardContent>
      </Card>
    </div>
  );
}
