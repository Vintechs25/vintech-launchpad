import { useEffect, useRef, useState } from "react";

interface StatsCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

const StatsCounter = ({ value, suffix = "", label }: StatsCounterProps) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading font-bold text-4xl md:text-5xl text-accent mb-1" style={{ textShadow: "0 0 30px hsl(199 89% 48% / 0.3)" }}>
        {count}{suffix}
      </p>
      <p className="text-sm text-primary-foreground/60 font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
};

export default StatsCounter;