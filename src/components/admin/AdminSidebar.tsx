import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Briefcase,
  FolderOpen,
  MessageSquareQuote,
  BarChart3,
  Phone,
  LogOut,
  ExternalLink,
  Activity,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import vintechLogo from "@/assets/vintech-logo.png";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Analytics", icon: Activity, path: "/admin/dashboard/analytics" },
  { label: "Leads", icon: Inbox, path: "/admin/dashboard/leads" },
  { label: "Blog", icon: FileText, path: "/admin/dashboard/blog" },
  { label: "Services", icon: Briefcase, path: "/admin/dashboard/services" },
  { label: "Projects", icon: FolderOpen, path: "/admin/dashboard/projects" },
  { label: "Testimonials", icon: MessageSquareQuote, path: "/admin/dashboard/testimonials" },
  { label: "Stats", icon: BarChart3, path: "/admin/dashboard/stats" },
  { label: "Contact Info", icon: Phone, path: "/admin/dashboard/contact" },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const isActive = (path: string) => {
    if (path === "/admin/dashboard") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 min-h-screen bg-[hsl(var(--primary))] flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-3 border-b border-white/10">
        <img src={vintechLogo} alt="Vintech" className="h-8 w-auto brightness-0 invert" />
        <div>
          <span className="font-heading font-bold text-white text-sm">Vintech</span>
          <span className="block text-[10px] text-white/50 uppercase tracking-widest">Control Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              isActive(item.path)
                ? "bg-white/15 text-white shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/8"
            )}
          >
            <item.icon size={18} />
            {item.label}
            {item.label === "Leads" && (
              <span className="ml-auto w-2 h-2 rounded-full bg-[hsl(var(--cyan))] animate-pulse" />
            )}
          </Link>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/8 transition-all"
        >
          <ExternalLink size={18} />
          View Site
        </Link>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-red-300 hover:bg-white/8 transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
