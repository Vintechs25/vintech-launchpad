import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  published: boolean;
  created_at: string;
}

const emptyPost: Omit<BlogPost, "id" | "created_at"> = {
  title: "", slug: "", excerpt: "", content: "", category: "", published: false,
};

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data as BlogPost[]);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const save = async () => {
    if (!editing?.title || !editing?.content) return;
    setSaving(true);
    const slug = editing.slug || generateSlug(editing.title);
    const payload = { ...editing, slug };

    if (editing.id) {
      await supabase.from("blog_posts").update(payload).eq("id", editing.id);
      toast({ title: "Post updated" });
    } else {
      await supabase.from("blog_posts").insert(payload as any);
      toast({ title: "Post created" });
    }
    setSaving(false);
    setEditing(null);
    fetchPosts();
  };

  const deletePost = async (id: string) => {
    await supabase.from("blog_posts").delete().eq("id", id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Post deleted" });
  };

  const togglePublish = async (post: BlogPost) => {
    await supabase.from("blog_posts").update({ published: !post.published }).eq("id", post.id);
    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, published: !p.published } : p)));
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-accent" size={24} /></div>;

  if (editing) {
    return (
      <div className="space-y-4 max-w-2xl">
        <h2 className="font-heading font-semibold text-lg text-foreground">{editing.id ? "Edit Post" : "New Post"}</h2>
        <input placeholder="Title" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <input placeholder="Slug (auto-generated)" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <input placeholder="Category" value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <textarea placeholder="Excerpt" rows={2} value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        <textarea placeholder="Content (supports **bold** markdown)" rows={12} value={editing.content || ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" checked={editing.published || false} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
          Published
        </label>
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
        <h2 className="font-heading font-semibold text-lg text-foreground">Blog Posts ({posts.length})</h2>
        <button onClick={() => setEditing({ ...emptyPost })} className="btn-primary text-sm"><Plus size={16} /> New Post</button>
      </div>
      {posts.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No blog posts yet.</p>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
              <div>
                <h3 className="font-medium text-foreground">{post.title}</h3>
                <p className="text-xs text-muted-foreground">{post.category} · {new Date(post.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => togglePublish(post)} className={`p-1.5 rounded ${post.published ? "text-green-600" : "text-muted-foreground"}`}>
                  {post.published ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => setEditing(post)} className="p-1.5 text-muted-foreground hover:text-foreground"><Pencil size={16} /></button>
                <button onClick={() => deletePost(post.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
