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
    const duration = 1500;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading font-bold text-4xl md:text-5xl text-accent">
        {count}{suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
};

export default StatsCounter;
