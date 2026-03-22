import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";

const serviceOptions = [
  "Web Development",
  "Cybersecurity",
  "IT Support",
  "Consulting",
  "Managed Hosting",
  "Domain Management",
  "Other",
];

const ContactPage = ({ isQuote = false }: { isQuote?: boolean }) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from("leads").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      service: form.service || null,
      message: form.message,
    });

    setSubmitting(false);

    if (error) {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
      return;
    }

    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setSubmitted(true);
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <Layout>
      <Helmet>
        <title>{isQuote ? "Get a Free Quote" : "Contact Us"} — Vintech Systems and Consulting</title>
        <meta name="description" content={isQuote ? "Request a free, no-obligation quote for web development, cybersecurity, IT support, or managed hosting from Vintech Systems and Consulting in Kenya." : "Contact Vintech Systems and Consulting for professional web development, cybersecurity, and IT solutions anywhere in Kenya. We respond within 24 hours — guaranteed."} />
        <link rel="canonical" href={isQuote ? "https://vintechsystems.store/get-quote" : "https://vintechsystems.store/contact"} />
      </Helmet>

      <section className="gradient-hero pt-32 pb-16 overflow-hidden">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">
              {isQuote ? "Free Consultation" : "Let's Connect"}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mt-2">
              {isQuote ? "Get Your Free, No-Obligation Quote" : "We're Ready When You Are"}
            </h1>
            <p className="text-primary-foreground/70 mt-4 max-w-lg">
              {isQuote
                ? "Tell us about your project and our team will respond within 24 hours with a detailed proposal — completely free, no strings attached."
                : "Whether you have a question, an idea, or a challenge — our team is here to help. Reach out and let's find the right solution together."}
            </p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 rounded-full gradient-cta flex items-center justify-center mx-auto mb-6">
                  <Mail size={28} className="text-accent-foreground" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Thank You for Reaching Out!</h2>
                <p className="text-muted-foreground mb-6">Your message is in safe hands. Our team will review your request and respond within 24 hours.</p>
                <a
                  href="https://wa.me/254719767590?text=Hi%20Vintech%2C%20I%20just%20submitted%20a%20quote%20request"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp for Faster Response
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                    <input type="text" required maxLength={100} value={form.name} onChange={(e) => update("name", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. James Kamau" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                    <input type="email" required maxLength={255} value={form.email} onChange={(e) => update("email", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="james@company.co.ke" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <input type="tel" maxLength={20} value={form.phone} onChange={(e) => update("phone", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+254 7XX XXX XXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Service Needed *</label>
                    <select required value={form.service} onChange={(e) => update("service", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="">Select a service</option>
                      {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tell Us About Your Project *</label>
                  <textarea required maxLength={1000} rows={5} value={form.message} onChange={(e) => update("message", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Describe your project, goals, and any specific requirements. The more detail, the better we can help..." />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary text-base px-8 py-4">
                  {submitting ? "Sending..." : isQuote ? "Request My Free Quote" : "Send Message"}
                </button>
                <p className="text-xs text-muted-foreground">🔒 Your information is secure and will never be shared with third parties.</p>
              </form>
            )}
          </motion.div>

          <motion.div className="space-y-6" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="card-elevated p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Get in Touch Directly</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-3"><Mail size={16} className="text-accent" /><a href="mailto:info@vintechsystems.store" className="hover:text-accent transition-colors">info@vintechsystems.store</a></li>
                <li className="flex items-center gap-3"><Phone size={16} className="text-accent" /><a href="tel:+254719767590" className="hover:text-accent transition-colors">+254 719 767 590</a></li>
                <li className="flex items-start gap-3"><MapPin size={16} className="text-accent mt-0.5" /><span>Serving clients across Kenya 🇰🇪</span></li>
              </ul>
            </div>
            <div className="card-elevated p-6">
              <h3 className="font-heading font-semibold text-foreground mb-2">Prefer WhatsApp?</h3>
              <p className="text-sm text-muted-foreground mb-4">Most of our clients reach us on WhatsApp for faster responses — we're just a tap away.</p>
              <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center gap-2">
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
            <div className="card-elevated p-6 bg-accent/5 border-accent/20">
              <h3 className="font-heading font-semibold text-foreground mb-2">⚡ 24-Hour Response Guarantee</h3>
              <p className="text-sm text-muted-foreground">Every enquiry gets a response within 24 hours — or your first consultation is on us.</p>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default ContactPage;
