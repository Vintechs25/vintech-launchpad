import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Globe, Shield, Headphones, Brain, Server, Link2, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";
import ServiceCard from "@/components/ServiceCard";

const services = [
  { title: "Web Development", description: "Custom web applications, e-commerce platforms, and progressive web apps built with cutting-edge frameworks.", icon: Globe, slug: "web-development" },
  { title: "Cybersecurity", description: "Comprehensive security audits, penetration testing, threat monitoring, and compliance consulting.", icon: Shield, slug: "cybersecurity" },
  { title: "IT Support", description: "Managed IT services with proactive monitoring, helpdesk, and infrastructure management.", icon: Headphones, slug: "it-support" },
  { title: "Consulting", description: "Technology strategy, digital transformation roadmaps, and architecture consulting.", icon: Brain, slug: "consulting" },
  { title: "Managed Hosting", description: "Enterprise-grade cloud hosting with auto-scaling, backups, and 99.9% uptime SLA.", icon: Server, slug: "managed-hosting" },
  { title: "Domain Management", description: "Domain registration, DNS management, SSL certificates, and renewal automation.", icon: Link2, slug: "domain-management" },
];

const Services = () => (
  <Layout>
    <Helmet>
      <title>Services — Vintech Consulting</title>
      <meta name="description" content="Explore Vintech's full suite of technology services including web development, cybersecurity, IT support, and managed hosting." />
    </Helmet>

    <section className="gradient-hero pt-32 pb-16">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <span className="text-accent text-sm font-semibold tracking-widest uppercase">What We Offer</span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mt-2">Our Services</h1>
        <p className="text-primary-foreground/70 mt-4 max-w-lg">Enterprise-grade technology solutions designed to grow with your business.</p>
      </div>
    </section>

    <SectionWrapper>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <ServiceCard key={s.slug} {...s} />
        ))}
      </div>
    </SectionWrapper>

    <SectionWrapper dark>
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">Need a Custom Solution?</h2>
        <p className="text-primary-foreground/70 mb-8">Every business is unique. Let's design a technology strategy tailored to yours.</p>
        <Link to="/get-quote" className="btn-primary text-base px-8 py-4">
          Get a Free Quote <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </SectionWrapper>
  </Layout>
);

export default Services;
