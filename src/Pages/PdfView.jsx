import { useState } from 'react';
import { Barrasuperior } from '../Components/Navbar/index';
import { Navbar } from '../Components/Navbar/index';
import PDFGenerator from '../Utilities/PDFGenerator';
import Group from "../assets/Group.png";

export function PdfView() {
  const [pdfData, setPdfData] = useState(null);

  const showPDF = (pdfBlob) => {
    setPdfData(URL.createObjectURL(pdfBlob));
  };

  const homeStyle = {
    backgroundImage: `url(${Group})`,
    backgroundSize: '80% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '400px',
    position: 'relative',
    marginTop: '-30%',
  };

  return (
    <>
      <Barrasuperior />
      <Navbar />
      <div style={homeStyle} className="relative mt-5 flex flex-col items-center ml-40">
        <div className="flex justify-center">
          
          <PDFGenerator onDataGenerated={showPDF} />
          {pdfData && (
            <iframe
              title="PDF Viewer"
              src={pdfData}
              width="800"
              height="600"
              frameBorder="0"
            />
          )}
        </div>
      </div>
    </>
  );
}