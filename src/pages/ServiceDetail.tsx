import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";
import FAQAccordion from "@/components/FAQAccordion";

const serviceData: Record<string, {
  title: string; tagline: string; description: string;
  benefits: string[]; features: string[];
  process: { step: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}> = {
  "web-development": {
    title: "Web Development",
    tagline: "Build digital products that convert",
    description: "We design and develop high-performance web applications, e-commerce platforms, and custom software solutions using modern frameworks and best practices.",
    benefits: ["Faster load times & better SEO", "Mobile-first responsive design", "Scalable architecture", "Conversion-optimized UX"],
    features: ["Custom React/Next.js apps", "E-commerce platforms", "Progressive Web Apps", "API integrations", "CMS development", "Performance optimization"],
    process: [
      { step: "Discovery", desc: "We understand your business goals and technical requirements." },
      { step: "Design", desc: "UX/UI wireframes and prototypes for your approval." },
      { step: "Development", desc: "Agile sprints with regular demos and feedback loops." },
      { step: "Launch & Support", desc: "Deployment, monitoring, and ongoing maintenance." },
    ],
    faqs: [
      { question: "How long does a typical project take?", answer: "Most web projects take 4-12 weeks depending on complexity. We provide a detailed timeline during discovery." },
      { question: "Do you provide ongoing support?", answer: "Yes, we offer managed support plans that include updates, monitoring, and feature enhancements." },
      { question: "What technologies do you use?", answer: "We primarily work with React, TypeScript, Node.js, and modern cloud infrastructure. We choose the best stack for each project." },
    ],
  },
  "cybersecurity": {
    title: "Cybersecurity",
    tagline: "Protect your business from threats",
    description: "Our cybersecurity services protect your digital assets with enterprise-grade security audits, real-time threat monitoring, and rapid incident response.",
    benefits: ["Reduced breach risk", "Regulatory compliance", "24/7 threat monitoring", "Rapid incident response"],
    features: ["Penetration testing", "Security audits", "SIEM implementation", "Employee training", "Compliance consulting", "Incident response planning"],
    process: [
      { step: "Assessment", desc: "Comprehensive security posture evaluation." },
      { step: "Strategy", desc: "Custom security roadmap based on findings." },
      { step: "Implementation", desc: "Deploy security tools and policies." },
      { step: "Monitor", desc: "Continuous monitoring and quarterly reviews." },
    ],
    faqs: [
      { question: "How often should we do a security audit?", answer: "We recommend at least annually, or after any significant infrastructure change." },
      { question: "Do you help with compliance?", answer: "Yes, we assist with GDPR, SOC 2, ISO 27001, and other regulatory frameworks." },
    ],
  },
  "it-support": {
    title: "IT Support",
    tagline: "Keep your operations running 24/7",
    description: "Proactive, reliable managed IT support with dedicated engineers, remote and on-site assistance, and infrastructure monitoring.",
    benefits: ["Minimize downtime", "Predictable IT costs", "Expert support team", "Proactive maintenance"],
    features: ["24/7 helpdesk", "Remote & on-site support", "Network monitoring", "Patch management", "Hardware procurement", "Vendor management"],
    process: [
      { step: "Onboarding", desc: "Audit existing infrastructure and document everything." },
      { step: "Transition", desc: "Seamless handover from your current provider." },
      { step: "Operate", desc: "Daily monitoring, ticket resolution, and maintenance." },
      { step: "Optimize", desc: "Quarterly reviews and improvement recommendations." },
    ],
    faqs: [
      { question: "What is your response time?", answer: "Critical issues: 15 minutes. High priority: 1 hour. Standard: 4 hours." },
      { question: "Can you support remote teams?", answer: "Absolutely. We support distributed teams across multiple time zones." },
    ],
  },
  consulting: {
    title: "Technology Consulting",
    tagline: "Align technology with business goals",
    description: "Strategic technology advisory services to help you make informed decisions about your IT investments and digital transformation journey.",
    benefits: ["Clear technology roadmap", "Reduced IT waste", "Better vendor selection", "Faster digital transformation"],
    features: ["Technology audits", "Digital transformation strategy", "Architecture consulting", "Vendor evaluation", "IT budgeting", "Team augmentation"],
    process: [
      { step: "Understand", desc: "Deep dive into your business and technology landscape." },
      { step: "Analyze", desc: "Identify gaps, risks, and opportunities." },
      { step: "Recommend", desc: "Deliver actionable strategy with prioritized roadmap." },
      { step: "Support", desc: "Guide implementation and measure outcomes." },
    ],
    faqs: [
      { question: "How is consulting different from a project?", answer: "Consulting focuses on strategy and planning. We help you decide what to build before building it." },
    ],
  },
  "managed-hosting": {
    title: "Managed Hosting",
    tagline: "Enterprise infrastructure, zero hassle",
    description: "Fully managed cloud hosting with auto-scaling, daily backups, security hardening, and 99.9% uptime guarantee.",
    benefits: ["99.9% uptime SLA", "Auto-scaling", "Daily backups", "DDoS protection"],
    features: ["Cloud infrastructure", "Load balancing", "SSL management", "Database hosting", "CDN setup", "Disaster recovery"],
    process: [
      { step: "Assess", desc: "Evaluate your current hosting needs and traffic." },
      { step: "Migrate", desc: "Zero-downtime migration to managed infrastructure." },
      { step: "Optimize", desc: "Performance tuning and security hardening." },
      { step: "Manage", desc: "24/7 monitoring, updates, and scaling." },
    ],
    faqs: [
      { question: "Is this shared or dedicated hosting?", answer: "We provide isolated cloud infrastructure — no shared resources. Your environment is entirely yours." },
    ],
  },
  "domain-management": {
    title: "Domain Management",
    tagline: "Your digital identity, handled",
    description: "Complete domain lifecycle management including registration, DNS configuration, SSL certificates, and automated renewals.",
    benefits: ["Never miss a renewal", "Proper DNS setup", "SSL always active", "Centralized management"],
    features: ["Domain registration", "DNS management", "SSL certificates", "WHOIS privacy", "Email routing", "Subdomain management"],
    process: [
      { step: "Audit", desc: "Review all existing domains and DNS records." },
      { step: "Consolidate", desc: "Move all domains to a unified management platform." },
      { step: "Secure", desc: "Set up SSL, DNSSEC, and WHOIS privacy." },
      { step: "Automate", desc: "Configure auto-renewals and monitoring alerts." },
    ],
    faqs: [
      { question: "Can you transfer domains from another registrar?", answer: "Yes, we handle the entire transfer process with zero downtime." },
    ],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;

  if (!service) {
    return (
      <Layout>
        <SectionWrapper className="pt-32 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">Service not found</h1>
          <Link to="/services" className="text-accent mt-4 inline-block">← Back to Services</Link>
        </SectionWrapper>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{service.title} Services — Vintech Consulting</title>
        <meta name="description" content={service.description.slice(0, 155)} />
        <link rel="canonical" href={`https://vintech.co/services/${slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": service.title,
          "description": service.description,
          "provider": { "@type": "Organization", "name": "Vintech Consulting" },
          "url": `https://vintech.co/services/${slug}`
        })}</script>
      </Helmet>

      <section className="gradient-hero pt-32 pb-16">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="text-accent text-sm hover:underline">← All Services</Link>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mt-4">{service.title}</h1>
          <p className="text-primary-foreground/70 mt-3 text-lg">{service.tagline}</p>
        </div>
      </section>

      <SectionWrapper>
        <div className="max-w-3xl">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">{service.description}</p>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Key Benefits</h2>
          <ul className="grid sm:grid-cols-2 gap-3 mb-12">
            {service.benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-foreground">
                <CheckCircle size={16} className="text-accent flex-shrink-0" /> {b}
              </li>
            ))}
          </ul>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">What's Included</h2>
          <ul className="grid sm:grid-cols-2 gap-3 mb-12">
            {service.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle size={16} className="text-accent flex-shrink-0" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-secondary">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Our Process</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((p, i) => (
            <div key={i} className="relative">
              <span className="text-5xl font-heading font-bold text-accent/20">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-heading font-semibold text-foreground mt-2">{p.step}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="max-w-2xl">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <FAQAccordion items={service.faqs} />
        </div>
      </SectionWrapper>

      <SectionWrapper dark>
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">Ready to get started?</h2>
          <p className="text-primary-foreground/70 mb-8">Let's discuss how our {service.title.toLowerCase()} services can help your business.</p>
          <Link to="/get-quote" className="btn-primary text-base px-8 py-4">
            Get a Free Quote <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default ServiceDetail;
