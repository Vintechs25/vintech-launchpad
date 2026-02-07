-- Add image_url to blog_posts
ALTER TABLE public.blog_posts ADD COLUMN image_url text;

-- Add tagline, benefits, and image_url to services
ALTER TABLE public.services ADD COLUMN tagline text;
ALTER TABLE public.services ADD COLUMN benefits jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.services ADD COLUMN image_url text;

-- Create public storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Storage RLS: anyone can read, only authenticated users can upload/update/delete
CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Auth upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth update images" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth delete images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');