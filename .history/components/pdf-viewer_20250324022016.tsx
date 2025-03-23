'use client';

type PDFViewerProps = {
  pdfUrl: string;
};

export function PDFViewer({ pdfUrl }: PDFViewerProps) {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      <div className="relative h-screen max-h-[80vh] min-h-[500px] md:min-h-[700px] w-full">
        <embed
          src={pdfUrl}
          type="application/pdf"
          className="absolute inset-0 w-full h-full rounded-lg shadow-lg bg-white"
          pluginspage="http://www.adobe.com/products/acrobat/readstep2.html"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/95 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
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
