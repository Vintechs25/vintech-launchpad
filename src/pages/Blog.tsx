import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";
import { useBlogPosts } from "@/hooks/usePublicData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Blog = () => {
  const { data: posts = [] } = useBlogPosts();

  return (
    <Layout>
      <Helmet>
        <title>Tech Blog — Web Dev & Cybersecurity Insights | Vintech</title>
        <meta name="description" content="Expert insights on web development, cybersecurity best practices, IT strategy, and technology trends from the Vintech Systems and Consulting team." />
        <link rel="canonical" href="https://vintechsystems.store/blog" />
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
            <Link to={`/blog/${post.slug}`} key={post.id}>
              <motion.article
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="card-elevated flex flex-col h-full overflow-hidden"
              >
                {post.image_url && (
                  <img src={post.image_url} alt={post.title} className="w-full h-40 object-cover" />
                )}
                <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-medium text-accent uppercase tracking-wider">{post.category}</span>
                <h2 className="font-heading font-semibold text-lg text-foreground mt-2 mb-3">{post.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={12} /> {post.created_at ? new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                  </span>
                  <span className="text-accent text-sm font-medium flex items-center gap-1">
                    Read more <ArrowRight size={12} />
                  </span>
                </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default Blog;
