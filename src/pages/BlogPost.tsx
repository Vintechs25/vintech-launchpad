import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Tag, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";
import RichContent from "@/components/RichContent";
import { useBlogPost } from "@/hooks/usePublicData";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug);

  if (isLoading) {
    return (
      <Layout>
        <SectionWrapper className="pt-32">
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-accent" size={24} /></div>
        </SectionWrapper>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <SectionWrapper className="pt-32">
          <div className="text-center py-20">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
            <Link to="/blog" className="text-accent font-medium hover:underline">← Back to Blog</Link>
          </div>
        </SectionWrapper>
      </Layout>
    );
  }

  const excerpt = post.excerpt || post.content.slice(0, 155);

  return (
    <Layout>
      <Helmet>
        <title>{post.title} — Vintech Consulting Blog</title>
        <meta name="description" content={excerpt} />
        <link rel="canonical" href={`https://vintechsystems.store/blog/${slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": excerpt,
          "datePublished": post.created_at,
          "author": { "@type": "Organization", "name": "Vintech Consulting" },
          "publisher": { "@type": "Organization", "name": "Vintech Consulting" },
          ...(post.image_url ? { "image": post.image_url } : {}),
          "url": `https://vintechsystems.store/blog/${slug}`
        })}</script>
      </Helmet>

      <section className="gradient-hero pt-32 pb-16 overflow-hidden">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/blog" className="inline-flex items-center gap-1 text-accent text-sm font-medium mb-4 hover:underline">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 mt-4 text-sm text-primary-foreground/60">
              {post.created_at && (
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              )}
              {post.category && <span className="flex items-center gap-1"><Tag size={14} /> {post.category}</span>}
            </div>
          </motion.div>
        </div>
      </section>

      {post.image_url && (
        <div className="container-wide px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <img src={post.image_url} alt={post.title} className="w-full max-w-3xl mx-auto h-64 md:h-80 object-cover rounded-xl shadow-lg" />
        </div>
      )}

      <SectionWrapper>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto prose-custom"
        >
          <RichContent content={post.content} />
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-foreground font-semibold mb-2">Ready to take action?</p>
            <Link to="/get-quote" className="btn-primary inline-flex items-center gap-2">
              Get a Free Quote
            </Link>
          </div>
        </motion.article>
      </SectionWrapper>
    </Layout>
  );
};

export default BlogPost;
