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

const AdminContactInfo = () => {
  const [info, setInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("contact_info").select("*").maybeSingle();
      if (data) setInfo({ ...data, website: (data as any).website ?? null, company_name: (data as any).company_name ?? null, privacy_policy: (data as any).privacy_policy ?? null, terms_conditions: (data as any).terms_conditions ?? null } as ContactInfo);
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
          <input value={info.website || ""} onChange={(e) => setInfo({ ...info, website: e.target.value })} placeholder="https://vin-tech.top"
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
        <h2 className="font-heading font-semibold text-lg text-foreground mb-1">Privacy Policy</h2>
        <p className="text-xs text-muted-foreground mb-2">Plain text content displayed on the /privacy page. Leave empty to use the default template.</p>
        <textarea value={info.privacy_policy || ""} onChange={(e) => setInfo({ ...info, privacy_policy: e.target.value })} rows={10}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          placeholder="Enter your custom privacy policy content..." />
      </div>

      <div>
        <h2 className="font-heading font-semibold text-lg text-foreground mb-1">Terms & Conditions</h2>
        <p className="text-xs text-muted-foreground mb-2">Plain text content displayed on the /terms page. Leave empty to use the default template.</p>
        <textarea value={info.terms_conditions || ""} onChange={(e) => setInfo({ ...info, terms_conditions: e.target.value })} rows={10}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          placeholder="Enter your custom terms & conditions content..." />
      </div>

      <button onClick={save} disabled={saving} className="btn-primary gap-2">
        <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default AdminContactInfo;
