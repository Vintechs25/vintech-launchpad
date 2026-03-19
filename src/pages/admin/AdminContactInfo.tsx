import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactInfo {
  id: string;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  website: string | null;
  company_name: string | null;
  privacy_policy: string | null;
  terms_conditions: string | null;
}

const DEFAULT_PRIVACY = `Vintech Consulting ("Vintech", "we", "our", or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website or use our services.

By accessing our website, you agree to the terms of this Privacy Policy.

1. Information We Collect

Personal Information
When you fill out contact forms, request a quote, communicate via WhatsApp or email, or subscribe to newsletters, we may collect:
- Name
- Email address
- Phone number
- Company name
- Project details

Technical Information (automatically collected)
- IP address
- Browser type
- Device information
- Pages visited
- Cookies and usage data

2. How We Use Your Information

We use your information to:
- Respond to inquiries
- Provide consulting or technical services
- Send quotations or proposals
- Communicate project updates
- Improve website performance
- Run analytics and marketing campaigns
- Comply with legal obligations

We DO NOT sell or rent your personal data.

3. Cookies & Tracking

Our website may use cookies and similar technologies, including Google Analytics, Meta/Facebook Pixel, and performance tracking tools. You may disable cookies in your browser settings.

4. Third-Party Services

We may use trusted third-party providers such as email providers, hosting providers, analytics services, and cloud infrastructure providers.

5. Data Security

We implement reasonable security measures to protect your data. However, no internet transmission is 100% secure.

6. Data Retention

We retain information only as long as necessary for providing services, legal compliance, and business operations.

7. Your Rights

You may request to access, correct, or delete your information, or opt out of communications.

8. Links to Other Websites

Our website may contain links to third-party sites. We are not responsible for their privacy practices.

9. Changes to This Policy

We may update this Privacy Policy at any time. Updates will be posted on this page.

10. Contact Us

Vintech Consulting
Email: info@vintechsystems.store
Website: https://vintechsystems.store`;

const DEFAULT_TERMS = `These Terms & Conditions govern your use of the Vintech Consulting website and services.

By using our website or services, you agree to these terms.

1. Services

Vintech Consulting provides web development, software systems, IT support, cybersecurity services, consulting, managed hosting and infrastructure management. Services are provided under separate agreements or proposals where applicable.

2. Use of Website

You agree not to misuse the website, attempt unauthorized access, disrupt services, or upload malicious content. We may restrict access for violations.

3. Quotes & Proposals

All quotations are estimates only, subject to change based on project scope, and valid for a limited time. Final pricing is confirmed in writing.

4. Payments

Where services are paid, payment terms will be defined in agreements. Late payments may delay services. Refunds are subject to agreed terms.

5. Managed Hosting & Domains

Where Vintech provides hosting or domain services: infrastructure may be provided through third-party providers, we manage configuration and support, uptime depends on external providers, and we are not liable for third-party outages.

6. Intellectual Property

Unless otherwise agreed, clients own their final deliverables upon full payment. Vintech may showcase projects for portfolio purposes.

7. Limitation of Liability

Vintech is not liable for indirect damages, data loss, business interruption, or third-party failures. Maximum liability shall not exceed fees paid for services.

8. Service Availability

We aim to maintain reliable services but do not guarantee uninterrupted availability or zero downtime. Maintenance may occur periodically.

9. Termination

We may suspend or terminate services for non-payment, misuse, or violation of terms. Clients may terminate according to agreements.

10. Changes

We may update these Terms at any time. Continued use indicates acceptance.

11. Governing Law

These terms are governed by the laws applicable in your operating jurisdiction.

12. Contact

Vintech Consulting
Email: info@vintechsystems.store
Website: https://vintechsystems.store`;

const AdminContactInfo = () => {
  const [info, setInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("contact_info").select("*").maybeSingle();
      if (data) {
        setInfo({
          ...data,
          website: (data as any).website ?? null,
          company_name: (data as any).company_name ?? null,
          privacy_policy: (data as any).privacy_policy || DEFAULT_PRIVACY,
          terms_conditions: (data as any).terms_conditions || DEFAULT_TERMS,
        } as ContactInfo);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const save = async () => {
    if (!info) return;
    setSaving(true);
    await supabase.from("contact_info").update(info).eq("id", info.id);
    setSaving(false);
    toast({ title: "Contact info updated" });
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-accent" size={24} /></div>;
  if (!info) return <p className="text-muted-foreground text-center py-12">No contact info found.</p>;

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="font-heading font-semibold text-lg text-foreground">Contact Information</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Company Name</label>
          <input value={info.company_name || ""} onChange={(e) => setInfo({ ...info, company_name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Website</label>
          <input value={info.website || ""} onChange={(e) => setInfo({ ...info, website: e.target.value })} placeholder="https://vintechsystems.store"
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Email</label>
          <input value={info.email || ""} onChange={(e) => setInfo({ ...info, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
          <input value={info.phone || ""} onChange={(e) => setInfo({ ...info, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">WhatsApp Number</label>
          <input value={info.whatsapp || ""} onChange={(e) => setInfo({ ...info, whatsapp: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Address</label>
          <input value={info.address || ""} onChange={(e) => setInfo({ ...info, address: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      <hr className="border-border" />

      <div>
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-heading font-semibold text-lg text-foreground">Privacy Policy</h2>
          <button type="button" onClick={() => setInfo({ ...info, privacy_policy: DEFAULT_PRIVACY })} className="text-xs text-accent hover:underline">Reset to Default</button>
        </div>
        <p className="text-xs text-muted-foreground mb-2">Edit the content displayed on the /privacy page.</p>
        <textarea value={info.privacy_policy || ""} onChange={(e) => setInfo({ ...info, privacy_policy: e.target.value })} rows={12}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-heading font-semibold text-lg text-foreground">Terms & Conditions</h2>
          <button type="button" onClick={() => setInfo({ ...info, terms_conditions: DEFAULT_TERMS })} className="text-xs text-accent hover:underline">Reset to Default</button>
        </div>
        <p className="text-xs text-muted-foreground mb-2">Edit the content displayed on the /terms page.</p>
        <textarea value={info.terms_conditions || ""} onChange={(e) => setInfo({ ...info, terms_conditions: e.target.value })} rows={12}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
      </div>

      <button onClick={save} disabled={saving} className="btn-primary gap-2">
        <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default AdminContactInfo;
