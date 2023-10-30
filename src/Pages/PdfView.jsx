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
import PopUp from "../Components/PopUp"

export function PdfView() {
  const [pdfData, setPdfData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const params = useParams();
  const usuarioRol = localStorage.getItem('usuarioRol');

  const showPDF = (pdfBlob) => {
    setPdfData(URL.createObjectURL(pdfBlob));
  };
  const aceptar = "SI";
  const rechazar = "NO";

  function cambiarEstadoDocumento(
    nuevoEstado,
    rolDelUsuario
  ) {
    if (typeof params.certificados_consecutivo !== "undefined") {
      if (rolDelUsuario == "Logistica") {
        modificarEstadoCertificadoLogistica(
          nuevoEstado,
          params.certificados_consecutivo
        );
      } else if (rolDelUsuario == "Contabilidad") {
        modificarEstadoCertificadoContabilidad(
          nuevoEstado,
          params.certificados_consecutivo
        );
      } else if (rolDelUsuario == "Fiscal") {
        modificarEstadoCertificadoRevisorFiscal(
          nuevoEstado,
          params.certificados_consecutivo
        );
      }
    } else if (typeof params.constancias_consecutivo !== "undefined") {
      modificarEstadoConstanciaLogistica(nuevoEstado, params.constancias_consecutivo);
    }
        setIsPopupOpen(true); // Abre el PopUp al cambiar el estado del documento
  
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
        <div className="mt-4">
          <PdfGenerator onDataGenerated={showPDF} /> {/* Generar PDF */}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="mr-4 mb-4">
            <CreateButton
              colorClass="bg-verde-claro w-150 h-10"
              selected={selectedOption === "aceptar"}
              onClick={() =>
                cambiarEstadoDocumento(
                  aceptar,
                  usuarioRol,
                )
              }
              text="Aceptar"
            ></CreateButton>
          </div>
          <div className="mr-4 mb-4">
            <CreateButton
              colorClass="bg-gris-claro w-150 h-10"
              selected={selectedOption === "rechazar"}
              onClick={() =>
                cambiarEstadoDocumento(
                  rechazar,
                  usuarioRol
                )
              }
              text="Rechazar"
            ></CreateButton>
          </div>
        </div>
        {isPopupOpen && (
          <PopUp isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} message="¡Se ha gestionado el documento!" />
        )}
      </div>
    </>
  );
}