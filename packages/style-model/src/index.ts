export type StyleObservation = {
  projectId: string;
  metric: string;
  value: number | string | boolean;
  observedAt: string;
};

export function createObservation(metric: string, value: StyleObservation["value"], projectId: string): StyleObservation {
  return {
    metric,
    value,
    projectId,
    observedAt: new Date().toISOString()
  };
}
