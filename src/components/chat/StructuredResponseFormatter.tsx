import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  Terminal, 
  Calculator, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Sparkles,
  HelpCircle,
  FileCode,
  ListOrdered
} from 'lucide-react';

interface StructuredResponseFormatterProps {
  content: string;
}

/**
 * Sanitizes and cleans up raw LaTeX markup strings into human-readable math expressions
 * so users never see messy unparsed LaTeX code like $\frac{a}{b}$, \left(, \right), \sum, etc.
 */
export function cleanLaTeX(text: string): string {
  if (!text) return '';

  let cleaned = text;

  // 1. Remove LaTeX \text{...} wrappers
  cleaned = cleaned.replace(/\\text\{([^}]+)\}/g, '$1');

  // 2. Replace \frac{num}{den} with (num / den)
  cleaned = cleaned.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)');

  // 3. Replace summations \sum_{lower}^{upper} or \sum_{lower}
  cleaned = cleaned.replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, '∑ ($1 to $2)');
  cleaned = cleaned.replace(/\\sum_\{([^}]+)\}/g, '∑ ($1)');
  cleaned = cleaned.replace(/\\sum/g, '∑');

  // 4. Replace integrals \int_{a}^{b}
  cleaned = cleaned.replace(/\\int_\{([^}]+)\}\^\{([^}]+)\}/g, '∫ ($1 to $2)');
  cleaned = cleaned.replace(/\\int/g, '∫');

  // 5. Replace roots \sqrt{x}
  cleaned = cleaned.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');
  cleaned = cleaned.replace(/\\sqrt/g, '√');

  // 6. Common LaTeX operators and math symbols
  cleaned = cleaned
    .replace(/\\implies/g, '⇒')
    .replace(/\\iff/g, '⇔')
    .replace(/\\infty/g, '∞')
    .replace(/\\cdot/g, '·')
    .replace(/\\times/g, '×')
    .replace(/\\approx/g, '≈')
    .replace(/\\neq/g, '≠')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\log_2/g, 'log₂')
    .replace(/\\log/g, 'log')
    .replace(/\\ln/g, 'ln')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\theta/g, 'θ')
    .replace(/\\Theta/g, 'Θ')
    .replace(/\\omega/g, 'ω')
    .replace(/\\Omega/g, 'Ω')
    .replace(/\\pi/g, 'π')
    .replace(/\\dots/g, '...')
    .replace(/\\cdots/g, '...');

  // 7. Strip \left( and \right)
  cleaned = cleaned
    .replace(/\\left\(/g, '(')
    .replace(/\\right\)/g, ')')
    .replace(/\\left\[/g, '[')
    .replace(/\\right\]/g, ']')
    .replace(/\\left\{/g, '{')
    .replace(/\\right\}/g, '}');

  // 8. Clean leftover backslashes on plain words (e.g. \over -> /)
  cleaned = cleaned.replace(/\\over/g, '/');

  // 9. Remove enclosing single or double dollar signs
  cleaned = cleaned.replace(/\$\$([\s\S]*?)\$\$/g, '$1');
  cleaned = cleaned.replace(/\$([^$]+)\$/g, '$1');

  return cleaned.trim();
}

export const StructuredResponseFormatter: React.FC<StructuredResponseFormatterProps> = ({ content }) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  if (!content) return null;

  // Split into code blocks vs non-code blocks first
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  const parts: { type: 'text' | 'code'; lang?: string; code?: string; text?: string }[] = [];

  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', text: content.slice(lastIndex, match.index) });
    }
    parts.push({
      type: 'code',
      lang: match[1] || 'plaintext',
      code: match[2].trim(),
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({ type: 'text', text: content.slice(lastIndex) });
  }

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  // Helper to classify heading text fuzzy match
  const classifyHeading = (title: string): 'overview' | 'proof' | 'math' | 'code' | 'viva' | 'generic' => {
    const t = title.toLowerCase();
    if (t.includes('overview') || t.includes('summary') || t.includes('abstract') || t.includes('introduction')) return 'overview';
    if (t.includes('proof') || t.includes('explanation') || t.includes('analysis') || t.includes('derivation') || t.includes('steps') || t.includes('how to')) return 'proof';
    if (t.includes('formula') || t.includes('complexity') || t.includes('bounds') || t.includes('math') || t.includes('theorem')) return 'math';
    if (t.includes('code') || t.includes('pseudocode') || t.includes('implementation') || t.includes('algorithm')) return 'code';
    if (t.includes('viva') || t.includes('tip') || t.includes('exam') || t.includes('trick') || t.includes('hint')) return 'viva';
    return 'generic';
  };

  return (
    <div className="space-y-5 text-slate-800 leading-relaxed font-sans text-xs sm:text-sm">
      {parts.map((part, pIndex) => {
        if (part.type === 'code') {
          return (
            <div
              key={pIndex}
              className="my-3.5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 overflow-hidden shadow-md font-mono text-xs"
            >
              <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-bold">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span className="uppercase tracking-wider text-[10px] text-slate-300">
                    {part.lang || 'code'}
                  </span>
                </div>
                <button
                  onClick={() => handleCopyCode(part.code || '', pIndex)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1 cursor-pointer text-[10px] font-semibold"
                >
                  {copiedCodeIndex === pIndex ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto whitespace-pre leading-relaxed text-blue-200 selection:bg-blue-600/40 scrollbar-thin">
                <code>{part.code}</code>
              </pre>
            </div>
          );
        }

        // Process Text - Aggregating lines into semantic, highly-structured sections
        const rawText = part.text || '';
        const lines = rawText.split('\n');

        interface SemanticSection {
          title: string;
          level: number;
          lines: string[];
        }

        const sections: SemanticSection[] = [];
        let currentSection: SemanticSection = { title: '', level: 0, lines: [] };

        lines.forEach((line) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('#')) {
            if (currentSection.title || currentSection.lines.length > 0) {
              sections.push(currentSection);
            }
            const level = (trimmed.match(/^#+/) || ['#'])[0].length;
            const headingText = trimmed.replace(/^#+\s*/, '');
            currentSection = { title: headingText, level, lines: [] };
          } else {
            currentSection.lines.push(line);
          }
        });
        if (currentSection.title || currentSection.lines.length > 0) {
          sections.push(currentSection);
        }

        return (
          <div key={`text_part_${pIndex}`} className="space-y-5">
            {sections.map((section, sIdx) => {
              const type = section.title ? classifyHeading(section.title) : 'generic';
              const cleanTitle = cleanLaTeX(section.title);

              const sectionElements: React.ReactNode[] = [];
              let currentList: { items: string[]; isOrdered: boolean } | null = null;

              const flushList = (keyPrefix: string) => {
                if (!currentList || currentList.items.length === 0) return;
                const isOrd = currentList.isOrdered;
                sectionElements.push(
                  <div key={`${keyPrefix}_list`} className="my-2.5 space-y-2 pl-1">
                    {currentList.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 bg-white/70 p-2.5 px-3.5 rounded-xl border border-slate-200/50 shadow-2xs"
                      >
                        {isOrd ? (
                          <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                        )}
                        <div className="flex-1 text-slate-700 font-medium leading-relaxed">
                          {renderInlineFormatted(cleanLaTeX(item))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
                currentList = null;
              };

              section.lines.forEach((line, lIndex) => {
                const trimmed = line.trim();
                if (!trimmed) {
                  flushList(`line_${lIndex}`);
                  return;
                }

                // 1. Step-by-Step badge detection
                const stepMatch = trimmed.match(/^(Step\s+\d+|[1-9]\d*[\.:])\s*(.*)/i);
                if (stepMatch && !trimmed.startsWith('$$\\')) {
                  flushList(`line_${lIndex}`);
                  const stepNum = stepMatch[1].replace(/[\.:]/g, '');
                  const stepBody = cleanLaTeX(stepMatch[2]);

                  sectionElements.push(
                    <div
                      key={`step_${lIndex}`}
                      className="my-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/20 to-white border border-blue-100 shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-blue-600 text-white font-black text-[10px] uppercase tracking-wider shadow-xs">
                          {stepNum.toUpperCase().includes('STEP') ? stepNum : `Step ${stepNum}`}
                        </span>
                      </div>
                      <div className="text-slate-800 font-semibold leading-relaxed">
                        {renderInlineFormatted(stepBody)}
                      </div>
                    </div>
                  );
                  return;
                }

                // 2. High Precision Formula & Math Block Extraction
                // Excludes simple variables assignments like "x = 5" or "let n = input size"
                const isFormulaLine =
                  (trimmed.includes('$$') || trimmed.startsWith('$$') || trimmed.includes('=\\') || trimmed.includes('=\\frac') || trimmed.includes('\\sum') || trimmed.includes('\\text{')) ||
                  ((trimmed.includes('∈') || trimmed.includes('⇒') || trimmed.includes('∑') || trimmed.includes('√') || trimmed.includes('∫') || trimmed.includes('^2') || trimmed.includes('n log n') || trimmed.includes('T(n)') || trimmed.includes('O(')) &&
                    trimmed.length < 120 &&
                    !trimmed.startsWith('-') &&
                    !trimmed.startsWith('*') &&
                    !trimmed.match(/^[a-zA-Z\s]+=[a-zA-Z\s\d\.]+$/)); // ignores basic plain-word strings with '='

                if (isFormulaLine) {
                  flushList(`line_${lIndex}`);
                  const formulaCleaned = cleanLaTeX(trimmed);
                  sectionElements.push(
                    <div
                      key={`formula_${lIndex}`}
                      className="my-2.5 p-3.5 rounded-2xl bg-slate-900 text-blue-200 border border-slate-800 font-mono text-xs sm:text-sm flex items-start gap-3 shadow-md selection:bg-blue-600 selection:text-white"
                    >
                      <Calculator className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div className="flex-1 font-bold tracking-wide overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {formulaCleaned}
                      </div>
                    </div>
                  );
                  return;
                }

                // 3. Bullet lists
                if (trimmed.startsWith('-') || trimmed.startsWith('*') || trimmed.startsWith('•')) {
                  const listText = trimmed.replace(/^[-*•]\s*/, '');
                  if (!currentList || currentList.isOrdered) {
                    flushList(`line_${lIndex}`);
                    currentList = { items: [listText], isOrdered: false };
                  } else {
                    currentList.items.push(listText);
                  }
                  return;
                }

                // 4. Ordered lists
                const ordMatch = trimmed.match(/^(\d+)[\.\)]\s+(.*)/);
                if (ordMatch) {
                  const listText = ordMatch[2];
                  if (!currentList || !currentList.isOrdered) {
                    flushList(`line_${lIndex}`);
                    currentList = { items: [listText], isOrdered: true };
                  } else {
                    currentList.items.push(listText);
                  }
                  return;
                }

                // 5. Regular Paragraph
                flushList(`line_${lIndex}`);
                const pText = cleanLaTeX(trimmed);
                sectionElements.push(
                  <p key={`p_${lIndex}`} className="my-1.5 leading-relaxed font-medium text-slate-700">
                    {renderInlineFormatted(pText)}
                  </p>
                );
              });

              flushList(`section_${sIdx}_end`);

              // Render Classified Academic Cards
              if (type === 'overview') {
                return (
                  <div
                    key={sIdx}
                    className="p-5.5 rounded-3xl border border-blue-100 bg-blue-50/25 shadow-xs space-y-3.5"
                  >
                    <div className="flex items-center gap-2.5 border-b border-blue-100/80 pb-2.5">
                      <Sparkles className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                      <h3 className="font-black text-sm tracking-tight text-blue-900 uppercase">
                        {cleanTitle || 'Executive Overview'}
                      </h3>
                    </div>
                    <div className="space-y-1.5 text-slate-800">{sectionElements}</div>
                  </div>
                );
              }

              if (type === 'proof') {
                return (
                  <div
                    key={sIdx}
                    className="p-5.5 rounded-3xl border border-indigo-100 bg-indigo-50/25 shadow-xs space-y-3.5"
                  >
                    <div className="flex items-center gap-2.5 border-b border-indigo-100/80 pb-2.5">
                      <CheckCircle2 className="w-4.5 h-4.5 text-indigo-600 shrink-0" />
                      <h3 className="font-black text-sm tracking-tight text-indigo-900 uppercase">
                        {cleanTitle || 'Step-by-Step Proof / Explanation'}
                      </h3>
                    </div>
                    <div className="space-y-1.5 text-slate-800">{sectionElements}</div>
                  </div>
                );
              }

              if (type === 'math') {
                return (
                  <div
                    key={sIdx}
                    className="p-5.5 rounded-3xl border border-slate-200 bg-slate-50/50 shadow-xs space-y-3.5"
                  >
                    <div className="flex items-center gap-2.5 border-b border-slate-200 pb-2.5">
                      <Calculator className="w-4.5 h-4.5 text-slate-700 shrink-0" />
                      <h3 className="font-black text-sm tracking-tight text-slate-900 uppercase">
                        {cleanTitle || 'Key Formulas & Complexity Bounds'}
                      </h3>
                    </div>
                    <div className="space-y-1.5 text-slate-800">{sectionElements}</div>
                  </div>
                );
              }

              if (type === 'code') {
                return (
                  <div
                    key={sIdx}
                    className="p-5.5 rounded-3xl border border-emerald-100 bg-emerald-50/15 shadow-xs space-y-3.5"
                  >
                    <div className="flex items-center gap-2.5 border-b border-emerald-100 pb-2.5">
                      <Terminal className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                      <h3 className="font-black text-sm tracking-tight text-emerald-900 uppercase">
                        {cleanTitle || 'Code / Pseudocode'}
                      </h3>
                    </div>
                    <div className="space-y-1.5 text-slate-800">{sectionElements}</div>
                  </div>
                );
              }

              if (type === 'viva') {
                return (
                  <div
                    key={sIdx}
                    className="p-5.5 rounded-3xl border-2 border-dashed border-amber-300 bg-amber-50/30 shadow-xs space-y-3.5"
                  >
                    <div className="flex items-center gap-2.5 border-b border-amber-200 pb-2.5">
                      <Lightbulb className="w-4.5 h-4.5 text-amber-500 shrink-0 animate-pulse" />
                      <h3 className="font-black text-sm tracking-tight text-amber-800 uppercase">
                        {cleanTitle || 'Pro Viva Exam Tip'}
                      </h3>
                    </div>
                    <div className="space-y-1.5 text-slate-800">{sectionElements}</div>
                  </div>
                );
              }

              // Generic sections
              return (
                <div key={sIdx} className="space-y-3">
                  {cleanTitle && (
                    <div className="mt-5 mb-2 font-black flex items-center gap-2 text-slate-900 border-b pb-1.5 border-slate-200">
                      <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="text-sm tracking-tight uppercase text-indigo-900">
                        {cleanTitle}
                      </span>
                    </div>
                  )}
                  <div className="space-y-1.5 text-slate-800">{sectionElements}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Helper to parse inline **bold**, *italic*, `inline code`
 */
function renderInlineFormatted(text: string): React.ReactNode {
  if (!text) return null;

  // Split by inline code `code`
  const codeParts = text.split(/`([^`]+)`/g);

  return codeParts.map((codePart, cIdx) => {
    if (cIdx % 2 === 1) {
      return (
        <code key={cIdx} className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono text-[11px] font-bold border border-blue-200/60">
          {codePart}
        </code>
      );
    }

    // Split by **bold**
    const boldParts = codePart.split(/\*\*([^*]+)\*\*/g);
    return boldParts.map((boldPart, bIdx) => {
      if (bIdx % 2 === 1) {
        return (
          <strong key={bIdx} className="font-black text-slate-950">
            {boldPart}
          </strong>
        );
      }
      return boldPart;
    });
  });
}
