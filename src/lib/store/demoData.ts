import { 
  User, 
  Household, 
  Profile, 
  Account, 
  TransactionCategory, 
  Transaction, 
  TransactionRule, 
  RecurringItem, 
  Budget, 
  Task, 
  StarLedgerEntry, 
  Reward, 
  RewardRedemption, 
  Goal, 
  CalendarEvent, 
  Holding, 
  Contact, 
  AppNotification, 
  NetWorthSnapshot 
} from '../types';

export const INITIAL_USER: User = {
  id: 'user-001',
  email: 'sarah.miller@example.com',
  firstName: 'Sarah',
  lastName: 'Miller',
  avatarUrl: '',
  isEmailVerified: true,
  createdAt: '2026-01-15T08:00:00Z',
  updatedAt: '2026-08-20T10:00:00Z',
};

export const INITIAL_HOUSEHOLD: Household = {
  id: 'hh-miller-01',
  name: 'The Miller Family',
  ownerId: 'user-001',
  currency: 'USD',
  timezone: 'America/New_York',
  createdAt: '2026-01-15T08:00:00Z',
  updatedAt: '2026-08-20T10:00:00Z',
};

export const INITIAL_PROFILES: Profile[] = [
  {
    id: 'prof-sarah',
    householdId: 'hh-miller-01',
    userId: 'user-001',
    type: 'personal',
    displayName: 'Sarah Miller',
    legalName: 'Sarah Elizabeth Miller',
    relationship: 'self',
    avatarColor: '#4FA3CD',
    avatarIcon: 'User',
    isChild: false,
    starBalance: 0,
    permissions: {
      canViewBanking: true,
      canEditBanking: true,
      canViewBudgets: true,
      canEditBudgets: true,
      canViewNetWorth: true,
      canManageTasks: true,
      canApproveRedemptions: true,
      canInviteMembers: true,
    },
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-08-20T10:00:00Z',
  },
  {
    id: 'prof-david',
    householdId: 'hh-miller-01',
    type: 'adult_family',
    displayName: 'David Miller',
    legalName: 'David James Miller',
    relationship: 'spouse',
    avatarColor: '#324154',
    avatarIcon: 'UserCheck',
    isChild: false,
    starBalance: 0,
    permissions: {
      canViewBanking: true,
      canEditBanking: true,
      canViewBudgets: true,
      canEditBudgets: true,
      canViewNetWorth: true,
      canManageTasks: true,
      canApproveRedemptions: true,
      canInviteMembers: true,
    },
    createdAt: '2026-01-15T08:30:00Z',
    updatedAt: '2026-08-20T10:00:00Z',
  },
  {
    id: 'prof-leo',
    householdId: 'hh-miller-01',
    type: 'child',
    displayName: 'Leo Miller',
    legalName: 'Leo Alexander Miller',
    relationship: 'child',
    avatarColor: '#66AFD3',
    avatarIcon: 'Smile',
    dateOfBirth: '2016-04-12',
    isChild: true,
    starBalance: 42,
    permissions: {
      canViewBanking: false,
      canEditBanking: false,
      canViewBudgets: false,
      canEditBudgets: false,
      canViewNetWorth: false,
      canManageTasks: false,
      canApproveRedemptions: false,
      canInviteMembers: false,
    },
    createdAt: '2026-01-16T09:00:00Z',
    updatedAt: '2026-08-20T10:00:00Z',
  },
  {
    id: 'prof-maya',
    householdId: 'hh-miller-01',
    type: 'child',
    displayName: 'Maya Miller',
    legalName: 'Maya Rose Miller',
    relationship: 'child',
    avatarColor: '#A4CDE1',
    avatarIcon: 'Heart',
    dateOfBirth: '2019-09-28',
    isChild: true,
    starBalance: 28,
    permissions: {
      canViewBanking: false,
      canEditBanking: false,
      canViewBudgets: false,
      canEditBudgets: false,
      canViewNetWorth: false,
      canManageTasks: false,
      canApproveRedemptions: false,
      canInviteMembers: false,
    },
    createdAt: '2026-01-16T09:15:00Z',
    updatedAt: '2026-08-20T10:00:00Z',
  },
];

export const INITIAL_CATEGORIES: TransactionCategory[] = [
  // Income
  { id: 'cat-salary', householdId: 'hh-miller-01', name: 'Salary & Wages', type: 'income', icon: 'Briefcase', color: '#0F766E', budgetAmountCents: 950000, isSystem: true, includeInBudget: true },
  { id: 'cat-invest-income', householdId: 'hh-miller-01', name: 'Investment Dividends', type: 'income', icon: 'TrendingUp', color: '#4FA3CD', budgetAmountCents: 45000, isSystem: true, includeInBudget: true },
  { id: 'cat-side-income', householdId: 'hh-miller-01', name: 'Side Consulting', type: 'income', icon: 'Laptop', color: '#66AFD3', budgetAmountCents: 120000, isSystem: true, includeInBudget: true },
  // Expenses
  { id: 'cat-housing', householdId: 'hh-miller-01', name: 'Mortgage & Rent', type: 'expense', icon: 'Home', color: '#324154', budgetAmountCents: 285000, isSystem: true, includeInBudget: true },
  { id: 'cat-utilities', householdId: 'hh-miller-01', name: 'Utilities & Internet', type: 'expense', icon: 'Zap', color: '#B45309', budgetAmountCents: 38000, isSystem: true, includeInBudget: true },
  { id: 'cat-groceries', householdId: 'hh-miller-01', name: 'Groceries & Household', type: 'expense', icon: 'ShoppingBag', color: '#0F766E', budgetAmountCents: 95000, isSystem: true, includeInBudget: true },
  { id: 'cat-dining', householdId: 'hh-miller-01', name: 'Dining & Takeout', type: 'expense', icon: 'Coffee', color: '#4FA3CD', budgetAmountCents: 45000, isSystem: true, includeInBudget: true },
  { id: 'cat-auto', householdId: 'hh-miller-01', name: 'Vehicle & Gas', type: 'expense', icon: 'Car', color: '#64748B', budgetAmountCents: 42000, isSystem: true, includeInBudget: true },
  { id: 'cat-kids', householdId: 'hh-miller-01', name: 'Children & Education', type: 'expense', icon: 'BookOpen', color: '#66AFD3', budgetAmountCents: 60000, isSystem: true, includeInBudget: true },
  { id: 'cat-health', householdId: 'hh-miller-01', name: 'Healthcare & Fitness', type: 'expense', icon: 'Activity', color: '#B42318', budgetAmountCents: 35000, isSystem: true, includeInBudget: true },
  { id: 'cat-subs', householdId: 'hh-miller-01', name: 'Subscriptions & Software', type: 'expense', icon: 'Layers', color: '#A4CDE1', budgetAmountCents: 18000, isSystem: true, includeInBudget: true },
  { id: 'cat-savings', householdId: 'hh-miller-01', name: 'Emergency & Goal Savings', type: 'expense', icon: 'ShieldCheck', color: '#0F766E', budgetAmountCents: 150000, isSystem: true, includeInBudget: true },
  { id: 'cat-misc', householdId: 'hh-miller-01', name: 'Personal & Misc', type: 'expense', icon: 'MoreHorizontal', color: '#94A3B8', budgetAmountCents: 30000, isSystem: true, includeInBudget: true },
];

export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 'acc-chk-01',
    householdId: 'hh-miller-01',
    ownerProfileId: 'prof-sarah',
    name: 'Premier Checking',
    accountClass: 'asset',
    accountType: 'banking',
    institutionName: 'Chase Bank',
    accountNumberMasked: '•••• 4812',
    balanceCents: 845020, // $8,450.20
    currency: 'USD',
    isManual: false,
    status: 'active',
    includeInNetWorth: true,
    lastSyncedAt: '2026-08-20T09:30:00Z',
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-08-20T09:30:00Z',
  },
  {
    id: 'acc-sav-01',
    householdId: 'hh-miller-01',
    ownerProfileId: 'prof-sarah',
    name: 'High-Yield Family Savings',
    accountClass: 'asset',
    accountType: 'savings',
    institutionName: 'Marcus by Goldman Sachs',
    accountNumberMasked: '•••• 9104',
    balanceCents: 3420000, // $34,200.00
    currency: 'USD',
    isManual: false,
    status: 'active',
    includeInNetWorth: true,
    lastSyncedAt: '2026-08-20T09:30:00Z',
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-08-20T09:30:00Z',
  },
  {
    id: 'acc-inv-01',
    householdId: 'hh-miller-01',
    ownerProfileId: 'prof-david',
    name: 'Vanguard Total Market Index (IRA)',
    accountClass: 'asset',
    accountType: 'investments',
    institutionName: 'Vanguard',
    accountNumberMasked: '•••• 6632',
    balanceCents: 12850000, // $128,500.00
    currency: 'USD',
    isManual: false,
    status: 'active',
    includeInNetWorth: true,
    lastSyncedAt: '2026-08-20T09:30:00Z',
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-08-20T09:30:00Z',
  },
  {
    id: 'acc-prop-01',
    householdId: 'hh-miller-01',
    ownerProfileId: 'prof-sarah',
    name: 'Primary Residence (Cedar Ridge)',
    accountClass: 'asset',
    accountType: 'property',
    institutionName: 'Real Estate Valuation',
    accountNumberMasked: '•••• 1001',
    balanceCents: 54000000, // $540,000.00
    currency: 'USD',
    isManual: true,
    status: 'active',
    includeInNetWorth: true,
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-08-20T09:30:00Z',
  },
  {
    id: 'acc-veh-01',
    householdId: 'hh-miller-01',
    ownerProfileId: 'prof-david',
    name: 'Family SUV (2024 Highlander)',
    accountClass: 'asset',
    accountType: 'vehicle',
    institutionName: 'Vehicle Valuation',
    accountNumberMasked: '•••• 8820',
    balanceCents: 3850000, // $38,500.00
    currency: 'USD',
    isManual: true,
    status: 'active',
    includeInNetWorth: true,
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-08-20T09:30:00Z',
  },
  {
    id: 'acc-mort-01',
    householdId: 'hh-miller-01',
    ownerProfileId: 'prof-sarah',
    name: '30-Year Fixed Home Mortgage',
    accountClass: 'liability',
    accountType: 'loans_debts',
    institutionName: 'Rocket Mortgage',
    accountNumberMasked: '•••• 3041',
    balanceCents: -31040000, // -$310,400.00
    currency: 'USD',
    isManual: false,
    status: 'active',
    includeInNetWorth: true,
    lastSyncedAt: '2026-08-20T09:30:00Z',
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-08-20T09:30:00Z',
  },
  {
    id: 'acc-card-01',
    householdId: 'hh-miller-01',
    ownerProfileId: 'prof-sarah',
    name: 'Sapphire Preferred Rewards Card',
    accountClass: 'liability',
    accountType: 'credit_card',
    institutionName: 'Chase',
    accountNumberMasked: '•••• 7719',
    balanceCents: -184025, // -$1,840.25
    currency: 'USD',
    isManual: false,
    status: 'active',
    includeInNetWorth: true,
    lastSyncedAt: '2026-08-20T09:30:00Z',
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-08-20T09:30:00Z',
  },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'tx-001', householdId: 'hh-miller-01', accountId: 'acc-chk-01', date: '2026-08-20', description: 'Acme Corp Bi-Weekly Direct Deposit', merchantName: 'Acme Corp', amountCents: 475000, categoryId: 'cat-salary', categoryName: 'Salary & Wages', status: 'posted', paymentMethod: 'ach', isRecurring: true, createdAt: '2026-08-20T08:00:00Z' },
  { id: 'tx-002', householdId: 'hh-miller-01', accountId: 'acc-card-01', date: '2026-08-19', description: 'Whole Foods Market - Organic Groceries', merchantName: 'Whole Foods', amountCents: -16450, categoryId: 'cat-groceries', categoryName: 'Groceries & Household', status: 'posted', paymentMethod: 'card', isRecurring: false, createdAt: '2026-08-19T14:30:00Z' },
  { id: 'tx-003', householdId: 'hh-miller-01', accountId: 'acc-chk-01', date: '2026-08-18', description: 'Rocket Mortgage Monthly Escrow', merchantName: 'Rocket Mortgage', amountCents: -245000, categoryId: 'cat-housing', categoryName: 'Mortgage & Rent', status: 'posted', paymentMethod: 'ach', isRecurring: true, createdAt: '2026-08-18T10:00:00Z' },
  { id: 'tx-004', householdId: 'hh-miller-01', accountId: 'acc-card-01', date: '2026-08-17', description: 'Shell Oil - Gas Station', merchantName: 'Shell', amountCents: -5840, categoryId: 'cat-auto', categoryName: 'Vehicle & Gas', status: 'posted', paymentMethod: 'card', isRecurring: false, createdAt: '2026-08-17T11:20:00Z' },
  { id: 'tx-005', householdId: 'hh-miller-01', accountId: 'acc-card-01', date: '2026-08-16', description: 'Trattoria Bella - Family Dinner', merchantName: 'Trattoria Bella', amountCents: -8620, categoryId: 'cat-dining', categoryName: 'Dining & Takeout', status: 'posted', paymentMethod: 'card', isRecurring: false, createdAt: '2026-08-16T19:45:00Z' },
  { id: 'tx-006', householdId: 'hh-miller-01', accountId: 'acc-chk-01', date: '2026-08-15', description: 'Power & Light Electric Utility', merchantName: 'Electric Co', amountCents: -14280, categoryId: 'cat-utilities', categoryName: 'Utilities & Internet', status: 'posted', paymentMethod: 'ach', isRecurring: true, createdAt: '2026-08-15T09:00:00Z' },
  { id: 'tx-007', householdId: 'hh-miller-01', accountId: 'acc-card-01', date: '2026-08-14', description: 'Target - School Supplies & Backpacks', merchantName: 'Target', amountCents: -11250, categoryId: 'cat-kids', categoryName: 'Children & Education', status: 'posted', paymentMethod: 'card', isRecurring: false, createdAt: '2026-08-14T15:10:00Z' },
  { id: 'tx-008', householdId: 'hh-miller-01', accountId: 'acc-chk-01', date: '2026-08-12', description: 'Transfer to High-Yield Savings', merchantName: 'Marcus Savings', amountCents: -100000, categoryId: 'cat-savings', categoryName: 'Emergency & Goal Savings', status: 'posted', paymentMethod: 'transfer', isRecurring: true, createdAt: '2026-08-12T08:00:00Z' },
  { id: 'tx-009', householdId: 'hh-miller-01', accountId: 'acc-card-01', date: '2026-08-10', description: 'Netflix & Spotify Family Streaming', merchantName: 'Netflix', amountCents: -3498, categoryId: 'cat-subs', categoryName: 'Subscriptions & Software', status: 'posted', paymentMethod: 'card', isRecurring: true, createdAt: '2026-08-10T02:00:00Z' },
  { id: 'tx-010', householdId: 'hh-miller-01', accountId: 'acc-chk-01', date: '2026-08-05', description: 'Client Consulting Retainer', merchantName: 'Nexus Labs', amountCents: 120000, categoryId: 'cat-side-income', categoryName: 'Side Consulting', status: 'posted', paymentMethod: 'ach', isRecurring: false, createdAt: '2026-08-05T12:00:00Z' },
];

export const INITIAL_RECURRING: RecurringItem[] = [
  { id: 'rec-01', householdId: 'hh-miller-01', accountId: 'acc-chk-01', name: 'Rocket Mortgage Escrow', type: 'bill', cadence: 'monthly', nextDate: '2026-09-01', expectedAmountCents: 245000, categoryId: 'cat-housing', reminderDaysBefore: 5, isAutoDetected: false, isActive: true },
  { id: 'rec-02', householdId: 'hh-miller-01', accountId: 'acc-chk-01', name: 'Acme Corp Salary Deposit', type: 'income', cadence: 'biweekly', nextDate: '2026-09-03', expectedAmountCents: 475000, categoryId: 'cat-salary', reminderDaysBefore: 1, isAutoDetected: true, isActive: true },
  { id: 'rec-03', householdId: 'hh-miller-01', accountId: 'acc-chk-01', name: 'Electric & Utility Bill', type: 'bill', cadence: 'monthly', nextDate: '2026-09-15', expectedAmountCents: 14500, categoryId: 'cat-utilities', reminderDaysBefore: 3, isAutoDetected: true, isActive: true },
  { id: 'rec-04', householdId: 'hh-miller-01', accountId: 'acc-card-01', name: 'Streaming Subscriptions Bundle', type: 'bill', cadence: 'monthly', nextDate: '2026-09-10', expectedAmountCents: 3500, categoryId: 'cat-subs', reminderDaysBefore: 2, isAutoDetected: true, isActive: true },
];

export const INITIAL_RULES: TransactionRule[] = [
  { id: 'rule-01', householdId: 'hh-miller-01', name: 'Auto-categorize Whole Foods to Groceries', descriptionCondition: 'Whole Foods', targetCategoryId: 'cat-groceries', excludeFromReports: false, priority: 1, isActive: true, createdAt: '2026-01-20T00:00:00Z' },
  { id: 'rule-02', householdId: 'hh-miller-01', name: 'Auto-categorize Shell & Exxon to Gas', descriptionCondition: 'Shell', targetCategoryId: 'cat-auto', excludeFromReports: false, priority: 2, isActive: true, createdAt: '2026-01-20T00:00:00Z' },
  { id: 'rule-03', householdId: 'hh-miller-01', name: 'Salary Direct Deposit', descriptionCondition: 'Acme Corp', targetCategoryId: 'cat-salary', excludeFromReports: false, priority: 3, isActive: true, createdAt: '2026-01-20T00:00:00Z' },
];

export const INITIAL_TASKS: Task[] = [
  { id: 'task-001', householdId: 'hh-miller-01', title: 'Make Bed & Tidy Bedroom', description: 'Smooth the duvet, arrange pillows, put clothes away', icon: 'Bed', color: '#4FA3CD', starValue: 2, assignedProfileIds: ['prof-leo', 'prof-maya'], schedule: 'daily', requiresParentApproval: false, evidenceRequired: false, isArchived: false, createdAt: '2026-08-01T08:00:00Z' },
  { id: 'task-002', householdId: 'hh-miller-01', title: 'Feed & Walk Buddy the Dog', description: 'Morning food bowl and 15-min walk around the block', icon: 'Dog', color: '#0F766E', starValue: 3, assignedProfileIds: ['prof-leo'], schedule: 'daily', requiresParentApproval: true, evidenceRequired: false, isArchived: false, createdAt: '2026-08-01T08:00:00Z' },
  { id: 'task-003', householdId: 'hh-miller-01', title: 'Complete Math & Reading Homework', description: '30 mins of reading and math worksheet', icon: 'BookOpen', color: '#324154', starValue: 4, assignedProfileIds: ['prof-leo'], schedule: 'weekdays', requiresParentApproval: true, evidenceRequired: false, isArchived: false, createdAt: '2026-08-01T08:00:00Z' },
  { id: 'task-004', householdId: 'hh-miller-01', title: 'Put Away Toys & Craft Supplies', description: 'Clear play area before dinner time', icon: 'Sparkles', color: '#66AFD3', starValue: 2, assignedProfileIds: ['prof-maya'], schedule: 'daily', requiresParentApproval: false, evidenceRequired: false, isArchived: false, createdAt: '2026-08-01T08:00:00Z' },
  { id: 'task-005', householdId: 'hh-miller-01', title: 'Empty Dishwasher & Sort Cutlery', description: 'Carefully empty clean dishes with mom or dad', icon: 'CheckCircle2', color: '#B45309', starValue: 3, assignedProfileIds: ['prof-leo', 'prof-maya'], schedule: 'custom', requiresParentApproval: true, evidenceRequired: false, isArchived: false, createdAt: '2026-08-01T08:00:00Z' },
];

export const INITIAL_STAR_LEDGER: StarLedgerEntry[] = [
  { id: 'ledger-01', householdId: 'hh-miller-01', childProfileId: 'prof-leo', amount: 3, balanceAfter: 35, type: 'task_completed', reason: 'Completed: Feed & Walk Buddy', createdAt: '2026-08-18T09:00:00Z' },
  { id: 'ledger-02', householdId: 'hh-miller-01', childProfileId: 'prof-leo', amount: 4, balanceAfter: 39, type: 'task_completed', reason: 'Completed: Math & Reading Homework', createdAt: '2026-08-19T16:00:00Z' },
  { id: 'ledger-03', householdId: 'hh-miller-01', childProfileId: 'prof-leo', amount: 3, balanceAfter: 42, type: 'manual_award', reason: 'Helping neighbor with groceries', createdAt: '2026-08-20T11:00:00Z' },
  { id: 'ledger-04', householdId: 'hh-miller-01', childProfileId: 'prof-maya', amount: 2, balanceAfter: 26, type: 'task_completed', reason: 'Completed: Put Away Toys', createdAt: '2026-08-19T18:00:00Z' },
  { id: 'ledger-05', householdId: 'hh-miller-01', childProfileId: 'prof-maya', amount: 2, balanceAfter: 28, type: 'task_completed', reason: 'Completed: Make Bed', createdAt: '2026-08-20T08:30:00Z' },
];

export const INITIAL_REWARDS: Reward[] = [
  { id: 'rew-01', householdId: 'hh-miller-01', title: 'Friday Movie Night Pick', description: 'Choose the family movie and popcorn snack', starCost: 15, icon: 'Film', color: '#4FA3CD', isAvailable: true, assignedChildIds: ['prof-leo', 'prof-maya'], createdAt: '2026-08-01T00:00:00Z' },
  { id: 'rew-02', householdId: 'hh-miller-01', title: 'Ice Cream Trip with Dad', description: 'Visit the local scoop shop for a double cone', starCost: 25, icon: 'Gift', color: '#0F766E', isAvailable: true, assignedChildIds: ['prof-leo', 'prof-maya'], createdAt: '2026-08-01T00:00:00Z' },
  { id: 'rew-03', householdId: 'hh-miller-01', title: 'New Lego Space Set', description: 'Unlock the Mars Exploration kit', starCost: 50, icon: 'Rocket', color: '#324154', isAvailable: true, assignedChildIds: ['prof-leo'], createdAt: '2026-08-01T00:00:00Z' },
  { id: 'rew-04', householdId: 'hh-miller-01', title: 'Art & Paint Studio Kit', description: 'Deluxe watercolor and sketchbook set', starCost: 40, icon: 'Palette', color: '#66AFD3', isAvailable: true, assignedChildIds: ['prof-maya'], createdAt: '2026-08-01T00:00:00Z' },
];

export const INITIAL_REDEMPTIONS: RewardRedemption[] = [
  { id: 'red-01', householdId: 'hh-miller-01', rewardId: 'rew-01', childProfileId: 'prof-leo', starCost: 15, status: 'approved', requestedAt: '2026-08-15T18:00:00Z', reviewedAt: '2026-08-15T18:15:00Z', reviewNotes: 'Enjoyed Star Wars movie night!' },
];

export const INITIAL_GOALS: Goal[] = [
  { id: 'goal-01', householdId: 'hh-miller-01', profileId: 'prof-leo', title: 'New Mountain Bike', description: '24-inch green trail bike for neighborhood rides', goalType: 'reward_stars', icon: 'Bike', color: '#0F766E', targetStars: 80, currentStars: 42, deadline: '2026-10-31', status: 'active', createdAt: '2026-08-01T00:00:00Z', updatedAt: '2026-08-20T00:00:00Z' },
  { id: 'goal-02', householdId: 'hh-miller-01', profileId: 'prof-maya', title: 'Art Studio Desk Set', description: 'Wooden easel with color organizers', goalType: 'reward_stars', icon: 'Palette', color: '#4FA3CD', targetStars: 50, currentStars: 28, deadline: '2026-11-15', status: 'active', createdAt: '2026-08-01T00:00:00Z', updatedAt: '2026-08-20T00:00:00Z' },
  { id: 'goal-03', householdId: 'hh-miller-01', profileId: 'prof-sarah', title: 'Family Summer Cabin Fund', description: 'Week in Lake Tahoe with the kids', goalType: 'monetary_savings', icon: 'Compass', color: '#324154', targetAmountCents: 450000, currentAmountCents: 315000, deadline: '2027-06-01', status: 'active', createdAt: '2026-02-01T00:00:00Z', updatedAt: '2026-08-20T00:00:00Z' },
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'ev-01', householdId: 'hh-miller-01', title: 'Mortgage Payment Due ($2,450)', eventType: 'bill', date: '2026-09-01', amountCents: 245000, color: '#324154', assignedProfileIds: ['prof-sarah', 'prof-david'] },
  { id: 'ev-02', householdId: 'hh-miller-01', title: 'Acme Corp Payday (+$4,750)', eventType: 'income', date: '2026-09-03', amountCents: 475000, color: '#0F766E', assignedProfileIds: ['prof-sarah'] },
  { id: 'ev-03', householdId: 'hh-miller-01', title: 'Leo Soccer Practice & Snack Duty', eventType: 'household_event', date: '2026-08-22', startTime: '10:00', endTime: '11:30', color: '#4FA3CD', assignedProfileIds: ['prof-leo', 'prof-david'] },
  { id: 'ev-04', householdId: 'hh-miller-01', title: 'Dinner: Homemade Turkey Tacos & Guacamole', eventType: 'meal', date: '2026-08-21', mealType: 'dinner', color: '#B45309', assignedProfileIds: ['prof-sarah', 'prof-david', 'prof-leo', 'prof-maya'] },
  { id: 'ev-05', householdId: 'hh-miller-01', title: 'Maya Ballet Recital', eventType: 'household_event', date: '2026-08-23', startTime: '14:00', endTime: '15:30', color: '#66AFD3', assignedProfileIds: ['prof-maya', 'prof-sarah'] },
];

export const INITIAL_HOLDINGS: Holding[] = [
  { id: 'hld-01', accountId: 'acc-inv-01', symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', assetClass: 'etf', quantity: 280, costBasisCents: 5800000, currentPriceCents: 27500, currentValueCents: 7700000, gainLossCents: 1900000, lastUpdated: '2026-08-20T16:00:00Z' },
  { id: 'hld-02', accountId: 'acc-inv-01', symbol: 'VXUS', name: 'Vanguard Total International Stock ETF', assetClass: 'etf', quantity: 340, costBasisCents: 1800000, currentPriceCents: 6200, currentValueCents: 2108000, gainLossCents: 308000, lastUpdated: '2026-08-20T16:00:00Z' },
  { id: 'hld-03', accountId: 'acc-inv-01', symbol: 'BND', name: 'Vanguard Total Bond Market ETF', assetClass: 'bond', quantity: 420, costBasisCents: 3200000, currentPriceCents: 7240, currentValueCents: 3040800, gainLossCents: -159200, lastUpdated: '2026-08-20T16:00:00Z' },
];

export const INITIAL_CONTACTS: Contact[] = [
  { id: 'cnt-01', householdId: 'hh-miller-01', name: 'Grandma Eleanor Miller', relationship: 'Grandparent', email: 'eleanor.miller@example.com', phone: '(555) 234-8901', isHouseholdMember: false, notes: 'Available for emergency school pickup', createdAt: '2026-08-01T00:00:00Z' },
  { id: 'cnt-02', householdId: 'hh-miller-01', name: 'Marcus Vance (Financial Advisor)', relationship: 'Financial Planner', email: 'm.vance@vancewealth.com', phone: '(555) 912-3344', isHouseholdMember: false, notes: 'Quarterly review in November', createdAt: '2026-08-01T00:00:00Z' },
  { id: 'cnt-03', householdId: 'hh-miller-01', name: 'Dr. Emily Chen (Pediatrician)', relationship: 'Family Doctor', phone: '(555) 778-9012', isHouseholdMember: false, notes: 'Annual checkups in September', createdAt: '2026-08-01T00:00:00Z' },
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  { id: 'notif-01', householdId: 'hh-miller-01', title: 'Task Completed: Homework', message: 'Leo submitted "Complete Math & Reading Homework" for parent approval.', category: 'task', isRead: false, actionUrl: '/profiles/prof-leo', createdAt: '2026-08-20T17:00:00Z' },
  { id: 'notif-02', householdId: 'hh-miller-01', title: 'Upcoming Bill Reminder', message: 'Rocket Mortgage ($2,450.00) is due in 12 days.', category: 'bill', isRead: false, actionUrl: '/banking', createdAt: '2026-08-20T08:00:00Z' },
  { id: 'notif-03', householdId: 'hh-miller-01', title: 'Budget On Track', message: 'Your August groceries budget is at 62% utilization.', category: 'budget', isRead: true, actionUrl: '/budgeting', createdAt: '2026-08-19T09:00:00Z' },
];

export const INITIAL_NET_WORTH_HISTORY: NetWorthSnapshot[] = [
  { id: 'nw-1', householdId: 'hh-miller-01', date: '2026-03-01', totalAssetsCents: 71000000, totalLiabilitiesCents: 32000000, netWorthCents: 39000000 },
  { id: 'nw-2', householdId: 'hh-miller-01', date: '2026-04-01', totalAssetsCents: 71800000, totalLiabilitiesCents: 31800000, netWorthCents: 40000000 },
  { id: 'nw-3', householdId: 'hh-miller-01', date: '2026-05-01', totalAssetsCents: 72900000, totalLiabilitiesCents: 31600000, netWorthCents: 41300000 },
  { id: 'nw-4', householdId: 'hh-miller-01', date: '2026-06-01', totalAssetsCents: 73800000, totalLiabilitiesCents: 31400000, netWorthCents: 42400000 },
  { id: 'nw-5', householdId: 'hh-miller-01', date: '2026-07-01', totalAssetsCents: 74500000, totalLiabilitiesCents: 31200000, netWorthCents: 43300000 },
  { id: 'nw-6', householdId: 'hh-miller-01', date: '2026-08-01', totalAssetsCents: 74965020, totalLiabilitiesCents: 31224250, netWorthCents: 43740770 },
];
