'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ProjectManagement = dynamic(
  () => import('@/components/project-management/project/ProjectModule'),
  {
    loading: () => (
      <div className="h-20 w-full bg-muted/50 rounded-lg animate-pulse"></div>
    ),
    ssr: false, // prevents server rendering & searchParams issues
  }
);

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="h-20 w-full bg-muted/50 rounded-lg animate-pulse"></div>
      }
    >
      <ProjectManagement />
    </Suspense>
  );
};

export default Page;
