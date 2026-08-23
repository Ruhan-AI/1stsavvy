import React from 'react';
import { MarketingHeader } from '@/components/marketing/Header';
import { MarketingFooter } from '@/components/marketing/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // §10 — `dvh`, never `vh`, so mobile browser chrome never adds a scroll gap.
  // `min-w-0` on the main column stops a wide child from pushing the flex column
  // past the viewport (§1 Rule B).
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F9F7F8] dark:bg-[#1A232E]">
      <MarketingHeader />
      <main className="flex-1 w-full min-w-0">{children}</main>
      <MarketingFooter />
    </div>
  );
}
