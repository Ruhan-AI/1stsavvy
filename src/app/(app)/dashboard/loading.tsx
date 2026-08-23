import React from 'react';
import { BrandLoader } from '@/components/brand/BrandLoader';

export default function DashboardLoading() {
  return (
    <div className="flex min-h-[60dvh] sm:min-h-[70dvh] w-full items-center justify-center px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <BrandLoader size="md" showTagline message="Syncing accounts and star ledgers..." />
    </div>
  );
}
