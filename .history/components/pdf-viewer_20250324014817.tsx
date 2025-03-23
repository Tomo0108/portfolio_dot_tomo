'use client';

type PDFViewerProps = {
  pdfUrl: string;
};

export function PDFViewer({ pdfUrl }: PDFViewerProps) {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <iframe
        src={`${pdfUrl}#view=FitW`}
        title="PDF document"
        className="absolute inset-0 w-full h-full border-0 rounded-lg shadow-lg"
      />
    </div>
  );
}
