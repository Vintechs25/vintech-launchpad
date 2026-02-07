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
    className={`section-padding ${dark ? "gradient-hero text-primary-foreground" : ""} ${className}`}
  >
    <div className="container-wide">{children}</div>
  </section>
);

export default SectionWrapper;
