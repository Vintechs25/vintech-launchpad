
ALTER TABLE public.contact_info ADD COLUMN IF NOT EXISTS website text;
ALTER TABLE public.contact_info ADD COLUMN IF NOT EXISTS company_name text DEFAULT 'Vintech Consulting';
