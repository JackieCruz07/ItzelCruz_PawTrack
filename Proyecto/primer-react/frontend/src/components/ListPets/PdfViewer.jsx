import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button, Spinner } from 'react-bootstrap';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import "./pdfViewer.css"

// Set up the pdf.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export function PdfViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="pdf-viewer">
      {loading && (
        <div className="text-center p-3">
          <Spinner animation="border" />
          <p>Cargando documento...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center p-3 text-danger">
          <p>Error al cargar el PDF. Intente descargar el documento.</p>
        </div>
      )}
      
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => {
          console.error("Error loading PDF:", error);
          setError(error);
          setLoading(false);
        }}
        loading={<Spinner animation="border" />}
      >
        <Page 
          pageNumber={pageNumber} 
          renderTextLayer={true}
          renderAnnotationLayer={true}
          scale={1.2}
        />
      </Document>
      
      {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mt-2">
          <Button 
            onClick={previousPage} 
            disabled={pageNumber <= 1}
            variant="outline-primary"
            size="sm"
          >
            Anterior
          </Button>
          <p className="mb-0">
            Página {pageNumber} de {numPages}
          </p>
          <Button 
            onClick={nextPage} 
            disabled={pageNumber >= numPages}
            variant="outline-primary"
            size="sm"
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}