// ==========================================================
// FIRSTSAVVY CORE DOMAIN TYPE DEFINITIONS
// All monetary values are represented as integer minor units (cents)
// All timestamps are ISO 8601 UTC strings
// ==========================================================

export type CurrencyCode = 'USD' | 'CAD' | 'GBP' | 'EUR' | 'AUD';

export type UserRole = 
  | 'owner' 
  | 'admin' 
  | 'adult' 
  | 'spouse' 
  | 'managed_adult' 
  | 'child' 
  | 'business';

export type ProfileType = 'personal' | 'child' | 'adult_family' | 'business';

export type RelationshipType = 
  | 'self'
  | 'spouse' 
  | 'partner' 
  | 'child' 
  | 'parent' 
  | 'sibling' 
  | 'dependent_adult' 
  | 'managed_finances' 
  | 'other';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Household {
  id: string;
  name: string;
  ownerId: string;
  currency: CurrencyCode;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export interface HouseholdMember {
  id: string;
  householdId: string;
  userId?: string;
  profileId: string;
  role: UserRole;
  joinedAt: string;
}

export interface ProfilePermissions {
  canViewBanking: boolean;
  canEditBanking: boolean;
  canViewBudgets: boolean;
  canEditBudgets: boolean;
  canViewNetWorth: boolean;
  canManageTasks: boolean;
  canApproveRedemptions: boolean;
  canInviteMembers: boolean;
}

export interface Profile {
  id: string;
  householdId: string;
  userId?: string;
  type: ProfileType;
  displayName: string;
  legalName?: string;
  relationship: RelationshipType;
  avatarColor: string;
  avatarIcon?: string;
  dateOfBirth?: string;
  gender?: string;
  privateNotes?: string;
  isChild: boolean;
  starBalance: number; // Computed from immutable star_ledger
  permissions: ProfilePermissions;
  createdAt: string;
  updatedAt: string;
}

export interface ParentalConsent {
  id: string;
  householdId: string;
  childProfileId: string;
  consentingAdultId: string;
  policyVersion: string;
  consentedAt: string;
  ipAddress?: string;
  purpose: string;
  isRevoked: boolean;
  revokedAt?: string;
}

export interface ChildCredentials {
  id: string;
  childProfileId: string;
  username: string;
  pinHash: string; // bcrypt/argon2 hash of 4-digit PIN
  recoveryEmail?: string;
  allowChildEmailLogin: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

// ----------------------------------------------------------
// Financial Entities
// ----------------------------------------------------------

export type AccountClass = 'asset' | 'liability';

export type AccountType = 
  | 'banking' 
  | 'savings'
  | 'credit_card'
  | 'vehicle' 
  | 'property' 
  | 'investments' 
  | 'crypto'
  | 'loans_debts';

export type AccountStatus = 'active' | 'archived' | 'disconnected';

export interface Account {
  id: string;
  householdId: string;
  ownerProfileId: string;
  name: string;
  accountClass: AccountClass;
  accountType: AccountType;
  institutionName: string;
  institutionLogo?: string;
  accountNumberMasked: string; // e.g. "•••• 4821"
  balanceCents: number; // Current verified balance in cents
  availableBalanceCents?: number;
  currency: CurrencyCode;
  isManual: boolean;
  plaidItemId?: string;
  plaidAccountId?: string;
  status: AccountStatus;
  includeInNetWorth: boolean;
  lastSyncedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type TransactionStatus = 'posted' | 'pending' | 'excluded';
export type PaymentMethod = 'ach' | 'card' | 'transfer' | 'check' | 'cash' | 'other';

export interface TransactionCategory {
  id: string;
  householdId: string;
  name: string;
  type: 'income' | 'expense';
  parentCategoryId?: string;
  icon: string;
  color: string;
  budgetAmountCents?: number;
  isSystem: boolean;
  includeInBudget: boolean;
}

export interface Transaction {
  id: string;
  householdId: string;
  accountId: string;
  profileId?: string;
  date: string; // YYYY-MM-DD
  description: string;
  merchantName?: string;
  fromTo?: string;
  amountCents: number; // positive = income/credit, negative = expense/debit
  categoryId: string;
  categoryName?: string;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  notes?: string;
  isRecurring: boolean;
  createdAt: string;
}

export interface TransactionRule {
  id: string;
  householdId: string;
  name: string;
  descriptionCondition?: string; // substring or regex match
  accountIdCondition?: string;
  minAmountCents?: number;
  maxAmountCents?: number;
  targetCategoryId: string;
  renameTo?: string;
  excludeFromReports: boolean;
  priority: number;
  isActive: boolean;
  createdAt: string;
}

export type RecurringCadence = 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'annually';

export interface RecurringItem {
  id: string;
  householdId: string;
  accountId: string;
  name: string;
  type: 'bill' | 'income';
  cadence: RecurringCadence;
  nextDate: string; // YYYY-MM-DD
  expectedAmountCents: number;
  categoryId: string;
  reminderDaysBefore: number;
  isAutoDetected: boolean;
  isActive: boolean;
}

export interface Budget {
  id: string;
  householdId: string;
  month: string; // YYYY-MM
  totalPlannedIncomeCents: number;
  totalPlannedExpenseCents: number;
  rolloverEnabled: boolean;
  createdAt: string;
  items: BudgetItem[];
}

export interface BudgetItem {
  id: string;
  budgetId: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  type: 'income' | 'expense';
  plannedCents: number;
  actualCents: number;
}

// ----------------------------------------------------------
// Family, Tasks, Stars & Goals Entities
// ----------------------------------------------------------

export type TaskSchedule = 
  | 'instant' 
  | 'daily' 
  | 'weekly' 
  | 'weekdays' 
  | 'weekends' 
  | 'custom' 
  | 'one_time';

export interface Task {
  id: string;
  householdId: string;
  title: string;
  description?: string;
  icon: string;
  color: string;
  starValue: number;
  assignedProfileIds: string[];
  schedule: TaskSchedule;
  dueDate?: string;
  requiresParentApproval: boolean;
  evidenceRequired: boolean;
  isArchived: boolean;
  createdAt: string;
}

export type TaskCompletionStatus = 'pending_approval' | 'approved' | 'rejected';

export interface TaskCompletion {
  id: string;
  taskId: string;
  householdId: string;
  childProfileId: string;
  completedDate: string; // YYYY-MM-DD
  status: TaskCompletionStatus;
  completionNote?: string;
  photoUrl?: string;
  submittedAt: string;
  approvedAt?: string;
  approvedByAdultId?: string;
  rejectionReason?: string;
}

export type StarLedgerType = 
  | 'task_completed' 
  | 'manual_award' 
  | 'manual_deduction' 
  | 'reward_redeemed' 
  | 'goal_allocated';

export interface StarLedgerEntry {
  id: string;
  householdId: string;
  childProfileId: string;
  amount: number; // positive or negative
  balanceAfter: number;
  type: StarLedgerType;
  referenceId?: string; // task_id or reward_id
  reason: string;
  createdByAdultId?: string;
  createdAt: string;
}

export interface Reward {
  id: string;
  householdId: string;
  title: string;
  description?: string;
  starCost: number;
  icon: string;
  color: string;
  isAvailable: boolean;
  assignedChildIds: string[];
  createdAt: string;
}

export type RedemptionStatus = 'pending' | 'approved' | 'fulfilled' | 'rejected';

export interface RewardRedemption {
  id: string;
  householdId: string;
  rewardId: string;
  childProfileId: string;
  starCost: number;
  status: RedemptionStatus;
  requestedAt: string;
  reviewedAt?: string;
  reviewedByAdultId?: string;
  reviewNotes?: string;
}

export type GoalType = 'reward_stars' | 'monetary_savings';
export type GoalStatus = 'active' | 'completed' | 'paused' | 'archived';

export interface Goal {
  id: string;
  householdId: string;
  profileId: string; // Child or adult profile
  title: string;
  description?: string;
  goalType: GoalType;
  icon: string;
  color: string;
  targetStars?: number;
  currentStars?: number;
  targetAmountCents?: number;
  currentAmountCents?: number;
  deadline?: string;
  status: GoalStatus;
  createdAt: string;
  updatedAt: string;
}

export interface GoalContribution {
  id: string;
  goalId: string;
  profileId: string;
  amountCents?: number;
  stars?: number;
  note?: string;
  createdAt: string;
}

// ----------------------------------------------------------
// Calendar & Meal Planning
// ----------------------------------------------------------

export type CalendarEventType = 
  | 'bill' 
  | 'income' 
  | 'recurring' 
  | 'reminder' 
  | 'household_event' 
  | 'assigned_task' 
  | 'meal';

export interface CalendarEvent {
  id: string;
  householdId: string;
  title: string;
  eventType: CalendarEventType;
  date: string; // YYYY-MM-DD
  startTime?: string;
  endTime?: string;
  assignedProfileIds: string[];
  amountCents?: number;
  color?: string;
  notes?: string;
  mealType?: 'breakfast' | 'lunch' | 'dinner';
}

// ----------------------------------------------------------
// Net Worth & Investments
// ----------------------------------------------------------

export interface NetWorthSnapshot {
  id: string;
  householdId: string;
  date: string; // YYYY-MM-DD
  totalAssetsCents: number;
  totalLiabilitiesCents: number;
  netWorthCents: number;
}

export interface Holding {
  id: string;
  accountId: string;
  symbol: string;
  name: string;
  assetClass: 'stock' | 'etf' | 'crypto' | 'mutual_fund' | 'bond' | 'other';
  quantity: number;
  costBasisCents: number;
  currentPriceCents: number;
  currentValueCents: number;
  gainLossCents: number;
  lastUpdated: string;
}

// ----------------------------------------------------------
// Contacts, Notifications & System
// ----------------------------------------------------------

export interface Contact {
  id: string;
  householdId: string;
  name: string;
  relationship: RelationshipType | string;
  email?: string;
  phone?: string;
  isHouseholdMember: boolean;
  notes?: string;
  createdAt: string;
}

export type NotificationCategory = 
  | 'task' 
  | 'reward' 
  | 'bill' 
  | 'budget' 
  | 'account' 
  | 'invitation' 
  | 'security';

export interface AppNotification {
  id: string;
  householdId: string;
  targetProfileId?: string;
  title: string;
  message: string;
  category: NotificationCategory;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  category: 'feature_updates' | 'family' | 'business' | 'estate_planning';
  consentGiven: boolean;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  category: 'support' | 'partnerships' | 'privacy' | 'general';
  message: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  householdId: string;
  actorProfileId?: string;
  action: string;
  entityType: string;
  entityId: string;
  details?: Record<string, any>;
  createdAt: string;
}
