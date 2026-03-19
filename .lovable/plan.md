

# Rebrand Domain to vintechsystems.store

## Summary
Update all references from the old domain (`vin-tech.top`) and old email (`info@vin-tech.top`) to the new domain `vintechsystems.store` across the entire codebase.

## Changes

### Files to update (global find-and-replace):

All instances of:
- `vin-tech.top` → `vintechsystems.store`
- `info@vin-tech.top` → `info@vintechsystems.store`
- `vintech.co` → `vintechsystems.store`
- `hello@vintech.co` → `info@vintechsystems.store`

### Affected files (~17 files):

| File | What changes |
|------|-------------|
| `index.html` | Canonical URL, OG URLs, structured data URLs, contact email |
| `public/sitemap.xml` | All `<loc>` URLs |
| `public/robots.txt` | Sitemap URL |
| `src/hooks/useContactInfo.ts` | Default email and website |
| `src/pages/Index.tsx` | Canonical, OG URL, structured data |
| `src/pages/About.tsx` | Canonical URL |
| `src/pages/Services.tsx` | Canonical URL |
| `src/pages/Blog.tsx` | Canonical URL |
| `src/pages/BlogPost.tsx` | Canonical, structured data URL |
| `src/pages/Projects.tsx` | Canonical URL |
| `src/pages/Contact.tsx` | Canonical URL, hardcoded email |
| `src/pages/ServiceDetail.tsx` | Canonical, structured data URL |
| `src/pages/PrivacyPolicy.tsx` | Fallback email/website |
| `src/pages/TermsConditions.tsx` | Fallback email/website |
| `src/pages/AdminLogin.tsx` | Placeholder email |
| `src/pages/admin/AdminContactInfo.tsx` | Default privacy/terms text, placeholder |
| `src/components/Footer.tsx` | Fallback email |
| `src/components/WhatsAppFloat.tsx` | No domain ref (already clean) |

### Database update
Update the `contact_info` table row to set email to `info@vintechsystems.store` and website to `https://vintechsystems.store` so the dynamic values also reflect the new domain.

### Project memory
Update the branding identity memory from `vin-tech.top` to `vintechsystems.store`.

