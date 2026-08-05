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

export function sanitizeDocumentForHtml2Canvas(clonedDoc: Document, targetElementId?: string): void {
  // Copy all stylesheet and preconnect <link> tags from main document to cloned document's head
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"], link[rel="preconnect"]'));
  links.forEach((link) => {
    const clonedLink = clonedDoc.createElement('link');
    clonedLink.rel = link.getAttribute('rel') || 'stylesheet';
    clonedLink.href = (link as HTMLLinkElement).href;
    const crossOrigin = link.getAttribute('crossorigin');
    if (crossOrigin !== null) {
      clonedLink.setAttribute('crossorigin', crossOrigin);
    }
    clonedDoc.head.appendChild(clonedLink);
  });

  // Re-create <style> elements with sanitized CSS so the cloned iframe re-parses stylesheets cleanly
  const styleTags = Array.from(clonedDoc.querySelectorAll('style'));
  styleTags.forEach((styleTag) => {
    if (styleTag.textContent) {
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
    const styleAttr = el.getAttribute('style');
    if (styleAttr) {
      el.setAttribute('style', sanitizeCssString(styleAttr));
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
        if (clonedDoc.body) {
          clonedDoc.body.style.width = '1024px';
          clonedDoc.body.style.height = 'auto';
          clonedDoc.body.style.margin = '0';
          clonedDoc.body.style.padding = '0';
          clonedDoc.body.style.overflow = 'visible';
          clonedDoc.body.style.background = 'transparent';
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

        clonedElem.style.width = '1024px';
        clonedElem.style.minWidth = '1024px';
        clonedElem.style.maxWidth = '1024px';
        clonedElem.style.borderRadius = '0';
        clonedElem.style.overflow = 'visible';
        clonedElem.style.height = 'auto';
        clonedElem.style.minHeight = 'auto';
        clonedElem.style.maxHeight = 'none';

        // Tighten layouts inside cover letter specifically so it beautifully fits exactly one page
        if (targetElementId === 'cover-letter-paper-canvas') {
          // 0. Force top header container to render side-by-side (flex-row)
          const topHeaderContainer = clonedElem.querySelector('div[class*="flex flex-col md:flex-row"], div[class*="flex-col md:flex-row"]');
          if (topHeaderContainer instanceof HTMLElement) {
            topHeaderContainer.style.setProperty('display', 'flex', 'important');
            topHeaderContainer.style.setProperty('flex-direction', 'row', 'important');
            topHeaderContainer.style.setProperty('justify-content', 'space-between', 'important');
            topHeaderContainer.style.setProperty('align-items', 'center', 'important');
            topHeaderContainer.style.setProperty('width', '100%', 'important');
          }

          // 1. Convert all space-y-x classes to flex layouts to easily tighten vertical margin-tops
          const spaceYElements = clonedElem.querySelectorAll('[class*="space-y-"]');
          spaceYElements.forEach((el) => {
            if (el instanceof HTMLElement) {
              el.style.setProperty('display', 'flex', 'important');
              el.style.setProperty('flex-direction', 'column', 'important');
              
              let gap = '10px';
              if (el.className.includes('space-y-8')) {
                gap = '12px';
              } else if (el.className.includes('space-y-6')) {
                gap = '8px';
              } else if (el.className.includes('space-y-4')) {
                gap = '6px';
              } else if (el.className.includes('space-y-3')) {
                gap = '5px';
              } else if (el.className.includes('space-y-2')) {
                gap = '4px';
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

          // 2. Reduce the outer padding of the primary canvas sheet
          const outerPaddingContainer = clonedElem.querySelector('div.p-8, div.p-12, div.sm\\:p-12, div[class*="p-8"], div[class*="p-12"]');
          if (outerPaddingContainer instanceof HTMLElement) {
            outerPaddingContainer.style.setProperty('padding', '20px 28px', 'important');
          }

          // 3. Compact typography for the main cover letter body paragraphs
          const mainParagraphs = clonedElem.querySelectorAll('p');
          mainParagraphs.forEach((p) => {
            if (p instanceof HTMLElement) {
              p.style.setProperty('font-size', '11.5px', 'important');
              p.style.setProperty('line-height', '1.35', 'important');
              p.style.setProperty('margin-bottom', '1px', 'important');
            }
          });

          // 4. Force the main grid to be a 12-column layout (side-by-side desktop view) on the PDF!
          const mainGrid = clonedElem.querySelector('.grid.grid-cols-1.lg\\:grid-cols-12, div[class*="grid-cols-1"]');
          if (mainGrid instanceof HTMLElement) {
            mainGrid.style.setProperty('display', 'grid', 'important');
            mainGrid.style.setProperty('grid-template-columns', 'repeat(12, minmax(0, 1fr))', 'important');
            mainGrid.style.setProperty('gap', '14px', 'important');
          }

          const leftColumn = clonedElem.querySelector('.lg\\:col-span-8, div[class*="lg:col-span-8"]');
          if (leftColumn instanceof HTMLElement) {
            leftColumn.style.setProperty('grid-column', 'span 8 / span 8', 'important');
            leftColumn.style.setProperty('padding-right', '14px', 'important');
          }

          const rightSidebar = clonedElem.querySelector('.lg\\:col-span-4, div[class*="lg:col-span-4"]');
          if (rightSidebar instanceof HTMLElement) {
            rightSidebar.style.setProperty('grid-column', 'span 4 / span 4', 'important');
          }

          // 5. Contact info grid spacing and layout column force
          const contactInfoGrid = clonedElem.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2, div[class*="grid-cols-1 sm:grid-cols-2"]');
          if (contactInfoGrid instanceof HTMLElement) {
            contactInfoGrid.style.setProperty('margin-top', '6px', 'important');
            contactInfoGrid.style.setProperty('gap', '5px', 'important');
            
            const colsCount = contactInfoGrid.children.length;
            contactInfoGrid.style.setProperty('display', 'grid', 'important');
            contactInfoGrid.style.setProperty('grid-template-columns', `repeat(${colsCount}, minmax(0, 1fr))`, 'important');
          }

          // 6. Tighten sidebar cards, headers, and spacing
          if (rightSidebar instanceof HTMLElement) {
            const sidebarH4s = rightSidebar.querySelectorAll('h4');
            sidebarH4s.forEach((h4) => {
              if (h4 instanceof HTMLElement) {
                h4.style.setProperty('font-size', '9.5px', 'important');
              }
            });

            const sidebarCards = rightSidebar.querySelectorAll('div[class*="rounded-"], div[class*="border-"]');
            sidebarCards.forEach((card) => {
              if (card instanceof HTMLElement) {
                card.style.setProperty('padding', '5px 8px', 'important');
                card.style.setProperty('margin-bottom', '1px', 'important');
              }
            });

            const allTexts = rightSidebar.querySelectorAll('div, span, p');
            allTexts.forEach((text) => {
              if (text instanceof HTMLElement) {
                const computedFs = window.getComputedStyle(text).fontSize;
                const fsVal = parseFloat(computedFs);
                if (fsVal > 11) {
                  text.style.setProperty('font-size', '9.5px', 'important');
                } else if (fsVal > 9) {
                  text.style.setProperty('font-size', '8px', 'important');
                }
              }
            });
          }
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
      sanitizeDocumentForHtml2Canvas(clonedDoc, elementId);
    }
  });

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
    
    // We want to calculate the maximum canvas height that fits in a single PDF page
    const pageCanvasHeight = canvas.width * (pdfHeight / pdfWidth);
    
    // If the canvas is short and fits fully on one page, we can center it vertically
    if (canvas.height <= pageCanvasHeight) {
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      const yOffset = (pdfHeight - imgHeight) / 2;
      pdf.addImage(imgData, 'PNG', 0, yOffset, pdfWidth, imgHeight, undefined, 'FAST');
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
