import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string | null;
  sort_order: number;
}

const AdminStats = () => {
  const [items, setItems] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Stat> | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchAll = async () => {
    const { data } = await supabase.from("stats").select("*").order("sort_order");
    if (data) setItems(data as Stat[]);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const save = async () => {
    if (!editing?.label) return;
    setSaving(true);
    if (editing.id) {
      await supabase.from("stats").update(editing).eq("id", editing.id);
    } else {
      await supabase.from("stats").insert(editing as any);
    }
    setSaving(false);
    setEditing(null);
    fetchAll();
    toast({ title: editing.id ? "Stat updated" : "Stat created" });
  };

  const remove = async (id: string) => {
    await supabase.from("stats").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast({ title: "Stat deleted" });
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-accent" size={24} /></div>;

  if (editing) {
    return (
      <div className="space-y-4 max-w-md">
        <h2 className="font-heading font-semibold text-lg text-foreground">{editing.id ? "Edit" : "New"} Stat</h2>
        <input placeholder="Label (e.g. Projects Delivered)" value={editing.label || ""} onChange={(e) => setEditing({ ...editing, label: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <input placeholder="Value (number)" type="number" value={editing.value ?? 0} onChange={(e) => setEditing({ ...editing, value: parseInt(e.target.value) || 0 })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <input placeholder="Suffix (+, %, etc)" value={editing.suffix || ""} onChange={(e) => setEditing({ ...editing, suffix: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
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
        <h2 className="font-heading font-semibold text-lg text-foreground">Stats ({items.length})</h2>
        <button onClick={() => setEditing({ label: "", value: 0, suffix: "", sort_order: 0 })} className="btn-primary text-sm"><Plus size={16} /> New Stat</button>
      </div>
      {items.length === 0 ? <p className="text-muted-foreground text-center py-12">No stats yet.</p> : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
              <div>
                <h3 className="font-medium text-foreground">{item.value}{item.suffix}</h3>
                <p className="text-xs text-muted-foreground">{item.label}</p>
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

export default AdminStats;
