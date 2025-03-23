'use client';

type PDFViewerProps = {
  pdfUrl: string;
};

export function PDFViewer({ pdfUrl }: PDFViewerProps) {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      <div className="relative h-screen max-h-[80vh] min-h-[500px] md:min-h-[700px] w-full">
        <object
          data={pdfUrl}
          type="application/pdf"
          className="absolute inset-0 w-full h-full rounded-lg shadow-lg bg-white"
        >
          <p>PDFを表示できません。<a href={pdfUrl} target="_blank" rel="noopener noreferrer">ダウンロード</a>してご確認ください。</p>
        </object>
      </div>
    </div>
  );
}
