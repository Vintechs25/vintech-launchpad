import { useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminLeads from "@/pages/admin/AdminLeads";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminServices from "@/pages/admin/AdminServices";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminStats from "@/pages/admin/AdminStats";
import AdminContactInfo from "@/pages/admin/AdminContactInfo";

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin", { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary flex">
      <Helmet>
        <title>Admin Dashboard — Vintech Systems and Consulting</title>
      </Helmet>

      <AdminSidebar />

      <main className="flex-1 min-h-screen overflow-y-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border px-6 py-4">
          <h1 className="font-heading text-lg font-bold text-foreground">
            {/* Dynamic title will come from route */}
            Control Panel
          </h1>
        </header>

        <div className="p-6">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="stats" element={<AdminStats />} />
            <Route path="contact" element={<AdminContactInfo />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
