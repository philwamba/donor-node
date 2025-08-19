# Donor Node · Recurring Bitcoin Donation Platform

A production-ready Next.js + Node.js + TypeScript platform that lets nonprofits and creators run **recurring Bitcoin donations** with accurate accounting, reliable webhooks, and professional testing. Uses Postgres for durable state and BullMQ for background jobs. Runs free locally with Docker (Postgres + Redis) and public APIs (mempool.space, CoinGecko). An optional Bitcoin Core RPC adapter is available behind a feature flag.

---

## Why Donor Node

- Recurring pledges that auto-generate Bitcoin invoices.
- Per-invoice Taproot (BIP86) addresses.
- Mempool tracking and confirmation handling.
- Double-entry ledger in Postgres.
- HMAC-signed webhooks with retries and dead-letter queues.
- Strict integer money handling (sats only) and audited FX snapshots.
- CI-grade tests (unit, integration, contract).

---

## Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS.
- **Backend**: Node.js 20+, TypeScript, Next.js Route Handlers (or Fastify adapter), Zod.
- **Database**: Postgres 15+ with Drizzle ORM (or Prisma). Raw SQL where appropriate.
- **Queues**: BullMQ + Redis.
- **Bitcoin**: mempool.space and CoinGecko for MVP. Optional Bitcoin Core RPC.
- **Testing**: Vitest or Jest, Supertest, Testcontainers, Pact.

## Getting started

This project uses a Postgres database and Redis for background jobs.  Follow these steps to get the application running locally:

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create your `.env` file**

   Copy the provided `.env.example` to `.env` and set the environment variables for your database and Redis connection strings.

3. **Start supporting services**

   Start Postgres and Redis using the provided Docker Compose file:

   ```bash
   docker-compose -f docker/docker-compose.dev.yml up -d
   ```

4. **Run database migrations**

   This scaffold includes Drizzle configuration for the database, but migrations are not implemented.  Add your own migration scripts and run them as needed.

5. **Seed sample data (optional)**

   A sample seed script is provided in `scripts/seed.ts`.  Run it with:

   ```bash
   node --loader tsx scripts/seed.ts
   ```

6. **Start the web app**

   ```bash
   cd apps/web
   npm run dev
   ```

   Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Repository structure

```
donor-node/
├─ .github/workflows/           GitHub Actions workflows for CI and releases
├─ apps/
│  └─ web/                      Next.js App Router application
│     ├─ app/                   Routes, layout and API handlers
│     ├─ components/            Reusable React components (PledgeForm, InvoiceCard, etc.)
│     ├─ lib/                   Client‑side helpers (API client, auth)
│     └─ package.json           Package configuration for the frontend
├─ packages/
│  ├─ db/                       Drizzle ORM config and database schema definitions
│  ├─ core/                     Business logic and domain services (scheduling, money, bitcoin)
│  ├─ jobs/                     Background workers for invoices, confirmations, etc.
│  ├─ adapters/                 External service adapters (HTTP APIs, bitcoin core, Redis)
│  └─ shared/                   Shared configuration, error classes and types
├─ tests/                       Placeholder unit/integration/contract tests
├─ docker/                      Development Docker Compose file for Postgres and Redis
├─ scripts/                     Helper scripts (dev‑up, seed, ci‑db‑wait)
├─ .env.example                 Example environment variables
├─ package.json                 Monorepo workspace configuration
├─ turbo.json                   Turbo Repo build configuration
├─ tsconfig.json                TypeScript compiler configuration
├─ eslint.config.js             ESLint configuration
├─ .prettierrc                  Prettier configuration
├─ .commitlintrc.cjs            Commitlint configuration
└─ README.md                    This file
```

## Contributing

- Fork and clone the repository.
- Create a feature branch.
- Run tests and lint before opening a pull request.
- Conventional commits are recommended.