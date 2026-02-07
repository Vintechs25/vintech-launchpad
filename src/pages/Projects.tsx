import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";
import ProjectCard from "@/components/ProjectCard";
import projectTechlam from "@/assets/project-techlam.jpg";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectSecurity from "@/assets/project-security.jpg";

const projects = [
  {
    title: "Techlam Energy",
    category: "Energy Sector",
    description: "Complete digital transformation — custom analytics dashboard, customer portal, and operational tooling for a growing energy company.",
    image: projectTechlam,
    slug: "techlam-energy",
  },
  {
    title: "E-Commerce Platform",
    category: "Retail",
    description: "High-conversion online store with custom product configurator, inventory management, and multi-gateway payment integration.",
    image: projectEcommerce,
    slug: "ecommerce-platform",
  },
  {
    title: "Security Operations Center",
    category: "Cybersecurity",
    description: "Real-time threat monitoring dashboard with automated alerting for a mid-market financial services firm.",
    image: projectSecurity,
    slug: "security-operations",
  },
];

const Projects = () => (
  <Layout>
    <Helmet>
      <title>Projects — Vintech Consulting</title>
      <meta name="description" content="Explore our portfolio of successful projects across web development, cybersecurity, and digital transformation." />
    </Helmet>

    <section className="gradient-hero pt-32 pb-16">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <span className="text-accent text-sm font-semibold tracking-widest uppercase">Our Work</span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mt-2">Projects</h1>
        <p className="text-primary-foreground/70 mt-4 max-w-lg">Real results for real businesses. Here's a selection of our recent work.</p>
      </div>
    </section>

    <SectionWrapper>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.slug} {...p} />
        ))}
      </div>
    </SectionWrapper>

    <SectionWrapper dark>
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">Have a Project in Mind?</h2>
        <p className="text-primary-foreground/70 mb-8">We'd love to hear about it. Let's build something great together.</p>
        <Link to="/get-quote" className="btn-primary text-base px-8 py-4">
          Start a Project <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </SectionWrapper>
  </Layout>
);

export default Projects;
