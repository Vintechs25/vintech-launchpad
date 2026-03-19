import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";
import { useContactInfo } from "@/hooks/useContactInfo";

const PrivacyPolicy = () => {
  const { data: info } = useContactInfo();
  const company = info?.company_name || "Vintech Systems and Consulting";
  const email = info?.email || "info@vintechsystems.store";
  const website = info?.website || "https://vintechsystems.store";

  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy — {company}</title>
        <meta name="description" content={`Privacy Policy for ${company}. Learn how we collect, use, and protect your personal information.`} />
        <link rel="canonical" href={`${website}/privacy`} />
      </Helmet>

      <section className="gradient-hero pt-32 pb-16 overflow-hidden">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Legal</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mt-2">Privacy Policy</h1>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <article className="max-w-3xl mx-auto prose-custom space-y-8">
          {info?.privacy_policy ? (
            info.privacy_policy.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed whitespace-pre-line">{paragraph}</p>
            ))
          ) : (
            <>
              <p className="text-muted-foreground leading-relaxed">
                {company} ("{company}", "we", "our", or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website or use our services.
              </p>
              <p className="text-muted-foreground leading-relaxed">By accessing our website, you agree to the terms of this Privacy Policy.</p>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">1. Information We Collect</h2>
                <h3 className="font-heading font-semibold text-foreground mb-2">Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-2">When you fill out contact forms, request a quote, communicate via WhatsApp or email, or subscribe to newsletters, we may collect:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Name</li><li>Email address</li><li>Phone number</li><li>Company name</li><li>Project details</li>
                </ul>
                <h3 className="font-heading font-semibold text-foreground mt-4 mb-2">Technical Information (automatically collected)</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>IP address</li><li>Browser type</li><li>Device information</li><li>Pages visited</li><li>Cookies and usage data</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">2. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-2">We use your information to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Respond to inquiries</li><li>Provide consulting or technical services</li><li>Send quotations or proposals</li><li>Communicate project updates</li><li>Improve website performance</li><li>Run analytics and marketing campaigns</li><li>Comply with legal obligations</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3 font-semibold">We DO NOT sell or rent your personal data.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">3. Cookies & Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">Our website may use cookies and similar technologies, including Google Analytics, Meta/Facebook Pixel, and performance tracking tools. You may disable cookies in your browser settings.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">4. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">We may use trusted third-party providers such as email providers, hosting providers, analytics services, and cloud infrastructure providers.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">We implement reasonable security measures to protect your data. However, no internet transmission is 100% secure.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">6. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">We retain information only as long as necessary for providing services, legal compliance, and business operations.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">7. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-2">You may request to access, correct, or delete your information, or opt out of communications.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">8. Links to Other Websites</h2>
                <p className="text-muted-foreground leading-relaxed">Our website may contain links to third-party sites. We are not responsible for their privacy practices.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">9. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">We may update this Privacy Policy at any time. Updates will be posted on this page.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">10. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {company}<br />
                  Email: <a href={`mailto:${email}`} className="text-accent hover:underline">{email}</a><br />
                  Website: <a href={website} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">{website}</a>
                </p>
              </section>
            </>
          )}
        </article>
      </SectionWrapper>
    </Layout>
  );
};

export default PrivacyPolicy;
