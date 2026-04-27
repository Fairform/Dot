-- ─────────────────────────────────────────────────────────────────────────────
-- DOT Mobile — Supabase schema
-- Run this in your Supabase SQL editor (Sydney region: ap-southeast-2)
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── ORDERS ──────────────────────────────────────────────────────────────────
create table if not exists orders (
  id                      uuid primary key default uuid_generate_v4(),
  created_at              timestamptz not null default now(),

  -- Stripe
  stripe_session_id       text not null unique,
  stripe_subscription_id  text,

  -- Plan
  plan_key                text not null,

  -- Subscriber info
  first_name              text not null,
  last_name               text not null,
  email                   text not null,
  date_of_birth           text not null,
  address                 text not null,

  -- Number porting
  keep_number             boolean not null default false,
  current_number          text,
  current_provider        text,

  -- Status
  status                  text not null default 'pending'
                          check (status in ('pending','processing','esim_provisioning','active','failed')),

  -- eSIM
  esim_qr_url             text,
  esim_activation_code    text,

  -- Porting
  port_status             text not null default 'not_requested'
                          check (port_status in ('not_requested','pending','processing','complete','failed')),
  port_id                 text,

  -- Error tracking
  error_message           text
);

-- Row-level security
alter table orders enable row level security;

-- Service role can do everything (used by server-side code only)
create policy "Service role full access"
  on orders
  for all
  using (auth.role() = 'service_role');

-- ─── PLANS (optional reference table) ────────────────────────────────────────
create table if not exists plans (
  key          text primary key,
  name         text not null,
  price_cents  integer not null,
  data_gb      integer,             -- null = unlimited
  speed_mbps   integer,             -- max download
  priority     boolean not null default false,
  active       boolean not null default true,
  created_at   timestamptz not null default now()
);

insert into plans (key, name, price_cents, data_gb, speed_mbps, priority) values
  ('starter',   'Starter',   3500, 25,   100, false),
  ('core',      'Core',      4200, 50,   150, false),
  ('unlimited', 'Unlimited', 5500, null, 150, false),
  ('ultra',     'Ultra',     7000, null, null, true)
on conflict (key) do nothing;

-- ─── INDEXES ─────────────────────────────────────────────────────────────────
create index if not exists orders_email_idx        on orders(email);
create index if not exists orders_status_idx       on orders(status);
create index if not exists orders_created_at_idx   on orders(created_at desc);
create index if not exists orders_stripe_sub_idx   on orders(stripe_subscription_id)
  where stripe_subscription_id is not null;
