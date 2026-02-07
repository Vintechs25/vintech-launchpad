interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
}

const ProjectCard = ({ title, category, description, image }: ProjectCardProps) => (
  <div className="card-elevated overflow-hidden group">
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
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);

export default ProjectCard;
