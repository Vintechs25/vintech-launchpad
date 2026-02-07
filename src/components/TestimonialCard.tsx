import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const TestimonialCard = ({ quote, name, role, company }: TestimonialCardProps) => (
  <div className="card-elevated p-6 md:p-8 flex flex-col">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-accent text-accent" />
      ))}
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">"{quote}"</p>
    <div>
      <p className="font-heading font-semibold text-sm text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground">{role}, {company}</p>
    </div>
  </div>
);

export default TestimonialCard;
