import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight, Zap, Users, Award, Clock
} from "lucide-react";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import TestimonialCard from "@/components/TestimonialCard";
import StatsCounter from "@/components/StatsCounter";
import { useServices, useProjects, useTestimonials, useStats } from "@/hooks/usePublicData";
import heroBg from "@/assets/hero-bg.jpg";

const whyUs = [
  { icon: Zap, title: "Fast Delivery", desc: "Agile methodology means your project launches on time." },
  { icon: Users, title: "Dedicated Team", desc: "A senior engineer assigned to your account, not a ticket queue." },
  { icon: Award, title: "Proven Track Record", desc: "50+ projects delivered for clients across 3 continents." },
  { icon: Clock, title: "24/7 Support", desc: "Round-the-clock monitoring and rapid incident response." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => {
  const { data: services = [] } = useServices();
  const { data: projects = [] } = useProjects();
  const { data: testimonials = [] } = useTestimonials();
  const { data: stats = [] } = useStats();

  return (
    <Layout>
      <Helmet>
        <title>Vintech Consulting — Web Development, Cybersecurity & IT Solutions</title>
        <meta name="description" content="Vintech Consulting delivers enterprise-grade web development, cybersecurity, IT support, and managed hosting for growing businesses worldwide. Get a free quote today." />
        <link rel="canonical" href="https://vintechsystems.store/" />
        <meta property="og:title" content="Vintech Consulting — Web Development, Cybersecurity & IT Solutions" />
        <meta property="og:description" content="Enterprise-grade web development, cybersecurity, IT support, and managed hosting for growing businesses." />
        <meta property="og:url" content="https://vintechsystems.store/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Vintech Consulting — Web Development, Cybersecurity & IT Solutions",
          "description": "Enterprise-grade web development, cybersecurity, IT support, and managed hosting for growing businesses worldwide.",
          "url": "https://vintechsystems.store/"
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero opacity-80" />
        </div>
        <div className="relative container-wide px-4 sm:px-6 lg:px-8 py-32">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="inline-block text-accent text-sm font-semibold tracking-widest uppercase mb-4">Technology Consulting</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Secure. Host. <span className="text-gradient">Empower.</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8 max-w-lg">
              We help businesses build robust digital products, secure their infrastructure, and scale with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/get-quote" className="btn-primary text-base px-8 py-4">
                Get a Free Quote <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/services" className="btn-outline text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 text-base px-8 py-4">
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <SectionWrapper>
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">What We Do</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Our Services</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">End-to-end technology solutions tailored for your business.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <ServiceCard title={s.title} description={s.description} icon={s.icon} slug={s.slug} />
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Why Choose Us */}
      <SectionWrapper className="bg-secondary">
        <div className="text-center mb-12">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Why Vintech</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Why Choose Us</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUs.map((item, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
              <div className="w-14 h-14 rounded-xl gradient-cta flex items-center justify-center mx-auto mb-4">
                <item.icon size={24} className="text-accent-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Featured Projects */}
      {projects.length > 0 && (
        <SectionWrapper>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">Our Work</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Featured Projects</h2>
            </div>
            <Link to="/projects" className="text-accent font-medium text-sm flex items-center gap-1 mt-4 md:mt-0 hover:underline">
              View all projects <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((p, i) => (
              <motion.div key={p.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <ProjectCard title={p.title} category={p.category || ""} description={p.description} image={p.image_url || "/placeholder.svg"} />
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Stats */}
      {stats.length > 0 && (
        <SectionWrapper dark>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <StatsCounter key={s.id} value={s.value} suffix={s.suffix || ""} label={s.label} />
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <SectionWrapper>
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Testimonials</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <TestimonialCard quote={t.quote} name={t.name} role={t.role || ""} company={t.company || ""} />
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* CTA Banner */}
      <SectionWrapper dark>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Transform Your Business?</h2>
          <p className="text-primary-foreground/70 mb-8">Let's discuss how Vintech can help you build, secure, and scale your technology.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-quote" className="btn-primary text-base px-8 py-4">Get a Free Quote <ArrowRight size={18} className="ml-2" /></Link>
            <Link to="/contact" className="btn-outline text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 text-base px-8 py-4">Contact Us</Link>
          </div>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default Index;
