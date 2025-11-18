'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ListTodo, CheckCircle2, Clock } from 'lucide-react';

export default function SubtasksStats({ stats }) {
  const { total, completed, inProgress, notStarted } = stats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
      <Card className="bg-white border-l-4 border-l-blue-500 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-800">{total}</div>
              <div className="text-sm text-slate-600">Total Subtasks</div>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <ListTodo className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-l-4 border-l-green-500 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {completed}
              </div>
              <div className="text-sm text-slate-600">Completed</div>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-l-4 border-l-yellow-500 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {inProgress}
              </div>
              <div className="text-sm text-slate-600">In Progress</div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-l-4 border-l-gray-500 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {notStarted}
              </div>
              <div className="text-sm text-slate-600">Not Started</div>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <ListTodo className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
