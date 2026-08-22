# First Savvy Security & Child Privacy Architecture

Security, financial privacy, and child data protection are fundamental architectural pillars of the First Savvy platform.

## 1. Child Data Protection & COPPA Compliance

- **No Independent Child Signups**: Children cannot create accounts independently. All child profiles must be created by an authenticated parent or legal guardian.
- **Mandatory Unchecked Parental Consent**: The Add Profile wizard requires explicit agreement to the COPPA consent notice before a child record is committed to the database.
- **Hashed 4-Digit PINs**: Raw PINs are never stored in plaintext and cannot be viewed by First Savvy staff. Only strong cryptographic hashes are stored. Parents can overwrite or reset PINs at any time.
- **Strict Role & Sandbox Isolation**: Children are strictly restricted to assigned tasks, star history, and savings goals. Children CANNOT view adult banking accounts, transactions, budgets, documents, or household net worth.
- **Right to Erase / Anonymize**: Parents can choose between a complete hard wipe or anonymization when deleting a child profile.

## 2. Financial Security & Credentials

- **Plaid Tokenized Access**: First Savvy never sees, handles, or stores banking passwords. Connectivity is handled via tokenized read-only aggregator links.
- **Masked Account Numbers**: Financial account numbers are always masked (e.g. `•••• 4812`).
- **No Floating-Point Arithmetic**: Integer cents prevent precision loss in ledger and balance calculations.
- **Immutable Audit Trail**: All star transactions and profile modifications are recorded in immutable logs.
