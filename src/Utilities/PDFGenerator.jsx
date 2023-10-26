import { useEffect, useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import PropTypes from 'prop-types';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function PDFGenerator({ onDataGenerated }) {
  const [data, setData] = useState(null);

  const generatePDF = (data) => {
    if (data && Array.isArray(data) && data.length > 0) {
      const paragraphs = data.map(item => item.topParagraphs).flat();
      const bottomParagraphs = data.map(item => item.bottomParagraphs).flat();

      const content = [
        {
          text: 'CERTIFICADO DE DONACIÓN',
          style: 'header',
        },
      ];

      paragraphs.forEach((paragraph) => {
        content.push({
          text: paragraph,
        });
      });

      bottomParagraphs.forEach((paragraph) => {
        content.push({
          text: paragraph,
        });
      });

      const documentDefinition = {
        content,
        styles: {
          header: {
            fontSize: 16,
            bold: true,
            alignment: 'center',
          },
        },
      };

      const pdfDoc = pdfMake.createPdf(documentDefinition);

      pdfDoc.getBlob((pdfBlob) => {
        onDataGenerated(pdfBlob);
      });
    }
  };

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbwz3FM2ZsBFfNvIj8uZ8Gr4e6WpFyV4i3IrM5QryPFpBTplWqmagkCw03m1LWUc-f1m/exec', {
      method: 'POST',
      body: 'authKey=zllLcfI6b1xwqj5',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la solicitud');
        }
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  return (
    <>
      <button onClick={() => generatePDF(data)}>Generar PDF</button>
    </>
  );
}

PDFGenerator.propTypes = {
  onDataGenerated: PropTypes.func.isRequired,
};

export default PDFGenerator;