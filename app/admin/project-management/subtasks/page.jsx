'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const SubtasksPage = dynamic(
  () => import('@/components/project-management/subtasks/SubtaskModule'),
  {
    loading: () => (
      <div className="h-20 w-full bg-muted/50 rounded-lg animate-pulse"></div>
    ),
    ssr: false, // prevents build errors / useSearchParams issue
  }
);

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="h-20 w-full bg-muted/50 rounded-lg animate-pulse"></div>
      }
    >
      <SubtasksPage />
    </Suspense>
  );
};

export default Page;
