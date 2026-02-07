import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Pencil, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/admin/ImageUpload";
import type { Json } from "@/integrations/supabase/types";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string | null;
  sort_order: number;
  tagline: string | null;
  image_url: string | null;
  features: string[];
  benefits: string[];
  process: { step: string; desc: string }[];
  faq: { question: string; answer: string }[];
}

const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring";
const smallInputClass = "flex-1 px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring";

const parseJsonArray = (val: Json | null, fallback: any[] = []) => {
  if (Array.isArray(val)) return val;
  return fallback;
};

const AdminServices = () => {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchAll = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    if (data) {
      setItems(data.map((d: any) => ({
        ...d,
        tagline: d.tagline || "",
        image_url: d.image_url || null,
        features: parseJsonArray(d.features),
        benefits: parseJsonArray(d.benefits),
        process: parseJsonArray(d.process),
        faq: parseJsonArray(d.faq),
      })));
    }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const save = async () => {
    if (!editing?.title || !editing?.description) return;
    setSaving(true);
    const slug = editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const payload = {
      title: editing.title,
      slug,
      description: editing.description,
      icon: editing.icon || null,
      sort_order: editing.sort_order ?? 0,
      tagline: editing.tagline || null,
      image_url: editing.image_url || null,
      features: editing.features || [],
      benefits: editing.benefits || [],
      process: editing.process || [],
      faq: editing.faq || [],
    };
    if (editing.id) {
      await supabase.from("services").update(payload as any).eq("id", editing.id);
    } else {
      await supabase.from("services").insert(payload as any);
    }
    setSaving(false);
    setEditing(null);
    fetchAll();
    toast({ title: editing.id ? "Service updated" : "Service created" });
  };

  const remove = async (id: string) => {
    await supabase.from("services").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast({ title: "Service deleted" });
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-accent" size={24} /></div>;

  if (editing) {
    const features = editing.features || [];
    const benefits = editing.benefits || [];
    const process = editing.process || [];
    const faq = editing.faq || [];

    return (
      <div className="space-y-5 max-w-2xl">
        <h2 className="font-heading font-semibold text-lg text-foreground">{editing.id ? "Edit" : "New"} Service</h2>

        <input placeholder="Title" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inputClass} />
        <input placeholder="Slug" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className={inputClass} />
        <input placeholder="Tagline" value={editing.tagline || ""} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} className={inputClass} />
        <input placeholder="Icon (lucide icon name)" value={editing.icon || ""} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className={inputClass} />
        <textarea placeholder="Description" rows={4} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className={inputClass + " resize-none"} />
        <input placeholder="Sort order" type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className={inputClass} />

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Service Image</label>
          <ImageUpload value={editing.image_url || null} onChange={(url) => setEditing({ ...editing, image_url: url })} folder="services" />
        </div>

        {/* Features */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Features</label>
          <div className="space-y-2">
            {features.map((f, i) => (
              <div key={i} className="flex gap-2">
                <input value={f} onChange={(e) => { const n = [...features]; n[i] = e.target.value; setEditing({ ...editing, features: n }); }} className={smallInputClass} />
                <button type="button" onClick={() => setEditing({ ...editing, features: features.filter((_, j) => j !== i) })} className="text-muted-foreground hover:text-destructive"><X size={16} /></button>
              </div>
            ))}
            <button type="button" onClick={() => setEditing({ ...editing, features: [...features, ""] })} className="text-sm text-accent hover:underline">+ Add feature</button>
          </div>
        </div>

        {/* Benefits */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Benefits</label>
          <div className="space-y-2">
            {benefits.map((b, i) => (
              <div key={i} className="flex gap-2">
                <input value={b} onChange={(e) => { const n = [...benefits]; n[i] = e.target.value; setEditing({ ...editing, benefits: n }); }} className={smallInputClass} />
                <button type="button" onClick={() => setEditing({ ...editing, benefits: benefits.filter((_, j) => j !== i) })} className="text-muted-foreground hover:text-destructive"><X size={16} /></button>
              </div>
            ))}
            <button type="button" onClick={() => setEditing({ ...editing, benefits: [...benefits, ""] })} className="text-sm text-accent hover:underline">+ Add benefit</button>
          </div>
        </div>

        {/* Process */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Process Steps</label>
          <div className="space-y-3">
            {process.map((p, i) => (
              <div key={i} className="flex gap-2 items-start">
                <div className="flex-1 space-y-1">
                  <input placeholder="Step name" value={p.step} onChange={(e) => { const n = [...process]; n[i] = { ...n[i], step: e.target.value }; setEditing({ ...editing, process: n }); }} className={smallInputClass} />
                  <input placeholder="Description" value={p.desc} onChange={(e) => { const n = [...process]; n[i] = { ...n[i], desc: e.target.value }; setEditing({ ...editing, process: n }); }} className={smallInputClass} />
                </div>
                <button type="button" onClick={() => setEditing({ ...editing, process: process.filter((_, j) => j !== i) })} className="text-muted-foreground hover:text-destructive mt-2"><X size={16} /></button>
              </div>
            ))}
            <button type="button" onClick={() => setEditing({ ...editing, process: [...process, { step: "", desc: "" }] })} className="text-sm text-accent hover:underline">+ Add step</button>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">FAQs</label>
          <div className="space-y-3">
            {faq.map((f, i) => (
              <div key={i} className="flex gap-2 items-start">
                <div className="flex-1 space-y-1">
                  <input placeholder="Question" value={f.question} onChange={(e) => { const n = [...faq]; n[i] = { ...n[i], question: e.target.value }; setEditing({ ...editing, faq: n }); }} className={smallInputClass} />
                  <textarea placeholder="Answer" rows={2} value={f.answer} onChange={(e) => { const n = [...faq]; n[i] = { ...n[i], answer: e.target.value }; setEditing({ ...editing, faq: n }); }} className={smallInputClass + " resize-none"} />
                </div>
                <button type="button" onClick={() => setEditing({ ...editing, faq: faq.filter((_, j) => j !== i) })} className="text-muted-foreground hover:text-destructive mt-2"><X size={16} /></button>
              </div>
            ))}
            <button type="button" onClick={() => setEditing({ ...editing, faq: [...faq, { question: "", answer: "" }] })} className="text-sm text-accent hover:underline">+ Add FAQ</button>
          </div>
        </div>

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
        <button onClick={() => setEditing({ title: "", slug: "", description: "", icon: "", sort_order: 0, tagline: "", image_url: null, features: [], benefits: [], process: [], faq: [] })} className="btn-primary text-sm"><Plus size={16} /> New Service</button>
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
