export type ScreenId =
  | 'problem-approach'
  | 'graph-builder'
  | 'kruskal-stepper'
  | 'data-structures'
  | 'algorithm-compare'
  | 'failure-simulator'
  | 'testing-efficiency'
  | 'dynamic-multi-criteria'
  | 'marks-dashboard';

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

export interface GraphEdge {
  id: string;
  u: string;
  v: string;
  w: number;
  active: boolean;
}

export interface KruskalStep {
  index: number;
  edgeId: string;
  u: string;
  v: string;
  weight: number;
  findU: string;
  findV: string;
  decision: 'ACCEPTED' | 'REJECTED';
  reason: string;
  cost: number;
  acceptedCount: number;
  totalQueries: number;
  components: string;
  roots: Record<string, string>;
}

export interface TestCase {
  id: string;
  description: string;
  input: string;
  expectedCost: string;
  actualCost: string;
  time: string;
  status: 'PASS' | 'RUNNING' | 'PENDING';
}

export interface ParetoWeights {
  w1: number; // cost
  w2: number; // dist
  w3: number; // lat
  w4: number; // rel
  w5: number; // risk
  w6: number; // bw
}
