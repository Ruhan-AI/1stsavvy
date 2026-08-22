'use client';

import React from 'react';
import { Lock, ShieldCheck, AlertCircle, KeyRound, Server } from 'lucide-react';

export default function PasswordVaultPage() {
  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Security & Credentials</span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Roadmap Architecture
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white mt-1">
          Password & Secret Vault
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Dedicated zero-knowledge credential storage for household logins and master passwords.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-xs text-amber-900 dark:text-amber-200 space-y-2">
        <div className="font-bold flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Security Architecture Notice</span>
        </div>
        <p className="leading-relaxed">
          First Savvy does not store raw passwords, recovery keys, or unencrypted secrets in the general database. A dedicated zero-knowledge, end-to-end encrypted (E2EE) cryptographic vault is currently being architected and will undergo independent third-party penetration audits prior to launch.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2">
          <KeyRound className="w-6 h-6 text-brand-sky" />
          <h3 className="font-bold text-sm text-brand-navy dark:text-white">Zero-Knowledge Keys</h3>
          <p className="text-xs text-slate-500">Only your local master passphrase will possess the decryption key.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <h3 className="font-bold text-sm text-brand-navy dark:text-white">Household Sharing</h3>
          <p className="text-xs text-slate-500">Securely share streaming, utility, and mortgage logins with spouses.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2">
          <Server className="w-6 h-6 text-brand-softBlue" />
          <h3 className="font-bold text-sm text-brand-navy dark:text-white">Audited Storage</h3>
          <p className="text-xs text-slate-500">Separated hardware enclave and cryptographic isolation.</p>
        </div>
      </div>
    </div>
  );
}
