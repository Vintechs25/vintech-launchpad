import { Link } from "react-router-dom";
import { Globe, Shield, Headphones, Brain, Server, Link2, LucideIcon, HelpCircle, ArrowRight } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Globe, Shield, Headphones, Brain, Server, Link2,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: LucideIcon | string | null;
  slug: string;
}

const ServiceCard = ({ title, description, icon, slug }: ServiceCardProps) => {
  const Icon = typeof icon === "string" ? (iconMap[icon] || HelpCircle) : (icon || HelpCircle);

  return (
    <Link to={`/services/${slug}`} className="card-elevated p-6 md:p-8 group block h-full">
      <div className="w-12 h-12 rounded-xl gradient-cta flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ boxShadow: "0 6px 20px -4px hsl(199 89% 48% / 0.3)" }}>
        <Icon size={22} className="text-accent-foreground" />
      </div>
      <h3 className="font-heading font-semibold text-lg mb-2 text-foreground group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Learn more <ArrowRight size={12} />
      </span>
    </Link>
  );
};

export default ServiceCard;