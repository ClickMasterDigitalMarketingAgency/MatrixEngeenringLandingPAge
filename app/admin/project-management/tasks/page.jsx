'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Tasks = dynamic(
  () => import('@/components/project-management/tasks/TaskModule'),
  {
    loading: () => (
      <div className="h-20 w-full bg-muted/50 rounded-lg animate-pulse"></div>
    ),
    ssr: false, // avoid SSR issues with client-only components
  }
);

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="h-20 w-full bg-muted/50 rounded-lg animate-pulse"></div>
      }
    >
      <Tasks />
    </Suspense>
  );
};

export default Page;
