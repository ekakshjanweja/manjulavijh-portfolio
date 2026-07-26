# Supabase storage setup

Create bucket:

- Name: `portfolio-images`
- Public: enabled

Recommended storage policy (public read):

```sql
create policy "Public read" on storage.objects
for select
using (bucket_id = 'portfolio-images');
```

Recommended storage policy (admin write):

```sql
create policy "Admin write" on storage.objects
for all
using (bucket_id = 'portfolio-images');
```

If you prefer to keep upload/delete server-only, keep public read and restrict write
to service role only (no additional policy needed for client writes).
