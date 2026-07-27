export function reportWebVitals(metric: any) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Here you could send to your analytics service
    // Example: gtag('event', metric.name, metric.value);
    const body = JSON.stringify(metric);

    // Use `navigator.sendBeacon` if available
    if ('sendBeacon' in navigator) {
      navigator.sendBeacon('/api/analytics/vitals', body);
    }
  }
}

export function trackPerformance(name: string, startTime: number) {
  const duration = performance.now() - startTime;

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
  }

  return duration;
}
