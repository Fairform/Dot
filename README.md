# DOT Mobile

Australia's eSIM-only mobile carrier. Built with Next.js 14, TypeScript, Tailwind CSS, Stripe, Supabase.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS (bespoke design system) |
| Database | Supabase (Sydney region) |
| Payments | Stripe Subscriptions |
| Email | Resend |
| Identity verification | Veriff |
| Network / MVNE | Telcoinabox / PWN |
| Analytics | Plausible |
| Hosting | Vercel |

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Fill in all values in .env.local

# 3. Set up Supabase
# Create a project at supabase.com (select Sydney / ap-southeast-2)
# Run supabase/schema.sql in the SQL editor

# 4. Build the support search index
npx tsx lib/support/buildSearchIndex.ts

# 5. Run dev server
npm run dev
```

---

## Environment variables

See `.env.example` for all required variables. The critical ones:

```
STRIPE_SECRET_KEY          Stripe secret key
STRIPE_WEBHOOK_SECRET      Stripe webhook signing secret
STRIPE_PRICE_STARTER       Stripe Price ID for Starter plan
STRIPE_PRICE_CORE          Stripe Price ID for Core plan
STRIPE_PRICE_UNLIMITED     Stripe Price ID for Unlimited plan
STRIPE_PRICE_ULTRA         Stripe Price ID for Ultra plan

NEXT_PUBLIC_SUPABASE_URL        Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY   Supabase anon key
SUPABASE_SERVICE_ROLE_KEY       Supabase service role key (server only)

TELCOINABOX_API_URL        MVNE API base URL
TELCOINABOX_API_KEY        MVNE API key

RESEND_API_KEY             Resend API key
NEXT_PUBLIC_APP_URL        Production URL (https://dotmobile.com.au)
```

---

## Project structure

```
app/
  (marketing)/     — Public marketing pages (homepage, plans, support, legal)
  (checkout)/      — Checkout and activation success
  (account)/       — Account portal (scaffold — build after auth)
  api/             — Server-side API routes

components/
  layout/          — SiteHeader, SiteFooter, CheckoutHeader
  navigation/      — MobileMenu, Breadcrumbs
  support/         — SupportSearch, SupportCategoryCard, RelatedArticles, etc.
  plans/           — PlanCard, PlanComparisonTable
  homepage/        — HomepageFAQ and other homepage-specific sections
  legal/           — LegalPageShell, LegalNav
  ui/              — Button, Badge, InlineAlert, LogoDots

content/
  support/         — Nine support categories, each with _category.ts and MDX articles
  legal/           — MDX files for legal documents (if using MDX for legal content)

lib/
  plans/           — Plan definitions (SSOT)
  navigation/      — Nav config, footer config, breadcrumb helpers
  seo/             — Metadata builder
  support/         — Content loading functions
  stripe.ts        — Stripe client
  supabase.ts      — Supabase client + helper functions
  carrier.ts       — MVNE API abstraction

types/             — TypeScript interfaces
supabase/          — Database schema SQL
public/            — Static assets, support-index.json (generated at build)
```

---

## Support content

Support articles live in `content/support/[category]/`. Each category has:

- `_category.ts` — Article metadata (slug, title, description, tags, related articles)
- `[slug].mdx` — Article body content

To add a new article:
1. Add its metadata to the relevant `_category.ts` file
2. Create `[slug].mdx` with the body content
3. Run `npx tsx lib/support/buildSearchIndex.ts` to update the search index
4. Deploy

---

## Stripe setup

1. Create four products in Stripe Dashboard (Starter, Core, Unlimited, Ultra)
2. Create a monthly recurring price for each
3. Copy the price IDs to your `.env.local`
4. Set up the webhook endpoint: `https://dotmobile.com.au/api/checkout/webhook`
5. Enable the `checkout.session.completed` and `customer.subscription.deleted` events
6. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

---

## Vercel deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Link and deploy
vercel

# Set all environment variables in Vercel dashboard or via CLI:
vercel env add STRIPE_SECRET_KEY
# ... etc
```

Set the production domain to `dotmobile.com.au` in the Vercel project settings.

---

## Before launch checklist

- [ ] Fill in `[INSERT ABN]` and `[INSERT ACN]` in legal pages and footer
- [ ] Add registered address to legal pages
- [ ] Upload `og-default.png`, `logo.svg`, `logo-white.svg`, `favicon.ico` to `/public/images/`
- [ ] Configure Stripe products and price IDs
- [ ] Set up Supabase (run schema.sql)
- [ ] Wire up Veriff identity verification in checkout (replace placeholder)
- [ ] Wire up Stripe Elements in checkout (replace placeholder)
- [ ] Configure Resend email templates and sender domain
- [ ] Confirm MVNE API credentials (Telcoinabox or PWN)
- [ ] Set up Plausible analytics
- [ ] Run `npx tsx lib/support/buildSearchIndex.ts` and verify `/public/support-index.json`
- [ ] Test full checkout flow end-to-end in Stripe test mode
- [ ] Verify all support article routes resolve
- [ ] Verify all footer and nav links are correct
- [ ] Replace `[INSERT ABN]` placeholders throughout all documents
- [ ] Have telco lawyer review all legal documents
- [ ] Set up TIO registration
- [ ] Register ABN and ACN with ASIC

---

## Legal

All legal documents in `app/(marketing)/legal/` are original works written for DOT Mobile.
They must be reviewed by a qualified Australian telecommunications lawyer before going live.
Replace all `[INSERT ABN]`, `[INSERT ACN]`, and `[Registered Address]` placeholders with
your actual company details.

---

Built for DOT Mobile Pty Ltd. All rights reserved.
