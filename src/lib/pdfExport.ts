import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

export function sanitizeCssString(cssText: string): string {
  if (!cssText) return cssText;
  let cleaned = cssText;

  // 1. Remove color-mix with nested parentheses support
  cleaned = cleaned.replace(/color-mix\((?:[^()]+|\((?:[^()]+|\([^()]*\))*\))*\)/gi, (match) => {
    if (match.toLowerCase().includes('transparent')) {
      return 'rgba(0, 0, 0, 0)';
    }
    return 'rgb(30, 41, 59)';
  });

  // 2. Remove oklch / oklab / lab / lch functions
  cleaned = cleaned.replace(/\b(?:oklch|oklab|lab|lch)\((?:[^()]+|\((?:[^()]+|\([^()]*\))*\))*\)/gi, 'rgb(30, 41, 59)');

  // 3. Remove keywords in color-space declarations
  cleaned = cleaned.replace(/in\s+oklab/gi, 'in srgb');
  cleaned = cleaned.replace(/in\s+oklch/gi, 'in srgb');

  // 4. Fallback cleanup for lone oklab/oklch occurrences
  cleaned = cleaned.replace(/\boklab\b/gi, 'srgb');
  cleaned = cleaned.replace(/\boklch\b/gi, 'srgb');

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
        clonedElem.style.width = '100%';
        clonedElem.style.maxWidth = '100%';
        clonedElem.style.borderRadius = '0';
        clonedElem.style.overflow = 'visible';
        clonedElem.style.height = 'auto';
        clonedElem.style.minHeight = 'auto';
        clonedElem.style.maxHeight = 'none';
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
    backgroundColor: isCert ? null : '#FAF8F3',
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
