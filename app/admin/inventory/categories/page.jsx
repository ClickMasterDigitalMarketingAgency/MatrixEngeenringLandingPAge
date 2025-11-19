'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const CategoriesPage = dynamic(
  () => import('@/components/inventory/categories/CategoriesPage'),
  {
    loading: () => (
      <div className="h-20 w-full bg-muted/50 rounded-lg animate-pulse"></div>
    ),
    ssr: false,
  }
);

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="h-20 w-full bg-muted/50 rounded-lg animate-pulse"></div>
      }
    >
      <CategoriesPage />
    </Suspense>
  );
};

export default Page;
