export function MetricHighlight({ metric, description }: { metric: string; description: string }) {
  return (
    <div className="bg-surface-overlay rounded-xl px-5 py-4 my-6 flex items-baseline gap-3">
      <span className="font-display font-semibold text-2xl text-ink-primary">{metric}</span>
      <span className="font-body text-sm text-ink-secondary">{description}</span>
    </div>
  );
}
