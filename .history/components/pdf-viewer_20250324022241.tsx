'use client';

type PDFViewerProps = {
  pdfUrl: string;
};

export function PDFViewer({ pdfUrl }: PDFViewerProps) {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-2 md:px-4 py-2 md:py-4">
      <div className="relative h-[85vh] md:h-[80vh] min-h-[500px] w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <iframe
          src={`${pdfUrl}#view=FitH&toolbar=0&statusbar=0&messages=0&navpanes=0`}
          className="absolute inset-0 w-full h-full"
          style={{
            WebkitOverflowScrolling: 'touch',
            overflow: 'auto',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
          title="PDF Viewer"
          allowFullScreen
        />
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center pointer-events-none">
          <div className="bg-background/95 px-4 py-2 rounded-full shadow-lg pointer-events-auto">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors text-sm"
          >
            PDFを新しいタブで開く
          </a>
        </div>
      </div>
    </div>
  );
}
