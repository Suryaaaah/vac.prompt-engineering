import React, { useState } from 'react';
import { UserCheck, Target, Layers, ShieldAlert, FileText, Sparkles, Printer, CheckCircle2 } from 'lucide-react';

export const PromptAnatomy: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<number | null>(null);

  const components = [
    {
      id: 1,
      name: 'ROLE',
      question: 'Who should the AI act as?',
      description: 'Primes latent neural weights, technical vocabulary, and expected domain expertise.',
      exampleSnippet: 'Act as a Senior Database Administrator (DBA)...',
      icon: UserCheck,
      color: 'from-purple-500 to-indigo-500',
      border: 'border-purple-500/40',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      highlightColor: 'text-purple-300 bg-purple-950/50 border-purple-600/40',
    },
    {
      id: 2,
      name: 'TASK',
      question: 'What should the AI do?',
      description: 'Clear imperative action verb specifying the primary deliverable without ambiguity.',
      exampleSnippet: 'Refactor this PostgreSQL slow query and identify the root cause of high execution time...',
      icon: Target,
      color: 'from-indigo-500 to-blue-500',
      border: 'border-indigo-500/40',
      badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      highlightColor: 'text-indigo-300 bg-indigo-950/50 border-indigo-600/40',
    },
    {
      id: 3,
      name: 'CONTEXT',
      question: 'What background information matters?',
      description: 'Environment, software versions, schema relationships, and target audience.',
      exampleSnippet: 'Targeting PostgreSQL 15 on Ubuntu LTS. The table has 2.4 million rows with an existing index on created_at.',
      icon: Layers,
      color: 'from-cyan-500 to-blue-500',
      border: 'border-cyan-500/40',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      highlightColor: 'text-cyan-300 bg-cyan-950/50 border-cyan-600/40',
    },
    {
      id: 4,
      name: 'CONSTRAINTS',
      question: 'What rules or limitations should it follow?',
      description: 'Negative boundaries, performance thresholds, forbidden libraries, or length limits.',
      exampleSnippet: 'Do not modify table schemas or drop existing foreign keys. Must finish query execution in under 50ms.',
      icon: ShieldAlert,
      color: 'from-rose-500 to-pink-500',
      border: 'border-rose-500/40',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      highlightColor: 'text-rose-300 bg-rose-950/50 border-rose-600/40',
    },
    {
      id: 5,
      name: 'OUTPUT FORMAT',
      question: 'How should the answer be presented?',
      description: 'Structured layout such as Markdown tables, strict JSON schema, or annotated code blocks.',
      exampleSnippet: 'Format as: (1) Optimized SQL statement, (2) EXPLAIN ANALYZE comparison table, (3) 2-sentence rationale.',
      icon: FileText,
      color: 'from-emerald-500 to-teal-500',
      border: 'border-emerald-500/40',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      highlightColor: 'text-emerald-300 bg-emerald-950/50 border-emerald-600/40',
    },
    {
      id: 6,
      name: 'EXAMPLES',
      question: 'Would an example clarify the expected result?',
      description: 'Few-shot demonstrations showing sample input and desired output to lock pattern fidelity.',
      exampleSnippet: 'Example format: [Before: 320ms Seq Scan -> After: 12ms Index Scan on orders_cust_id_idx].',
      icon: Sparkles,
      color: 'from-amber-500 to-yellow-500',
      border: 'border-amber-500/40',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      highlightColor: 'text-amber-300 bg-amber-950/50 border-amber-600/40',
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#12192B]/90 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8 relative overflow-hidden shadow-2xl">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            VISUAL ARCHITECTURE
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Anatomy of a Good Prompt
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            A high-precision prompt is not a conversational question—it is a modular engineering specification. Click any of the 6 pillars below to see how it shapes the output.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="no-print inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-all self-start sm:self-center"
          title="Print infographic"
        >
          <Printer className="w-4 h-4 text-cyan-400" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* 6 Modular Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {components.map((c) => {
          const Icon = c.icon;
          const isActive = activeComponent === c.id;
          return (
            <div
              key={c.id}
              onClick={() => setActiveComponent(isActive ? null : c.id)}
              className={`p-5 rounded-xl border transition-all cursor-pointer relative ${
                isActive
                  ? `${c.border} bg-white/[0.08] shadow-lg scale-[1.02]`
                  : 'border-white/5 bg-slate-900/60 hover:border-white/20 hover:bg-slate-900/90'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${c.color} text-white shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${c.badge}`}>
                  0{c.id} // {c.name}
                </span>
              </div>

              <h3 className="text-base font-semibold text-white mb-1">
                {c.question}
              </h3>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                {c.description}
              </p>

              <div className="text-[11px] font-mono bg-black/40 p-2.5 rounded-lg border border-white/5 text-slate-300">
                <span className="text-slate-500 block text-[10px] uppercase tracking-wider mb-1">Snippet:</span>
                "{c.exampleSnippet}"
              </div>

              {isActive && (
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-1.5 text-xs text-cyan-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Currently focused in live anatomy below
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Complete Sample Prompt with Color-coded Annotations */}
      <div className="rounded-xl border border-white/15 bg-black/50 p-5 md:p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono">
              Complete Engineered Prompt Sample
            </h4>
          </div>
          <span className="text-xs text-slate-400">
            Hover or tap cards above to inspect each layer
          </span>
        </div>

        <div className="font-mono text-xs md:text-sm leading-relaxed p-4 rounded-lg bg-slate-950/80 border border-white/10 space-y-3">
          {/* 1. ROLE */}
          <div className={`p-2 rounded border transition-all ${
            activeComponent === 1 ? 'ring-2 ring-purple-400 bg-purple-950/60' : 'bg-transparent border-transparent'
          }`}>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 mr-2">
              [1. ROLE]
            </span>
            <span className="text-purple-300 font-semibold">
              Act as a Senior Database Administrator (DBA) specializing in PostgreSQL query optimization.
            </span>
          </div>

          {/* 2. TASK */}
          <div className={`p-2 rounded border transition-all ${
            activeComponent === 2 ? 'ring-2 ring-indigo-400 bg-indigo-950/60' : 'bg-transparent border-transparent'
          }`}>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mr-2">
              [2. TASK]
            </span>
            <span className="text-indigo-300 font-semibold">
              Analyze the slow query below, explain why the sequential scan occurs, and rewrite it with the optimal index definition.
            </span>
          </div>

          {/* 3. CONTEXT */}
          <div className={`p-2 rounded border transition-all ${
            activeComponent === 3 ? 'ring-2 ring-cyan-400 bg-cyan-950/60' : 'bg-transparent border-transparent'
          }`}>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mr-2">
              [3. CONTEXT]
            </span>
            <span className="text-cyan-300">
              Context: Production PostgreSQL 15 database on AWS RDS. Table `student_records` has 1.8 million rows. Target audience: 2nd-year CSE students conducting a database lab.
            </span>
          </div>

          {/* 4. CONSTRAINTS */}
          <div className={`p-2 rounded border transition-all ${
            activeComponent === 4 ? 'ring-2 ring-rose-400 bg-rose-950/60' : 'bg-transparent border-transparent'
          }`}>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 mr-2">
              [4. CONSTRAINTS]
            </span>
            <span className="text-rose-300">
              Constraints: (1) Do not use raw wildcards (SELECT *), (2) Ensure query execution completes under 50ms, (3) Do not drop foreign key constraints.
            </span>
          </div>

          {/* 5. OUTPUT FORMAT */}
          <div className={`p-2 rounded border transition-all ${
            activeComponent === 5 ? 'ring-2 ring-emerald-400 bg-emerald-950/60' : 'bg-transparent border-transparent'
          }`}>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mr-2">
              [5. OUTPUT FORMAT]
            </span>
            <span className="text-emerald-300">
              Output Format: Provide a 3-part Markdown structure: (a) Optimized SQL with CREATE INDEX DDL, (b) EXPLAIN plan before/after comparative table, (c) 3 common student pitfalls.
            </span>
          </div>

          {/* 6. EXAMPLES */}
          <div className={`p-2 rounded border transition-all ${
            activeComponent === 6 ? 'ring-2 ring-amber-400 bg-amber-950/60' : 'bg-transparent border-transparent'
          }`}>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mr-2">
              [6. EXAMPLES / FEW-SHOT]
            </span>
            <span className="text-amber-300">
              Demonstration Example: Model the comparative table after: `| Phase | Scan Type | Rows Examined | Execution Cost |`.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
