import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from "web-vitals";

const logMetric = (metric: Metric) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)}`);
  }

  // Send to analytics endpoint in production
  if (import.meta.env.PROD && navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/vitals",
      JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
        navigationType: metric.navigationType,
      })
    );
  }
};

export function initWebVitals() {
  onCLS(logMetric);
  onINP(logMetric);
  onLCP(logMetric);
  onFCP(logMetric);
  onTTFB(logMetric);
}
