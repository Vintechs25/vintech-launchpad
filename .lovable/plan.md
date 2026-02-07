

# Blog Images, Service Detail & Content Revamp

## Overview
Several pages currently use hardcoded data instead of the database, and blog posts lack image support. This plan fixes all of these issues.

## Changes

### 1. Blog Post Images
- Add `image_url` column to `blog_posts` table (nullable text)
- Create a storage bucket `images` (public) for uploading blog/project/service images
- Add image upload field to AdminBlog form (upload to storage, save URL)
- Display blog cover image on the Blog listing page and BlogPost detail page

### 2. BlogPost Detail Page -- Pull from Database
The current `BlogPost.tsx` uses a hardcoded `blogPosts` object. It completely ignores posts created via the admin panel.
- Replace hardcoded data with a database query (`useQuery` fetching by slug)
- Render the `content`, `category`, `excerpt`, `created_at`, and new `image_url` from the DB
- Remove the hardcoded `blogPosts` object entirely

### 3. ServiceDetail Page -- Pull from Database
The current `ServiceDetail.tsx` uses a hardcoded `serviceData` object. The services table already has `features`, `process`, and `faq` JSON columns but they go unused.
- Replace hardcoded data with a database query (fetch service by slug)
- Add `tagline` and `benefits` text columns to the services table (or use the existing JSON columns)
- Update AdminServices form to allow editing features (list), process (steps), FAQs, and a tagline
- Remove the hardcoded `serviceData` object entirely

### 4. Admin Image Upload Component
- Create a reusable `ImageUpload` component that:
  - Shows a file picker
  - Uploads to the `images` storage bucket
  - Returns the public URL
  - Shows a preview of the current image
- Use this component in AdminBlog, AdminProjects, and AdminServices (for a service hero image)

### 5. Projects Admin -- Replace URL Input with Upload
- Replace the plain text "Image URL" input in AdminProjects with the new ImageUpload component

## Technical Details

### Database Migration
```sql
-- Add image_url to blog_posts
ALTER TABLE public.blog_posts ADD COLUMN image_url text;

-- Add tagline and benefits to services
ALTER TABLE public.services ADD COLUMN tagline text;
ALTER TABLE public.services ADD COLUMN benefits jsonb;
ALTER TABLE public.services ADD COLUMN image_url text;

-- Create public storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Storage RLS: anyone can read, only authenticated users can upload
CREATE POLICY "Public read" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Auth upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
```

### Files to Create
- `src/components/admin/ImageUpload.tsx` -- reusable upload component

### Files to Modify
- `src/pages/admin/AdminBlog.tsx` -- add image upload field
- `src/pages/admin/AdminProjects.tsx` -- replace text input with ImageUpload
- `src/pages/admin/AdminServices.tsx` -- add tagline, benefits, features, process, FAQ editing + image
- `src/pages/BlogPost.tsx` -- fetch from DB instead of hardcoded data
- `src/pages/Blog.tsx` -- show cover image on cards
- `src/pages/ServiceDetail.tsx` -- fetch from DB instead of hardcoded data
- `src/hooks/usePublicData.ts` -- add `useBlogPost(slug)` and `useService(slug)` hooks

### Approach for Admin JSON Editing (features, process, FAQs)
- Features: simple comma-separated or line-separated text input, stored as JSON array
- Process: repeating step/description pairs with add/remove buttons
- FAQs: repeating question/answer pairs with add/remove buttons
- Benefits: line-separated text input, stored as JSON array

