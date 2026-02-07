import { Link } from "react-router-dom";
import { Globe, Shield, Headphones, Brain, Server, Link2, LucideIcon, HelpCircle } from "lucide-react";

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
    <Link to={`/services/${slug}`} className="card-elevated p-6 md:p-8 group block">
      <div className="w-12 h-12 rounded-lg gradient-cta flex items-center justify-center mb-5">
        <Icon size={22} className="text-accent-foreground" />
      </div>
      <h3 className="font-heading font-semibold text-lg mb-2 text-foreground group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </Link>
  );
};

export default ServiceCard;
