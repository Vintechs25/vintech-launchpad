import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const TestimonialCard = ({ quote, name, role, company }: TestimonialCardProps) => {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="card-elevated p-6 md:p-8 flex flex-col h-full">
      <Quote size={24} className="text-accent/20 mb-3" />
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className="fill-accent text-accent" />
        ))}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">"{quote}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <div className="w-10 h-10 rounded-full gradient-cta flex items-center justify-center text-accent-foreground text-xs font-bold flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-heading font-semibold text-sm text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{role}{company ? `, ${company}` : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;