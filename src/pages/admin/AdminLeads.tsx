import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Mail, Phone, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  closed: "bg-green-100 text-green-800",
};

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setLeads(data as Lead[]);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: string, status: "new" | "contacted" | "closed") => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (!error) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      toast({ title: "Status updated" });
    }
  };

  const deleteLead = async (id: string) => {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (!error) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast({ title: "Lead deleted" });
    }
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-accent" size={24} /></div>;

  if (leads.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">No leads yet. They'll appear here when visitors submit the contact or quote form.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-lg text-foreground">Leads ({leads.length})</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Contact</th>
              <th className="pb-3 font-medium">Service</th>
              <th className="pb-3 font-medium">Message</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-border/50">
                <td className="py-3 font-medium text-foreground">{lead.name}</td>
                <td className="py-3">
                  <div className="flex flex-col gap-0.5">
                    <a href={`mailto:${lead.email}`} className="text-accent flex items-center gap-1"><Mail size={12} />{lead.email}</a>
                    {lead.phone && <span className="flex items-center gap-1 text-muted-foreground"><Phone size={12} />{lead.phone}</span>}
                  </div>
                </td>
                <td className="py-3 text-muted-foreground">{lead.service || "—"}</td>
                <td className="py-3 text-muted-foreground max-w-xs truncate">{lead.message}</td>
                <td className="py-3">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value as Lead["status"])}
                    className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${statusColors[lead.status]}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="py-3 text-muted-foreground text-xs">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
                <td className="py-3">
                  <button onClick={() => deleteLead(lead.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeads;
