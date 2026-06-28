create extension if not exists pgcrypto;

create table offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  url text not null,
  company text not null,
  type text not null,
  priority integer not null default 0,
  active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger offers_set_updated_at
before update on offers
for each row
execute function set_updated_at();
