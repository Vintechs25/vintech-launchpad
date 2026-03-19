import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

const SectionWrapper = ({ children, className = "", id, dark }: SectionWrapperProps) => (
  <section
    id={id}
    className={`section-padding relative ${dark ? "gradient-hero text-primary-foreground overflow-hidden" : ""} ${className}`}
  >
    <div className="container-wide relative">{children}</div>
  </section>
);

export default SectionWrapper;