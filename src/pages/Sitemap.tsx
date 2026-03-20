import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useServices } from "@/hooks/usePublicData";
import { 
  Home, Briefcase, FolderOpen, Users, BookOpen, Mail, 
  FileText, Shield, MapPin, ExternalLink 
} from "lucide-react";

const siteLinks = [
  {
    heading: "Main Pages",
    icon: Home,
    links: [
      { to: "/", label: "Home" },
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact" },
      { to: "/get-quote", label: "Get a Quote" },
    ],
  },
  {
    heading: "Portfolio",
    icon: FolderOpen,
    links: [
      { to: "/projects", label: "Projects" },
      { to: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "Legal",
    icon: Shield,
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms & Conditions" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { 
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } 
  },
};

const Sitemap = () => {
  const { data: services = [] } = useServices();

  const serviceSection = {
    heading: "Services",
    icon: Briefcase,
    links: [
      { to: "/services", label: "All Services" },
      ...services.map((s) => ({
        to: `/services/${s.slug}`,
        label: s.title,
      })),
    ],
  };

  const allSections = [siteLinks[0], serviceSection, ...siteLinks.slice(1)];

  return (
    <Layout>
      <Helmet>
        <title>Sitemap — Vintech Systems and Consulting</title>
        <meta name="description" content="Browse every page on the Vintech Systems and Consulting website. Find services, projects, blog posts, and more." />
        <link rel="canonical" href="https://vintechsystems.store/sitemap" />
      </Helmet>

      <section className="gradient-hero pt-32 pb-16 overflow-hidden">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">
                Navigate
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">
              Sitemap
            </h1>
            <p className="text-primary-foreground/70 mt-4 max-w-lg">
              A complete map of everything on our site — find exactly what you need.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {allSections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.heading}
                  variants={itemVariants}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-accent" />
                    </div>
                    <h2 className="font-heading text-lg font-semibold text-foreground">
                      {section.heading}
                    </h2>
                  </div>
                  <ul className="space-y-1.5 pl-1">
                    {section.links.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className="group flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-200 py-1 text-sm"
                        >
                          <span className="w-1 h-1 rounded-full bg-border group-hover:bg-accent transition-colors" />
                          {link.label}
                          <ExternalLink className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Sitemap;
