create extension if not exists pgcrypto;

create table if not exists offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  url text not null,
  emoji text not null default '🎁',
  active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists impressions (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid not null references offers(id) on delete cascade,
  client_id text,
  source text,
  created_at timestamptz not null default now()
);

create table if not exists clicks (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid not null references offers(id) on delete cascade,
  client_id text,
  source text,
  created_at timestamptz not null default now()
);

create or replace view offer_stats as
select
  offers.*,
  coalesce(impression_counts.count, 0)::int as impressions_count,
  coalesce(click_counts.count, 0)::int as clicks_count
from offers
left join (
  select offer_id, count(*) as count
  from impressions
  group by offer_id
) impression_counts on impression_counts.offer_id = offers.id
left join (
  select offer_id, count(*) as count
  from clicks
  group by offer_id
) click_counts on click_counts.offer_id = offers.id;

alter table offers enable row level security;
alter table impressions enable row level security;
alter table clicks enable row level security;

insert into offers (title, description, url, emoji)
values (
  'Railway gives credits for new projects',
  'Example seed offer for local MVP testing.',
  'https://railway.app',
  '🎁'
)
on conflict do nothing;
