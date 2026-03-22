import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Users, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";

const tools = ["React", "TypeScript", "Node.js", "WordPress", "Docker", "PostgreSQL", "MySQL", "Python", "Linux", "cPanel", "Cloudflare", "AWS"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const values = [
  { icon: Target, title: "Our Mission", desc: "To empower Kenyan businesses with reliable, world-class technology — at fair prices." },
  { icon: Eye, title: "Our Vision", desc: "To become East Africa's most trusted name in IT solutions and digital transformation." },
  { icon: Users, title: "Our Team", desc: "Experienced engineers who understand the Kenyan market and are passionate about your success." },
  { icon: Code2, title: "Our Promise", desc: "Transparent pricing, clear timelines, honest communication — no surprises, ever." },
];

const About = () => (
  <Layout>
      <Helmet>
        <title>About Vintech — Kenya's Trusted IT Company | Vintech Systems</title>
        <meta name="description" content="Vintech Systems and Consulting is a Kenyan IT company trusted by businesses across the nation. Learn about our mission to make enterprise-grade technology accessible to every business." />
        <link rel="canonical" href="https://vintechsystems.store/about" />
      </Helmet>

    <section className="gradient-hero pt-32 pb-16 overflow-hidden">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">About Vintech</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mt-2">Built in Kenya. Trusted Nationwide.</h1>
          <p className="text-primary-foreground/70 mt-4 max-w-lg">We're not just another IT company — we're your long-term technology partner, invested in your growth.</p>
        </motion.div>
      </div>
    </section>

    <SectionWrapper>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Why We Exist
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Too many Kenyan businesses have been burned by unreliable tech vendors — missed deadlines, hidden fees, websites that break after a month, and zero accountability. We started Vintech to change that.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Based in Nairobi, Vintech Systems and Consulting delivers professional web development, cybersecurity, IT support, and managed hosting to businesses of all sizes across Kenya. We combine deep technical expertise with a genuine understanding of the local market.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Whether you're a startup launching your first website, an SME upgrading your infrastructure, or an enterprise securing sensitive data — we have the skills, the tools, and the track record to deliver.
          </p>
          <p className="text-foreground font-medium">
            When you work with Vintech, you get a partner who shows up, communicates clearly, and treats your business like our own.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-6">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="card-elevated p-6 text-center"
            >
              <item.icon size={28} className="text-accent mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-secondary">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
        <span className="text-accent text-sm font-semibold tracking-widest uppercase">Enterprise-Grade Stack</span>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2">Technologies We Work With</h2>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">We use the same tools trusted by global tech leaders — adapted for the Kenyan business environment.</p>
      </motion.div>
      <div className="flex flex-wrap justify-center gap-3">
        {tools.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-foreground"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </SectionWrapper>

    <SectionWrapper dark>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto">
        <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">Ready to Work With a Team That Actually Delivers?</h2>
        <p className="text-primary-foreground/70 mb-8">No empty promises. No inflated timelines. Just professional, reliable technology solutions built for your success. Let's talk.</p>
        <Link to="/get-quote" className="btn-primary text-base px-8 py-4">
          Get Your Free Quote <ArrowRight size={18} className="ml-2" />
        </Link>
      </motion.div>
    </SectionWrapper>
  </Layout>
);

export default About;
