# 🧠 GuardLens MVP — Product Requirements Document (Supabase Edition)
**Version:** 0.2  
**Focus:** Small remote teams (10–200 people) using **Google Workspace** + **Slack**  
**Goal of MVP:** Detect a few high-value risks and push clear Slack alerts.

---

## 1. System Architecture (MVP)

- **Frontend:** Next.js (React + Tailwind)
- **Backend:** **Supabase** (Postgres + Auth + RLS + pg_net + pg_cron + Realtime)
- **Integrations:**
  - **Google Workspace Admin SDK** (audit/login events, 2FA status)
  - **Slack Incoming Webhooks** (alerts)
- **Processing Model:**  
  Rule-based anomaly detection in the database (SQL/PLpgSQL) + scheduled jobs via **pg_cron**.  
  **pg_net** posts directly to Slack (no separate server needed).
- **Multi-tenant:** Per-org isolation with **RLS** keyed by `org_id`.

---

## 2. Core MVP Scope (Feature Cut)

1. **Google Workspace ingest (read-only)**  
   - Pull recent login events + user 2FA state.  
   - Store minimal normalized records.

2. **Rule-based anomaly detection (v1)**  
   - New country login for a user  
   - New device for a user  
   - >5 failed logins in 10 minutes  
   - User without 2FA

3. **Slack alerts**  
   - Clear, human-readable messages with context.  
   - Link back to a minimal dashboard “Acknowledge / Resolve.”

4. **Dashboard**  
   - Users list + open alerts + “Security Score” per org.  
   - Simple filter: by user, by risk.

---

## 3. Supabase Setup

### 3.1 Enable Extensions
```sql
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "pg_net";
create extension if not exists "pg_cron";