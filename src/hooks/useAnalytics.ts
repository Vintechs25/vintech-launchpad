import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsData {
  totalViews: number;
  todayViews: number;
  weekViews: number;
  topPages: { path: string; count: number }[];
  deviceBreakdown: { device_type: string; count: number }[];
  dailyViews: { date: string; count: number }[];
  recentViews: { path: string; created_at: string; device_type: string | null; country: string | null }[];
  countryBreakdown: { country: string; count: number }[];
  liveCount: number;
}

export const useAnalytics = () => {
  const [data, setData] = useState<AnalyticsData>({
    totalViews: 0,
    todayViews: 0,
    weekViews: 0,
    topPages: [],
    deviceBreakdown: [],
    dailyViews: [],
    recentViews: [],
    countryBreakdown: [],
    liveCount: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();

    const [totalRes, todayRes, weekRes, recentRes, liveRes, allThirtyRes] = await Promise.all([
      supabase.from("page_views").select("id", { count: "exact", head: true }),
      supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", todayStart),
      supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", weekStart),
      supabase.from("page_views").select("path, created_at, device_type, country").order("created_at", { ascending: false }).limit(20),
      supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", fiveMinAgo),
      supabase.from("page_views").select("path, device_type, created_at, country").gte("created_at", thirtyDaysAgo),
    ]);

    // Compute top pages & device breakdown from 30-day data
    const allViews = allThirtyRes.data || [];
    const pathCounts: Record<string, number> = {};
    const deviceCounts: Record<string, number> = {};
    const dayCounts: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};

    allViews.forEach((v: any) => {
      pathCounts[v.path] = (pathCounts[v.path] || 0) + 1;
      const dev = v.device_type || "unknown";
      deviceCounts[dev] = (deviceCounts[dev] || 0) + 1;
      const day = v.created_at?.slice(0, 10);
      if (day) dayCounts[day] = (dayCounts[day] || 0) + 1;
      const country = v.country || "Unknown";
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    const topPages = Object.entries(pathCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const deviceBreakdown = Object.entries(deviceCounts)
      .map(([device_type, count]) => ({ device_type, count }));

    const dailyViews = Object.entries(dayCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-14);

    const countryBreakdown = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    setData({
      totalViews: totalRes.count || 0,
      todayViews: todayRes.count || 0,
      weekViews: weekRes.count || 0,
      topPages,
      deviceBreakdown,
      dailyViews,
      recentViews: (recentRes.data || []) as any,
      countryBreakdown,
      liveCount: liveRes.count || 0,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalytics();

    // Subscribe to realtime page_views for live updates
    const channel = supabase
      .channel("page_views_realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "page_views" }, () => {
        fetchAnalytics();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return { data, loading, refresh: fetchAnalytics };
};
