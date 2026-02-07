import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, FileText, Briefcase, FolderOpen, MessageSquareQuote, BarChart3, Phone, Inbox } from "lucide-react";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminServices from "@/pages/admin/AdminServices";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminStats from "@/pages/admin/AdminStats";
import AdminContactInfo from "@/pages/admin/AdminContactInfo";
import AdminLeads from "@/pages/admin/AdminLeads";
import vintechLogo from "@/assets/vintech-logo.png";

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
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Dashboard — Vintech Consulting</title>
      </Helmet>

      {/* Admin Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={vintechLogo} alt="Vintech" className="h-8 w-auto" />
            <span className="font-heading font-bold text-foreground">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View Site
            </Link>
            <button
              onClick={signOut}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Content Management</h1>

        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-secondary p-1 rounded-lg">
            <TabsTrigger value="leads" className="flex items-center gap-1.5 text-xs"><Inbox size={14} /> Leads</TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-1.5 text-xs"><FileText size={14} /> Blog</TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-1.5 text-xs"><Briefcase size={14} /> Services</TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1.5 text-xs"><FolderOpen size={14} /> Projects</TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-1.5 text-xs"><MessageSquareQuote size={14} /> Testimonials</TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-1.5 text-xs"><BarChart3 size={14} /> Stats</TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-1.5 text-xs"><Phone size={14} /> Contact Info</TabsTrigger>
          </TabsList>

          <TabsContent value="leads"><AdminLeads /></TabsContent>
          <TabsContent value="blog"><AdminBlog /></TabsContent>
          <TabsContent value="services"><AdminServices /></TabsContent>
          <TabsContent value="projects"><AdminProjects /></TabsContent>
          <TabsContent value="testimonials"><AdminTestimonials /></TabsContent>
          <TabsContent value="stats"><AdminStats /></TabsContent>
          <TabsContent value="contact"><AdminContactInfo /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
