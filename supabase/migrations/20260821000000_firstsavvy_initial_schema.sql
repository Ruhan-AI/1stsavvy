-- ==========================================================
-- FIRSTSAVVY FULL PRODUCTION POSTGRESQL SCHEMA & RLS MIGRATION
-- Multi-tenant Family Financial Education & Personal Finance
-- All money stored as integer minor units (cents)
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    avatar_url TEXT,
    is_email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. HOUSEHOLDS TABLE
CREATE TABLE IF NOT EXISTS public.households (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    timezone TEXT NOT NULL DEFAULT 'America/New_York',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN ('personal', 'child', 'adult_family', 'business')),
    display_name TEXT NOT NULL,
    legal_name TEXT,
    relationship VARCHAR(30) NOT NULL DEFAULT 'other',
    avatar_color VARCHAR(20) NOT NULL DEFAULT '#4FA3CD',
    avatar_icon TEXT,
    date_of_birth DATE,
    gender TEXT,
    private_notes TEXT,
    is_child BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. HOUSEHOLD MEMBERSHIPS TABLE
CREATE TABLE IF NOT EXISTS public.household_memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role VARCHAR(30) NOT NULL CHECK (role IN ('owner', 'admin', 'adult', 'spouse', 'managed_adult', 'child', 'business')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(household_id, profile_id)
);

-- 5. PROFILE PERMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.profile_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    can_view_banking BOOLEAN NOT NULL DEFAULT TRUE,
    can_edit_banking BOOLEAN NOT NULL DEFAULT FALSE,
    can_view_budgets BOOLEAN NOT NULL DEFAULT TRUE,
    can_edit_budgets BOOLEAN NOT NULL DEFAULT FALSE,
    can_view_net_worth BOOLEAN NOT NULL DEFAULT TRUE,
    can_manage_tasks BOOLEAN NOT NULL DEFAULT FALSE,
    can_approve_redemptions BOOLEAN NOT NULL DEFAULT FALSE,
    can_invite_members BOOLEAN NOT NULL DEFAULT FALSE
);

-- 6. CHILD CREDENTIALS TABLE (COPPA SAFE: Store only hashed PIN/Password)
CREATE TABLE IF NOT EXISTS public.child_credentials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    username VARCHAR(50) NOT NULL UNIQUE,
    pin_hash TEXT NOT NULL,
    recovery_email TEXT,
    allow_child_email_login BOOLEAN NOT NULL DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. PARENTAL CONSENTS TABLE (COPPA AUDIT TRAIL)
CREATE TABLE IF NOT EXISTS public.parental_consents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    child_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    consenting_adult_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    policy_version VARCHAR(20) NOT NULL,
    purpose TEXT NOT NULL,
    ip_address TEXT,
    consented_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
    revoked_at TIMESTAMPTZ
);

-- 8. INVITATIONS TABLE
CREATE TABLE IF NOT EXISTS public.invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    inviter_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role VARCHAR(30) NOT NULL,
    token TEXT UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. ACCOUNTS TABLE
CREATE TABLE IF NOT EXISTS public.accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    owner_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    account_class VARCHAR(20) NOT NULL CHECK (account_class IN ('asset', 'liability')),
    account_type VARCHAR(30) NOT NULL CHECK (account_type IN ('banking', 'savings', 'credit_card', 'vehicle', 'property', 'investments', 'crypto', 'loans_debts')),
    institution_name TEXT NOT NULL,
    institution_logo TEXT,
    account_number_masked VARCHAR(20) NOT NULL DEFAULT '••••',
    balance_cents BIGINT NOT NULL DEFAULT 0,
    available_balance_cents BIGINT,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    is_manual BOOLEAN NOT NULL DEFAULT TRUE,
    plaid_item_id TEXT,
    plaid_account_id TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'disconnected')),
    include_in_net_worth BOOLEAN NOT NULL DEFAULT TRUE,
    last_synced_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. PLAID ITEMS / ACCOUNT CONNECTIONS
CREATE TABLE IF NOT EXISTS public.plaid_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    item_id TEXT UNIQUE NOT NULL,
    access_token_encrypted TEXT NOT NULL,
    institution_id TEXT NOT NULL,
    institution_name TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'good',
    last_successful_sync TIMESTAMPTZ,
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. TRANSACTION CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.transaction_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    parent_category_id UUID REFERENCES public.transaction_categories(id) ON DELETE SET NULL,
    icon TEXT NOT NULL DEFAULT 'Tag',
    color TEXT NOT NULL DEFAULT '#4FA3CD',
    budget_amount_cents BIGINT,
    is_system BOOLEAN NOT NULL DEFAULT FALSE,
    include_in_budget BOOLEAN NOT NULL DEFAULT TRUE
);

-- 12. TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    merchant_name TEXT,
    from_to TEXT,
    amount_cents BIGINT NOT NULL, -- positive = income, negative = expense
    category_id UUID REFERENCES public.transaction_categories(id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'posted' CHECK (status IN ('posted', 'pending', 'excluded')),
    payment_method VARCHAR(20) NOT NULL DEFAULT 'card',
    notes TEXT,
    is_recurring BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. TRANSACTION RULES TABLE
CREATE TABLE IF NOT EXISTS public.transaction_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description_condition TEXT,
    account_id_condition UUID REFERENCES public.accounts(id) ON DELETE CASCADE,
    min_amount_cents BIGINT,
    max_amount_cents BIGINT,
    target_category_id UUID NOT NULL REFERENCES public.transaction_categories(id) ON DELETE CASCADE,
    rename_to TEXT,
    exclude_from_reports BOOLEAN NOT NULL DEFAULT FALSE,
    priority INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. RECURRING ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.recurring_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('bill', 'income')),
    cadence VARCHAR(20) NOT NULL CHECK (cadence IN ('weekly', 'biweekly', 'monthly', 'quarterly', 'annually')),
    next_date DATE NOT NULL,
    expected_amount_cents BIGINT NOT NULL,
    category_id UUID REFERENCES public.transaction_categories(id) ON DELETE SET NULL,
    reminder_days_before INT NOT NULL DEFAULT 3,
    is_auto_detected BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- 15. BUDGETS TABLE
CREATE TABLE IF NOT EXISTS public.budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    month VARCHAR(7) NOT NULL, -- YYYY-MM
    total_planned_income_cents BIGINT NOT NULL DEFAULT 0,
    total_planned_expense_cents BIGINT NOT NULL DEFAULT 0,
    rollover_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(household_id, month)
);

-- 16. BUDGET ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.budget_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    budget_id UUID NOT NULL REFERENCES public.budgets(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.transaction_categories(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    planned_cents BIGINT NOT NULL DEFAULT 0,
    actual_cents BIGINT NOT NULL DEFAULT 0,
    UNIQUE(budget_id, category_id)
);

-- 17. TASKS TABLE
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT NOT NULL DEFAULT 'Sparkles',
    color TEXT NOT NULL DEFAULT '#4FA3CD',
    star_value INT NOT NULL DEFAULT 1,
    schedule VARCHAR(20) NOT NULL DEFAULT 'daily' CHECK (schedule IN ('instant', 'daily', 'weekly', 'weekdays', 'weekends', 'custom', 'one_time')),
    due_date DATE,
    requires_parent_approval BOOLEAN NOT NULL DEFAULT TRUE,
    evidence_required BOOLEAN NOT NULL DEFAULT FALSE,
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 18. TASK ASSIGNMENTS TABLE
CREATE TABLE IF NOT EXISTS public.task_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
    child_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    UNIQUE(task_id, child_profile_id)
);

-- 19. TASK COMPLETIONS TABLE
CREATE TABLE IF NOT EXISTS public.task_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    child_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    completed_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending_approval' CHECK (status IN ('pending_approval', 'approved', 'rejected')),
    completion_note TEXT,
    photo_url TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    approved_at TIMESTAMPTZ,
    approved_by_adult_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    rejection_reason TEXT
);

-- 20. STAR LEDGER TABLE (IMMUTABLE AUDIT LEDGER)
CREATE TABLE IF NOT EXISTS public.star_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    child_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount INT NOT NULL, -- can be positive or negative
    balance_after INT NOT NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN ('task_completed', 'manual_award', 'manual_deduction', 'reward_redeemed', 'goal_allocated')),
    reference_id UUID,
    reason TEXT NOT NULL,
    created_by_adult_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 21. REWARDS TABLE
CREATE TABLE IF NOT EXISTS public.rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    star_cost INT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Gift',
    color TEXT NOT NULL DEFAULT '#66AFD3',
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 22. REWARD REDEMPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.reward_redemptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    reward_id UUID NOT NULL REFERENCES public.rewards(id) ON DELETE CASCADE,
    child_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    star_cost INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'fulfilled', 'rejected')),
    requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    reviewed_by_adult_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    review_notes TEXT
);

-- 23. GOALS TABLE
CREATE TABLE IF NOT EXISTS public.goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    goal_type VARCHAR(30) NOT NULL CHECK (goal_type IN ('reward_stars', 'monetary_savings')),
    icon TEXT NOT NULL DEFAULT 'Target',
    color TEXT NOT NULL DEFAULT '#4FA3CD',
    target_stars INT,
    current_stars INT DEFAULT 0,
    target_amount_cents BIGINT,
    current_amount_cents BIGINT DEFAULT 0,
    deadline DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 24. GOAL CONTRIBUTIONS TABLE
CREATE TABLE IF NOT EXISTS public.goal_contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    goal_id UUID NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount_cents BIGINT,
    stars INT,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 25. CALENDAR EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.calendar_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    event_type VARCHAR(30) NOT NULL CHECK (event_type IN ('bill', 'income', 'recurring', 'reminder', 'household_event', 'assigned_task', 'meal')),
    date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    amount_cents BIGINT,
    color TEXT DEFAULT '#4FA3CD',
    notes TEXT,
    meal_type VARCHAR(20) CHECK (meal_type IN ('breakfast', 'lunch', 'dinner'))
);

-- 26. EVENT ASSIGNMENTS TABLE
CREATE TABLE IF NOT EXISTS public.event_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES public.calendar_events(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    UNIQUE(event_id, profile_id)
);

-- 27. CONTACTS TABLE
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    relationship TEXT NOT NULL DEFAULT 'Family',
    email TEXT,
    phone TEXT,
    is_household_member BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 28. NET WORTH SNAPSHOTS TABLE
CREATE TABLE IF NOT EXISTS public.net_worth_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    total_assets_cents BIGINT NOT NULL,
    total_liabilities_cents BIGINT NOT NULL,
    net_worth_cents BIGINT NOT NULL,
    UNIQUE(household_id, date)
);

-- 29. INVESTMENT HOLDINGS TABLE
CREATE TABLE IF NOT EXISTS public.holdings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
    symbol VARCHAR(20) NOT NULL,
    name TEXT NOT NULL,
    asset_class VARCHAR(30) NOT NULL DEFAULT 'stock',
    quantity NUMERIC(16, 6) NOT NULL DEFAULT 0,
    cost_basis_cents BIGINT NOT NULL DEFAULT 0,
    current_price_cents BIGINT NOT NULL DEFAULT 0,
    current_value_cents BIGINT NOT NULL DEFAULT 0,
    gain_loss_cents BIGINT NOT NULL DEFAULT 0,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 30. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    target_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    category VARCHAR(30) NOT NULL DEFAULT 'general',
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 31. WAITLIST ENTRIES TABLE
CREATE TABLE IF NOT EXISTS public.waitlist_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    category VARCHAR(30) NOT NULL DEFAULT 'feature_updates',
    consent_given BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 32. CONTACT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    category VARCHAR(30) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 33. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID REFERENCES public.households(id) ON DELETE CASCADE,
    actor_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 34. DATA EXPORT REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.data_export_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    requesting_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    target_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'completed',
    download_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 35. DELETION REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.deletion_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    requesting_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    target_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    wipe_mode VARCHAR(20) NOT NULL CHECK (wipe_mode IN ('complete_wipe', 'anonymize')),
    status VARCHAR(20) NOT NULL DEFAULT 'completed',
    executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==========================================================
CREATE INDEX IF NOT EXISTS idx_profiles_household ON public.profiles(household_id);
CREATE INDEX IF NOT EXISTS idx_accounts_household ON public.accounts(household_id);
CREATE INDEX IF NOT EXISTS idx_transactions_household_date ON public.transactions(household_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_account ON public.transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_star_ledger_child ON public.star_ledger(child_profile_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tasks_household ON public.tasks(household_id);
CREATE INDEX IF NOT EXISTS idx_goals_profile ON public.goals(profile_id);
CREATE INDEX IF NOT EXISTS idx_calendar_household_date ON public.calendar_events(household_id, date);
CREATE INDEX IF NOT EXISTS idx_notifications_profile ON public.notifications(target_profile_id, is_read);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict boundary isolation per household and child role
-- ==========================================================
ALTER TABLE public.households ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.star_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Helper function to check if auth.uid() belongs to the household
CREATE OR REPLACE FUNCTION public.is_household_member(h_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.household_memberships hm
    WHERE hm.household_id = h_id AND hm.user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if auth.uid() is an adult admin
CREATE OR REPLACE FUNCTION public.is_household_adult(h_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.household_memberships hm
    WHERE hm.household_id = h_id AND hm.user_id = auth.uid() AND hm.role IN ('owner', 'admin', 'adult', 'spouse')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Household RLS
CREATE POLICY "Household members can view their household"
  ON public.households FOR SELECT
  USING (public.is_household_member(id));

-- Profiles RLS
CREATE POLICY "Household members can view profiles in their household"
  ON public.profiles FOR SELECT
  USING (public.is_household_member(household_id));

CREATE POLICY "Adults can manage profiles in their household"
  ON public.profiles FOR ALL
  USING (public.is_household_adult(household_id));

-- Accounts RLS (Adults only - Children CANNOT view adult banking)
CREATE POLICY "Adults can view and manage financial accounts"
  ON public.accounts FOR ALL
  USING (public.is_household_adult(household_id));

-- Transactions RLS (Adults only)
CREATE POLICY "Adults can view and manage transactions"
  ON public.transactions FOR ALL
  USING (public.is_household_adult(household_id));

-- Tasks RLS (All members can view tasks in household, adults can insert/update)
CREATE POLICY "Household members can view tasks"
  ON public.tasks FOR SELECT
  USING (public.is_household_member(household_id));

CREATE POLICY "Adults can manage tasks"
  ON public.tasks FOR ALL
  USING (public.is_household_adult(household_id));

-- Star Ledger RLS (All members can view their ledger, only adults/system can write)
CREATE POLICY "Members can view star ledger"
  ON public.star_ledger FOR SELECT
  USING (public.is_household_member(household_id));

CREATE POLICY "Adults can write star ledger entries"
  ON public.star_ledger FOR INSERT
  WITH CHECK (public.is_household_adult(household_id));
