import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";

const posts = [
  {
    title: "5 Signs Your Business Needs a Cybersecurity Audit",
    excerpt: "Many businesses don't realize they're vulnerable until it's too late. Here are the warning signs to watch for.",
    date: "2026-01-15",
    category: "Cybersecurity",
    slug: "cybersecurity-audit-signs",
  },
  {
    title: "Why Custom Web Apps Outperform Templates",
    excerpt: "Off-the-shelf solutions can only take you so far. Discover why leading businesses invest in custom development.",
    date: "2026-01-08",
    category: "Web Development",
    slug: "custom-vs-template",
  },
  {
    title: "The True Cost of IT Downtime",
    excerpt: "Downtime costs more than you think. We break down the real financial impact and how to prevent it.",
    date: "2025-12-20",
    category: "IT Support",
    slug: "cost-of-downtime",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Blog = () => (
  <Layout>
    <Helmet>
      <title>Blog — Vintech Consulting</title>
      <meta name="description" content="Insights on web development, cybersecurity, IT strategy, and technology trends from the Vintech team." />
    </Helmet>

    <section className="gradient-hero pt-32 pb-16 overflow-hidden">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Insights</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mt-2">Blog</h1>
          <p className="text-primary-foreground/70 mt-4 max-w-lg">Technology insights and best practices from our team.</p>
        </motion.div>
      </div>
    </section>

    <SectionWrapper>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <Link to={`/blog/${post.slug}`} key={post.slug}>
            <motion.article
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="card-elevated p-6 flex flex-col h-full"
            >
              <span className="text-xs font-medium text-accent uppercase tracking-wider">{post.category}</span>
              <h2 className="font-heading font-semibold text-lg text-foreground mt-2 mb-3">{post.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={12} /> {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <span className="text-accent text-sm font-medium flex items-center gap-1">
                  Read more <ArrowRight size={12} />
                </span>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  </Layout>
);

export default Blog;
