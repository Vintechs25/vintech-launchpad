import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";

const blogPosts: Record<string, { title: string; category: string; date: string; content: string[] }> = {
  "cybersecurity-audit-signs": {
    title: "5 Signs Your Business Needs a Cybersecurity Audit",
    category: "Cybersecurity",
    date: "2026-01-15",
    content: [
      "In today's digital landscape, cybersecurity threats are evolving faster than ever. Many businesses don't realize they're vulnerable until it's too late — and the consequences can be devastating.",
      "**1. You Haven't Had an Audit in Over a Year** — Cyber threats change rapidly. If your last security review was more than 12 months ago, your defenses may already be outdated. Regular audits ensure your protections evolve with the threat landscape.",
      "**2. You've Recently Adopted New Technology** — Every new tool, platform, or integration introduces potential vulnerabilities. Whether it's a new cloud service, CRM, or remote work setup, each addition needs to be evaluated for security gaps.",
      "**3. Your Team Has Grown or Changed** — New employees, contractors, or departing staff all affect your security posture. Access management, credential hygiene, and onboarding protocols need regular review.",
      "**4. You Handle Sensitive Customer Data** — If your business processes personal information, financial data, or health records, a breach could result in regulatory fines and reputational damage. Compliance frameworks like GDPR, HIPAA, and PCI-DSS require ongoing security assessments.",
      "**5. You've Experienced Suspicious Activity** — Unusual login attempts, unexpected data transfers, or performance anomalies could indicate a breach in progress. An audit can identify whether you've been compromised and close the gaps.",
      "At Vintech Consulting, our cybersecurity audits provide a comprehensive assessment of your infrastructure, policies, and practices. We identify vulnerabilities before attackers do and deliver actionable recommendations to strengthen your defenses.",
    ],
  },
  "custom-vs-template": {
    title: "Why Custom Web Apps Outperform Templates",
    category: "Web Development",
    date: "2026-01-08",
    content: [
      "Off-the-shelf website templates and no-code builders have made it easier than ever to get online quickly. But for businesses that are serious about growth, these shortcuts often become bottlenecks.",
      "**Performance & Speed** — Templates come loaded with features you'll never use, resulting in bloated code and slower load times. Custom applications are built lean, optimized for your specific use case, and designed to score 90+ on Lighthouse performance audits.",
      "**Scalability** — As your business grows, template-based sites struggle to keep up. Custom applications are architected from the ground up to handle increasing traffic, data, and complexity without costly rebuilds.",
      "**Brand Differentiation** — Templates make your brand look like everyone else. A custom-built application gives you a unique digital identity that reinforces trust and professionalism — critical in competitive markets.",
      "**Security** — Popular templates are prime targets for attackers because their vulnerabilities are well-documented. Custom code, by contrast, presents a smaller attack surface and can be hardened to your specific compliance requirements.",
      "**Integration Flexibility** — Custom applications integrate seamlessly with your existing tools — CRMs, ERPs, payment gateways, and APIs — without the plugin conflicts and limitations that plague template-based solutions.",
      "At Vintech, we build custom web applications using React, TypeScript, and modern cloud infrastructure. The result is a fast, secure, and scalable product that's truly yours.",
    ],
  },
  "cost-of-downtime": {
    title: "The True Cost of IT Downtime",
    category: "IT Support",
    date: "2025-12-20",
    content: [
      "When your systems go down, the clock starts ticking — and the costs add up faster than most businesses realize. IT downtime isn't just an inconvenience; it's a direct hit to your bottom line.",
      "**Revenue Loss** — For e-commerce and SaaS businesses, every minute of downtime translates to lost transactions. Industry research estimates that downtime costs small businesses an average of $427 per minute, while enterprise organizations can lose upwards of $9,000 per minute.",
      "**Productivity Impact** — When systems are offline, your team can't work. Multiply the hourly cost of each affected employee by the duration of the outage, and the numbers become staggering — especially for distributed teams that rely entirely on cloud-based tools.",
      "**Customer Trust & Churn** — Repeated outages erode customer confidence. In competitive markets, customers won't wait — they'll switch to a competitor who can guarantee reliability. The long-term revenue impact of lost customers far exceeds the immediate cost of the outage itself.",
      "**Recovery Costs** — Beyond the outage, there's the cost of diagnosis, repair, data recovery, and the overtime hours your team puts in to get everything back online. Unplanned recovery is always more expensive than planned maintenance.",
      "**Reputation Damage** — In the age of social media, downtime doesn't stay private. Public-facing outages generate negative press, social media complaints, and loss of brand credibility that takes months to rebuild.",
      "The most cost-effective strategy is prevention. Vintech's managed IT support includes 24/7 proactive monitoring, automated failover systems, and regular infrastructure health checks — designed to catch problems before they become outages.",
    ],
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <Layout>
        <SectionWrapper>
          <div className="text-center py-20">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
            <Link to="/blog" className="text-accent font-medium hover:underline">← Back to Blog</Link>
          </div>
        </SectionWrapper>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{post.title} — Vintech Consulting Blog</title>
        <meta name="description" content={post.content[0].slice(0, 155)} />
        <link rel="canonical" href={`https://vintech.co/blog/${slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.content[0].slice(0, 155),
          "datePublished": post.date,
          "author": { "@type": "Organization", "name": "Vintech Consulting" },
          "publisher": { "@type": "Organization", "name": "Vintech Consulting" },
          "url": `https://vintech.co/blog/${slug}`
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
              <span className="flex items-center gap-1"><Clock size={14} /> {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span className="flex items-center gap-1"><Tag size={14} /> {post.category}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto prose-custom"
        >
          {post.content.map((paragraph, i) => (
            <p
              key={i}
              className="text-muted-foreground leading-relaxed mb-6 text-base"
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>'),
              }}
            />
          ))}
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
