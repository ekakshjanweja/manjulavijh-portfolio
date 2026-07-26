-- Photos table
create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  category text not null,
  subcategory text,
  position integer not null,
  created_at timestamp with time zone default now()
);

create index if not exists photos_category_subcategory_idx on photos (category, subcategory);
create index if not exists photos_position_idx on photos (position);

-- Ensure position ordering by group if needed (optional)
-- create index if not exists photos_group_order_idx on photos (category, subcategory, position);
