import { useAnalytics } from "@/hooks/useAnalytics";
import { Activity, Eye, TrendingUp, Monitor, Smartphone, Tablet, RefreshCw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const DEVICE_COLORS = ["hsl(199, 89%, 48%)", "hsl(280, 65%, 60%)", "hsl(150, 60%, 50%)", "hsl(40, 90%, 55%)"];

const deviceIcons: Record<string, typeof Monitor> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

const AdminAnalytics = () => {
  const { data, loading, refresh } = useAnalytics();

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { label: "Live Now", value: data.liveCount, icon: Activity, color: "text-green-400", bgColor: "bg-green-500/10", pulse: true },
    { label: "Today", value: data.todayViews, icon: Eye, color: "text-[hsl(var(--cyan))]", bgColor: "bg-[hsl(var(--cyan))]/10" },
    { label: "This Week", value: data.weekViews, icon: TrendingUp, color: "text-purple-400", bgColor: "bg-purple-500/10" },
    { label: "All Time", value: data.totalViews, icon: Eye, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Live Analytics</h2>
          <p className="text-sm text-muted-foreground">Real-time visitor tracking across your site</p>
        </div>
        <button onClick={refresh} className="p-2 rounded-lg bg-card border border-border hover:bg-secondary transition-colors">
          <RefreshCw size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-card rounded-xl border border-border p-5">
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

      {/* Charts Row */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Daily Views Chart */}
        <div className="md:col-span-2 bg-card rounded-xl border border-border p-5">
          <h3 className="font-heading font-semibold text-foreground mb-4">Page Views (14 days)</h3>
          {data.dailyViews.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">No data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data.dailyViews}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(215, 12%, 48%)" }} tickFormatter={(v: string) => v.slice(5)} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215, 12%, 48%)" }} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 20%, 90%)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="count" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Device Breakdown */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-heading font-semibold text-foreground mb-4">Devices</h3>
          {data.deviceBreakdown.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">No data yet</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={data.deviceBreakdown} dataKey="count" nameKey="device_type" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                    {data.deviceBreakdown.map((_, i) => (
                      <Cell key={i} fill={DEVICE_COLORS[i % DEVICE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {data.deviceBreakdown.map((d, i) => {
                  const Icon = deviceIcons[d.device_type] || Monitor;
                  return (
                    <div key={d.device_type} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: DEVICE_COLORS[i % DEVICE_COLORS.length] }} />
                        <Icon size={14} className="text-muted-foreground" />
                        <span className="text-foreground capitalize">{d.device_type}</span>
                      </div>
                      <span className="text-muted-foreground font-mono text-xs">{d.count}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Top Pages & Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-card rounded-xl border border-border">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-heading font-semibold text-foreground">Top Pages</h3>
          </div>
          {data.topPages.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground text-center">No data yet</p>
          ) : (
            <div className="divide-y divide-border">
              {data.topPages.map((page) => {
                const maxCount = data.topPages[0]?.count || 1;
                return (
                  <div key={page.path} className="px-5 py-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono text-foreground truncate">{page.path}</p>
                      <div className="mt-1.5 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(page.count / maxCount) * 100}%`,
                            background: "hsl(199, 89%, 48%)",
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground tabular-nums">{page.count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-heading font-semibold text-foreground">Recent Activity</h3>
          </div>
          {data.recentViews.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground text-center">No activity yet</p>
          ) : (
            <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
              {data.recentViews.map((view, i) => {
                const Icon = deviceIcons[view.device_type || "desktop"] || Monitor;
                return (
                  <div key={i} className="px-5 py-2.5 flex items-center gap-3">
                    <Icon size={14} className="text-muted-foreground shrink-0" />
                    <span className="text-sm font-mono text-foreground truncate flex-1">{view.path}</span>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {new Date(view.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
