'use client';

import React from 'react';
import { 
  Layers, 
  Building2, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function IntegrationsPage() {
  const integrations = [
    {
      name: 'Plaid Financial Link',
      category: 'Banking & Aggregation',
      status: 'Active (Sandbox Mode)',
      description: 'Connect over 12,000 banks for read-only balance and transaction synchronization.',
      badge: 'Live',
      badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    },
    {
      name: 'Equifax / TransUnion Bureau Hub',
      category: 'Credit Monitoring',
      status: 'In Development',
      description: 'Monthly VantageScore 3.0 updates and soft-pull credit factor alerts.',
      badge: 'Beta Contract',
      badgeColor: 'bg-sky-50 text-brand-sky dark:bg-sky-950 dark:text-sky-300',
    },
    {
      name: 'Resend / Postmark Mailer',
      category: 'Transactional Alerts',
      status: 'Active (Sandbox Mode)',
      description: 'Reliable delivery for verification emails, bill reminders, and consent audits.',
      badge: 'Live',
      badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    },
    {
      name: 'Zapier & Webhooks Adapter',
      category: 'Automation',
      status: 'Coming Soon',
      description: 'Automate chore completion triggers and calendar sync with Google Calendar and Outlook.',
      badge: 'Roadmap',
      badgeColor: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Connected Ecosystem</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white mt-1">
          Integrations & Provider Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage third-party data providers, sandbox connections, and security permissions.
        </p>
      </div>

      <div className="space-y-4">
        {integrations.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">{item.name}</h3>
                <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>
              <div className="text-xs text-brand-sky font-semibold">{item.category}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="shrink-0">
              <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
