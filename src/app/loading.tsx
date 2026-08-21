import React from 'react';
import { BrandLoader } from '@/components/brand/BrandLoader';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-8">
      <BrandLoader size="md" showTagline message="Preparing your financial workspace..." />
    </div>
  );
}
