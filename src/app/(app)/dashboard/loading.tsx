import React from 'react';
import { BrandLoader } from '@/components/brand/BrandLoader';

export default function DashboardLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <BrandLoader size="md" showTagline message="Syncing accounts and star ledgers..." />
    </div>
  );
}
