import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";
import ServiceCard from "@/components/ServiceCard";
import { useServices } from "@/hooks/usePublicData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Services = () => {
  const { data: services = [] } = useServices();

  return (
    <Layout>
      <Helmet>
        <title>IT Services — Web Dev, Cybersecurity & Hosting in Kenya | Vintech</title>
        <meta name="description" content="Explore Vintech's professional IT services: custom web development, cybersecurity audits, managed hosting, IT support, and technology consulting — trusted by businesses across Kenya." />
        <link rel="canonical" href="https://vintechsystems.store/services" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Vintech Systems and Consulting Services",
          "itemListElement": services.map((s, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": s.title,
            "url": `https://vintechsystems.store/services/${s.slug}`
          }))
        })}</script>
      </Helmet>

      <section className="gradient-hero pt-32 pb-16 overflow-hidden">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Professional IT Solutions</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mt-2">Services Built for Kenyan Businesses</h1>
            <p className="text-primary-foreground/70 mt-4 max-w-lg">From startups to established enterprises — we deliver the technology solutions that help you compete, grow, and win.</p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={s.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <ServiceCard title={s.title} description={s.description} icon={s.icon} slug={s.slug} />
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper dark>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">Need a Tailored Solution?</h2>
          <p className="text-primary-foreground/70 mb-8">Every business is unique. Tell us your challenge and we'll design a technology strategy that fits your goals, your budget, and your timeline — guaranteed.</p>
          <Link to="/get-quote" className="btn-primary text-base px-8 py-4">
            Get Your Free Quote <ArrowRight size={18} className="ml-2" />
          </Link>
        </motion.div>
      </SectionWrapper>
    </Layout>
  );
};

export default Services;
