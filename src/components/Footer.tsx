import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import vintechLogo from "@/assets/vintech-logo.png";
import { useContactInfo } from "@/hooks/useContactInfo";

const Footer = () => {
  const { data: info } = useContactInfo();
  const company = info?.company_name || "Vintech Systems and Consulting";
  const email = info?.email || "info@vintechsystems.store";
  const phone = info?.phone || "+254 700 000 000";
  const address = info?.address || "Nairobi, Kenya";

  return (
    <footer className="gradient-hero text-primary-foreground relative overflow-hidden">
      <div className="pattern-dots absolute inset-0 pointer-events-none" />
      <div className="container-wide section-padding pb-8 relative">
        {/* Top CTA strip */}
        <div className="card-glass p-6 md:p-8 mb-14 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-primary-foreground">Let's Build Something Great Together</h3>
            <p className="text-sm text-primary-foreground/60">Get a free, no-obligation quote from Kenya's trusted IT partner.</p>
          </div>
          <Link to="/get-quote" className="btn-primary text-sm whitespace-nowrap">
            Get Your Free Quote <ArrowRight size={16} className="ml-1.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={vintechLogo} alt={company} className="h-10 w-auto" />
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Nairobi's trusted technology partner — delivering professional web development, cybersecurity, IT support, and managed hosting to businesses across Kenya.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">Services</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/60">
              <li><Link to="/services/web-development" className="hover:text-accent transition-colors">Web Development</Link></li>
              <li><Link to="/services/cybersecurity" className="hover:text-accent transition-colors">Cybersecurity</Link></li>
              <li><Link to="/services/it-support" className="hover:text-accent transition-colors">IT Support</Link></li>
              <li><Link to="/services/consulting" className="hover:text-accent transition-colors">Consulting</Link></li>
              <li><Link to="/services/managed-hosting" className="hover:text-accent transition-colors">Managed Hosting</Link></li>
              <li><Link to="/services/domain-management" className="hover:text-accent transition-colors">Domain Management</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">Company</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/60">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-accent transition-colors">Projects</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              <li><Link to="/get-quote" className="hover:text-accent transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-accent" />
                </div>
                <a href={`mailto:${email}`} className="hover:text-accent transition-colors">{email}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-accent" />
                </div>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-accent transition-colors">{phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-accent" />
                </div>
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/40">
          <p>© {new Date().getFullYear()} {company}. All rights reserved. 🇰🇪 Proudly Kenyan.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
