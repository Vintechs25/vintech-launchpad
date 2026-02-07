import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";
import ProjectCard from "@/components/ProjectCard";
import { useProjects } from "@/hooks/usePublicData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Projects = () => {
  const { data: projects = [] } = useProjects();

  return (
    <Layout>
      <Helmet>
        <title>Our Work — Web & Cybersecurity Projects | Vintech</title>
        <meta name="description" content="See real results: web development, cybersecurity, and digital transformation projects delivered by Vintech Consulting." />
        <link rel="canonical" href="https://vintech.co/projects" />
      </Helmet>

      <section className="gradient-hero pt-32 pb-16 overflow-hidden">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Our Work</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mt-2">Projects</h1>
            <p className="text-primary-foreground/70 mt-4 max-w-lg">Real results for real businesses. Here's a selection of our recent work.</p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div key={p.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <ProjectCard title={p.title} category={p.category || ""} description={p.description} image={p.image_url || "/placeholder.svg"} />
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper dark>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">Have a Project in Mind?</h2>
          <p className="text-primary-foreground/70 mb-8">We'd love to hear about it. Let's build something great together.</p>
          <Link to="/get-quote" className="btn-primary text-base px-8 py-4">
            Start a Project <ArrowRight size={18} className="ml-2" />
          </Link>
        </motion.div>
      </SectionWrapper>
    </Layout>
  );
};

export default Projects;
