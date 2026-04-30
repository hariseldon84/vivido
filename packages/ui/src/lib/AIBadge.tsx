type AIBadgeProps = {
  label: string;
};

export function AIBadge({ label }: AIBadgeProps) {
  return (
    <span className="ai-badge">
      <span className="ai-dot" />
      {label}
    </span>
  );
}
