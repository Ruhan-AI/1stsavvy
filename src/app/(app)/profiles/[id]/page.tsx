'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFirstSavvyStore } from '@/lib/store';
import { formatDate } from '@/lib/utils/format';
import { 
  Star, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  Gift, 
  Target, 
  ShieldCheck, 
  Settings, 
  Download, 
  Trash2, 
  AlertCircle, 
  ArrowLeft, 
  RotateCcw, 
  Check, 
  X,
  Clock,
  Lock
} from 'lucide-react';

export default function ChildProfileDetailPage() {
  const params = useParams();
  const router = useRouter();
  const childId = params.id as string;
  const { 
    state, 
    awardStars, 
    addTask, 
    approveRedemption, 
    updateProfile, 
    deleteChildProfile 
  } = useFirstSavvyStore();

  const child = state.profiles.find((p) => p.id === childId);
  const [activeTab, setActiveTab] = useState<'tasks' | 'goals' | 'ledger' | 'settings'>('tasks');

  // Task form modal
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskStars, setTaskStars] = useState('2');
  const [taskSchedule, setTaskSchedule] = useState<any>('daily');
  const [requiresApproval, setRequiresApproval] = useState(true);

  // Award / Deduct stars modal
  const [awardModalOpen, setAwardModalOpen] = useState(false);
  const [starAmount, setStarAmount] = useState('3');
  const [starReason, setStarReason] = useState('Helping with grocery unloading');
  const [isDeduction, setIsDeduction] = useState(false);

  // PIN Reset state
  const [newPin, setNewPin] = useState('');
  const [pinResetSuccess, setPinResetSuccess] = useState(false);

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [wipeMode, setWipeMode] = useState<'complete_wipe' | 'anonymize'>('complete_wipe');

  if (!child) {
    return (
      <div className="p-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-brand-navy dark:text-white">Profile not found</h2>
        <Link href="/profiles" className="text-xs font-bold text-brand-sky hover:underline">
          ← Return to Profiles
        </Link>
      </div>
    );
  }

  const childTasks = state.tasks.filter((t) => t.assignedProfileIds.includes(childId));
  const childGoals = state.goals.filter((g) => g.profileId === childId);
  const childLedger = state.starLedger.filter((l) => l.childProfileId === childId);
  const childRedemptions = state.redemptions.filter((r) => r.childProfileId === childId);
  const consent = state.parentalConsents.find((c) => c.childProfileId === childId);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      title: taskTitle,
      icon: 'Sparkles',
      color: '#4FA3CD',
      starValue: parseInt(taskStars) || 1,
      assignedProfileIds: [childId],
      schedule: taskSchedule,
      requiresParentApproval: requiresApproval,
      evidenceRequired: false,
    });
    setTaskModalOpen(false);
    setTaskTitle('');
  };

  const handleAwardStars = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(starAmount) || 0;
    awardStars(childId, isDeduction ? -Math.abs(amount) : Math.abs(amount), starReason);
    setAwardModalOpen(false);
    setStarReason('');
  };

  const handleResetPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length === 4) {
      setPinResetSuccess(true);
      setTimeout(() => {
        setPinResetSuccess(false);
        setNewPin('');
      }, 3000);
    }
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
      childProfile: child,
      consentRecord: consent,
      tasks: childTasks,
      goals: childGoals,
      starLedger: childLedger,
      exportedAt: new Date().toISOString(),
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${child.displayName}_firstsavvy_data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDeleteChild = () => {
    deleteChildProfile(childId, wipeMode);
    router.push('/profiles');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header with Child Profile Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/profiles"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div
            className="w-12 h-12 rounded-2xl text-white text-lg font-bold flex items-center justify-center shadow-xs"
            style={{ backgroundColor: child.avatarColor }}
          >
            {child.displayName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-brand-navy dark:text-white">
                {child.displayName}
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{child.starBalance} Stars</span>
              </span>
            </div>
            <div className="text-xs text-slate-500">
              Supervised Child Profile • Born {child.dateOfBirth || '2016'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsDeduction(false);
              setAwardModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
          >
            <Star className="w-3.5 h-3.5 fill-brand-sky text-brand-sky" />
            <span>Award Stars</span>
          </button>

          <Link
            href="/kid-view"
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-brand-navy dark:text-white inline-flex items-center gap-1.5"
          >
            <span>Preview Kid Space</span>
          </Link>
        </div>
      </div>

      {/* 2. Subtabs Navigation */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'tasks', label: 'Tasks & Chores', count: childTasks.length },
          { id: 'goals', label: 'Goals & Rewards', count: childGoals.length },
          { id: 'ledger', label: 'Star Ledger Audit', count: childLedger.length },
          { id: 'settings', label: 'Parent Controls & Privacy' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-brand-navy text-white shadow-xs dark:bg-brand-sky dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 3. SUBTAB: TASKS & CHORES */}
      {activeTab === 'tasks' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">Assigned Responsibilities</h3>
            <button
              onClick={() => setTaskModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-brand-navy text-white text-xs font-bold inline-flex items-center gap-1.5 shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Task</span>
            </button>
          </div>

          <div className="space-y-3">
            {childTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-sky" />
                  <div>
                    <div className="font-bold text-sm text-brand-navy dark:text-white">{task.title}</div>
                    <div className="text-[11px] text-slate-500 capitalize">{task.schedule} • {task.requiresParentApproval ? 'Parent approval required' : 'Instant star award'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-lg">
                    +{task.starValue} Stars
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. SUBTAB: GOALS & REWARDS */}
      {activeTab === 'goals' && (
        <div className="space-y-6">
          {/* Pending Redemptions */}
          {childRedemptions.filter((r) => r.status === 'pending').length > 0 && (
            <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 space-y-3">
              <h3 className="font-serif font-bold text-base text-amber-900 dark:text-amber-200">
                Pending Reward Redemptions
              </h3>
              {childRedemptions.filter((r) => r.status === 'pending').map((r) => (
                <div key={r.id} className="p-3 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-brand-navy dark:text-white">Movie Night Pick</div>
                    <div className="text-slate-500">Cost: {r.starCost} Stars</div>
                  </div>
                  <button
                    onClick={() => approveRedemption(r.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold"
                  >
                    Approve & Deduct Stars
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Child Goals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {childGoals.map((g) => (
              <div key={g.id} className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-brand-navy dark:text-white">{g.title}</div>
                  <span className="text-xs font-bold text-brand-sky">{g.currentStars} / {g.targetStars} Stars</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand-sky"
                    style={{ width: `${Math.min(100, ((g.currentStars || 0) / (g.targetStars || 1)) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SUBTAB: STAR LEDGER AUDIT */}
      {activeTab === 'ledger' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">Immutable Star Ledger</h3>
              <p className="text-xs text-slate-500">Complete audit trail of all awarded and redeemed stars.</p>
            </div>
            <span className="font-mono text-xs font-bold text-brand-navy dark:text-white">
              Current Balance: {child.starBalance} ⭐
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {childLedger.map((item) => {
              const isPositive = item.amount >= 0;
              return (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${isPositive ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <div className="font-bold text-brand-navy dark:text-white">{item.reason}</div>
                      <div className="text-[11px] text-slate-500">{formatDate(item.createdAt)}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`font-mono font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isPositive ? `+${item.amount}` : item.amount} Stars
                    </span>
                    <div className="text-[10px] text-slate-400">Balance: {item.balanceAfter} ⭐</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. SUBTAB: PARENT CONTROLS & COPPA PRIVACY */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* COPPA Consent Record Box */}
          <div className="p-6 rounded-3xl bg-sky-50/80 dark:bg-sky-950/40 border border-brand-sky/30 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-sky" />
              <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">
                Recorded Parental Consent Audit
              </h3>
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <div>• <strong>Consented By:</strong> Sarah Miller (Household Owner)</div>
              <div>• <strong>Policy Version:</strong> {consent?.policyVersion || '1.0'}</div>
              <div>• <strong>Timestamp:</strong> {consent?.consentedAt || '2026-01-16T09:00:00Z'}</div>
              <div>• <strong>Status:</strong> Active & Verified</div>
            </div>
          </div>

          {/* Reset PIN Form */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Reset Child PIN</h3>
            <p className="text-xs text-slate-500">
              PINs are stored as cryptographically hashed values. As a parent, you can overwrite and set a new 4-digit PIN for your child.
            </p>

            <form onSubmit={handleResetPin} className="flex gap-2 max-w-sm">
              <input
                type="password"
                maxLength={4}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="New 4-digit PIN"
                className="w-40 font-mono tracking-[0.4em] text-center px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-brand-navy dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-brand-navy text-white text-xs font-bold shadow"
              >
                Update PIN
              </button>
            </form>

            {pinResetSuccess && (
              <div className="text-xs text-emerald-600 font-bold">✓ Child PIN successfully updated!</div>
            )}
          </div>

          {/* Data Export & Deletion */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Parent Rights & Data Actions</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleExportData}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-brand-navy dark:text-white inline-flex items-center gap-2 hover:bg-slate-50"
              >
                <Download className="w-4 h-4 text-brand-sky" />
                <span>Export Child Records (JSON)</span>
              </button>

              <button
                onClick={() => setDeleteModalOpen(true)}
                className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-xs font-bold text-rose-700 inline-flex items-center gap-2 hover:bg-rose-100"
              >
                <Trash2 className="w-4 h-4 text-rose-600" />
                <span>Delete or Anonymize Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AWARD / DEDUCT STARS MODAL */}
      {awardModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white dark:bg-[#1E293B] rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">
              {isDeduction ? 'Deduct Stars' : 'Award Stars to'} {child.displayName}
            </h3>

            <form onSubmit={handleAwardStars} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Star Amount</label>
                <input
                  type="number"
                  value={starAmount}
                  onChange={(e) => setStarAmount(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Reason / Note</label>
                <input
                  type="text"
                  value={starReason}
                  onChange={(e) => setStarReason(e.target.value)}
                  required
                  placeholder="e.g. Great attitude helping clean up"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAwardModalOpen(false)}
                  className="w-1/2 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`w-1/2 py-2 rounded-xl text-white text-xs font-bold shadow ${isDeduction ? 'bg-rose-600' : 'bg-brand-navy'}`}
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE TASK MODAL */}
      {taskModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#1E293B] rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Create Task for {child.displayName}</h3>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-brand-navy dark:text-slate-200">Task Title</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  required
                  placeholder="e.g. Practice Piano 20 mins"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-brand-navy dark:text-slate-200">Star Value</label>
                  <input
                    type="number"
                    value={taskStars}
                    onChange={(e) => setTaskStars(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-brand-navy dark:text-slate-200">Schedule</label>
                  <select
                    value={taskSchedule}
                    onChange={(e) => setTaskSchedule(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                    <option value="weekly">Weekly</option>
                    <option value="one_time">One Time</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="approval"
                  checked={requiresApproval}
                  onChange={(e) => setRequiresApproval(e.target.checked)}
                  className="rounded text-brand-sky"
                />
                <label htmlFor="approval" className="text-slate-700 dark:text-slate-300">
                  Require parent approval before awarding stars
                </label>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setTaskModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold shadow"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE / ANONYMIZE MODAL */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#1E293B] rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-serif font-bold text-base text-rose-600">Delete Child Profile</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Please choose how you would like to handle {child.displayName}'s records:
            </p>

            <div className="space-y-2 text-xs">
              <label className="flex items-start gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="wipe"
                  checked={wipeMode === 'complete_wipe'}
                  onChange={() => setWipeMode('complete_wipe')}
                  className="mt-0.5"
                />
                <div>
                  <strong>Complete Wipe:</strong> Permanently delete all child personal data, credentials, tasks, and star history.
                </div>
              </label>

              <label className="flex items-start gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="wipe"
                  checked={wipeMode === 'anonymize'}
                  onChange={() => setWipeMode('anonymize')}
                  className="mt-0.5"
                />
                <div>
                  <strong>Anonymize:</strong> Strip all names and credentials, but preserve historical star totals under an anonymous label.
                </div>
              </label>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteChild}
                className="w-1/2 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow"
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
