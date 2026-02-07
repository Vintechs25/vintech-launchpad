import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  slug: string;
}

const ProjectCard = ({ title, category, description, image, slug }: ProjectCardProps) => (
  <Link to={`/projects/${slug}`} className="card-elevated overflow-hidden group block">
    <div className="aspect-video overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div className="p-6">
      <span className="text-xs font-medium text-accent uppercase tracking-wider">{category}</span>
      <h3 className="font-heading font-semibold text-lg mt-1 mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{description}</p>
    </div>
  </Link>
);

export default ProjectCard;
