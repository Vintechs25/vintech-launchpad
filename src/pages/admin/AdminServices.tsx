import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string | null;
  sort_order: number;
}

const AdminServices = () => {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetch = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    if (data) setItems(data as Service[]);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const save = async () => {
    if (!editing?.title || !editing?.description) return;
    setSaving(true);
    const slug = editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const payload = { ...editing, slug };
    if (editing.id) {
      await supabase.from("services").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("services").insert(payload as any);
    }
    setSaving(false);
    setEditing(null);
    fetch();
    toast({ title: editing.id ? "Service updated" : "Service created" });
  };

  const remove = async (id: string) => {
    await supabase.from("services").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast({ title: "Service deleted" });
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-accent" size={24} /></div>;

  if (editing) {
    return (
      <div className="space-y-4 max-w-2xl">
        <h2 className="font-heading font-semibold text-lg text-foreground">{editing.id ? "Edit" : "New"} Service</h2>
        <input placeholder="Title" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <input placeholder="Slug" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <input placeholder="Icon (lucide icon name)" value={editing.icon || ""} onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <textarea placeholder="Description" rows={4} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        <input placeholder="Sort order" type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })}
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
        <h2 className="font-heading font-semibold text-lg text-foreground">Services ({items.length})</h2>
        <button onClick={() => setEditing({ title: "", slug: "", description: "", icon: "", sort_order: 0 })} className="btn-primary text-sm"><Plus size={16} /> New Service</button>
      </div>
      {items.length === 0 ? <p className="text-muted-foreground text-center py-12">No services yet.</p> : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
              <div>
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground">/{item.slug}</p>
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

export default AdminServices;
