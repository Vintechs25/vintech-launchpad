import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionWrapper from "@/components/SectionWrapper";
import RichContent from "@/components/RichContent";
import { useProject } from "@/hooks/usePublicData";
import { format } from "date-fns";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading } = useProject(slug);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="font-heading text-2xl font-bold text-foreground">Project Not Found</h1>
          <Link to="/projects" className="text-accent hover:underline">← Back to Projects</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{project.title} — Vintech Projects</title>
        <meta name="description" content={project.description.slice(0, 155)} />
        <link rel="canonical" href={`https://vintech.co/projects/${project.slug}`} />
      </Helmet>

      {project.image_url && (
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
        </div>
      )}

      <SectionWrapper>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
          <Link to="/projects" className="inline-flex items-center gap-2 text-accent hover:underline mb-6">
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            {project.category && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent uppercase tracking-wider">
                <Tag size={14} /> {project.category}
              </span>
            )}
            {project.created_at && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar size={14} /> {format(new Date(project.created_at), "MMMM d, yyyy")}
              </span>
            )}
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">{project.title}</h1>

          {/* Problem / Solution / Results sections */}
          {project.problem && (
            <div className="mb-8">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">The Challenge</h2>
              <RichContent content={project.problem} />
            </div>
          )}

          {project.solution && (
            <div className="mb-8">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">Our Solution</h2>
              <RichContent content={project.solution} />
            </div>
          )}

          {project.results && (
            <div className="mb-8">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">Results</h2>
              <RichContent content={project.results} />
            </div>
          )}

          {/* Main description as rich content */}
          <RichContent content={project.description} />
        </motion.div>
      </SectionWrapper>
    </Layout>
  );
};

export default ProjectDetail;
