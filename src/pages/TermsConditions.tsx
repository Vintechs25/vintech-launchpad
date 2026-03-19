import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";
import { useContactInfo } from "@/hooks/useContactInfo";

const TermsConditions = () => {
  const { data: info } = useContactInfo();
  const company = info?.company_name || "Vintech Consulting";
  const email = info?.email || "info@vintechsystems.store";
  const website = info?.website || "https://vintechsystems.store";

  return (
    <Layout>
      <Helmet>
        <title>Terms & Conditions — {company}</title>
        <meta name="description" content={`Terms and Conditions for ${company}. Read the terms governing the use of our website and services.`} />
        <link rel="canonical" href={`${website}/terms`} />
      </Helmet>

      <section className="gradient-hero pt-32 pb-16 overflow-hidden">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Legal</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mt-2">Terms & Conditions</h1>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <article className="max-w-3xl mx-auto prose-custom space-y-8">
          {info?.terms_conditions ? (
            info.terms_conditions.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed whitespace-pre-line">{paragraph}</p>
            ))
          ) : (
            <>
              <p className="text-muted-foreground leading-relaxed">
                These Terms & Conditions govern your use of the {company} website and services. By using our website or services, you agree to these terms.
              </p>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">1. Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-2">{company} provides:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Web development</li><li>Software systems</li><li>IT support</li><li>Cybersecurity services</li><li>Consulting</li><li>Managed hosting and infrastructure management</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">2. Use of Website</h2>
                <p className="text-muted-foreground leading-relaxed">You agree not to misuse the website, attempt unauthorized access, disrupt services, or upload malicious content. We may restrict access for violations.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">3. Quotes & Proposals</h2>
                <p className="text-muted-foreground leading-relaxed">All quotations are estimates only, subject to change based on project scope, and valid for a limited time. Final pricing is confirmed in writing.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">4. Payments</h2>
                <p className="text-muted-foreground leading-relaxed">Where services are paid, payment terms will be defined in agreements. Late payments may delay services. Refunds are subject to agreed terms.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">5. Managed Hosting & Domains</h2>
                <p className="text-muted-foreground leading-relaxed">Where {company} provides hosting or domain services: infrastructure may be provided through third-party providers, we manage configuration and support, and we are not liable for third-party outages.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">6. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">Unless otherwise agreed, clients own their final deliverables upon full payment. {company} may showcase projects for portfolio purposes.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">{company} is not liable for indirect damages, data loss, business interruption, or third-party failures. Maximum liability shall not exceed fees paid for services.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">8. Service Availability</h2>
                <p className="text-muted-foreground leading-relaxed">We aim to maintain reliable services but do not guarantee uninterrupted availability or zero downtime.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">9. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">We may suspend or terminate services for non-payment, misuse, or violation of terms.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">10. Changes</h2>
                <p className="text-muted-foreground leading-relaxed">We may update these Terms at any time. Continued use indicates acceptance.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">11. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">These terms are governed by the laws applicable in your operating jurisdiction.</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">12. Contact</h2>
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

export default TermsConditions;
