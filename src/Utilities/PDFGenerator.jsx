import { useEffect, useState } from "react";
// import pdfMake from "pdfmake";
import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
import 'pdfmake/build/vfs_fonts';
import PropTypes from "prop-types";
import htmlToPdfmake from "html-to-pdfmake";
import {
  AbacoLogobase64,
  firmaRepresentanteLegal,
  firmaRevisorFiscal,
} from "./utilities";
import { obtenerCertificados } from "../servicios/servicios";
import { obtenerConstancias } from "../servicios/servicios";
import { obtenerDetalleFactura } from "../servicios/servicios";
import { useParams } from "react-router";
import pdfFonts from "./vfs_fonts";

pdfMake.vfs = pdfFonts

function PdfGenerator({ onDataGenerated }) {
  const [data, setData] = useState(null);
  //const [itemsFactura, setItemsFactura] = useState([]);

  const params = useParams();
  const rolUsuariologistica = "R_Logistica";
  const rolUsuarioCotabilidad = "R_Contabilidad";
  const rolUsuarioRevisorFiscal = "R_Fiscal";

  const generatePDF = (data, infoDocumento, tipoDocumento, itemsFactura) => {
    if (data && Array.isArray(data) && data.length > 0) {
      let documento;
      if (typeof params.certificados_consecutivo !== "undefined") {
        documento = data.filter(
          (documento) => documento["hoja_No"] == params.certificados_consecutivo
        );
      } else if (typeof params.constancias_consecutivo !== "undefined") {
        documento = data.filter(
          (documento) => documento["hoja_No"] == params.constancias_consecutivo
        );
      }

      documento = documento[0];

      let content = [];

      content.push({
        image: AbacoLogobase64,
        width: 150,
        height: 100,
        alignment: "center",
        margin: [0, -40, 0, 20],
      });
      documento.titulos.forEach((titulo) => {
        content.push({
          text: htmlToPdfmake(titulo + "<br><br>"),
          style: "header",
        });
      });

      documento.topParagraphs.forEach((paragraph) => {
        content.push({
          text: htmlToPdfmake(paragraph + "<br><br>"),
          style: "contenido",
        });
      });

      if (documento.bottomParagraphs) {
        if (itemsFactura.length > 0) {

          const dynamicTable = {
            table: {
              widths: ["20%", "20%", "40%", "20%"],
              body: [],
            },
          };

          dynamicTable.table.body.push([
            "Nro Factura",
            "Fecha Factura",
            "Desc Articulo",
            "Costo Unitario",
          ]);

          itemsFactura.forEach((item) => {
            dynamicTable.table.body.push([
              item["Nro Factura"],
              item["Fecha Factura"],
              item["Desc Articulo"],
              item["Costo Unitario"],
            ]);
          });

          content.push(dynamicTable);

          documento.bottomParagraphs.forEach((paragraph) => {
            content.push({
              text: htmlToPdfmake("<br></br>" + paragraph + "<br></br>"),
              style: "contenido",
            });
          });
        }
      }

      if (tipoDocumento == "certificado") {
        if (
          infoDocumento[rolUsuariologistica].toUpperCase() === "SI" &&
          infoDocumento[rolUsuarioCotabilidad].toUpperCase() === "SI" &&
          infoDocumento[rolUsuarioRevisorFiscal].toUpperCase() === "SI"
        ) {
          content.push({
            table: {
              widths: ["60%", "40%"],
              body: [
                [
                  {
                    image: firmaRepresentanteLegal,
                    fit: [70, 50],
                  },
                  {
                    image: firmaRevisorFiscal,
                    fit: [70, 50],
                  },
                ],
              ],
            },
            layout: "noBorders",
          });
        }
      } else if (tipoDocumento == "constancia") {
        if (infoDocumento[rolUsuariologistica].toUpperCase() === "SI") {
          content.push({
            image: firmaRepresentanteLegal,
            fit: [70, 50],
            alignment: "left",
          });
        }
      }

      if (documento.representanteLegal && documento.revisorFiscal) {
        content.push({
          text: htmlToPdfmake(
            '<p style="text-align: left; font-size: 12pt;"><b>' +
              documento.representanteLegal +
              '</b></p><p style="text-align: right; font-size: 12pt; "><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
              documento.revisorFiscal.nombre +
              "</b></p>"
          ),
        });
      } else {
        content.push({
          text: htmlToPdfmake(
            '<p style="text-align: left; font-size: 12pt;"><b>' +
              documento.representanteLegal.nombre
          ),
        });
        content.push({
          text: htmlToPdfmake(
            '<p style="text-align: left; font-size: 10pt;">' +
              documento.representanteLegal.cargo
          ),
        });
      }

      if (documento.representanteLegal && documento.revisorFiscal) {
        content.push({
          text: htmlToPdfmake(
            '<p style="text-align: left; font-size: 10pt;">Representante legal</p><p style="text-align: right; font-size: 10pt; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Revisor fiscal</p>'
          ),
        });

        content.push({
          text: htmlToPdfmake(
            '<p style="text-align: left; font-size: 10pt; color:white;">representante legal;</p><p style="text-align: right; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tarjeta profesional No' +
              documento.revisorFiscal.tarjeta +
              "</p>"
          ),
        });

        content.push({
          text: htmlToPdfmake(
            '<p style="text-align: left; font-size: 10pt; color:white;">representante legal;</p><p style="text-align: right; font-size: 10pt;">&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Designado por' +
              documento.revisorFiscal.designatedBy +
              "</p><br></br><br></br>"
          ),
        });
      }

      content.push({
        text: htmlToPdfmake(
          "<br></br><br></br><br></br>Elaboró" + documento.elaborated
        ),
        style: "informacionRevisado",
      });
      content.push({
        text: "Aprobó" + documento.approved,
        style: "informacionRevisado",
      });
      content.push({
        text: htmlToPdfmake(
          "Revisó" + documento.revised + "<br></br><br></br>"
        ),
        style: "informacionRevisado",
      });
      content.push({
        text: htmlToPdfmake(
          '<p style="text-align: left; font-size: 8pt;">' +
            documento.address[0] +
            '</p><p style="text-align: right; font-size: 8pt; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            documento.contacto[0] +
            "</p>"
        ),
      });
      content.push({
        text: htmlToPdfmake(
          '<p style="text-align: left; font-size: 8pt;">' +
            documento.address[1] +
            '</p><p style="text-align: right; font-size: 8pt; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            documento.contacto[1] +
            "</p>"
        ),
      });
      content.push({
        text: htmlToPdfmake(
          '<p style="text-align: left; font-size: 8pt;">' +
            documento.address[2] +
            '</p><p style="text-align: right; font-size: 8pt; color:white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            documento.contacto[0] +
            "</p>"
        ),
      });

      const documentDefinition = {
        content,
        styles: {
          header: {
            fontSize: 12,
            alignment: "center",
          },
          contenido: {
            fontSize: 10,
            alignment: "justify",
          },
          firmas: {
            display: "flex",
            alignment: "justify",
          },

          firmaRepresentante: {
            fontSize: 12,
            bold: true,
            alignment: "left",
          },
          firmaRevisor: {
            fontSize: 12,
            bold: true,
            alignment: "right",
          },
          datosFirmaRevisor: {
            fontSize: 10,
            alignment: "right",
          },
          informacionRevisado: {
            fontSize: 8,
          },
          imagenFirmas: {
            border: "hidden",
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
    const fetchData = async () => {
      try {
        if (typeof params.certificados_consecutivo !== "undefined") {
          const response1 = await fetch(
            "https://script.google.com/macros/s/AKfycbwz3FM2ZsBFfNvIj8uZ8Gr4e6WpFyV4i3IrM5QryPFpBTplWqmagkCw03m1LWUc-f1m/exec",
            {
              method: "POST",
              body: "authKey=zllLcfI6b1xwqj5",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          if (!response1.ok) {
            throw new Error("Error en la solicitud 1");
          }
          const jsonData = await response1.json();

          const documentos = await obtenerCertificados();
          const documento = documentos.find(
            (doc) => doc["Hoja No. "] == params.certificados_consecutivo
          );

          const itemsFactura = await obtenerDetalleFactura();
          const items = itemsFactura.filter(
            (item) => item["Hoja No. "] == params.certificados_consecutivo
          );



          generatePDF(jsonData, documento, "certificado", items);
        } else if (typeof params.constancias_consecutivo !== "undefined") {
          const response2 = await fetch(
            "https://script.google.com/macros/s/AKfycbxBXQw5wB747NT-LwW_1Zskb0cL0oi7QPL2V45iB4i8fUMh9h8ldD6D5ExVnZMHqScD/exec",
            {
              method: "POST",
              body: "authKey=L9zewK9EBh6mvWZ",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          if (!response2.ok) {
            throw new Error("Error en la solicitud 2");
          }
          const jsonData = await response2.json();

          const documentos = await obtenerConstancias();
          const documento = documentos.find(
            (doc) => doc[" Hoja_No"] == params.constancias_consecutivo
          );

          generatePDF(jsonData, documento, "constancia");
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);
}

PdfGenerator.propTypes = {
  onDataGenerated: PropTypes.func.isRequired,
};

export default PdfGenerator;
