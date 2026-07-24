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
          clonedDoc.body.style.width = '1040px';
          clonedDoc.body.style.margin = '0';
          clonedDoc.body.style.padding = '0';
          clonedDoc.body.style.overflow = 'hidden';
          clonedDoc.body.style.backgroundColor = '#0B1220';
        }

        let parent = clonedElem.parentElement;
        while (parent && parent !== clonedDoc.body) {
          parent.style.maxWidth = 'none';
          parent.style.width = '1040px';
          parent.style.overflow = 'hidden';
          parent.style.maxHeight = 'none';
          parent.style.height = 'auto';
          parent.style.padding = '0';
          parent.style.margin = '0 auto';
          parent = parent.parentElement;
        }

        clonedElem.style.width = '1000px';
        clonedElem.style.minWidth = '1000px';
        clonedElem.style.maxWidth = '1000px';
        clonedElem.style.height = '680px';
        clonedElem.style.minHeight = '680px';
        clonedElem.style.maxHeight = '680px';
        clonedElem.style.boxSizing = 'border-box';
        clonedElem.style.borderRadius = '16px';
        clonedElem.style.overflow = 'hidden';
      } else {
        clonedElem.style.width = '100%';
        clonedElem.style.maxWidth = '100%';
        clonedElem.style.borderRadius = '0';
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
    backgroundColor: isCert ? '#0B1220' : '#ffffff',
    onclone: (clonedDoc) => {
      sanitizeDocumentForHtml2Canvas(clonedDoc, elementId);
    }
  });

  const imgData = canvas.toDataURL('image/png', 1.0);
  const pdf = new jsPDF({
    orientation: isCert ? 'landscape' : 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  if (isCert) {
    const margin = 4; // 4mm margin for pristine full certificate fitting
    const availWidth = pdfWidth - margin * 2;
    const availHeight = pdfHeight - margin * 2;

    const ratio = Math.min(availWidth / canvas.width, availHeight / canvas.height);
    const renderWidth = canvas.width * ratio;
    const renderHeight = canvas.height * ratio;

    const xOffset = (pdfWidth - renderWidth) / 2;
    const yOffset = (pdfHeight - renderHeight) / 2;

    pdf.addImage(imgData, 'PNG', xOffset, yOffset, renderWidth, renderHeight, undefined, 'FAST');
  } else {
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    const yOffset = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 0;
    pdf.addImage(imgData, 'PNG', 0, yOffset, pdfWidth, imgHeight, undefined, 'FAST');
  }

  pdf.save(filename);
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
  doc.setTextColor(37, 99, 235); // CampusOS Blue (#2563EB)
  doc.text(title, margin, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated by CampusOS AI - ${new Date().toLocaleDateString()}`, margin, 27);

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

export function exportResumeToPDF(resume: any, filename: string = 'Resume_CampusOS.pdf') {
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
