import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight, Zap, Users, Award, Clock, CheckCircle2, ShieldCheck, HeartHandshake, TrendingUp
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
  { icon: Zap, title: "Rapid Delivery", desc: "From brief to launch in record time. Our agile methodology means your business never waits — we move as fast as you do." },
  { icon: HeartHandshake, title: "Dedicated Partnership", desc: "You speak directly with our engineers — no middlemen, no call centres. Your success is personal to us." },
  { icon: ShieldCheck, title: "Proven & Trusted", desc: "Kenyan businesses rely on Vintech because we deliver — on time, on budget, every single time." },
  { icon: TrendingUp, title: "Long-Term Growth", desc: "We don't disappear after launch. Continuous monitoring, updates, and strategic support keep you ahead of the competition." },
];

const trustBadges = [
  "🇰🇪 Proudly Kenyan",
  "Enterprise-Grade Security",
  "24/7 Technical Support",
  "Transparent Pricing — No Hidden Fees",
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
        <title>Vintech Systems and Consulting — Kenya's Trusted IT Partner for Web, Cyber & Hosting</title>
        <meta name="description" content="Vintech Systems and Consulting — Nairobi's premier technology partner. We deliver professional web development, cybersecurity, managed hosting & IT support trusted by businesses across Kenya. Get a free quote today." />
        <link rel="canonical" href="https://vintechsystems.store/" />
        <meta property="og:title" content="Vintech Systems and Consulting — Kenya's Trusted IT Partner" />
        <meta property="og:description" content="Professional web development, cybersecurity, managed hosting & IT support trusted by businesses across Kenya." />
        <meta property="og:url" content="https://vintechsystems.store/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Vintech Systems and Consulting — Kenya's Trusted IT Partner",
          "description": "Nairobi's premier technology partner delivering professional web development, cybersecurity, managed hosting & IT support trusted by businesses across Kenya.",
          "url": "https://vintechsystems.store/"
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero opacity-85" />
          <div className="absolute inset-0 pattern-dots" />
        </div>
        <div className="relative container-wide px-4 sm:px-6 lg:px-8 py-32">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block text-accent text-sm font-semibold tracking-widest uppercase mb-4"
            >
            Kenya's Trusted Technology Partner
            </motion.span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Your Business Deserves{" "}
              <span className="text-gradient">World-Class Technology.</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8 max-w-lg">
              We build, secure, and manage the digital infrastructure that powers Kenya's most ambitious businesses. From custom websites to bulletproof cybersecurity — partner with a team that truly understands your market.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/get-quote" className="btn-primary text-base px-8 py-4">
                Get Your Free Quote <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/services" className="btn-outline text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 text-base px-8 py-4">
                Explore Our Services
              </Link>
            </div>
            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {trustBadges.map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground/60">
                  <CheckCircle2 size={13} className="text-accent" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <SectionWrapper>
          <div className="text-center mb-14">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">What We Do</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">Solutions That Drive Results</h2>
            <div className="section-divider mb-4" />
            <p className="text-muted-foreground max-w-lg mx-auto">End-to-end technology solutions designed for the Kenyan business landscape — reliable, scalable, and built to give you a competitive edge.</p>
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
        <div className="text-center mb-14">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">The Vintech Advantage</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">Why Leading Businesses Choose Vintech</h2>
          <div className="section-divider" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUs.map((item, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center group">
              <div className="w-16 h-16 rounded-2xl gradient-cta flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110 shadow-lg" style={{ boxShadow: "0 8px 24px -6px hsl(199 89% 48% / 0.3)" }}>
                <item.icon size={26} className="text-accent-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Featured Projects */}
      {projects.length > 0 && (
        <SectionWrapper>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">Our Track Record</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Projects That Speak for Themselves</h2>
            </div>
            <Link to="/projects" className="text-accent font-medium text-sm flex items-center gap-1 mt-4 md:mt-0 hover:underline underline-offset-4 transition-all">
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
          <div className="pattern-dots absolute inset-0 pointer-events-none" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
            {stats.map((s) => (
              <StatsCounter key={s.id} value={s.value} suffix={s.suffix || ""} label={s.label} />
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <SectionWrapper>
          <div className="text-center mb-14">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Client Success Stories</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">Trusted by Businesses Across Kenya</h2>
            <div className="section-divider" />
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
        <div className="pattern-dots absolute inset-0 pointer-events-none" />
        <div className="text-center max-w-2xl mx-auto relative">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Stop Losing Customers to Poor Technology</h2>
          <p className="text-primary-foreground/70 mb-8 text-lg">Every day without a professional digital presence costs your business real revenue. Let's fix that — talk to our team today and get a free, no-obligation consultation.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-quote" className="btn-primary text-base px-8 py-4">Get Your Free Quote <ArrowRight size={18} className="ml-2" /></Link>
            <Link to="/contact" className="btn-outline text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 text-base px-8 py-4">Talk to an Expert</Link>
          </div>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default Index;
