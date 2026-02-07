import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Inbox, FileText, FolderOpen, Briefcase, TrendingUp, Eye, Users, Activity } from "lucide-react";
import { Link } from "react-router-dom";

interface OverviewStats {
  leadsCount: number;
  newLeadsCount: number;
  postsCount: number;
  servicesCount: number;
  projectsCount: number;
  todayViews: number;
  totalViews: number;
  liveVisitors: number;
}

interface RecentLead {
  id: string;
  name: string;
  email: string;
  service: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-400",
  contacted: "bg-yellow-500/15 text-yellow-400",
  closed: "bg-green-500/15 text-green-400",
};

const AdminOverview = () => {
  const [stats, setStats] = useState<OverviewStats>({
    leadsCount: 0, newLeadsCount: 0, postsCount: 0, servicesCount: 0,
    projectsCount: 0, todayViews: 0, totalViews: 0, liveVisitors: 0,
  });
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();

      const [leads, newLeads, posts, services, projects, todayV, totalV, liveV, recent] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", todayStart),
        supabase.from("page_views").select("id", { count: "exact", head: true }),
        supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", fiveMinAgo),
        supabase.from("leads").select("id, name, email, service, status, created_at").order("created_at", { ascending: false }).limit(5),
      ]);

      setStats({
        leadsCount: leads.count || 0,
        newLeadsCount: newLeads.count || 0,
        postsCount: posts.count || 0,
        servicesCount: services.count || 0,
        projectsCount: projects.count || 0,
        todayViews: todayV.count || 0,
        totalViews: totalV.count || 0,
        liveVisitors: liveV.count || 0,
      });
      setRecentLeads((recent.data || []) as RecentLead[]);
      setLoading(false);
    };
    fetch();

    // Realtime updates
    const channel = supabase
      .channel("overview_realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "leads" }, () => fetch())
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "page_views" }, () => fetch())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const cards = [
    { label: "Live Visitors", value: stats.liveVisitors, icon: Activity, color: "text-green-400", bgColor: "bg-green-500/10", pulse: true },
    { label: "Today's Views", value: stats.todayViews, icon: Eye, color: "text-[hsl(var(--cyan))]", bgColor: "bg-[hsl(var(--cyan))]/10" },
    { label: "Total Views", value: stats.totalViews, icon: TrendingUp, color: "text-purple-400", bgColor: "bg-purple-500/10" },
    { label: "New Leads", value: stats.newLeadsCount, icon: Inbox, color: "text-orange-400", bgColor: "bg-orange-500/10" },
    { label: "Total Leads", value: stats.leadsCount, icon: Users, color: "text-blue-400", bgColor: "bg-blue-500/10" },
    { label: "Blog Posts", value: stats.postsCount, icon: FileText, color: "text-pink-400", bgColor: "bg-pink-500/10" },
    { label: "Services", value: stats.servicesCount, icon: Briefcase, color: "text-teal-400", bgColor: "bg-teal-500/10" },
    { label: "Projects", value: stats.projectsCount, icon: FolderOpen, color: "text-indigo-400", bgColor: "bg-indigo-500/10" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${card.bgColor}`}>
                <card.icon size={20} className={card.color} />
              </div>
              {card.pulse && card.value > 0 && (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
              )}
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{card.value.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="bg-card rounded-xl border border-border">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-heading font-semibold text-foreground">Recent Leads</h3>
          <Link to="/admin/dashboard/leads" className="text-xs text-accent hover:underline">View all →</Link>
        </div>
        {recentLeads.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">No leads yet</div>
        ) : (
          <div className="divide-y divide-border">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email} {lead.service ? `· ${lead.service}` : ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${statusColors[lead.status] || ""}`}>
                    {lead.status}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOverview;
