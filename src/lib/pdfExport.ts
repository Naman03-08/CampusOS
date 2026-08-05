import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

export function oklchToRgb(l: number, c: number, h: number, a: number = 1): string {
  const hue = isNaN(h) ? 0 : h;
  const hRad = (hue * Math.PI) / 180;
  
  // Convert OKLCH to OKLAB
  const aLab = c * Math.cos(hRad);
  const bLab = c * Math.sin(hRad);
  
  // Convert OKLAB to LMS
  const l_ = l + 0.3963377774 * aLab + 0.2158037573 * bLab;
  const m_ = l - 0.1055613458 * aLab - 0.0638541728 * bLab;
  const s_ = l - 0.0894841775 * aLab - 1.2914855480 * bLab;
  
  // Cube LMS to get linear LMS
  const l_3 = l_ * l_ * l_;
  const m_3 = m_ * m_ * m_;
  const s_3 = s_ * s_ * s_;
  
  // Convert linear LMS to linear sRGB
  const rL = +4.0767416621 * l_3 - 3.3077115913 * m_3 + 0.2309699292 * s_3;
  const gL = -1.2684380046 * l_3 + 2.6097574011 * m_3 - 0.3413193965 * s_3;
  const bL = -0.0041960863 * l_3 - 0.7034186147 * m_3 + 1.7076147010 * s_3;
  
  // Convert linear sRGB to sRGB (gamma correction)
  const toSRGB = (x: number) => {
    if (x <= 0.0031308) {
      return 12.92 * x;
    }
    return 1.055 * Math.pow(Math.max(0, x), 1 / 2.4) - 0.055;
  };
  
  const r = Math.max(0, Math.min(255, Math.round(toSRGB(rL) * 255)));
  const g = Math.max(0, Math.min(255, Math.round(toSRGB(gL) * 255)));
  const b = Math.max(0, Math.min(255, Math.round(toSRGB(bL) * 255)));
  
  if (a === 1) {
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
}

export function sanitizeCssString(cssText: string): string {
  if (!cssText) return cssText;
  let cleaned = cssText;

  // Map to store CSS variable resolutions
  const varMap = new Map<string, string>();

  // Helper: oklch to rgb conversion
  const parseOklchToRgb = (oklchStr: string): string => {
    const regex = /oklch\(\s*([\d\%\.]+)\s+([\d\%\.]+)\s+([\d\%\.deg\rad]+)(?:\s*[\/\,]\s*([\d\%\.]+))?\s*\)/i;
    const match = oklchStr.match(regex);
    if (!match) return 'rgb(30, 41, 59)'; // default fallback

    const lGrp = match[1];
    const cGrp = match[2];
    const hGrp = match[3];
    const aGrp = match[4];

    const l = lGrp.endsWith('%') ? parseFloat(lGrp) / 100 : parseFloat(lGrp);
    const c = cGrp.endsWith('%') ? (parseFloat(cGrp) / 100) * 0.4 : parseFloat(cGrp);
    const h = parseFloat(hGrp);
    const a = aGrp ? (aGrp.endsWith('%') ? parseFloat(aGrp) / 100 : parseFloat(aGrp)) : 1;

    return oklchToRgb(l, c, h, a);
  };

  // 1. Convert all oklch(...) in CSS variables and store them in a map
  // Example match: --color-slate-50: oklch(0.97 0.01 256.6);
  const varRegex = /(--[\w-]+)\s*:\s*(oklch\([^)]+\))/gi;
  let varMatch;
  while ((varMatch = varRegex.exec(cleaned)) !== null) {
    const varName = varMatch[1];
    const oklchVal = varMatch[2];
    const rgbVal = parseOklchToRgb(oklchVal);
    varMap.set(varName, rgbVal);
  }

  // 2. Also map non-oklch variables if they are set to simple colors
  const otherVarRegex = /(--[\w-]+)\s*:\s*(#[a-f0-9]{3,8}|rgb\([^)]+\)|rgba\([^)]+\))/gi;
  let otherVarMatch;
  while ((otherVarMatch = otherVarRegex.exec(cleaned)) !== null) {
    varMap.set(otherVarMatch[1], otherVarMatch[2]);
  }

  // 3. Replace oklch(...) occurrences in the rest of the file with their RGB equivalent
  cleaned = cleaned.replace(/oklch\(\s*[\d\%\.]+\s+[\d\%\.]+\s+[\d\%\.deg\rad]+(?:\s*[\/\,]\s*[\d\%\.]+)?\s*\)/gi, (match) => {
    return parseOklchToRgb(match);
  });

  // 4. Resolve color-mix(in oklch, var(--color-slate-50) 80%, transparent) or color-mix(in oklch, oklch(...) 80%, transparent)
  cleaned = cleaned.replace(/color-mix\(\s*in\s+(?:oklch|srgb|oklab|xyz)\s*,\s*([^,]+?)\s+(\d+(?:\.\d+)?%)\s*,\s*transparent\s*\)/gi, (match, colorPart, percentPart) => {
    const pct = parseFloat(percentPart) / 100;
    let resolvedColor = colorPart.trim();
    
    // Resolve var(...) if any
    const varMatch = resolvedColor.match(/var\((--[\w-]+)\)/i);
    if (varMatch && varMap.has(varMatch[1])) {
      resolvedColor = varMap.get(varMatch[1])!;
    }

    // If it's a raw oklch, parse it directly
    if (resolvedColor.toLowerCase().startsWith('oklch')) {
      resolvedColor = parseOklchToRgb(resolvedColor);
    }

    // Now, resolvedColor should be rgb(r, g, b) or hex.
    // Let's parse rgb/hex and convert to rgba
    const rgbMatch = resolvedColor.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (rgbMatch) {
      return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${pct})`;
    }
    const hexMatch = resolvedColor.match(/#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i);
    if (hexMatch) {
      const r = parseInt(hexMatch[1], 16);
      const g = parseInt(hexMatch[2], 16);
      const b = parseInt(hexMatch[3], 16);
      return `rgba(${r}, ${g}, ${b}, ${pct})`;
    }

    return `rgba(30, 41, 59, ${pct})`; // fallback
  });

  // 5. General fallback for other color-mix formats
  cleaned = cleaned.replace(/color-mix\((?:[^()]+|\((?:[^()]+|\([^()]*\))*\))*\)/gi, (match) => {
    if (match.toLowerCase().includes('transparent')) {
      return 'rgba(0, 0, 0, 0)';
    }
    return 'rgb(30, 41, 59)';
  });

  // 6. Remove remaining oklab/lch/etc.
  cleaned = cleaned.replace(/\b(?:oklab|lab|lch)\((?:[^()]+|\((?:[^()]+|\([^()]*\))*\))*\)/gi, 'rgb(30, 41, 59)');

  return cleaned;
}

export function sanitizeDocumentForHtml2Canvas(clonedDoc: Document, targetElementId?: string, sanitizedCss?: string): void {
  // Copy all stylesheet and preconnect <link> tags from main document to cloned document's head
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"], link[rel="preconnect"]'));
  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    const absoluteUrl = href ? new URL(href, window.location.origin).href : '';
    
    // If we have pre-sanitized CSS, we skip copying same-origin stylesheet links
    // to avoid loading raw CSS files with oklch syntax.
    if (sanitizedCss && absoluteUrl.startsWith(window.location.origin) && link.getAttribute('rel') === 'stylesheet') {
      return;
    }

    const clonedLink = clonedDoc.createElement('link');
    clonedLink.rel = link.getAttribute('rel') || 'stylesheet';
    clonedLink.href = (link as HTMLLinkElement).href;
    const crossOrigin = link.getAttribute('crossorigin');
    if (crossOrigin !== null) {
      clonedLink.setAttribute('crossorigin', crossOrigin);
    }
    clonedDoc.head.appendChild(clonedLink);
  });

  // Inject the pre-sanitized CSS to ensure all Tailwind background-colors and borders are parsed perfectly by html2canvas
  if (sanitizedCss) {
    const styleTag = clonedDoc.createElement('style');
    styleTag.textContent = sanitizedCss;
    clonedDoc.head.appendChild(styleTag);
  }

  // Re-create <style> elements with sanitized CSS so the cloned iframe re-parses stylesheets cleanly
  const styleTags = Array.from(clonedDoc.querySelectorAll('style'));
  styleTags.forEach((styleTag) => {
    // Skip our newly injected style tag
    if (styleTag.textContent && (!sanitizedCss || styleTag !== clonedDoc.head.lastChild)) {
      const sanitized = sanitizeCssString(styleTag.textContent);
      const newStyle = clonedDoc.createElement('style');
      newStyle.textContent = sanitized;
      if (styleTag.parentNode) {
        styleTag.parentNode.replaceChild(newStyle, styleTag);
      }
    }
  });

  // Sanitize inline styles on all elements
  const allElements = clonedDoc.querySelectorAll('*');
  allElements.forEach((el) => {
    if (el instanceof HTMLElement) {
      const styleAttr = el.getAttribute('style');
      if (styleAttr) {
        el.setAttribute('style', sanitizeCssString(styleAttr));
      }
      // Remove all shadow-related styling and classes to completely prevent html2canvas rendering black spots or black boxes
      el.style.setProperty('box-shadow', 'none', 'important');
      el.style.setProperty('text-shadow', 'none', 'important');
      el.style.setProperty('filter', 'none', 'important');
      if (el.className) {
        el.className = el.className.replace(/\bshadow\b|\bshadow-\w+/g, '');
      }
    }
  });

  // Reset positioning / margins on cloned target element if provided
  if (targetElementId) {
    const clonedElem = clonedDoc.getElementById(targetElementId);
    if (clonedElem) {
      clonedElem.style.transform = 'none';
      clonedElem.style.boxShadow = 'none';
      clonedElem.style.margin = '0 auto';
      
      const isCert = targetElementId.includes('cert');
      if (isCert) {
        if (clonedDoc.body) {
          clonedDoc.body.style.width = '1200px';
          clonedDoc.body.style.height = 'auto';
          clonedDoc.body.style.margin = '0';
          clonedDoc.body.style.padding = '0';
          clonedDoc.body.style.overflow = 'hidden';
          clonedDoc.body.style.background = 'linear-gradient(to bottom right, #E3EDF7 0%, #E0F2F1 45%, #FBEED0 85%, #F5D77F 100%)';
        }

        let parent = clonedElem.parentElement;
        while (parent && parent !== clonedDoc.body) {
          parent.style.maxWidth = 'none';
          parent.style.width = '1200px';
          parent.style.overflow = 'hidden';
          parent.style.maxHeight = 'none';
          parent.style.height = 'auto';
          parent.style.padding = '0';
          parent.style.margin = '0 auto';
          parent = parent.parentElement;
        }

        clonedElem.style.width = '1160px';
        clonedElem.style.minWidth = '1160px';
        clonedElem.style.maxWidth = '1160px';
        clonedElem.style.height = 'auto';
        clonedElem.style.minHeight = 'auto';
        clonedElem.style.maxHeight = 'none';
        clonedElem.style.boxSizing = 'border-box';
        clonedElem.style.borderRadius = '24px';
        clonedElem.style.overflow = 'hidden';
        clonedElem.style.background = 'linear-gradient(to bottom right, #E3EDF7 0%, #E0F2F1 45%, #FBEED0 85%, #F5D77F 100%)';
      } else {
        // Read the actual background color of the original element on the webpage
        const originalElem = document.getElementById(targetElementId);
        let bgToApply = '#ffffff';
        if (originalElem) {
          const computedStyle = window.getComputedStyle(originalElem);
          bgToApply = computedStyle.backgroundColor || '#ffffff';
        }

        if (clonedDoc.body) {
          clonedDoc.body.style.width = '1024px';
          clonedDoc.body.style.height = 'auto';
          clonedDoc.body.style.margin = '0';
          clonedDoc.body.style.padding = '0';
          clonedDoc.body.style.overflow = 'visible';
          clonedDoc.body.style.background = bgToApply;
          clonedDoc.body.style.backgroundColor = bgToApply;
        }

        let parent = clonedElem.parentElement;
        while (parent && parent !== clonedDoc.body) {
          parent.style.maxWidth = 'none';
          parent.style.width = '1024px';
          parent.style.overflow = 'visible';
          parent.style.maxHeight = 'none';
          parent.style.height = 'auto';
          parent.style.padding = '0';
          parent.style.margin = '0 auto';
          parent = parent.parentElement;
        }

        if (targetElementId === 'cover-letter-paper-canvas') {
          // Force outer cloned element parameters to render perfectly on desktop dimension
          clonedElem.style.setProperty('width', '1000px', 'important');
          clonedElem.style.setProperty('min-width', '1000px', 'important');
          clonedElem.style.setProperty('max-width', '1000px', 'important');
          clonedElem.style.setProperty('height', 'auto', 'important');
          clonedElem.style.setProperty('min-height', 'auto', 'important');
          clonedElem.style.setProperty('max-height', 'none', 'important');
          clonedElem.style.setProperty('overflow', 'visible', 'important');
          clonedElem.style.setProperty('border-radius', '0px', 'important');
          clonedElem.style.setProperty('box-shadow', 'none', 'important');
          clonedElem.style.setProperty('margin', '0', 'important'); // Zero margin to prevent any subpixel shifting/left clipping
          clonedElem.style.setProperty('padding', '0', 'important');
          clonedElem.style.setProperty('background-color', bgToApply, 'important');
          clonedElem.style.setProperty('background', bgToApply, 'important');

          // Ensure parent container matches width and has no constraints or margins that cause shifting
          let pNode = clonedElem.parentElement;
          while (pNode && pNode !== clonedDoc.body) {
            pNode.style.setProperty('width', '1000px', 'important');
            pNode.style.setProperty('min-width', '1000px', 'important');
            pNode.style.setProperty('max-width', '1000px', 'important');
            pNode.style.setProperty('height', 'auto', 'important');
            pNode.style.setProperty('max-height', 'none', 'important');
            pNode.style.setProperty('overflow', 'visible', 'important');
            pNode.style.setProperty('margin', '0', 'important'); // Remove margins to prevent left-side crops
            pNode.style.setProperty('padding', '0', 'important');
            pNode.style.setProperty('display', 'block', 'important'); // Standard block flow rather than centering flex container
            pNode = pNode.parentElement;
          }
          if (clonedDoc.body) {
            clonedDoc.body.style.setProperty('width', '1000px', 'important');
            clonedDoc.body.style.setProperty('height', 'auto', 'important');
            clonedDoc.body.style.setProperty('overflow', 'visible', 'important');
            clonedDoc.body.style.setProperty('background-color', bgToApply, 'important');
            clonedDoc.body.style.setProperty('margin', '0', 'important');
            clonedDoc.body.style.setProperty('padding', '0', 'important');
            clonedDoc.body.style.setProperty('display', 'block', 'important');
          }
          const htmlEl = clonedDoc.documentElement;
          if (htmlEl) {
            htmlEl.style.setProperty('width', '1000px', 'important');
            htmlEl.style.setProperty('margin', '0', 'important');
            htmlEl.style.setProperty('padding', '0', 'important');
          }

          // 0. Force top header container to render side-by-side (flex-row)
          const topHeaderContainer = clonedElem.querySelector('div[class*="flex flex-col md:flex-row"], div[class*="flex-col md:flex-row"]');
          if (topHeaderContainer instanceof HTMLElement) {
            topHeaderContainer.style.setProperty('display', 'flex', 'important');
            topHeaderContainer.style.setProperty('flex-direction', 'row', 'important');
            topHeaderContainer.style.setProperty('justify-content', 'space-between', 'important');
            topHeaderContainer.style.setProperty('align-items', 'center', 'important');
            topHeaderContainer.style.setProperty('width', '100%', 'important');
            topHeaderContainer.style.setProperty('margin-bottom', '12px', 'important');
          }

          // Tighten header margins slightly
          const headerSection = clonedElem.querySelector('div[class*="border-b"], div[class*="pb-6"]');
          if (headerSection instanceof HTMLElement) {
            headerSection.style.setProperty('padding-bottom', '12px', 'important');
            headerSection.style.setProperty('margin-bottom', '14px', 'important');
          }

          // 1. Convert space-y elements to flex layouts with elegant, readable gaps matching website
          const spaceYElements = clonedElem.querySelectorAll('[class*="space-y-"]');
          spaceYElements.forEach((el) => {
            if (el instanceof HTMLElement) {
              el.style.setProperty('display', 'flex', 'important');
              el.style.setProperty('flex-direction', 'column', 'important');
              
              let gap = '14px';
              if (el.className.includes('space-y-8')) {
                gap = '20px';
              } else if (el.className.includes('space-y-6')) {
                gap = '14px';
              } else if (el.className.includes('space-y-4')) {
                gap = '10px';
              } else if (el.className.includes('space-y-3')) {
                gap = '8px';
              } else if (el.className.includes('space-y-2')) {
                gap = '6px';
              }
              el.style.setProperty('gap', gap, 'important');
              
              const children = el.children;
              for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (child instanceof HTMLElement) {
                  child.style.setProperty('margin-top', '0px', 'important');
                  child.style.setProperty('margin-bottom', '0px', 'important');
                }
              }
            }
          });

          // 2. Set beautiful outer padding of the primary canvas sheet to feel balanced and match A4
          const outerPaddingContainer = clonedElem.querySelector('div.p-8, div.p-12, div.sm\\:p-12, div[class*="p-8"], div[class*="p-12"]');
          if (outerPaddingContainer instanceof HTMLElement) {
            outerPaddingContainer.style.setProperty('padding', '24px 30px', 'important');
          }

          // 3. Elegant, highly readable typography for the main cover letter body paragraphs to match the website
          const mainParagraphs = clonedElem.querySelectorAll('p');
          mainParagraphs.forEach((p) => {
            if (p instanceof HTMLElement) {
              const origFs = window.getComputedStyle(p).fontSize;
              const fsVal = parseFloat(origFs);
              const targetFs = fsVal ? Math.max(12, Math.min(fsVal, 14.5)) : 13.5;

              p.style.setProperty('font-size', `${targetFs}px`, 'important');
              p.style.setProperty('line-height', '1.5', 'important');
              p.style.setProperty('margin-top', '0px', 'important');
              p.style.setProperty('margin-bottom', '0px', 'important');
            }
          });

          // 4. Force the main grid to be a 12-column layout (side-by-side desktop view) on the PDF!
          const mainGrid = clonedElem.querySelector('.grid.grid-cols-1.lg\\:grid-cols-12, div[class*="grid-cols-1"]');
          if (mainGrid instanceof HTMLElement) {
            mainGrid.style.setProperty('display', 'grid', 'important');
            mainGrid.style.setProperty('grid-template-columns', 'repeat(12, minmax(0, 1fr))', 'important');
            mainGrid.style.setProperty('gap', '20px', 'important');
          }

          const leftColumn = clonedElem.querySelector('.lg\\:col-span-8, div[class*="lg:col-span-8"]');
          if (leftColumn instanceof HTMLElement) {
            leftColumn.style.setProperty('grid-column', 'span 8 / span 8', 'important');
            leftColumn.style.setProperty('padding-right', '16px', 'important');
            leftColumn.style.setProperty('display', 'flex', 'important');
            leftColumn.style.setProperty('flex-direction', 'column', 'important');
            leftColumn.style.setProperty('gap', '10px', 'important');
          }

          const rightSidebar = clonedElem.querySelector('.lg\\:col-span-4, div[class*="lg:col-span-4"]');
          if (rightSidebar instanceof HTMLElement) {
            rightSidebar.style.setProperty('grid-column', 'span 4 / span 4', 'important');
            rightSidebar.style.setProperty('display', 'flex', 'important');
            rightSidebar.style.setProperty('flex-direction', 'column', 'important');
            rightSidebar.style.setProperty('gap', '12px', 'important');
          }

          // 5. Force horizontal contact pills and dynamically copy the exact background, border, text colors from webpage template
          const contactInfoGrid = clonedElem.querySelector('#cover-letter-contact-grid') || clonedElem.querySelector('div[class*="grid-cols-1 sm:grid-cols-2"]');
          if (contactInfoGrid instanceof HTMLElement) {
            contactInfoGrid.style.setProperty('display', 'flex', 'important');
            contactInfoGrid.style.setProperty('flex-direction', 'row', 'important');
            contactInfoGrid.style.setProperty('flex-wrap', 'wrap', 'important');
            contactInfoGrid.style.setProperty('justify-content', 'space-between', 'important');
            contactInfoGrid.style.setProperty('gap', '6px', 'important');
            contactInfoGrid.style.setProperty('margin-top', '10px', 'important');
            contactInfoGrid.style.setProperty('width', '100%', 'important');

            const originalGrid = document.getElementById('cover-letter-contact-grid') || document.querySelector('div[class*="grid-cols-1 sm:grid-cols-2"]');
            const originalPills = originalGrid ? Array.from(originalGrid.children) : [];

            const pills = Array.from(contactInfoGrid.children);
            pills.forEach((pill, idx) => {
              if (pill instanceof HTMLElement) {
                pill.style.setProperty('flex', '1 1 0%', 'important');
                pill.style.setProperty('min-width', '0', 'important');
                pill.style.setProperty('padding', '6px 8px', 'important');
                pill.style.setProperty('display', 'flex', 'important');
                pill.style.setProperty('align-items', 'center', 'important');
                pill.style.setProperty('justify-content', 'flex-start', 'important');
                pill.style.setProperty('gap', '4px', 'important');
                pill.style.setProperty('height', 'auto', 'important');
                pill.style.setProperty('box-shadow', 'none', 'important');
                pill.style.setProperty('overflow', 'visible', 'important'); // Allow full height rendering without clipping!

                const orig = originalPills[idx];
                if (orig instanceof HTMLElement) {
                  const comp = window.getComputedStyle(orig);
                  pill.style.setProperty('background-color', comp.backgroundColor, 'important');
                  pill.style.setProperty('border', comp.border || `1px solid ${comp.borderColor}`, 'important');
                  pill.style.setProperty('border-radius', comp.borderRadius || '8px', 'important');
                  pill.style.setProperty('color', comp.color, 'important');
                } else {
                  pill.style.setProperty('background-color', '#f8fafc', 'important');
                  pill.style.setProperty('border', '1px solid #cbd5e1', 'important');
                  pill.style.setProperty('border-radius', '8px', 'important');
                  pill.style.setProperty('color', '#334155', 'important');
                }

                // Tighten text inside pill
                const textSpan = pill.querySelector('span');
                if (textSpan instanceof HTMLElement) {
                  textSpan.style.setProperty('font-size', '10px', 'important');
                  textSpan.style.setProperty('font-weight', '600', 'important');
                  textSpan.style.setProperty('white-space', 'nowrap', 'important');
                  textSpan.style.setProperty('overflow', 'visible', 'important'); // Prevent scrollbar/truncate cut-offs
                  textSpan.style.setProperty('text-overflow', 'unset', 'important');
                  textSpan.style.setProperty('line-height', '1.4', 'important'); // Robust height so descenders/caps are fully shown!
                  
                  const origText = orig?.querySelector('span');
                  if (origText instanceof HTMLElement) {
                    const compText = window.getComputedStyle(origText);
                    textSpan.style.setProperty('color', compText.color, 'important');
                  }
                }
              }
            });
          }

          // 6. Adjust sidebar typography and cards to remain beautifully legible
          if (rightSidebar instanceof HTMLElement) {
            const sidebarH4s = rightSidebar.querySelectorAll('h4');
            sidebarH4s.forEach((h4) => {
              if (h4 instanceof HTMLElement) {
                h4.style.setProperty('font-size', '11px', 'important');
                h4.style.setProperty('margin-top', '0px', 'important');
                h4.style.setProperty('margin-bottom', '0px', 'important');
              }
            });

            // Adjust headings border containers
            const headerContainers = rightSidebar.querySelectorAll('div[class*="border-b"], div[class*="border-l"]');
            headerContainers.forEach((hc) => {
              if (hc instanceof HTMLElement) {
                hc.style.setProperty('padding-bottom', '4px', 'important');
                hc.style.setProperty('margin-bottom', '6px', 'important');
              }
            });

            const sidebarCards = rightSidebar.querySelectorAll('div[class*="rounded-"], div[class*="border-"]');
            sidebarCards.forEach((card) => {
              if (card instanceof HTMLElement) {
                card.style.setProperty('padding', '6px 8px', 'important');
                card.style.setProperty('margin-top', '0px', 'important');
                card.style.setProperty('margin-bottom', '0px', 'important');
              }
            });

            const allTexts = rightSidebar.querySelectorAll('div, span, p, li');
            allTexts.forEach((text) => {
              if (text instanceof HTMLElement) {
                // Skip structural parent DIVs to prevent vertical block/flex collapse and overlapping text
                if (text.tagName === 'DIV' && text.children.length > 0) {
                  return;
                }
                const computedFs = window.getComputedStyle(text).fontSize;
                const fsVal = parseFloat(computedFs);
                if (fsVal) {
                  const targetFs = Math.max(9, Math.min(fsVal, 11));
                  text.style.setProperty('font-size', `${targetFs}px`, 'important');
                  text.style.setProperty('line-height', '1.4', 'important'); // Balanced, readable leading
                }
              }
            });
          }

          // 7. Resolve currentColor and SVG paths to ensure pristine icon rendering without black shapes/black spots
          const allSvgs = clonedElem.querySelectorAll('svg');
          allSvgs.forEach((svg) => {
            if (svg instanceof SVGElement) {
              const id = svg.getAttribute('id') || svg.parentElement?.getAttribute('id') || '';
              if (id.includes('logo-') || id.includes('logo-fallback')) {
                return;
              }

              svg.style.setProperty('fill', 'none', 'important');
              const paths = svg.querySelectorAll('path, rect, circle, polygon, ellipse, line');
              paths.forEach((p) => {
                if (p instanceof SVGElement) {
                  p.style.setProperty('fill', 'none', 'important');
                  
                  let currentStroke = p.getAttribute('stroke') || svg.getAttribute('stroke');
                  if (currentStroke === 'currentColor') {
                    // Resolve currentColor to actual computed color of the parent SVG
                    currentStroke = window.getComputedStyle(svg).color || '#3b82f6';
                  }
                  if (currentStroke && currentStroke !== 'none') {
                    p.style.setProperty('stroke', currentStroke, 'important');
                  }
                }
              });
            }
          });

          // 8. Disable truncation clipping globally on the page to prevent any cropped or half-shown characters in text boxes
          const allTruncated = clonedElem.querySelectorAll('[class*="truncate"]');
          allTruncated.forEach((el) => {
            if (el instanceof HTMLElement) {
              el.style.setProperty('overflow', 'visible', 'important');
              el.style.setProperty('text-overflow', 'unset', 'important');
            }
          });
        }
      }
    }
  }
}

export async function exportCanvasToPDF(elementId: string, filename: string = 'Resume.pdf'): Promise<void> {
  const elem = document.getElementById(elementId);
  if (!elem) {
    throw new Error(`Element with id #${elementId} not found`);
  }

  const isCoverLetter = elementId === 'cover-letter-paper-canvas';

  // Pre-fetch same-origin stylesheets and sanitize them to replace oklch with rgb/rgba
  let sanitizedCss = '';
  try {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    for (const link of links) {
      const href = link.getAttribute('href');
      if (href) {
        const absoluteUrl = new URL(href, window.location.origin).href;
        if (absoluteUrl.startsWith(window.location.origin)) {
          const response = await fetch(absoluteUrl);
          if (response.ok) {
            const rawCss = await response.text();
            sanitizedCss += '\n' + sanitizeCssString(rawCss);
          }
        }
      }
    }
  } catch (err) {
    console.warn('Failed to pre-fetch and sanitize stylesheets:', err);
  }

  // Save original inline style to restore it perfectly after html2canvas completes cloning
  const originalStyle = elem.style.cssText;

  if (isCoverLetter) {
    // Temporarily apply export-optimized width and remove any transforms (like 3D tilt hovers)
    elem.style.setProperty('width', '1000px', 'important');
    elem.style.setProperty('min-width', '1000px', 'important');
    elem.style.setProperty('max-width', '1000px', 'important');
    elem.style.setProperty('transform', 'none', 'important');
    elem.style.setProperty('box-shadow', 'none', 'important');
    elem.style.setProperty('margin', '0', 'important');
    elem.style.setProperty('padding', '0', 'important');
  }

  const isCert = filename.toLowerCase().includes('certificate') || elementId.includes('cert');

  // Generate crisp canvas rendering with desktop layout width
  const canvas = await html2canvas(elem, {
    scale: 2, // 2x scale for high DPI crisp text
    useCORS: true,
    allowTaint: true,
    logging: false,
    windowWidth: 1200,
    backgroundColor: null,
    onclone: (clonedDoc) => {
      sanitizeDocumentForHtml2Canvas(clonedDoc, elementId, sanitizedCss);
    }
  });

  // Restores the original inline style immediately
  elem.style.cssText = originalStyle;

  const imgData = canvas.toDataURL('image/png', 1.0);

  if (isCert) {
    // Convert canvas pixels to PDF dimensions in millimeters (1 px = 0.264583 mm)
    const pdfWidth = canvas.width * 0.264583;
    const pdfHeight = canvas.height * 0.264583;

    const pdf = new jsPDF({
      orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });

    // Draw edge-to-edge to eliminate all white letterboxes and margins
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    pdf.save(filename);
  } else {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const isCoverLetter = elementId === 'cover-letter-paper-canvas';
    
    // We want to calculate the maximum canvas height that fits in a single PDF page
    const pageCanvasHeight = canvas.width * (pdfHeight / pdfWidth);
    
    // If the canvas fits fully on one page, or if it is a cover letter (which must always be exactly 1 page)
    if (isCoverLetter || canvas.height <= pageCanvasHeight) {
      let imgWidth = pdfWidth;
      let imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // If it's a cover letter and slightly overflows, scale it to fit A4 height perfectly
      if (isCoverLetter && imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = (canvas.width * pdfHeight) / canvas.height;
      }
      
      const xOffset = (pdfWidth - imgWidth) / 2;
      const yOffset = (pdfHeight - imgHeight) / 2;
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight, undefined, 'FAST');
    } else {
      // It's a multi-page document! Slice the canvas into multiple pages
      let remainingHeight = canvas.height;
      let yOffset = 0;
      let pageNum = 1;

      while (remainingHeight > 0) {
        if (pageNum > 1) {
          pdf.addPage();
        }

        const sHeight = Math.min(pageCanvasHeight, remainingHeight);
        
        // Slicing via temporary canvas
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = sHeight;
        const ctx = tempCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(
            canvas,
            0, yOffset, canvas.width, sHeight, // source rectangle
            0, 0, canvas.width, sHeight       // destination rectangle
          );
        }
        
        const pageImgData = tempCanvas.toDataURL('image/png', 1.0);
        const pHeight = (sHeight * pdfWidth) / canvas.width;
        
        // Draw edge-to-edge on each page
        pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, pHeight, undefined, 'FAST');
        
        yOffset += sHeight;
        remainingHeight -= sHeight;
        pageNum++;
      }
    }
    
    pdf.save(filename);
  }
}

export function exportTextToPDF(title: string, content: string, filename: string = 'document.pdf') {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const maxLineWidth = pageWidth - margin * 2;

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(37, 99, 235); // Placivo Blue (#2563EB)
  doc.text(title, margin, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated by Placivo AI - ${new Date().toLocaleDateString()}`, margin, 27);

  doc.setDrawColor(226, 232, 240);
  doc.line(margin, 31, pageWidth - margin, 31);

  // Content
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);

  const lines = doc.splitTextToSize(content, maxLineWidth);
  let cursorY = 38;

  for (let i = 0; i < lines.length; i++) {
    if (cursorY > pageHeight - margin) {
      doc.addPage();
      cursorY = 20;
    }
    doc.text(lines[i], margin, cursorY);
    cursorY += 6;
  }

  doc.save(filename);
}

export function exportResumeToPDF(resume: any, filename: string = 'Resume_Placivo.pdf') {
  const doc = new jsPDF();
  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  let cursorY = 20;

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42);
  doc.text(resume.fullName || 'Student Name', margin, cursorY);
  cursorY += 8;

  // Contact Line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  const contactText = `${resume.email} | ${resume.phone} | ${resume.location} | ${resume.linkedin}`;
  doc.text(contactText, margin, cursorY);
  cursorY += 8;

  // Line
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(0.8);
  doc.line(margin, cursorY, pageWidth - margin, cursorY);
  cursorY += 8;

  // Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(37, 99, 235);
  doc.text('PROFESSIONAL SUMMARY', margin, cursorY);
  cursorY += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(resume.summary, pageWidth - margin * 2);
  doc.text(summaryLines, margin, cursorY);
  cursorY += summaryLines.length * 5 + 6;

  // Education
  if (resume.education?.length) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text('EDUCATION', margin, cursorY);
    cursorY += 6;

    resume.education.forEach((edu: any) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(edu.institution, margin, cursorY);
      doc.text(edu.year, pageWidth - margin - 25, cursorY);
      cursorY += 5;

      doc.setFont('helvetica', 'italic');
      doc.setTextColor(71, 85, 105);
      doc.text(`${edu.degree} - GPA: ${edu.gpa}`, margin, cursorY);
      cursorY += 7;
    });
  }

  // Experience
  if (resume.experience?.length) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text('EXPERIENCE', margin, cursorY);
    cursorY += 6;

    resume.experience.forEach((exp: any) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(`${exp.role} - ${exp.company}`, margin, cursorY);
      doc.text(exp.duration, pageWidth - margin - 30, cursorY);
      cursorY += 5;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      exp.bulletPoints.forEach((bullet: string) => {
        const bulletLines = doc.splitTextToSize(`• ${bullet}`, pageWidth - margin * 2 - 5);
        doc.text(bulletLines, margin + 3, cursorY);
        cursorY += bulletLines.length * 5;
      });
      cursorY += 3;
    });
  }

  // Projects
  if (resume.projects?.length) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text('KEY PROJECTS', margin, cursorY);
    cursorY += 6;

    resume.projects.forEach((proj: any) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(proj.name, margin, cursorY);
      cursorY += 5;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const descLines = doc.splitTextToSize(proj.description, pageWidth - margin * 2);
      doc.text(descLines, margin, cursorY);
      cursorY += descLines.length * 5;

      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 116, 139);
      doc.text(`Tech Stack: ${proj.techStack.join(', ')}`, margin, cursorY);
      cursorY += 7;
    });
  }

  doc.save(filename);
}
