# First Savvy Production Deployment Guide

This guide outlines deployment steps for both the public marketing domain (`1stsavvy.com`) and the authenticated application subdomain (`app.firstsavvy.com`).

## 1. Domain Configuration

1. **Marketing Website (`https://1stsavvy.com`)**:
   - Set up root domain DNS records pointing to Vercel/Cloudflare.
   - Configure `https://www.1stsavvy.com` with a permanent 301 redirect to `https://1stsavvy.com`.
2. **Authenticated App (`https://app.firstsavvy.com`)**:
   - Point the `app` CNAME to your production application cluster.
   - Configure session cookies with `domain=.firstsavvy.com` for cross-subdomain authentication.

## 2. Environment Variables

Create your production `.env` using `.env.example` as a template:

```bash
# Public App URLs
NEXT_PUBLIC_APP_URL=https://app.firstsavvy.com
NEXT_PUBLIC_MARKETING_URL=https://1stsavvy.com

# Database (Supabase / PostgreSQL)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Plaid Aggregator (Sandbox / Production)
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox

# Transactional Email (Resend / Postmark)
RESEND_API_KEY=re_your_api_key
```

## 3. Database Migrations

Apply SQL migrations against your Supabase or PostgreSQL database:

```bash
# Using Supabase CLI
supabase db push

# Or run the migration SQL file directly:
psql -h your-db-host -U postgres -d postgres -f supabase/migrations/20260821000000_firstsavvy_initial_schema.sql
```

## 4. Build and Run Commands

```bash
# Install dependencies
npm.cmd install

# Run unit tests
npm.cmd test

# Build production bundle
npm.cmd run build

# Start production server
npm.cmd run start
```
