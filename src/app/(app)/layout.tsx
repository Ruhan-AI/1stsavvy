'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/app/Sidebar';
import { AppHeader } from '@/components/app/AppHeader';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] w-full flex bg-[#F9F7F8] dark:bg-[#15202B]">
      {/* Sidebar — drawer below lg, persistent from lg up (spec Rule A) */}
      <AppSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Application Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <AppHeader onOpenMobileMenu={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto min-w-0 animate-in fade-in duration-150">
          {children}
        </main>
      </div>
    </div>
  );
}
