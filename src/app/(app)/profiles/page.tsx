'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFirstSavvyStore } from '@/lib/store';
import { 
  Users, 
  Plus, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  UserCheck, 
  Check, 
  X, 
  ChevronRight,
  AlertCircle,
  Lock,
  Building,
  ArrowRight
} from 'lucide-react';

export default function ProfilesPage() {
  const router = useRouter();
  const { state, activeProfile, setActiveProfile, addProfile } = useFirstSavvyStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [profileType, setProfileType] = useState<'personal' | 'child' | 'adult_family' | 'business'>('child');

  // Form State
  const [displayName, setDisplayName] = useState('');
  const [relationship, setRelationship] = useState<any>('child');
  const [avatarColor, setAvatarColor] = useState('#4FA3CD');
  const [dob, setDob] = useState('');

  // Child specifics (COPPA)
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('1234');
  const [coppaConsent, setCoppaConsent] = useState(false); // Unchecked by default per COPPA!
  const [error, setError] = useState('');

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName) {
      setError('Please provide a display name.');
      return;
    }

    if (profileType === 'child') {
      if (!coppaConsent) {
        setError('Parental consent is required to create a supervised child profile under COPPA.');
        return;
      }
      if (!username || !pin || pin.length !== 4) {
        setError('Please provide a child username and 4-digit PIN.');
        return;
      }
    }

    const newId = addProfile(
      {
        householdId: state.currentHousehold.id,
        type: profileType,
        displayName,
        relationship: profileType === 'child' ? 'child' : relationship,
        avatarColor,
        dateOfBirth: dob || undefined,
        isChild: profileType === 'child',
        permissions: {
          canViewBanking: profileType !== 'child',
          canEditBanking: profileType === 'personal',
          canViewBudgets: profileType !== 'child',
          canEditBudgets: profileType === 'personal',
          canViewNetWorth: profileType !== 'child',
          canManageTasks: profileType !== 'child',
          canApproveRedemptions: profileType !== 'child',
          canInviteMembers: profileType === 'personal',
        },
      },
      profileType === 'child'
        ? {
            consentRecord: {
              householdId: state.currentHousehold.id,
              childProfileId: '',
              consentingAdultId: state.currentUser.id,
              policyVersion: '1.0',
              purpose: 'Supervised financial education, chores, allowances, and goals',
            },
            childCredentials: {
              username,
              pin,
            },
          }
        : undefined
    );

    setAddModalOpen(false);
    setDisplayName('');
    setUsername('');
    setCoppaConsent(false);
    setError('');

    if (profileType === 'child') {
      router.push(`/profiles/${newId}`);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Household & Roles</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white mt-1">
            Profiles & Family Permissions
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-xs' : 'text-slate-500'}`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-xs' : 'text-slate-500'}`}
            >
              List View
            </button>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-brand-sky" />
            <span>Add Family Member</span>
          </button>
        </div>
      </div>

      {/* 2. Profiles Grid / List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.profiles.map((p) => {
            const isActive = p.id === activeProfile.id;
            return (
              <div
                key={p.id}
                className={`p-6 rounded-3xl bg-white dark:bg-[#1E293B] border transition-all space-y-4 flex flex-col justify-between ${
                  isActive
                    ? 'border-brand-sky ring-2 ring-brand-sky/20 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl text-white text-base font-bold flex items-center justify-center shadow-xs"
                        style={{ backgroundColor: p.avatarColor }}
                      >
                        {p.displayName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-serif font-bold text-lg text-brand-navy dark:text-white leading-tight">
                          {p.displayName}
                        </div>
                        <div className="text-xs text-slate-500 capitalize">{p.relationship} Profile</div>
                      </div>
                    </div>

                    {isActive && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-sky/10 text-brand-sky">
                        Active
                      </span>
                    )}
                  </div>

                  {p.isChild ? (
                    <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200/60 text-xs flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Star Ledger Balance</span>
                      <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{p.starBalance} Stars</span>
                      </span>
                    </div>
                  ) : (
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 text-xs flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Financial Permissions</span>
                      <span className="font-bold text-emerald-600">Full Adult Access</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveProfile(p.id)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Switch to Profile
                  </button>

                  {p.isChild && (
                    <Link
                      href={`/profiles/${p.id}`}
                      className="px-3 py-1.5 rounded-xl bg-brand-sky hover:bg-brand-blue text-white text-xs font-bold inline-flex items-center gap-1 shadow-xs"
                    >
                      <span>Manage Child</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
          {state.profiles.map((p) => (
            <div key={p.id} className="py-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl text-white font-bold flex items-center justify-center"
                  style={{ backgroundColor: p.avatarColor }}
                >
                  {p.displayName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm text-brand-navy dark:text-white">{p.displayName}</div>
                  <div className="text-slate-500 capitalize">{p.relationship} • {p.isChild ? 'Supervised Child' : 'Adult Member'}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {p.isChild ? (
                  <Link
                    href={`/profiles/${p.id}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-sky hover:text-white text-xs font-bold text-brand-navy"
                  >
                    Open Tasks & Ledger →
                  </Link>
                ) : (
                  <span className="text-emerald-600 font-bold">Adult Manager</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD PROFILE MODAL WITH COPPA CONSENT */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white dark:bg-[#1E293B] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-serif font-bold text-xl text-brand-navy dark:text-white">Add Family Member</h3>
                <p className="text-xs text-slate-500">Configure access level for your household.</p>
              </div>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Profile Type Selector */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setProfileType('child')}
                className={`p-3 rounded-xl border text-left space-y-1 transition-all ${
                  profileType === 'child'
                    ? 'bg-sky-50 dark:bg-sky-950/60 border-brand-sky ring-2 ring-brand-sky/20'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-brand-navy dark:text-white flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span>Child Profile</span>
                </div>
                <div className="text-[11px] text-slate-500">Supervised space for chores, stars & goals.</div>
              </button>

              <button
                type="button"
                onClick={() => setProfileType('adult_family')}
                className={`p-3 rounded-xl border text-left space-y-1 transition-all ${
                  profileType === 'adult_family'
                    ? 'bg-sky-50 dark:bg-sky-950/60 border-brand-sky ring-2 ring-brand-sky/20'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-brand-navy dark:text-white flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-brand-sky" />
                  <span>Adult Member</span>
                </div>
                <div className="text-[11px] text-slate-500">Spouse, partner, or dependent adult.</div>
              </button>
            </div>

            <form onSubmit={handleCreateProfile} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-brand-navy dark:text-slate-200">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  placeholder={profileType === 'child' ? 'e.g. Leo or Maya' : 'e.g. David'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>

              {profileType === 'child' ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-brand-navy dark:text-slate-200">Child Username</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase())}
                        required
                        placeholder="e.g. leo"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-brand-navy dark:text-slate-200">4-Digit PIN</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                        placeholder="••••"
                        className="w-full font-mono text-center tracking-[0.4em] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                      />
                    </div>
                  </div>

                  {/* MANDATORY UNCHECKED COPPA PARENTAL CONSENT CHECKBOX */}
                  <div className="p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-brand-sky/30 space-y-2">
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="coppa"
                        checked={coppaConsent}
                        onChange={(e) => setCoppaConsent(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-brand-sky focus:ring-brand-sky cursor-pointer"
                      />
                      <label htmlFor="coppa" className="text-xs text-slate-800 dark:text-slate-200 leading-snug select-none">
                        <strong>Parental Consent (COPPA):</strong> As the parent or legal guardian, I give explicit permission to create this supervised child profile for financial learning, tasks, and savings goals. I have reviewed the <Link href="/children-privacy" target="_blank" className="text-brand-sky font-bold underline">Children's Privacy Notice</Link>.
                      </label>
                    </div>
                    <p className="text-[10px] text-slate-500 pl-6">
                      An immutable timestamp and parental consent record will be logged with policy v1.0.
                    </p>
                  </div>
                </>
              ) : (
                <div className="space-y-1">
                  <label className="font-bold text-brand-navy dark:text-slate-200">Relationship</label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
                  >
                    <option value="spouse">Spouse / Partner</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="dependent_adult">Dependent Adult</option>
                    <option value="managed_finances">I Manage Their Finances</option>
                    <option value="other">Other Family</option>
                  </select>
                </div>
              )}

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold inline-flex items-center justify-center gap-2 shadow"
                >
                  <span>Create Profile</span>
                  <ArrowRight className="w-4 h-4 text-brand-sky" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
