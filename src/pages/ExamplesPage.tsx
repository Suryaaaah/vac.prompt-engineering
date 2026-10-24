import React, { useState, useEffect } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { EXAMPLES_DATA } from '../data/examplesData';
import type { ExamplePrompt } from '../types';
import { savePrompt } from '../utils/storage';
import {
  BookOpen,
  Search,
  Copy,
  Check,
  BookmarkPlus,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Code2,
  PenTool,
  GraduationCap
} from 'lucide-react';

export const ExamplesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { syncStorage } = useOutletContext<{ syncStorage: () => void }>() || {};

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Coding' | 'Writing' | 'Studying'>('All');
  const [expandedIds, setExpandedIds] = useState<number[]>([1, 8, 14]); // default expand 1 from each category
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [savedSuccessKey, setSavedSuccessKey] = useState<number | null>(null);

  // Sync if query param changes
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  const toggleExpand = (id: number) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(i => i !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const expandAll = () => {
    setExpandedIds(EXAMPLES_DATA.map(e => e.id));
  };

  const collapseAll = () => {
    setExpandedIds([]);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveToLibrary = (example: ExamplePrompt) => {
    savePrompt({
      title: example.title,
      promptText: example.improvedPrompt,
      originalPrompt: example.weakPrompt,
      category: example.category,
      tags: [example.category.toLowerCase(), ...example.techniquesUsed.map(t => t.toLowerCase())],
      isFavorite: false,
      technique: example.techniquesUsed.join(', '),
    });
    setSavedSuccessKey(example.id);
    if (syncStorage) syncStorage();
    setTimeout(() => setSavedSuccessKey(null), 3000);
  };

  // Filtered dataset
  const filteredExamples = EXAMPLES_DATA.filter((ex) => {
    const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      ex.title.toLowerCase().includes(query) ||
      ex.weakPrompt.toLowerCase().includes(query) ||
      ex.improvedPrompt.toLowerCase().includes(query) ||
      ex.explanation.toLowerCase().includes(query) ||
      ex.techniquesUsed.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>20 BEFORE-AND-AFTER CURATED BENCHMARKS</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Before-and-After Example Library
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Explore 20 complete, verified prompt transformations across Coding, Writing, and Studying. Compare the ambiguity of raw queries with production-grade engineered prompts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-[#12192B] hover:bg-slate-800 text-slate-300 border border-white/10 transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-[#12192B] hover:bg-slate-800 text-slate-300 border border-white/10 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0E1322] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'All'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-primary'
                : 'bg-[#12192B] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            All 20 Examples
          </button>
          <button
            onClick={() => setSelectedCategory('Coding')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              selectedCategory === 'Coding'
                ? 'bg-purple-600 text-white shadow-glow-primary'
                : 'bg-[#12192B] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Coding (7)
          </button>
          <button
            onClick={() => setSelectedCategory('Writing')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              selectedCategory === 'Writing'
                ? 'bg-indigo-600 text-white shadow-glow-primary'
                : 'bg-[#12192B] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            Writing (6)
          </button>
          <button
            onClick={() => setSelectedCategory('Studying')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              selectedCategory === 'Studying'
                ? 'bg-cyan-600 text-white shadow-glow-primary'
                : 'bg-[#12192B] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Studying (7)
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords, topics..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#12192B] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Examples List */}
      <div className="space-y-4">
        {filteredExamples.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0E1322] border border-white/10 text-slate-400 space-y-3">
            <Search className="w-8 h-8 mx-auto text-slate-600" />
            <div className="text-sm font-semibold text-white">No prompt examples found</div>
            <p className="text-xs">
              No results match "{searchQuery}" in category "{selectedCategory}". Try clearing your search filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl text-xs bg-slate-800 text-slate-200 hover:bg-slate-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredExamples.map((ex) => {
            const isExpanded = expandedIds.includes(ex.id);
            return (
              <div
                key={ex.id}
                className="rounded-2xl bg-[#0E1322] border border-white/10 overflow-hidden shadow-lg transition-all"
              >
                {/* Header row (always visible) */}
                <div
                  onClick={() => toggleExpand(ex.id)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#12192B] border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-cyan-400 shrink-0">
                      {ex.id < 10 ? `0${ex.id}` : ex.id}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase font-mono ${
                            ex.category === 'Coding'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : ex.category === 'Writing'
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          }`}
                        >
                          {ex.category}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          // {ex.subcategory}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {ex.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="hidden md:flex flex-wrap gap-1">
                      {ex.techniquesUsed.slice(0, 2).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(ex.id);
                      }}
                      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Content Area */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-white/5 space-y-5 animate-in fade-in">
                    {/* Before & After Comparison Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      {/* Weak Prompt (Col 5) */}
                      <div className="lg:col-span-5 rounded-xl bg-rose-950/20 border border-rose-500/20 p-4 space-y-2 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-1 border-b border-rose-500/20">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300 font-mono">
                              Weak Prompt (Vague / Incomplete)
                            </span>
                            <button
                              onClick={() => handleCopy(ex.weakPrompt, `weak-${ex.id}`)}
                              className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                              title="Copy weak prompt"
                            >
                              {copiedKey === `weak-${ex.id}` ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" /> Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" /> Copy
                                </>
                              )}
                            </button>
                          </div>
                          <p className="font-mono text-xs text-rose-200 mt-2 whitespace-pre-line leading-relaxed">
                            "{ex.weakPrompt}"
                          </p>
                        </div>
                        <div className="pt-2 text-[10px] text-rose-400/80 font-mono">
                          Status: Lacks role, language version, bounds & output schema.
                        </div>
                      </div>

                      {/* Improved Prompt (Col 7) */}
                      <div className="lg:col-span-7 rounded-xl bg-purple-950/25 border border-purple-500/30 p-4 space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-1 border-b border-purple-500/30">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 font-mono flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                              Engineered Prompt (High-Precision)
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleCopy(ex.improvedPrompt, `good-${ex.id}`)}
                                className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                                title="Copy improved prompt"
                              >
                                {copiedKey === `good-${ex.id}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" /> Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" /> Copy
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => handleSaveToLibrary(ex)}
                                className="px-2 py-0.5 rounded text-[11px] bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 flex items-center gap-1"
                                title="Save to Prompt Library"
                              >
                                {savedSuccessKey === ex.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" /> Saved!
                                  </>
                                ) : (
                                  <>
                                    <BookmarkPlus className="w-3 h-3 text-cyan-400" /> Save
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="font-mono text-xs text-purple-100 mt-2 whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto custom-scrollbar p-2 rounded bg-black/40">
                            {ex.improvedPrompt}
                          </div>
                        </div>

                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {ex.techniquesUsed.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            >
                              ✓ {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Metadata: Explanation & Expected Output */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                      <div className="p-3.5 rounded-xl bg-[#12192B] border border-white/5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-mono block mb-1">
                          Why this is better:
                        </span>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {ex.explanation}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#12192B] border border-white/5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 font-mono block mb-1">
                          Expected AI Output Characteristics:
                        </span>
                        <ul className="text-xs text-slate-400 space-y-1">
                          {ex.expectedOutputCharacteristics.map((char, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-cyan-400 font-bold">•</span>
                              <span>{char}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
