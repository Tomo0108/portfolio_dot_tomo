'use client';

type PDFViewerProps = {
  pdfUrl: string;
};

export function PDFViewer({ pdfUrl }: PDFViewerProps) {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-4">
      <div className="relative h-[85vh] md:h-[80vh] min-h-[500px] w-full">
        <iframe
          src={`${pdfUrl}#view=FitH&toolbar=0&statusbar=0&messages=0&navpanes=0`}
          className="absolute inset-0 w-full h-full rounded-lg shadow-lg bg-white"
          style={{
            WebkitOverflowScrolling: 'touch',
            overflow: 'auto',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
          title="PDF Viewer"
          allowFullScreen
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/95 rounded-lg opacity-100 md:opacity-0 md:hover:opacity-100 transition-opacity">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-colors"
          >
            PDFを新しいタブで開く
          </a>
        </div>
      </div>
    </div>
  );
}
