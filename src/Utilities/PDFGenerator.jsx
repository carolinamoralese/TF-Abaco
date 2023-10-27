import { useEffect, useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import PropTypes from 'prop-types';
import htmlToPdfmake from "html-to-pdfmake"
import {AbacoLogobase64} from "./utilities"
import { useParams } from 'react-router';
import { CreateButton } from "../Components/Button/Button";


pdfMake.vfs = pdfFonts.pdfMake.vfs;

function PdfGenerator({ onDataGenerated }) {
  const [data, setData] = useState(null);

  const params = useParams()


  const [signatureImage, setSignatureImage] = useState(null);

  const generatePDF = (data, signatureImage) => {

    if (data && Array.isArray(data) && data.length > 0) {


      let documento;
      if( typeof params.certificados_consecutivo !== 'undefined'){
         documento = data.filter(documento => documento["hoja_No"] == params.certificados_consecutivo)
      }else if( typeof params.constancias_consecutivo !== 'undefined'){
         documento = data.filter(documento => documento["hoja_No"] == params.constancias_consecutivo)
      }

      
      documento = documento[0]


      let content = [];

      content.push({
        image:  AbacoLogobase64,
        width: 150,
        height: 100,
        alignment: 'center',
        margin: [0, -40, 0, 20]

      })
      documento.titulos.forEach((titulo) => {
        content.push({
          text: htmlToPdfmake(titulo+"<br><br>"),
          style: 'header',
        });
      });

      documento.topParagraphs.forEach((paragraph) => {
        content.push({
          text: htmlToPdfmake(paragraph+"<br><br>"),
          style: 'contenido'
        });
      });


      if(documento.bottomParagraphs){
        documento.bottomParagraphs.forEach((paragraph) => {
          content.push({
            text: htmlToPdfmake(paragraph),
            style: 'contenido'
          });
        });
      }

   

      if(documento.representanteLegal && documento.revisorFiscal){
        content.push({
          text:htmlToPdfmake('<br></br><br></br><br></br><p style="text-align: left; font-size: 12pt;"><b>'+documento.representanteLegal+'</b></p><p style="text-align: right; font-size: 12pt; "><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+documento.revisorFiscal.nombre+'</b></p>'),
        });
      }else{
        content.push({
          text:htmlToPdfmake('<br></br><br></br><br></br><p style="text-align: left; font-size: 12pt;"><b>'+documento.representanteLegal.nombre)
        });
        content.push({
          text:htmlToPdfmake('<p style="text-align: left; font-size: 10pt;">'+documento.representanteLegal.cargo)
        });
      }

  
      if(documento.representanteLegal && documento.revisorFiscal){
        content.push({
          text:htmlToPdfmake('<p style="text-align: left; font-size: 10pt;">Representante legal</p><p style="text-align: right; font-size: 10pt; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Revisor fiscal</p>'),
        });

        content.push({
          text:htmlToPdfmake('<p style="text-align: left; font-size: 10pt; color:white;">representante legal;</p><p style="text-align: right; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tarjeta profesional No'+documento.revisorFiscal.tarjeta+'</p>'),
        });
        
        content.push({
          text:htmlToPdfmake('<p style="text-align: left; font-size: 10pt; color:white;">representante legal;</p><p style="text-align: right; font-size: 10pt;">&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Designado por'+documento.revisorFiscal.designatedBy+'</p><br></br><br></br>'),
        });
      }

      
      
        content.push({
          text: htmlToPdfmake("<br></br><br></br><br></br>Elaboró"+documento.elaborated),
          style: "informacionRevisado"
        });
        content.push({
          text: "Aprobó"+documento.approved,
          style: "informacionRevisado"
        });
        content.push({
          text: htmlToPdfmake("Revisó"+documento.revised+"<br></br><br></br>"),
          style: "informacionRevisado"
        });
        content.push({
          text:htmlToPdfmake('<p style="text-align: left; font-size: 8pt;">'+documento.address[0]+'</p><p style="text-align: right; font-size: 8pt; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+documento.contacto[0]+'</p>'),
        });
        content.push({
          text:htmlToPdfmake('<p style="text-align: left; font-size: 8pt;">'+documento.address[1]+'</p><p style="text-align: right; font-size: 8pt; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+documento.contacto[1]+'</p>'),
        });
        content.push({
          text:htmlToPdfmake('<p style="text-align: left; font-size: 8pt;">'+documento.address[2]+'</p><p style="text-align: right; font-size: 8pt; color:white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+documento.contacto[0]+'</p>'),
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
            fontSize: 12,
            alignment: 'center',
          },
          contenido: {
            fontSize: 10,
            alignment: 'justify',
          },
          firmas:{
            display: "flex",
            alignment: 'justify',
          },

          firmaRepresentante:{
            fontSize:12,
            bold: true,
            alignment:"left",
          },
          firmaRevisor:{
            fontSize:12,
            bold: true,
            alignment:"right"
          },
          datosFirmaRevisor:{
            fontSize:10,
            alignment:"right"
          },
          informacionRevisado:{
            fontSize:8,
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
    if( typeof params.certificados_consecutivo !== 'undefined'){
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
          generatePDF(jsonData)
        })
        .catch((error) => {
          console.error('Error al obtener datos:', error);
        });
    }else if(typeof params.constancias_consecutivo !== 'undefined'){
      fetch('https://script.google.com/macros/s/AKfycbxBXQw5wB747NT-LwW_1Zskb0cL0oi7QPL2V45iB4i8fUMh9h8ldD6D5ExVnZMHqScD/exec', {
        method: 'POST',
        body: 'authKey=L9zewK9EBh6mvWZ',
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
          generatePDF(jsonData)
        })
        .catch((error) => {
          console.error('Error al obtener datos:', error);
        });
    }
  }, []);
  
  return (
    <div className="flex items-center">
      {/* Input for selecting the signature image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleSignatureImageChange}
        className="p-2 rounded border "
      />
      <div className="mx-auto">
        <CreateButton
          colorClass="bg-amarillo w-150 h-10 ml-4"
          onClick={() => generatePDF(data, signatureImage)}
          text="Adjuntar Firma"
        ></CreateButton>
      </div>
    </div>
  );
}

PdfGenerator.propTypes = {
  onDataGenerated: PropTypes.func.isRequired,
};

export default PdfGenerator;