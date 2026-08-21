# FirstSavvy Data Model & Schema Reference

FirstSavvy uses a strongly typed PostgreSQL schema with 37+ entities, strict foreign key constraints, indexes, and Row Level Security (RLS) policies.

## 1. Core Principles

- **Integer Cents Representation**: All monetary balances, transaction amounts, budgets, and valuations are stored as integer minor units (cents) to eliminate floating-point rounding errors.
- **Immutable Star Ledger**: Child star balances are computed from an immutable append-only ledger (`star_ledger`), recording every award, deduction, and redemption with an audit reason.
- **COPPA Parental Consent Audit**: Child profile creation requires a recorded parental consent entry (`parental_consents`) capturing the consenting adult, timestamp, and policy version.

## 2. Core Entities

1. `users` (id, email, first_name, last_name, is_email_verified)
2. `households` (id, name, owner_id, currency, timezone)
3. `profiles` (id, household_id, type, display_name, relationship, avatar_color, is_child)
4. `household_memberships` (household_id, profile_id, role)
5. `profile_permissions` (can_view_banking, can_edit_budgets, can_manage_tasks, etc.)
6. `child_credentials` (child_profile_id, username, pin_hash)
7. `parental_consents` (child_profile_id, consenting_adult_id, policy_version, consented_at)
8. `accounts` (id, household_id, name, account_class, account_type, balance_cents, include_in_net_worth)
9. `transactions` (id, account_id, date, description, amount_cents, category_id, status)
10. `transaction_categories` (id, name, type, budget_amount_cents, icon, color)
11. `transaction_rules` (id, description_condition, target_category_id, priority, is_active)
12. `recurring_items` (id, name, type, cadence, next_date, expected_amount_cents)
13. `budgets` & `budget_items` (month, planned_cents, actual_cents)
14. `tasks` & `task_assignments` (title, star_value, schedule, requires_parent_approval)
15. `star_ledger` (child_profile_id, amount, balance_after, type, reason)
16. `rewards` & `reward_redemptions` (title, star_cost, status)
17. `goals` & `goal_contributions` (title, goal_type, target_stars, target_amount_cents)
18. `calendar_events` (date, event_type, amount_cents, meal_type)
19. `contacts` (name, relationship, email, phone)
20. `holdings` (symbol, name, quantity, cost_basis_cents, current_value_cents, gain_loss_cents)
21. `notifications` (title, message, category, is_read, action_url)
22. `waitlist_entries` (email, category, consent_given)
23. `audit_logs` (actor_profile_id, action, entity_type, details)
