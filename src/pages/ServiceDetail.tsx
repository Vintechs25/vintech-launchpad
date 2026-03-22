import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";
import FAQAccordion from "@/components/FAQAccordion";
import { useService } from "@/hooks/usePublicData";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading } = useService(slug);

  if (isLoading) {
    return (
      <Layout>
        <SectionWrapper className="pt-32">
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-accent" size={24} /></div>
        </SectionWrapper>
      </Layout>
    );
  }

  if (!service) {
    return (
      <Layout>
        <SectionWrapper className="pt-32 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">Service not found</h1>
          <Link to="/services" className="text-accent mt-4 inline-block">← Back to Services</Link>
        </SectionWrapper>
      </Layout>
    );
  }

  const features = Array.isArray(service.features) ? service.features as string[] : [];
  const benefits = Array.isArray((service as any).benefits) ? (service as any).benefits as string[] : [];
  const process = Array.isArray(service.process) ? service.process as { step: string; desc: string }[] : [];
  const faqs = Array.isArray(service.faq) ? service.faq as { question: string; answer: string }[] : [];
  const tagline = (service as any).tagline as string | null;
  const imageUrl = (service as any).image_url as string | null;

  return (
    <Layout>
      <Helmet>
        <title>{service.title} Services in Kenya — Vintech Systems and Consulting</title>
        <meta name="description" content={service.description.slice(0, 155)} />
        <link rel="canonical" href={`https://vintechsystems.store/services/${slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": service.title,
          "description": service.description,
          "provider": { "@type": "Organization", "name": "Vintech Systems and Consulting" },
          "areaServed": { "@type": "Country", "name": "Kenya" },
          "url": `https://vintechsystems.store/services/${slug}`
        })}</script>
      </Helmet>

      <section className="gradient-hero pt-32 pb-16">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="text-accent text-sm hover:underline">← All Services</Link>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mt-4">{service.title}</h1>
          {tagline && <p className="text-primary-foreground/70 mt-3 text-lg">{tagline}</p>}
        </div>
      </section>

      {imageUrl && (
        <div className="container-wide px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <img src={imageUrl} alt={service.title} className="w-full max-w-4xl mx-auto h-64 md:h-80 object-cover rounded-xl shadow-lg" />
        </div>
      )}

      <SectionWrapper>
        <div className="max-w-3xl">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">{service.description}</p>
          {benefits.length > 0 && (
            <>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Why This Matters for Your Business</h2>
              <ul className="grid sm:grid-cols-2 gap-3 mb-12">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-foreground">
                    <CheckCircle size={16} className="text-accent flex-shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </>
          )}
          {features.length > 0 && (
            <>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">What You Get</h2>
              <ul className="grid sm:grid-cols-2 gap-3 mb-12">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle size={16} className="text-accent flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </SectionWrapper>

      {process.length > 0 && (
        <SectionWrapper className="bg-secondary">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">How We Work</h2>
          <p className="text-muted-foreground mb-8">A clear, transparent process so you always know exactly what's happening and what comes next.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div key={i} className="relative">
                <span className="text-5xl font-heading font-bold text-accent/20">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-heading font-semibold text-foreground mt-2">{p.step}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {faqs.length > 0 && (
        <SectionWrapper>
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <FAQAccordion items={faqs} />
          </div>
        </SectionWrapper>
      )}

      <SectionWrapper dark>
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-primary-foreground/70 mb-8">Let's discuss how our {service.title.toLowerCase()} services can give your business a real competitive advantage. Free consultation — no obligations.</p>
          <Link to="/get-quote" className="btn-primary text-base px-8 py-4">
            Get Your Free Quote <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default ServiceDetail;
