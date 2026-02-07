import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
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
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setSubmitted(true);
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <Layout>
      <Helmet>
        <title>{isQuote ? "Get a Quote" : "Contact Us"} — Vintech Consulting</title>
        <meta name="description" content="Get in touch with Vintech Consulting for a free quote on web development, cybersecurity, or IT consulting services." />
      </Helmet>

      <section className="gradient-hero pt-32 pb-16 overflow-hidden">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">
              {isQuote ? "Free Quote" : "Contact"}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mt-2">
              {isQuote ? "Get a Free Quote" : "Get in Touch"}
            </h1>
            <p className="text-primary-foreground/70 mt-4 max-w-lg">
              {isQuote
                ? "Tell us about your project and we'll get back to you within 24 hours with a detailed proposal."
                : "Have a question or ready to start a project? We'd love to hear from you."}
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
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Thank You!</h2>
                <p className="text-muted-foreground mb-6">We've received your message and will respond within 24 hours.</p>
                <a
                  href="https://wa.me/1234567890?text=Hi%20Vintech%2C%20I%20just%20submitted%20a%20quote%20request"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      maxLength={255}
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <input
                      type="tel"
                      maxLength={20}
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="+1 (234) 567-890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Service Needed *</label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => update("service", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Project Details *</label>
                  <textarea
                    required
                    maxLength={1000}
                    rows={5}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>
                <button type="submit" className="btn-primary text-base px-8 py-4">
                  {isQuote ? "Request Quote" : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="card-elevated p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Contact Info</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-accent" />
                  <a href="mailto:hello@vintech.co" className="hover:text-accent transition-colors">hello@vintech.co</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-accent" />
                  <a href="tel:+1234567890" className="hover:text-accent transition-colors">+1 (234) 567-890</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-accent mt-0.5" />
                  <span>Serving clients worldwide</span>
                </li>
              </ul>
            </div>
            <div className="card-elevated p-6">
              <h3 className="font-heading font-semibold text-foreground mb-2">Prefer WhatsApp?</h3>
              <p className="text-sm text-muted-foreground mb-4">Chat with us directly for faster responses.</p>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center gap-2"
              >
                <MessageCircle size={18} /> Chat Now
              </a>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default ContactPage;
