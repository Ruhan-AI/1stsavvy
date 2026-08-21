// ==========================================================
// FIRSTSAVVY PLAID SANDBOX ADAPTER
// Safe sandbox mode for local development, demo, and QA testing
// ==========================================================

export interface PlaidInstitution {
  id: string;
  name: string;
  logo: string;
  color: string;
  products: string[];
}

export const PLAID_SANDBOX_INSTITUTIONS: PlaidInstitution[] = [
  {
    id: 'ins_109508',
    name: 'Chase Bank (Sandbox)',
    logo: 'Landmark',
    color: '#117ACA',
    products: ['auth', 'transactions', 'investments'],
  },
  {
    id: 'ins_109509',
    name: 'Bank of America (Sandbox)',
    logo: 'Building2',
    color: '#E31837',
    products: ['auth', 'transactions'],
  },
  {
    id: 'ins_109510',
    name: 'Wells Fargo (Sandbox)',
    logo: 'Landmark',
    color: '#D71E28',
    products: ['auth', 'transactions'],
  },
  {
    id: 'ins_109511',
    name: 'Vanguard (Sandbox)',
    logo: 'TrendingUp',
    color: '#96151D',
    products: ['investments', 'holdings'],
  },
  {
    id: 'ins_109512',
    name: 'Fidelity Investments (Sandbox)',
    logo: 'ShieldCheck',
    color: '#4B7B34',
    products: ['investments', 'holdings'],
  },
];

export interface PlaidSandboxAccount {
  id: string;
  name: string;
  mask: string;
  type: 'depository' | 'credit' | 'investment' | 'loan';
  subtype: 'checking' | 'savings' | 'credit card' | '401k' | 'ira' | 'mortgage';
  balanceCents: number;
}

export const PLAID_MOCK_ACCOUNTS: Record<string, PlaidSandboxAccount[]> = {
  ins_109508: [
    { id: 'plaid-chk-1', name: 'Total Checking', mask: '3341', type: 'depository', subtype: 'checking', balanceCents: 425000 },
    { id: 'plaid-sav-1', name: 'Premier Savings', mask: '8821', type: 'depository', subtype: 'savings', balanceCents: 1850000 },
  ],
  ins_109509: [
    { id: 'plaid-chk-2', name: 'Advantage Checking', mask: '5512', type: 'depository', subtype: 'checking', balanceCents: 312050 },
    { id: 'plaid-cc-1', name: 'Cash Rewards Card', mask: '9920', type: 'credit', subtype: 'credit card', balanceCents: -74000 },
  ],
  ins_109511: [
    { id: 'plaid-inv-1', name: 'Traditional IRA', mask: '7741', type: 'investment', subtype: 'ira', balanceCents: 6450000 },
  ],
};
