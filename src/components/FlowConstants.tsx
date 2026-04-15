import { Database, Shield, Server } from 'lucide-react';
import MeshNode from './MeshNode';
import { Node, Edge } from 'reactflow';

export const nodeTypes = {
  meshNode: MeshNode,
};

export const edgeTypes = {};

export const initialNodes: Node[] = [
  { 
    id: '1', 
    type: 'meshNode',
    position: { x: 250, y: 50 }, 
    data: { label: 'SMPC Aggregator', icon: Shield, type: 'aggregator', category: 'Security Layer', status: 'encrypted' },
  },
  { 
    id: '2', 
    type: 'meshNode',
    position: { x: 100, y: 200 }, 
    data: { label: 'Regional Hospital A', icon: Database, category: 'Data Provider', status: 'encrypted' },
  },
  { 
    id: '3', 
    type: 'meshNode',
    position: { x: 400, y: 200 }, 
    data: { label: 'Private Clinic B', icon: Database, category: 'Data Provider', status: 'encrypted' },
  },
  { 
    id: '4', 
    type: 'meshNode',
    position: { x: 250, y: 350 }, 
    data: { label: 'Synthetic Generator', icon: Server, category: 'Engine', status: 'encrypted' },
  },
];

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '2', target: '1', animated: true, style: { stroke: '#60a5fa', strokeWidth: 2, filter: 'drop-shadow(0 0 5px rgba(96, 165, 250, 0.4))' } },
  { id: 'e1-3', source: '3', target: '1', animated: true, style: { stroke: '#60a5fa', strokeWidth: 2, filter: 'drop-shadow(0 0 5px rgba(96, 165, 250, 0.4))' } },
  { id: 'e2-4', source: '1', target: '4', animated: true, style: { stroke: '#c084fc', strokeWidth: 2, strokeDasharray: '5 5' }, label: 'DP-Tuned Stream' },
];
