import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  FolderHeart,
  Search,
  Plus,
  Trash2,
  Edit3,
  Star,
  Copy,
  Check,
  Download,
  Upload,
  AlertCircle,
  HelpCircle,
  ArrowUpDown,
  CheckCircle2,
  X
} from 'lucide-react';
import type { SavedPrompt, CategoryType } from '../types';
import {
  getSavedPrompts,
  savePrompt,
  deletePrompt,
  toggleFavoritePrompt,
  clearAllPrompts,
} from '../utils/storage';
import {
  exportPromptsToJson,
  validateAndParseImportedJson,
} from '../utils/exportImport';

export const PromptLibraryPage: React.FC = () => {
  const { syncStorage } = useOutletContext<{ syncStorage: () => void }>() || {};

  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Modal states: Create / Edit
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formPromptText, setFormPromptText] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryType>('Coding');
  const [formTags, setFormTags] = useState('');

  // Delete & Clear All Confirmation modals
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);
  const [isClearAllOpen, setIsClearAllOpen] = useState(false);

  // Status banners & feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadData = () => {
    setPrompts(getSavedPrompts());
  };

  useEffect(() => {
    loadData();
  }, []);

  const showBanner = (type: 'success' | 'error', text: string) => {
    setFeedbackMessage({ type, text });
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const openCreateModal = () => {
    setEditingPromptId(null);
    setFormTitle('');
    setFormPromptText('');
    setFormCategory('Coding');
    setFormTags('coding, java');
    setIsEditorOpen(true);
  };

  const openEditModal = (p: SavedPrompt) => {
    setEditingPromptId(p.id);
    setFormTitle(p.title);
    setFormPromptText(p.promptText);
    setFormCategory(p.category);
    setFormTags(p.tags.join(', '));
    setIsEditorOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formPromptText.trim()) {
      showBanner('error', 'Please provide both a title and prompt text.');
      return;
    }

    const tagArray = formTags
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    savePrompt({
      id: editingPromptId || undefined,
      title: formTitle.trim(),
      promptText: formPromptText.trim(),
      category: formCategory,
      tags: tagArray.length > 0 ? tagArray : ['general'],
      isFavorite: false,
    });

    setIsEditorOpen(false);
    loadData();
    if (syncStorage) syncStorage();
    showBanner('success', editingPromptId ? 'Prompt updated successfully!' : 'Prompt saved to library!');
  };

  const handleDeleteConfirmed = () => {
    if (!deleteCandidateId) return;
    deletePrompt(deleteCandidateId);
    setDeleteCandidateId(null);
    loadData();
    if (syncStorage) syncStorage();
    showBanner('success', 'Prompt deleted.');
  };

  const handleClearAllConfirmed = () => {
    clearAllPrompts();
    setIsClearAllOpen(false);
    loadData();
    if (syncStorage) syncStorage();
    showBanner('success', 'All prompts cleared from local storage.');
  };

  const handleToggleFavorite = (id: string) => {
    toggleFavoritePrompt(id);
    loadData();
    if (syncStorage) syncStorage();
  };

  const handleCopyPrompt = (p: SavedPrompt) => {
    navigator.clipboard.writeText(p.promptText);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const parsed = validateAndParseImportedJson(content);
      if (!parsed.valid) {
        showBanner('error', parsed.error || 'Failed to import JSON file.');
        return;
      }

      // Merge imported prompts
      parsed.prompts.forEach((importedP) => {
        savePrompt({
          title: importedP.title,
          promptText: importedP.promptText,
          category: importedP.category,
          tags: importedP.tags,
          isFavorite: importedP.isFavorite,
          originalPrompt: importedP.originalPrompt,
          technique: importedP.technique,
        });
      });

      loadData();
      if (syncStorage) syncStorage();
      showBanner('success', `Successfully imported ${parsed.prompts.length} prompt(s)!`);
      e.target.value = '';
    };
    reader.readAsText(file);
  };

  // Filter & Sort
  const filteredPrompts = prompts
    .filter((p) => {
      const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
      const matchesFav = !onlyFavorites || p.isFavorite;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.promptText.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesFav && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="space-y-8">
      {/* Top Banner Disclaimer on LocalStorage */}
      <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>Local Storage Notice:</strong> Prompts are saved inside your current browser session. They are not stored on remote cloud servers and will not automatically sync across different devices. Use the <strong>Export JSON</strong> button to back up your collection.
          </span>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20 mb-2">
            <FolderHeart className="w-3.5 h-3.5 text-rose-400" />
            <span>PERSONAL REPOSITORY</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Prompt Library
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Store, curate, tag, and export your personal collection of reusable engineering prompts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Export JSON Button */}
          <button
            onClick={() => exportPromptsToJson()}
            disabled={prompts.length === 0}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all"
            title="Export all prompts as JSON"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export JSON</span>
          </button>

          {/* Import JSON Button */}
          <label className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 cursor-pointer flex items-center gap-1.5 transition-all">
            <Upload className="w-3.5 h-3.5 text-purple-400" />
            <span>Import JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          {/* New Prompt Button */}
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-glow-primary flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Prompt</span>
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedbackMessage && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center gap-2 border animate-in fade-in ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          }`}
        >
          {feedbackMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0E1322] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['All', 'Coding', 'Writing', 'Studying', 'Research', 'Presentation', 'General'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                categoryFilter === cat
                  ? 'bg-purple-600 text-white shadow-glow-primary'
                  : 'bg-[#12192B] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              onlyFavorites
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-[#12192B] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>Favorites</span>
          </button>
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved prompts..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#12192B] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            className="p-2 rounded-xl bg-[#12192B] text-slate-400 hover:text-white border border-white/10 text-xs flex items-center gap-1"
            title={`Sort by creation date: ${sortOrder}`}
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-mono hidden sm:inline">{sortOrder}</span>
          </button>
        </div>
      </div>

      {/* Prompts Cards Grid */}
      {filteredPrompts.length === 0 ? (
        prompts.length === 0 ? (
          /* First-time empty state */
          <div className="rounded-2xl bg-[#0E1322] border border-dashed border-white/15 p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mx-auto">
              <FolderHeart className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Your Prompt Library is Empty</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Save your favorite prompts directly from the <strong>Example Library</strong> or <strong>Prompt Playground</strong>, or create your first custom prompt right now.
              </p>
            </div>
            <button
              onClick={openCreateModal}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-primary"
            >
              Create Your First Prompt
            </button>
          </div>
        ) : (
          /* Search results empty state */
          <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-10 text-center text-slate-400 space-y-2">
            <Search className="w-6 h-6 mx-auto text-slate-600" />
            <div className="text-sm font-semibold text-white">No matching saved prompts</div>
            <p className="text-xs">
              No prompts match your query "{searchQuery}" with current filters.
            </p>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrompts.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-[#0E1322] border border-white/10 p-5 flex flex-col justify-between shadow-lg hover:border-purple-500/30 transition-all space-y-4 group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {p.category}
                    </span>
                    {p.technique && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {p.technique}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleToggleFavorite(p.id)}
                    className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                    title={p.isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        p.isFavorite ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                  </button>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors line-clamp-1">
                  {p.title}
                </h3>

                <div className="mt-2 p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-slate-300 max-h-36 overflow-y-auto custom-scrollbar leading-relaxed">
                  {p.promptText}
                </div>

                {p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {p.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[10px] font-mono text-slate-500">
                  {new Date(p.createdAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyPrompt(p)}
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300"
                    title="Copy prompt text"
                  >
                    {copiedId === p.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => openEditModal(p)}
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300"
                    title="Edit prompt"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setDeleteCandidateId(p.id)}
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400"
                    title="Delete prompt"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clear All Prompts Footer */}
      {prompts.length > 0 && (
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Showing {filteredPrompts.length} of {prompts.length} saved prompts
          </span>
          <button
            onClick={() => setIsClearAllOpen(true)}
            className="text-xs text-rose-400 hover:text-rose-300 font-medium"
          >
            Clear All Saved Prompts
          </button>
        </div>
      )}

      {/* MODAL 1: Create / Edit Prompt Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-2xl bg-[#0E1322] border border-white/15 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">
                {editingPromptId ? 'Edit Prompt' : 'Create New Prompt'}
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Prompt Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Java Factorial with BigInteger"
                  className="w-full p-2.5 rounded-xl bg-[#12192B] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as CategoryType)}
                  className="w-full p-2.5 rounded-xl bg-[#12192B] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
                >
                  <option value="Coding">Coding</option>
                  <option value="Writing">Writing</option>
                  <option value="Studying">Studying</option>
                  <option value="Research">Research</option>
                  <option value="Presentation">Presentation</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Prompt Text <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={6}
                  value={formPromptText}
                  onChange={(e) => setFormPromptText(e.target.value)}
                  placeholder="Enter full engineered prompt text..."
                  className="w-full p-3 rounded-xl bg-[#12192B] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="e.g. java, recursion, exam, lab"
                  className="w-full p-2.5 rounded-xl bg-[#12192B] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-primary"
                >
                  {editingPromptId ? 'Update Prompt' : 'Save Prompt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Delete Confirmation */}
      {deleteCandidateId && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#0E1322] border border-white/15 p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-white">Delete Prompt?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to delete this prompt from your browser storage? This cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteCandidateId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Clear All Confirmation */}
      {isClearAllOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#0E1322] border border-white/15 p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-white">Clear All Prompts?</h3>
              <p className="text-xs text-slate-400 mt-1">
                This will delete all saved prompts in your current browser. Have you exported a backup JSON file?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsClearAllOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAllConfirmed}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md"
              >
                Confirm Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
