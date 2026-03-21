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
  { icon: Target, title: "Mission", desc: "Deliver reliable tech solutions that help businesses grow" },
  { icon: Eye, title: "Vision", desc: "Be East Africa's most trusted technology partner" },
  { icon: Users, title: "Team", desc: "Skilled engineers passionate about solving real problems" },
  { icon: Code2, title: "Approach", desc: "Transparent pricing, clear timelines, honest communication" },
];

const About = () => (
  <Layout>
      <Helmet>
        <title>About Us — Mission & Team | Vintech Systems and Consulting</title>
        <meta name="description" content="Learn about Vintech Systems and Consulting: our mission to make enterprise tech accessible, our experienced engineering team, and our results-driven approach." />
        <link rel="canonical" href="https://vintechsystems.store/about" />
      </Helmet>

    <section className="gradient-hero pt-32 pb-16 overflow-hidden">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">About Us</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mt-2">Our Story</h1>
          <p className="text-primary-foreground/70 mt-4 max-w-lg">Built by engineers, driven by results.</p>
        </motion.div>
      </div>
    </section>

    <SectionWrapper>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Technology That Drives Business Forward
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vintech Systems and Consulting is a Nairobi-based technology firm offering web development, cybersecurity, IT support, and managed hosting to businesses across Kenya and East Africa.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We started because too many businesses were paying too much for unreliable tech vendors and cookie-cutter solutions. Vintech was built to offer honest, hands-on engineering — with transparent pricing and real accountability.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're a startup launching your first website or an established company upgrading your infrastructure, we're here to help you build with confidence.
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
        <span className="text-accent text-sm font-semibold tracking-widest uppercase">Our Stack</span>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2">Technologies We Work With</h2>
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
        <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">Let's Work Together</h2>
        <p className="text-primary-foreground/70 mb-8">Ready to build something great? We'd love to hear from you.</p>
        <Link to="/get-quote" className="btn-primary text-base px-8 py-4">
          Get a Free Quote <ArrowRight size={18} className="ml-2" />
        </Link>
      </motion.div>
    </SectionWrapper>
  </Layout>
);

export default About;
