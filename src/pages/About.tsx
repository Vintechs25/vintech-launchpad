import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Users, Code2, Shield, Cloud, Database, Cpu } from "lucide-react";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";

const tools = ["React", "TypeScript", "Node.js", "AWS", "Azure", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Terraform", "Python", "Go"];

const About = () => (
  <Layout>
    <Helmet>
      <title>About — Vintech Consulting</title>
      <meta name="description" content="Learn about Vintech Consulting — our mission, story, and the team behind enterprise-grade technology solutions." />
    </Helmet>

    <section className="gradient-hero pt-32 pb-16">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <span className="text-accent text-sm font-semibold tracking-widest uppercase">About Us</span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mt-2">Our Story</h1>
        <p className="text-primary-foreground/70 mt-4 max-w-lg">Built by engineers, driven by results.</p>
      </div>
    </section>

    <SectionWrapper>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Technology That Drives Business Forward
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vintech Consulting was founded with a clear mission: deliver enterprise-grade technology solutions to growing businesses without the enterprise price tag.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our founder saw too many businesses struggling with unreliable tech vendors, cookie-cutter solutions, and inflated costs. Vintech was built to change that — offering dedicated engineering talent, transparent processes, and solutions that actually scale.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, we serve clients across multiple continents, from startups to mid-market enterprises, helping them build, secure, and scale their digital infrastructure.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="card-elevated p-6 text-center">
            <Target size={28} className="text-accent mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-foreground">Mission</h3>
            <p className="text-xs text-muted-foreground mt-1">Make enterprise tech accessible to every business</p>
          </div>
          <div className="card-elevated p-6 text-center">
            <Eye size={28} className="text-accent mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-foreground">Vision</h3>
            <p className="text-xs text-muted-foreground mt-1">Be the most trusted tech partner globally</p>
          </div>
          <div className="card-elevated p-6 text-center">
            <Users size={28} className="text-accent mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-foreground">Team</h3>
            <p className="text-xs text-muted-foreground mt-1">Senior engineers with 10+ years experience</p>
          </div>
          <div className="card-elevated p-6 text-center">
            <Code2 size={28} className="text-accent mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-foreground">Approach</h3>
            <p className="text-xs text-muted-foreground mt-1">Agile, transparent, and results-driven</p>
          </div>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary">
      <div className="text-center mb-10">
        <span className="text-accent text-sm font-semibold tracking-widest uppercase">Our Stack</span>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2">Technologies We Work With</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {tools.map((t) => (
          <span key={t} className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-foreground">
            {t}
          </span>
        ))}
      </div>
    </SectionWrapper>

    <SectionWrapper dark>
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">Let's Work Together</h2>
        <p className="text-primary-foreground/70 mb-8">Ready to build something great? We'd love to hear from you.</p>
        <Link to="/get-quote" className="btn-primary text-base px-8 py-4">
          Get a Free Quote <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </SectionWrapper>
  </Layout>
);

export default About;
