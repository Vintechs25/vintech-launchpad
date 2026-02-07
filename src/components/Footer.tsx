import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="gradient-hero text-primary-foreground">
    <div className="container-wide section-padding pb-8">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-cta flex items-center justify-center">
              <span className="text-accent-foreground font-heading font-bold text-sm">V</span>
            </div>
            <span className="font-heading font-bold text-lg">Vintech</span>
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
              <a href="mailto:hello@vintech.co" className="hover:text-accent transition-colors">hello@vintech.co</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-accent" />
              <a href="tel:+1234567890" className="hover:text-accent transition-colors">+1 (234) 567-890</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-accent mt-0.5" />
              <span>Serving clients worldwide</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
        <p>© {new Date().getFullYear()} Vintech Consulting. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/contact" className="hover:text-accent transition-colors">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-accent transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
