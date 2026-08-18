import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  FileText,
  Calendar,
  Lightbulb,
  ChevronRight,
  Sparkles,
  Command,
  Clock,
  BookOpen,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { StudyMaterial, TutorPlan, ELI5Explanation } from '../types';

export type SearchCategoryFilter = 'all' | 'materials' | 'tutor' | 'eli5';

export interface HeaderGlobalSearchProps {
  materials?: StudyMaterial[];
  tutorPlans?: TutorPlan[];
  eli5Explanations?: ELI5Explanation[];
  onSelectMaterial?: (material: StudyMaterial) => void;
  onSelectTutorPlan?: (plan: TutorPlan) => void;
  onSelectELI5?: (explanation: ELI5Explanation) => void;
  onShowToast?: (message: string, type?: 'success' | 'warning' | 'info') => void;
  className?: string;
}

export interface SearchResultItem {
  id: string;
  type: 'material' | 'tutor' | 'eli5';
  title: string;
  badgeLabel: string;
  badgeColor: string;
  snippet: string;
  dateStr: string;
  timestamp: number;
  rawItem: StudyMaterial | TutorPlan | ELI5Explanation;
}

function normalizeSearchText(text?: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function formatDateDisplay(isoDateStr?: string): string {
  if (!isoDateStr) return '';
  try {
    const d = new Date(isoDateStr);
    const now = new Date();
    const isToday =
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear();

    if (isToday) {
      return `Hoje às ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return '';
  }
}

function highlightSnippet(text: string, query: string, maxLength = 120): { before: string; match: string; after: string } | string {
  if (!query.trim() || !text) return text.slice(0, maxLength);

  const normText = normalizeSearchText(text);
  const normQuery = normalizeSearchText(query);
  const matchIdx = normText.indexOf(normQuery);

  if (matchIdx === -1) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  const start = Math.max(0, matchIdx - 30);
  const end = Math.min(text.length, matchIdx + normQuery.length + 60);

  const prefix = start > 0 ? '...' : '';
  const suffix = end < text.length ? '...' : '';

  const snippet = prefix + text.slice(start, end) + suffix;
  return snippet;
}

export const HeaderGlobalSearch: React.FC<HeaderGlobalSearchProps> = ({
  materials = [],
  tutorPlans = [],
  eli5Explanations = [],
  onSelectMaterial,
  onSelectTutorPlan,
  onSelectELI5,
  onShowToast,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SearchCategoryFilter>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isMac, setIsMac] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Detect OS for shortcut label (⌘K or Ctrl+K)
  useEffect(() => {
    try {
      if (typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform)) {
        setIsMac(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Global Keyboard Shortcut: Ctrl+K or Cmd+K or "/" to focus search
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputFocused =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          (activeEl as HTMLElement).isContentEditable);

      // Trigger on Ctrl+K / Cmd+K
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
        return;
      }

      // Trigger on "/" when not already typing in another input
      if (e.key === '/' && !isInputFocused) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
        return;
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Compute Search Results across all 3 stores
  const allResults = useMemo<SearchResultItem[]>(() => {
    const query = searchTerm.trim();
    const normQuery = normalizeSearchText(query);
    const tokens = normQuery ? normQuery.split(/\s+/).filter(Boolean) : [];

    const items: SearchResultItem[] = [];

    // 1. Materials (Resumos e Flashcards)
    for (const mat of materials) {
      const title = mat.title || 'Resumo de Estudo';
      const focus = mat.focusTopic || '';
      const summary = mat.resumoDireto || '';
      const bullets = (mat.pontosPrincipais || []).join(' ');
      const cards = (mat.flashcards || []).map((f) => `${f.frente} ${f.verso}`).join(' ');
      const questions = (mat.perguntas || []).map((q) => `${q.pergunta} ${q.resposta}`).join(' ');
      const fullCorpus = `${title} ${focus} ${summary} ${bullets} ${cards} ${questions} ${mat.originalText || ''}`;
      const normCorpus = normalizeSearchText(fullCorpus);

      const isMatch =
        tokens.length === 0 || tokens.every((tok) => normCorpus.includes(tok));

      if (isMatch) {
        let bestSnippet = summary || bullets || mat.originalText || '';
        if (query && summary && normalizeSearchText(summary).includes(normQuery)) {
          bestSnippet = summary;
        } else if (query && bullets && normalizeSearchText(bullets).includes(normQuery)) {
          bestSnippet = bullets;
        }

        items.push({
          id: `mat-${mat.id}`,
          type: 'material',
          title,
          badgeLabel: focus ? `Resumo • ${focus}` : 'Resumo de Estudo',
          badgeColor: 'indigo',
          snippet: typeof highlightSnippet(bestSnippet, query) === 'string' ? (highlightSnippet(bestSnippet, query) as string) : bestSnippet.slice(0, 110),
          dateStr: formatDateDisplay(mat.createdAt),
          timestamp: new Date(mat.createdAt).getTime() || 0,
          rawItem: mat,
        });
      }
    }

    // 2. Tutor Plans (Planos do Coach e Cronogramas)
    for (const plan of tutorPlans) {
      const title = `${plan.materia} (${plan.serieAno || 'Ensino Médio'})`;
      const objective = plan.objetivo || '';
      const summary = plan.aulaResumo || '';
      const schedule = (plan.cronograma || []).map((c) => `${c.etapa}: ${c.descricao}`).join(' ');
      const questions = (plan.questoes || []).map((q) => q.pergunta).join(' ');
      const fullCorpus = `${plan.materia} ${plan.serieAno} ${objective} ${summary} ${schedule} ${questions}`;
      const normCorpus = normalizeSearchText(fullCorpus);

      const isMatch =
        tokens.length === 0 || tokens.every((tok) => normCorpus.includes(tok));

      if (isMatch) {
        const bestSnippet = objective || summary || schedule || '';
        items.push({
          id: `tutor-${plan.id}`,
          type: 'tutor',
          title: `Plano Coach: ${plan.materia}`,
          badgeLabel: `Plano • ${plan.tempoDisponivel || 'Estudo'}`,
          badgeColor: 'amber',
          snippet: typeof highlightSnippet(bestSnippet, query) === 'string' ? (highlightSnippet(bestSnippet, query) as string) : bestSnippet.slice(0, 110),
          dateStr: formatDateDisplay(plan.createdAt),
          timestamp: new Date(plan.createdAt).getTime() || 0,
          rawItem: plan,
        });
      }
    }

    // 3. ELI5 Explanations (Dúvidas Descomplicadas)
    for (const exp of eli5Explanations) {
      const title = exp.duvida || 'Dúvida Descomplicada';
      const analogy = exp.analogiaSimples || '';
      const goldTip = exp.dicaDeOuro || '';
      const steps = (exp.passoAPasso || []).join(' ');
      const fullCorpus = `${exp.duvida} ${analogy} ${goldTip} ${steps}`;
      const normCorpus = normalizeSearchText(fullCorpus);

      const isMatch =
        tokens.length === 0 || tokens.every((tok) => normCorpus.includes(tok));

      if (isMatch) {
        const bestSnippet = analogy || goldTip || steps || '';
        items.push({
          id: `eli5-${exp.id}`,
          type: 'eli5',
          title: `ELI5: ${exp.duvida}`,
          badgeLabel: 'Dúvida ELI5',
          badgeColor: 'purple',
          snippet: typeof highlightSnippet(bestSnippet, query) === 'string' ? (highlightSnippet(bestSnippet, query) as string) : bestSnippet.slice(0, 110),
          dateStr: formatDateDisplay(exp.createdAt),
          timestamp: new Date(exp.createdAt).getTime() || 0,
          rawItem: exp,
        });
      }
    }

    // Sort by relevance (exact title matches first) and then recency
    items.sort((a, b) => {
      if (normQuery) {
        const aTitleMatch = normalizeSearchText(a.title).includes(normQuery);
        const bTitleMatch = normalizeSearchText(b.title).includes(normQuery);
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;
      }
      return b.timestamp - a.timestamp;
    });

    return items;
  }, [materials, tutorPlans, eli5Explanations, searchTerm]);

  // Filtered by selected category chip
  const filteredResults = useMemo(() => {
    if (activeCategory === 'all') return allResults;
    return allResults.filter((item) => item.type === activeCategory);
  }, [allResults, activeCategory]);

  // Counts for category badges
  const categoryCounts = useMemo(() => {
    let matCount = 0;
    let tutorCount = 0;
    let eli5Count = 0;

    for (const item of allResults) {
      if (item.type === 'material') matCount++;
      else if (item.type === 'tutor') tutorCount++;
      else if (item.type === 'eli5') eli5Count++;
    }

    return {
      all: allResults.length,
      materials: matCount,
      tutor: tutorCount,
      eli5: eli5Count,
    };
  }, [allResults]);

  // Handle item selection and navigation
  const handleSelectItem = (item: SearchResultItem) => {
    setIsOpen(false);
    setSearchTerm('');
    setSelectedIndex(-1);

    if (item.type === 'material') {
      if (onSelectMaterial) {
        onSelectMaterial(item.rawItem as StudyMaterial);
      }
      if (onShowToast) {
        onShowToast(`📄 Abrindo Resumo: ${item.title}`, 'info');
      }
    } else if (item.type === 'tutor') {
      if (onSelectTutorPlan) {
        onSelectTutorPlan(item.rawItem as TutorPlan);
      }
      if (onShowToast) {
        onShowToast(`📅 Abrindo Plano do Coach: ${item.title}`, 'info');
      }
    } else if (item.type === 'eli5') {
      if (onSelectELI5) {
        onSelectELI5(item.rawItem as ELI5Explanation);
      }
      if (onShowToast) {
        onShowToast(`💡 Abrindo Explicação ELI5: ${item.title}`, 'info');
      }
    }
  };

  // Keyboard navigation within the dropdown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && filteredResults[selectedIndex]) {
        handleSelectItem(filteredResults[selectedIndex]);
      } else if (filteredResults.length > 0) {
        handleSelectItem(filteredResults[0]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Ensure highlighted item scrolls into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  const totalStoredCount = materials.length + tutorPlans.length + eli5Explanations.length;

  return (
    <div
      ref={containerRef}
      className={`relative flex-1 min-w-[200px] max-w-md ${className}`}
    >
      {/* Search Input Bar */}
      <div
        className={`relative flex items-center w-full transition-all duration-200 rounded-xl border ${
          isOpen
            ? 'bg-white dark:bg-slate-900 border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-500/20 shadow-md'
            : 'bg-slate-100/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 border-slate-200/90 dark:border-slate-700/80'
        }`}
      >
        <div className="pl-3 pr-2 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
          <Search className={`w-4 h-4 transition-colors ${isOpen ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => {
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Buscar no histórico (resumos, planos, ELI5)..."
          className="w-full py-2 bg-transparent text-xs font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none pr-16"
          aria-label="Buscar materiais, planos e explicações no histórico"
          autoComplete="off"
          spellCheck="false"
        />

        {/* Clear Button or Keyboard Shortcut */}
        <div className="absolute right-2 flex items-center space-x-1">
          {searchTerm ? (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedIndex(-1);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition cursor-pointer"
              title="Limpar busca"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center px-1.5 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-700/70 text-[10px] font-mono text-slate-500 dark:text-slate-400 border border-slate-300/60 dark:border-slate-600/60">
              <span className="text-[9px] mr-0.5">{isMac ? '⌘' : 'Ctrl'}</span>
              <span>K</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Results Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col max-h-[75vh] sm:max-h-[500px]">
          {/* Top Bar with Category Filter Pills */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
            <div className="flex items-center space-x-1 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedIndex(-1);
                }}
                className={`px-2.5 py-1 rounded-lg transition shrink-0 cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                Todos ({categoryCounts.all})
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveCategory('materials');
                  setSelectedIndex(-1);
                }}
                className={`px-2.5 py-1 rounded-lg transition shrink-0 flex items-center gap-1 cursor-pointer ${
                  activeCategory === 'materials'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>Resumos ({categoryCounts.materials})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveCategory('tutor');
                  setSelectedIndex(-1);
                }}
                className={`px-2.5 py-1 rounded-lg transition shrink-0 flex items-center gap-1 cursor-pointer ${
                  activeCategory === 'tutor'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <Calendar className="w-3 h-3" />
                <span>Planos ({categoryCounts.tutor})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveCategory('eli5');
                  setSelectedIndex(-1);
                }}
                className={`px-2.5 py-1 rounded-lg transition shrink-0 flex items-center gap-1 cursor-pointer ${
                  activeCategory === 'eli5'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <Lightbulb className="w-3 h-3" />
                <span>ELI5 ({categoryCounts.eli5})</span>
              </button>
            </div>
          </div>

          {/* Results List */}
          <div ref={listRef} className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredResults.length > 0 ? (
              filteredResults.map((item, idx) => {
                const isSelected = selectedIndex === idx;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectItem(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 cursor-pointer group pt-2.5 ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 ring-1 ring-indigo-500/40 shadow-xs'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {/* Type Icon */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-xs ${
                        item.type === 'material'
                          ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                          : item.type === 'tutor'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                      }`}
                    >
                      {item.type === 'material' && <FileText className="w-4 h-4" />}
                      {item.type === 'tutor' && <Calendar className="w-4 h-4" />}
                      {item.type === 'eli5' && <Lightbulb className="w-4 h-4" />}
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {item.title}
                        </span>

                        <span
                          className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md shrink-0 border ${
                            item.type === 'material'
                              ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800'
                              : item.type === 'tutor'
                              ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-100 dark:border-amber-800'
                              : 'bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-800'
                          }`}
                        >
                          {item.badgeLabel}
                        </span>
                      </div>

                      {item.snippet && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-0.5">
                          {item.snippet}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-1 pt-1 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.dateStr}
                        </span>

                        <span className="text-indigo-600 dark:text-indigo-400 font-black flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          Abrir <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-8 px-4 text-center space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto">
                  <Search className="w-5 h-5" />
                </div>
                {searchTerm.trim() ? (
                  <>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Nenhum item encontrado para "{searchTerm}"
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                      Tente buscar por termos como "Biologia", "Fotossíntese", "Matemática" ou pelo objetivo do plano.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Histórico vazio
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                      Gere resumos, planos de tutor ou dúvidas no app para visualizá-los aqui rapidamente.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-medium">
            <div className="flex items-center space-x-2">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[9px] font-mono">↑</kbd>
                <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[9px] font-mono">↓</kbd>
                Navegar
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[9px] font-mono">Enter</kbd>
                Abrir
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[9px] font-mono">Esc</kbd>
                Fechar
              </span>
            </div>

            <span>{totalStoredCount} salvos localmente</span>
          </div>
        </div>
      )}
    </div>
  );
};
