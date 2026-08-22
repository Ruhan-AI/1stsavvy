'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  User, 
  Household, 
  Profile, 
  Account, 
  Transaction, 
  TransactionCategory, 
  TransactionRule, 
  RecurringItem, 
  Task, 
  StarLedgerEntry, 
  Reward, 
  RewardRedemption, 
  Goal, 
  CalendarEvent, 
  Holding, 
  Contact, 
  AppNotification, 
  NetWorthSnapshot,
  ParentalConsent,
  ChildCredentials
} from '../types';

import { 
  INITIAL_USER, 
  INITIAL_HOUSEHOLD, 
  INITIAL_PROFILES, 
  INITIAL_ACCOUNTS, 
  INITIAL_CATEGORIES, 
  INITIAL_TRANSACTIONS, 
  INITIAL_RULES, 
  INITIAL_RECURRING, 
  INITIAL_TASKS, 
  INITIAL_STAR_LEDGER, 
  INITIAL_REWARDS, 
  INITIAL_REDEMPTIONS, 
  INITIAL_GOALS, 
  INITIAL_CALENDAR_EVENTS, 
  INITIAL_HOLDINGS, 
  INITIAL_CONTACTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_NET_WORTH_HISTORY 
} from './demoData';

export interface AppState {
  currentUser: User;
  currentHousehold: Household;
  profiles: Profile[];
  activeProfileId: string;
  accounts: Account[];
  categories: TransactionCategory[];
  transactions: Transaction[];
  rules: TransactionRule[];
  recurring: RecurringItem[];
  tasks: Task[];
  starLedger: StarLedgerEntry[];
  rewards: Reward[];
  redemptions: RewardRedemption[];
  goals: Goal[];
  calendarEvents: CalendarEvent[];
  holdings: Holding[];
  contacts: Contact[];
  notifications: AppNotification[];
  netWorthHistory: NetWorthSnapshot[];
  parentalConsents: ParentalConsent[];
  childCredentials: ChildCredentials[];
}

const STORAGE_KEY = 'firstsavvy_state_v1';

// Initial state snapshot
const getInitialState = (): AppState => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse stored First Savvy state', e);
      }
    }
  }

  return {
    currentUser: INITIAL_USER,
    currentHousehold: INITIAL_HOUSEHOLD,
    profiles: INITIAL_PROFILES,
    activeProfileId: 'prof-sarah',
    accounts: INITIAL_ACCOUNTS,
    categories: INITIAL_CATEGORIES,
    transactions: INITIAL_TRANSACTIONS,
    rules: INITIAL_RULES,
    recurring: INITIAL_RECURRING,
    tasks: INITIAL_TASKS,
    starLedger: INITIAL_STAR_LEDGER,
    rewards: INITIAL_REWARDS,
    redemptions: INITIAL_REDEMPTIONS,
    goals: INITIAL_GOALS,
    calendarEvents: INITIAL_CALENDAR_EVENTS,
    holdings: INITIAL_HOLDINGS,
    contacts: INITIAL_CONTACTS,
    notifications: INITIAL_NOTIFICATIONS,
    netWorthHistory: INITIAL_NET_WORTH_HISTORY,
    parentalConsents: [
      {
        id: 'consent-01',
        householdId: 'hh-miller-01',
        childProfileId: 'prof-leo',
        consentingAdultId: 'user-001',
        policyVersion: '1.0',
        purpose: 'Supervised task, star, allowance, and financial habit learning',
        consentedAt: '2026-01-16T09:00:00Z',
        isRevoked: false,
      },
      {
        id: 'consent-02',
        householdId: 'hh-miller-01',
        childProfileId: 'prof-maya',
        consentingAdultId: 'user-001',
        policyVersion: '1.0',
        purpose: 'Supervised task, star, allowance, and financial habit learning',
        consentedAt: '2026-01-16T09:15:00Z',
        isRevoked: false,
      }
    ],
    childCredentials: [
      {
        id: 'cred-leo',
        childProfileId: 'prof-leo',
        username: 'leo',
        pinHash: '$2a$10$fictionalhashforleo1234',
        allowChildEmailLogin: false,
        createdAt: '2026-01-16T09:00:00Z',
      },
      {
        id: 'cred-maya',
        childProfileId: 'prof-maya',
        username: 'maya',
        pinHash: '$2a$10$fictionalhashformaya1234',
        allowChildEmailLogin: false,
        createdAt: '2026-01-16T09:15:00Z',
      }
    ],
  };
};

export function useFirstSavvyStore() {
  const [state, setState] = useState<AppState>(getInitialState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const saveState = useCallback((updater: (prev: AppState) => AppState) => {
    setState((prev) => {
      const next = updater(prev);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  }, []);

  // ----------------------------------------------------------------
  // Profile & Household Handlers
  // ----------------------------------------------------------------
  const setActiveProfile = useCallback((profileId: string) => {
    saveState((prev) => ({ ...prev, activeProfileId: profileId }));
  }, [saveState]);

  const addProfile = useCallback((
    profile: Omit<Profile, 'id' | 'createdAt' | 'updatedAt' | 'starBalance'>,
    options?: {
      consentRecord?: Omit<ParentalConsent, 'id' | 'consentedAt' | 'isRevoked'>;
      childCredentials?: { username: string; pin: string };
    }
  ) => {
    const id = `prof-${Date.now()}`;
    const newProfile: Profile = {
      ...profile,
      id,
      starBalance: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveState((prev) => {
      const newConsents = options?.consentRecord
        ? [
            ...prev.parentalConsents,
            {
              id: `consent-${Date.now()}`,
              ...options.consentRecord,
              childProfileId: id,
              consentedAt: new Date().toISOString(),
              isRevoked: false,
            },
          ]
        : prev.parentalConsents;

      const newCredentials = options?.childCredentials
        ? [
            ...prev.childCredentials,
            {
              id: `cred-${Date.now()}`,
              childProfileId: id,
              username: options.childCredentials.username,
              pinHash: `$2a$10$hashed_${options.childCredentials.pin}`,
              allowChildEmailLogin: false,
              createdAt: new Date().toISOString(),
            },
          ]
        : prev.childCredentials;

      return {
        ...prev,
        profiles: [...prev.profiles, newProfile],
        parentalConsents: newConsents,
        childCredentials: newCredentials,
      };
    });

    return id;
  }, [saveState]);

  const updateProfile = useCallback((profileId: string, updates: Partial<Profile>) => {
    saveState((prev) => ({
      ...prev,
      profiles: prev.profiles.map((p) =>
        p.id === profileId
          ? { ...p, ...updates, updatedAt: new Date().toISOString() }
          : p
      ),
    }));
  }, [saveState]);

  const deleteChildProfile = useCallback((profileId: string, wipeMode: 'complete_wipe' | 'anonymize') => {
    saveState((prev) => {
      if (wipeMode === 'complete_wipe') {
        return {
          ...prev,
          profiles: prev.profiles.filter((p) => p.id !== profileId),
          starLedger: prev.starLedger.filter((l) => l.childProfileId !== profileId),
          childCredentials: prev.childCredentials.filter((c) => c.childProfileId !== profileId),
          parentalConsents: prev.parentalConsents.filter((c) => c.childProfileId !== profileId),
          goals: prev.goals.filter((g) => g.profileId !== profileId),
        };
      } else {
        // Anonymize
        return {
          ...prev,
          profiles: prev.profiles.map((p) =>
            p.id === profileId
              ? {
                  ...p,
                  displayName: 'Anonymized Child',
                  legalName: undefined,
                  dateOfBirth: undefined,
                  privateNotes: undefined,
                }
              : p
          ),
          childCredentials: prev.childCredentials.filter((c) => c.childProfileId !== profileId),
        };
      }
    });
  }, [saveState]);

  // ----------------------------------------------------------------
  // Star Ledger & Task Handlers
  // ----------------------------------------------------------------
  const awardStars = useCallback((childProfileId: string, amount: number, reason: string, adultId?: string) => {
    saveState((prev) => {
      const child = prev.profiles.find((p) => p.id === childProfileId);
      const currentBalance = child?.starBalance || 0;
      const newBalance = Math.max(0, currentBalance + amount);

      const entry: StarLedgerEntry = {
        id: `ledger-${Date.now()}`,
        householdId: prev.currentHousehold.id,
        childProfileId,
        amount,
        balanceAfter: newBalance,
        type: amount >= 0 ? 'manual_award' : 'manual_deduction',
        reason,
        createdByAdultId: adultId || prev.currentUser.id,
        createdAt: new Date().toISOString(),
      };

      return {
        ...prev,
        starLedger: [entry, ...prev.starLedger],
        profiles: prev.profiles.map((p) =>
          p.id === childProfileId ? { ...p, starBalance: newBalance } : p
        ),
      };
    });
  }, [saveState]);

  const completeTask = useCallback((taskId: string, childProfileId: string, note?: string) => {
    saveState((prev) => {
      const task = prev.tasks.find((t) => t.id === taskId);
      if (!task) return prev;

      if (!task.requiresParentApproval) {
        // Auto-award stars
        const child = prev.profiles.find((p) => p.id === childProfileId);
        const newBalance = (child?.starBalance || 0) + task.starValue;

        const ledgerEntry: StarLedgerEntry = {
          id: `ledger-${Date.now()}`,
          householdId: prev.currentHousehold.id,
          childProfileId,
          amount: task.starValue,
          balanceAfter: newBalance,
          type: 'task_completed',
          referenceId: taskId,
          reason: `Completed: ${task.title}`,
          createdAt: new Date().toISOString(),
        };

        return {
          ...prev,
          starLedger: [ledgerEntry, ...prev.starLedger],
          profiles: prev.profiles.map((p) =>
            p.id === childProfileId ? { ...p, starBalance: newBalance } : p
          ),
          notifications: [
            {
              id: `notif-${Date.now()}`,
              householdId: prev.currentHousehold.id,
              title: `Task Completed: ${task.title}`,
              message: `${child?.displayName || 'Child'} earned ${task.starValue} stars!`,
              category: 'task',
              isRead: false,
              actionUrl: `/profiles/${childProfileId}`,
              createdAt: new Date().toISOString(),
            },
            ...prev.notifications,
          ],
        };
      } else {
        // Create approval notification
        return {
          ...prev,
          notifications: [
            {
              id: `notif-${Date.now()}`,
              householdId: prev.currentHousehold.id,
              title: `Approval Needed: ${task.title}`,
              message: `Submitted for review with note: "${note || 'Done!'}"`,
              category: 'task',
              isRead: false,
              actionUrl: `/profiles/${childProfileId}`,
              createdAt: new Date().toISOString(),
            },
            ...prev.notifications,
          ],
        };
      }
    });
  }, [saveState]);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'isArchived' | 'householdId'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      householdId: state.currentHousehold.id,
      isArchived: false,
      createdAt: new Date().toISOString(),
    };
    saveState((prev) => ({ ...prev, tasks: [newTask, ...prev.tasks] }));
  }, [saveState, state.currentHousehold.id]);

  const requestRedemption = useCallback((rewardId: string, childProfileId: string) => {
    saveState((prev) => {
      const reward = prev.rewards.find((r) => r.id === rewardId);
      if (!reward) return prev;

      const redemption: RewardRedemption = {
        id: `red-${Date.now()}`,
        householdId: prev.currentHousehold.id,
        rewardId,
        childProfileId,
        starCost: reward.starCost,
        status: 'pending',
        requestedAt: new Date().toISOString(),
      };

      return {
        ...prev,
        redemptions: [redemption, ...prev.redemptions],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            householdId: prev.currentHousehold.id,
            title: `Reward Requested: ${reward.title}`,
            message: `Child requested "${reward.title}" for ${reward.starCost} stars.`,
            category: 'reward',
            isRead: false,
            actionUrl: `/profiles/${childProfileId}`,
            createdAt: new Date().toISOString(),
          },
          ...prev.notifications,
        ],
      };
    });
  }, [saveState]);

  const approveRedemption = useCallback((redemptionId: string) => {
    saveState((prev) => {
      const redemption = prev.redemptions.find((r) => r.id === redemptionId);
      if (!redemption) return prev;

      const child = prev.profiles.find((p) => p.id === redemption.childProfileId);
      const newBalance = Math.max(0, (child?.starBalance || 0) - redemption.starCost);

      const ledgerEntry: StarLedgerEntry = {
        id: `ledger-${Date.now()}`,
        householdId: prev.currentHousehold.id,
        childProfileId: redemption.childProfileId,
        amount: -redemption.starCost,
        balanceAfter: newBalance,
        type: 'reward_redeemed',
        referenceId: redemption.rewardId,
        reason: `Redeemed Reward (${redemption.starCost} stars)`,
        createdAt: new Date().toISOString(),
      };

      return {
        ...prev,
        starLedger: [ledgerEntry, ...prev.starLedger],
        profiles: prev.profiles.map((p) =>
          p.id === redemption.childProfileId ? { ...p, starBalance: newBalance } : p
        ),
        redemptions: prev.redemptions.map((r) =>
          r.id === redemptionId ? { ...r, status: 'approved', reviewedAt: new Date().toISOString() } : r
        ),
      };
    });
  }, [saveState]);

  // ----------------------------------------------------------------
  // Banking, Accounts & Transactions Handlers
  // ----------------------------------------------------------------
  const addAccount = useCallback((account: Omit<Account, 'id' | 'createdAt' | 'updatedAt' | 'householdId'>) => {
    const newAccount: Account = {
      ...account,
      id: `acc-${Date.now()}`,
      householdId: state.currentHousehold.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveState((prev) => ({ ...prev, accounts: [...prev.accounts, newAccount] }));
  }, [saveState, state.currentHousehold.id]);

  const addTransaction = useCallback((tx: Omit<Transaction, 'id' | 'createdAt' | 'householdId'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`,
      householdId: state.currentHousehold.id,
      createdAt: new Date().toISOString(),
    };
    saveState((prev) => {
      // Update account balance
      const updatedAccounts = prev.accounts.map((acc) => {
        if (acc.id === tx.accountId) {
          return {
            ...acc,
            balanceCents: acc.balanceCents + tx.amountCents,
            updatedAt: new Date().toISOString(),
          };
        }
        return acc;
      });

      return {
        ...prev,
        accounts: updatedAccounts,
        transactions: [newTx, ...prev.transactions],
      };
    });
  }, [saveState, state.currentHousehold.id]);

  const updateTransaction = useCallback((txId: string, updates: Partial<Transaction>) => {
    saveState((prev) => ({
      ...prev,
      transactions: prev.transactions.map((t) =>
        t.id === txId ? { ...t, ...updates } : t
      ),
    }));
  }, [saveState]);

  const addGoal = useCallback((goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'householdId'>) => {
    const newGoal: Goal = {
      ...goal,
      id: `goal-${Date.now()}`,
      householdId: state.currentHousehold.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveState((prev) => ({ ...prev, goals: [...prev.goals, newGoal] }));
  }, [saveState, state.currentHousehold.id]);

  const contributeToGoal = useCallback((goalId: string, amountCents?: number, stars?: number) => {
    saveState((prev) => ({
      ...prev,
      goals: prev.goals.map((g) => {
        if (g.id === goalId) {
          return {
            ...g,
            currentAmountCents: (g.currentAmountCents || 0) + (amountCents || 0),
            currentStars: (g.currentStars || 0) + (stars || 0),
            updatedAt: new Date().toISOString(),
          };
        }
        return g;
      }),
    }));
  }, [saveState]);

  const markNotificationRead = useCallback((notificationId: string) => {
    saveState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === notificationId ? { ...n, isRead: true } : n
      ),
    }));
  }, [saveState]);

  const markAllNotificationsRead = useCallback(() => {
    saveState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, isRead: true })),
    }));
  }, [saveState]);

  const resetToDemoData = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setState(getInitialState());
  }, []);

  return {
    state,
    isLoaded,
    activeProfile: state.profiles.find((p) => p.id === state.activeProfileId) || state.profiles[0],
    setActiveProfile,
    addProfile,
    updateProfile,
    deleteChildProfile,
    awardStars,
    completeTask,
    addTask,
    requestRedemption,
    approveRedemption,
    addAccount,
    addTransaction,
    updateTransaction,
    addGoal,
    contributeToGoal,
    markNotificationRead,
    markAllNotificationsRead,
    resetToDemoData,
  };
}
