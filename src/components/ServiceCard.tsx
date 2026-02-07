import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
}

const ServiceCard = ({ title, description, icon: Icon, slug }: ServiceCardProps) => (
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

export default ServiceCard;
