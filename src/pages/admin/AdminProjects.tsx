import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  description: string;
  problem: string | null;
  solution: string | null;
  results: string | null;
  image_url: string | null;
  sort_order: number;
}

const AdminProjects = () => {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchAll = async () => {
    const { data } = await supabase.from("projects").select("*").order("sort_order");
    if (data) setItems(data as Project[]);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const save = async () => {
    if (!editing?.title || !editing?.description) return;
    setSaving(true);
    const slug = editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const payload = { ...editing, slug };
    if (editing.id) {
      await supabase.from("projects").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("projects").insert(payload as any);
    }
    setSaving(false);
    setEditing(null);
    fetchAll();
    toast({ title: editing.id ? "Project updated" : "Project created" });
  };

  const remove = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast({ title: "Project deleted" });
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-accent" size={24} /></div>;

  if (editing) {
    return (
      <div className="space-y-4 max-w-2xl">
        <h2 className="font-heading font-semibold text-lg text-foreground">{editing.id ? "Edit" : "New"} Project</h2>
        <input placeholder="Title" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <input placeholder="Category" value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <textarea placeholder="Description" rows={3} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        <textarea placeholder="Problem" rows={3} value={editing.problem || ""} onChange={(e) => setEditing({ ...editing, problem: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        <textarea placeholder="Solution" rows={3} value={editing.solution || ""} onChange={(e) => setEditing({ ...editing, solution: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        <textarea placeholder="Results" rows={3} value={editing.results || ""} onChange={(e) => setEditing({ ...editing, results: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        <input placeholder="Image URL" value={editing.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
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
        <h2 className="font-heading font-semibold text-lg text-foreground">Projects ({items.length})</h2>
        <button onClick={() => setEditing({ title: "", slug: "", category: "", description: "", sort_order: 0 })} className="btn-primary text-sm"><Plus size={16} /> New Project</button>
      </div>
      {items.length === 0 ? <p className="text-muted-foreground text-center py-12">No projects yet.</p> : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
              <div>
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.category}</p>
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

export default AdminProjects;
