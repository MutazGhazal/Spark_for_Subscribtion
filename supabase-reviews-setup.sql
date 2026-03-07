-- Create reviews table
create table public.reviews (
  id uuid default gen_random_uuid() primary key,
  product_id text references public.products(id) on delete cascade not null,
  author_name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  is_approved boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table public.reviews enable row level security;

-- Policies

-- 1. Anyone can view approved reviews
create policy "Public can view approved reviews"
  on public.reviews for select
  using (is_approved = true);

-- 2. Anyone can insert a new review
create policy "Public can insert reviews"
  on public.reviews for insert
  with check (true);

-- 3. Only admins can view all reviews (including unapproved)
create policy "Admins can view all reviews"
  on public.reviews for select
  using (
    exists (
      select 1 from public.admins
      where admins.id = auth.uid()
    )
  );

-- 4. Only admins can update reviews (approve/hide)
create policy "Admins can update reviews"
  on public.reviews for update
  using (
    exists (
      select 1 from public.admins
      where admins.id = auth.uid()
    )
  );

-- 5. Only admins can delete reviews
create policy "Admins can delete reviews"
  on public.reviews for delete
  using (
    exists (
      select 1 from public.admins
      where admins.id = auth.uid()
    )
  );

-- Function to get average rating for a product
create or replace function get_product_rating(pid text)
returns numeric as $$
  select round(avg(rating)::numeric, 1) from public.reviews where product_id = pid and is_approved = true;
$$ language sql stable;

-- Function to get review count for a product
create or replace function get_product_review_count(pid text)
returns bigint as $$
  select count(*) from public.reviews where product_id = pid and is_approved = true;
$$ language sql stable;
