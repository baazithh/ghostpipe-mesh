import BudgetGauge from '@/components/BudgetGauge';
import NodeMap from '@/components/NodeMap';
import SyntheticDataTable from '@/components/SyntheticDataTable';

export default function Home() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Observability Dashboard</h2>
        <p className="text-slate-400 mt-2">Real-time monitoring of federated queries and privacy budgets.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Budget Gauge */}
        <div className="lg:col-span-1">
          <BudgetGauge />
        </div>

        {/* Right Column - Node Topology Map */}
        <div className="lg:col-span-2">
          <NodeMap />
        </div>
      </div>

      {/* Full width row - Synthetic Data Table */}
      <div className="w-full">
        <SyntheticDataTable />
      </div>
    </div>
  );
}
