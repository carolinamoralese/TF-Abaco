import { useState, useEffect } from "react";
import { Barrasuperior } from "../Components/Navbar/Index";
import { Navbar } from "../Components/Navbar/Index";
import PdfGenerator from "../Utilities/PDFGenerator";
import Group from "../assets/Group.png";
import { CreateButton } from "../Components/Button/Button";
import { modificarEstadoCertificadoLogistica } from "../servicios/servicios";
import { modificarEstadoCertificadoContabilidad } from "../servicios/servicios";
import { modificarEstadoCertificadoRevisorFiscal } from "../servicios/servicios";
import { modificarEstadoConstanciaLogistica } from "../servicios/servicios";
import { useParams } from "react-router";

export function PdfView() {
  const [pdfData, setPdfData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const params = useParams();

  const showPDF = (pdfBlob) => {
    setPdfData(URL.createObjectURL(pdfBlob));
  };
  const rolUsuariologistica = "R_Logistica";
  const rolUsuarioCotabilidad = "R_Contabilidad";
  const rolUsuarioRevisorFiscal = "R_Fiscal";
  const aceptar = "aceptar";
  const identificadorDocumento = 9;
  const rechazar = "rechazar";

  function cambiarEstadoDocumento(
    nuevoEstado,
    identificadorDocumento,
    rolDelUsuario
  ) {
    if (typeof params.certificados_consecutivo !== "undefined") {
      if (rolDelUsuario == rolUsuariologistica) {
        modificarEstadoCertificadoLogistica(
          nuevoEstado,
          identificadorDocumento
        );
      } else if (rolDelUsuario == rolUsuarioCotabilidad) {
        modificarEstadoCertificadoContabilidad(
          nuevoEstado,
          identificadorDocumento
        );
      } else if (rolDelUsuario == rolUsuarioRevisorFiscal) {
        modificarEstadoCertificadoRevisorFiscal(
          nuevoEstado,
          identificadorDocumento
        );
      }
    } else if (typeof params.constancias_consecutivo !== "undefined") {
      modificarEstadoConstanciaLogistica(nuevoEstado, identificadorDocumento);
    }
  }

  const homeStyle = {
    backgroundImage: `url(${Group})`,
    backgroundSize: "80% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "400px",
    position: "relative",
    marginTop: "-30%",
  };

  return (
    <>
      <Barrasuperior />
      <Navbar />
      <div
        style={homeStyle}
        className="relative mt-5 flex flex-col items-center ml-40"
      >
        <div className="flex justify-center">
          <PdfGenerator onDataGenerated={showPDF} />
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="mr-4">
            <CreateButton
              colorClass="bg-verde-claro w-150 h-10"
              selected={selectedOption === "aceptar"}
              onClick={() =>
                cambiarEstadoDocumento(
                  aceptar,
                  identificadorDocumento,
                  rolUsuariologistica
                )
              }
              text="Aceptar"
            ></CreateButton>
          </div>
          <div className="mr-4">
            <CreateButton
              colorClass="bg-gris-claro w-150 h-10"
              selected={selectedOption === "rechazar"}
              onClick={() =>
                cambiarEstadoDocumento(
                  rechazar,
                  identificadorDocumento,
                  rolUsuariologistica
                )
              }
              text="Rechazar"
            ></CreateButton>
          </div>
        </div>
      </div>
    </>
  );
}
