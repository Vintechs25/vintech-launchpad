
ALTER TABLE public.contact_info ADD COLUMN IF NOT EXISTS privacy_policy text;
ALTER TABLE public.contact_info ADD COLUMN IF NOT EXISTS terms_conditions text;
