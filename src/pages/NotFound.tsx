import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, MapPin } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const offsetX = (mousePos.x - 0.5) * 20;
  const offsetY = (mousePos.y - 0.5) * 20;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden">
      {/* Animated background orb */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--accent)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* Big 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          <span
            className="text-[10rem] md:text-[14rem] font-heading font-black leading-none tracking-tighter select-none"
            style={{
              background: "linear-gradient(180deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.15) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </span>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 mb-10"
        >
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">
            Page not found
          </h1>
          <p className="text-primary-foreground/50 text-base md:text-lg leading-relaxed max-w-md mx-auto">
            The page <span className="text-primary-foreground/70 font-mono text-sm bg-white/5 px-2 py-0.5 rounded">{location.pathname}</span> doesn't exist or has been moved.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            to="/"
            className="btn-primary text-sm px-6 py-3 flex items-center gap-2 group"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/sitemap"
            className="flex items-center gap-2 text-sm text-primary-foreground/50 hover:text-accent px-5 py-3 rounded-lg border border-white/10 hover:border-accent/30 transition-all duration-200"
          >
            <MapPin className="w-4 h-4" />
            View Sitemap
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 pt-8 border-t border-white/5"
        >
          <p className="text-primary-foreground/30 text-xs uppercase tracking-widest mb-4">
            Popular pages
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { to: "/services", label: "Services" },
              { to: "/projects", label: "Projects" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/blog", label: "Blog" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs text-primary-foreground/40 hover:text-accent px-3 py-1.5 rounded-full border border-white/5 hover:border-accent/20 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
