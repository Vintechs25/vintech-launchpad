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
}

const AdminContactInfo = () => {
  const [info, setInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("contact_info").select("*").maybeSingle();
      if (data) setInfo({ ...data, website: (data as any).website ?? null, company_name: (data as any).company_name ?? null } as ContactInfo);
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
    <div className="space-y-4 max-w-md">
      <h2 className="font-heading font-semibold text-lg text-foreground">Contact Information</h2>
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
      <button onClick={save} disabled={saving} className="btn-primary gap-2">
        <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default AdminContactInfo;
