'use client';

type PDFViewerProps = {
  pdfUrl: string;
};

export function PDFViewer({ pdfUrl }: PDFViewerProps) {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      <div className="relative h-screen max-h-[80vh] min-h-[500px] md:min-h-[700px] w-full">
        <iframe
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&page=1&view=FitH`}
          title="PDF document"
          className="absolute inset-0 w-full h-full border-0 rounded-lg shadow-lg bg-white"
          loading="lazy"
          sandbox="allow-same-origin allow-scripts allow-forms"
        />
      </div>
    </div>
  );
}
