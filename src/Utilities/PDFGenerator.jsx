import { useEffect, useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import PropTypes from 'prop-types';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function PDFGenerator({ onDataGenerated }) {
  const [data, setData] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);

  const generatePDF = (data, signatureImage) => {
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

      // Include the signature image in the PDF
      if (signatureImage) {
        content.push({
          image: signatureImage,
          width: 200, // Adjust the width as needed
          alignment: 'center',
        });
      }

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

  const handleSignatureImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSignatureImage(e.target.result);
      };
      reader.readAsDataURL(file);
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
      {/* Input for selecting the signature image */}
      <input type="file" accept="image/*" onChange={handleSignatureImageChange} />
      <button onClick={() => generatePDF(data, signatureImage)}>Generar PDF</button>
    </>
  );
}

PDFGenerator.propTypes = {
  onDataGenerated: PropTypes.func.isRequired,
};

export default PDFGenerator;