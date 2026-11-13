export interface PdfExamQuestionItem {
  num: number;
  text: string;
  userAnswer: string;
  correctAnswer: string;
  points: number;
}

export interface PdfExamPayload {
  title: string;
  levelLabel: string;
  duration: string;
  studentName: string;
  includeCorrection: boolean;
  questions: PdfExamQuestionItem[];
}

function wrapArabicText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const testLine = current ? `${current} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = testLine;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function buildPdfFromJpeg(
  jpegBytes: Uint8Array,
  imgWidth: number,
  imgHeight: number
): Blob {
  // A4 page size in PDF points: 595 x 842
  const pageW = 595;
  const pageH = 842;

  const enc = new TextEncoder();
  const chunks: (Uint8Array | string)[] = [];
  const offsets: number[] = [];
  let byteLen = 0;

  const pushStr = (s: string) => {
    const b = enc.encode(s);
    chunks.push(b);
    byteLen += b.length;
  };

  const pushBytes = (b: Uint8Array) => {
    chunks.push(b);
    byteLen += b.length;
  };

  const startObj = (id: number) => {
    offsets[id] = byteLen;
    pushStr(`${id} 0 obj\n`);
  };

  const endObj = () => {
    pushStr('\nendobj\n');
  };

  pushStr('%PDF-1.4\n');

  // 1: Catalog
  startObj(1);
  pushStr('<< /Type /Catalog /Pages 2 0 R >>');
  endObj();

  // 2: Pages
  startObj(2);
  pushStr('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  endObj();

  // 3: Page
  startObj(3);
  pushStr(
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>`
  );
  endObj();

  // 4: Contents (draw image scaled to fit A4)
  const contentStream = `q\n${pageW} 0 0 ${pageH} 0 0 cm\n/Im0 Do\nQ\n`;
  startObj(4);
  pushStr(`<< /Length ${contentStream.length} >>\nstream\n${contentStream}endstream`);
  endObj();

  // 5: Image XObject
  startObj(5);
  pushStr(
    `<< /Type /XObject /Subtype /Image /Width ${imgWidth} /Height ${imgHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`
  );
  pushBytes(jpegBytes);
  pushStr('\nendstream');
  endObj();

  const xrefPos = byteLen;
  pushStr('xref\n0 6\n0000000000 65535 f \n');
  for (let i = 1; i <= 5; i++) {
    const off = offsets[i].toString().padStart(10, '0');
    pushStr(`${off} 00000 n \n`);
  }
  pushStr(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`);

  const blobParts: BlobPart[] = chunks.map((c) =>
    typeof c === 'string'
      ? c
      : c.buffer.slice(c.byteOffset, c.byteOffset + c.byteLength) as ArrayBuffer
  );
  return new Blob(blobParts, { type: 'application/pdf' });
}

export async function downloadExamAsPdf(payload: PdfExamPayload): Promise<void> {
  // High-res A4 ratio canvas (1190 x 1684)
  const W = 1190;
  const H = 1684;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clean white printable Moroccan exam paper background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  // Top Header Band
  ctx.fillStyle = '#071326';
  ctx.fillRect(0, 0, W, 155);
  ctx.fillStyle = '#0284C7';
  ctx.fillRect(0, 150, W, 8);

  ctx.direction = 'rtl';
  ctx.textAlign = 'right';

  // Header Title
  ctx.fillStyle = '#F3EDE2';
  ctx.font = 'bold 34px Cairo, Arial, sans-serif';
  ctx.fillText('منصة طالب ذكي (TalibAI) · ورقة امتحان رسمية', W - 55, 58);

  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 24px Cairo, Arial, sans-serif';
  ctx.fillText(`${payload.title} — ${payload.levelLabel}`, W - 55, 102);

  ctx.fillStyle = '#D4B996';
  ctx.font = '20px Cairo, Arial, sans-serif';
  ctx.fillText(`الاسم: ${payload.studentName}   |   المدة: ${payload.duration}   |   السلم: 20/20`, W - 55, 136);

  // Left badge in header
  ctx.textAlign = 'left';
  ctx.fillStyle = '#D4B996';
  ctx.font = 'bold 22px Cairo, Arial, sans-serif';
  ctx.fillText('10 أسئلة · إطار مرجعي وطني', 55, 102);

  // Questions Body
  ctx.textAlign = 'right';
  let y = 205;
  const marginX = 55;
  const maxTextW = W - marginX * 2;

  for (const q of payload.questions) {
    // Question container box
    ctx.fillStyle = '#F8FAFC';
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1.5;

    ctx.font = 'bold 21px Cairo, Arial, sans-serif';
    const qLines = wrapArabicText(ctx, `${q.num}. ${q.text} (${q.points} ن)`, maxTextW - 30);
    const boxH = 52 + qLines.length * 30 + (payload.includeCorrection ? 32 : 0);

    ctx.fillRect(marginX, y, maxTextW, boxH);
    ctx.strokeRect(marginX, y, maxTextW, boxH);

    ctx.fillStyle = '#0F172A';
    let lineY = y + 32;
    for (const line of qLines) {
      ctx.fillText(line, W - marginX - 18, lineY);
      lineY += 29;
    }

    // Answer blank line
    ctx.font = '19px Cairo, Arial, sans-serif';
    ctx.fillStyle = q.userAnswer ? '#0369A1' : '#64748B';
    const ansDisplay = q.userAnswer
      ? `إجابة التلميذ: ${q.userAnswer}`
      : 'الجواب: ....................................................................................';
    ctx.fillText(ansDisplay, W - marginX - 24, lineY + 10);

    if (payload.includeCorrection) {
      ctx.fillStyle = '#047857';
      ctx.font = 'bold 18px Cairo, Arial, sans-serif';
      ctx.fillText(`✓ التصحيح النموذجي: ${q.correctAnswer}`, W - marginX - 24, lineY + 42);
    }

    y += boxH + 14;
    if (y > H - 90) break;
  }

  // Footer
  ctx.fillStyle = '#475569';
  ctx.font = '16px Cairo, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('تم توليد هذا الامتحان التفاعلي عبر منصة طالب ذكي (TalibAI) — المغرب', W / 2, H - 28);

  const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
  const base64 = dataUrl.split(',')[1];
  const raw = atob(base64);
  const jpegBytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    jpegBytes[i] = raw.charCodeAt(i);
  }

  const pdfBlob = buildPdfFromJpeg(jpegBytes, W, H);
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `TalibAI-Exam-${Date.now()}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
