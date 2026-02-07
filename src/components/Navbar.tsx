import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const isHome = location.pathname === "/";
  const showSolid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolid
          ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-cta flex items-center justify-center">
            <span className="text-accent-foreground font-heading font-bold text-sm">V</span>
          </div>
          <span
            className={`font-heading font-bold text-lg tracking-tight ${
              showSolid ? "text-foreground" : "text-primary-foreground"
            }`}
          >
            Vintech
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                location.pathname === l.path
                  ? "text-accent"
                  : showSolid
                  ? "text-foreground"
                  : "text-primary-foreground/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/get-quote" className="btn-primary text-sm">
            Get a Quote
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`md:hidden ${showSolid ? "text-foreground" : "text-primary-foreground"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-t border-border animate-fade-up">
          <nav className="flex flex-col px-6 py-4 gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`text-sm font-medium py-2 ${
                  location.pathname === l.path ? "text-accent" : "text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/get-quote" className="btn-primary text-center mt-2">
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
