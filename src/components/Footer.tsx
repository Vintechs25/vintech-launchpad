import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import vintechLogo from "@/assets/vintech-logo.png";
import { useContactInfo } from "@/hooks/useContactInfo";

const Footer = () => {
  const { data: info } = useContactInfo();
  const company = info?.company_name || "Vintech Consulting";
  const email = info?.email || "info@vintechsystems.store";
  const phone = info?.phone || "+1 (234) 567-890";
  const address = info?.address || "Serving clients worldwide";

  return (
    <footer className="gradient-hero text-primary-foreground">
      <div className="container-wide section-padding pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={vintechLogo} alt={company} className="h-10 w-auto" />
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Premium technology consulting — web development, cybersecurity, IT support, and managed solutions for growing businesses.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/services/web-development" className="hover:text-accent transition-colors">Web Development</Link></li>
              <li><Link to="/services/cybersecurity" className="hover:text-accent transition-colors">Cybersecurity</Link></li>
              <li><Link to="/services/it-support" className="hover:text-accent transition-colors">IT Support</Link></li>
              <li><Link to="/services/consulting" className="hover:text-accent transition-colors">Consulting</Link></li>
              <li><Link to="/services/managed-hosting" className="hover:text-accent transition-colors">Managed Hosting</Link></li>
              <li><Link to="/services/domain-management" className="hover:text-accent transition-colors">Domain Management</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-accent transition-colors">Projects</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-accent" />
                <a href={`mailto:${email}`} className="hover:text-accent transition-colors">{email}</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-accent" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-accent transition-colors">{phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-accent mt-0.5" />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} {company}. All rights reserved.</p>
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
