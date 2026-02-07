import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string | null;
  company: string | null;
  sort_order: number;
}

const AdminTestimonials = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchAll = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("sort_order");
    if (data) setItems(data as Testimonial[]);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const save = async () => {
    if (!editing?.quote || !editing?.name) return;
    setSaving(true);
    if (editing.id) {
      await supabase.from("testimonials").update(editing).eq("id", editing.id);
    } else {
      await supabase.from("testimonials").insert(editing as any);
    }
    setSaving(false);
    setEditing(null);
    fetchAll();
    toast({ title: editing.id ? "Testimonial updated" : "Testimonial created" });
  };

  const remove = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast({ title: "Testimonial deleted" });
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-accent" size={24} /></div>;

  if (editing) {
    return (
      <div className="space-y-4 max-w-2xl">
        <h2 className="font-heading font-semibold text-lg text-foreground">{editing.id ? "Edit" : "New"} Testimonial</h2>
        <textarea placeholder="Quote" rows={4} value={editing.quote || ""} onChange={(e) => setEditing({ ...editing, quote: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        <input placeholder="Name" value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <input placeholder="Role" value={editing.role || ""} onChange={(e) => setEditing({ ...editing, role: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <input placeholder="Company" value={editing.company || ""} onChange={(e) => setEditing({ ...editing, company: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <div className="flex gap-3">
          <button onClick={save} disabled={saving} className="btn-primary">{saving ? "Saving..." : "Save"}</button>
          <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-lg text-foreground">Testimonials ({items.length})</h2>
        <button onClick={() => setEditing({ quote: "", name: "", role: "", company: "", sort_order: 0 })} className="btn-primary text-sm"><Plus size={16} /> New</button>
      </div>
      {items.length === 0 ? <p className="text-muted-foreground text-center py-12">No testimonials yet.</p> : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
              <div className="flex-1 mr-4">
                <p className="text-sm text-foreground line-clamp-2">"{item.quote}"</p>
                <p className="text-xs text-muted-foreground mt-1">— {item.name}, {item.company}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditing(item)} className="p-1.5 text-muted-foreground hover:text-foreground"><Pencil size={16} /></button>
                <button onClick={() => remove(item.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
