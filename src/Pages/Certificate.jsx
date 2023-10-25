import { useState, useEffect } from "react";
import Layout from "../Components/Layout/Index";
import { CreateButton } from "../Components/Button/Index";
import { DonationInformation } from "../Components/DonationInformation/Index";
import { obtenerDocumentos } from "../servicios/servicios";
import Group from "../assets/Group.png";

export function Certificate() {
  const [selectedOption, setSelectedOption] = useState("");
  const [documentos, setDocumentos] = useState([]);
  const [documentosFiltrados, setDocumentosFiltrados] = useState([]);
  const propiedadEmpresa = "EMPRESA ";
  const rolUsuariologistica = "R_Logistica";
  const rolUsuarioCotabilidad = "R_Contabilidad";
  const rolUsuarioRevisorFiscal = "R_Fiscal";

  useEffect(() => {
    obtenerDocumentos()
      .then((documentos) => {
        setDocumentos(documentos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function filtrarDocumentos(documentos, rolUsuario, estado) {
    return new Promise((resolve) => {
      let documentosFiltrados = documentos;

      documentosFiltrados = documentos.filter(
        (documento) => !["#N/A", ""].includes(documento[propiedadEmpresa])
      );

      if (rolUsuario == rolUsuariologistica) {
        if (estado == "Pendientes") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) => documento[rolUsuario] === ""
          );
        } else if (estado == "Aceptadas") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) => documento[rolUsuario].toUpperCase() === "SI"
          );
        } else if (estado == "Firmadas") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) =>
              documento[rolUsuariologistica].toUpperCase() === "SI" &&
              documento[rolUsuarioCotabilidad].toUpperCase() === "SI" &&
              documento[rolUsuarioRevisorFiscal].toUpperCase() === "SI"
          );
        } else if (estado == "Rechazadas") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) =>
              documento[rolUsuariologistica].toUpperCase() === "NO" ||
              documento[rolUsuarioCotabilidad].toUpperCase() === "NO" ||
              documento[rolUsuarioRevisorFiscal].toUpperCase() === "NO"
          );
        }
      }

      if (rolUsuario == rolUsuarioCotabilidad) {
        if (estado == "Pendientes") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) =>
              documento[rolUsuariologistica].toUpperCase() === "SI" &&
              documento[rolUsuarioCotabilidad] === ""
          );
        } else if (estado == "Aceptadas") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) =>
              documento[rolUsuariologistica].toUpperCase() === "SI" &&
              documento[rolUsuarioCotabilidad].toUpperCase() === "SI"
          );
        } else if (estado == "Firmadas") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) =>
              documento[rolUsuariologistica].toUpperCase() === "SI" &&
              documento[rolUsuarioCotabilidad].toUpperCase() === "SI" &&
              documento[rolUsuarioRevisorFiscal].toUpperCase() === "SI"
          );
        } else if (estado == "Rechazadas") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) =>
              documento[rolUsuariologistica].toUpperCase() === "NO" ||
              documento[rolUsuarioCotabilidad].toUpperCase() === "NO" ||
              documento[rolUsuarioRevisorFiscal].toUpperCase() === "NO"
          );
        }
      }

      if (rolUsuario == rolUsuarioRevisorFiscal) {
        if (estado == "Pendientes") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) =>
              documento[rolUsuariologistica].toUpperCase() === "SI" &&
              documento[rolUsuarioCotabilidad].toUpperCase() === "SI" &&
              documento[rolUsuarioRevisorFiscal] === ""
          );
        } else if (estado == "Aceptadas") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) =>
              documento[rolUsuariologistica].toUpperCase() === "SI" &&
              documento[rolUsuarioCotabilidad].toUpperCase() === "SI" &&
              documento[rolUsuarioRevisorFiscal].toUpperCase() === "SI"
          );
        } else if (estado == "Firmadas") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) =>
              documento[rolUsuariologistica].toUpperCase() === "SI" &&
              documento[rolUsuarioCotabilidad].toUpperCase() === "SI" &&
              documento[rolUsuarioRevisorFiscal].toUpperCase() === "SI"
          );
        } else if (estado == "Rechazadas") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) =>
              documento[rolUsuariologistica].toUpperCase() === "NO" ||
              documento[rolUsuarioCotabilidad].toUpperCase() === "NO" ||
              documento[rolUsuarioRevisorFiscal].toUpperCase() === "NO"
          );
        }
      }
      console.log(documentosFiltrados, 65);
      resolve(documentosFiltrados);
    });
  }

  const handleButtonClick = (estadoDocumento) => {
    setSelectedOption(estadoDocumento);
    let promesaDocumentosFiltrados;
    promesaDocumentosFiltrados = filtrarDocumentos(
      documentos,
      rolUsuariologistica,
      estadoDocumento
    );
    promesaDocumentosFiltrados.then((documentosFiltrados) =>
      setDocumentosFiltrados(documentosFiltrados)
    );
  };

  const certificateStyle = {
    backgroundImage: `url(${Group})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "80%",
    marginTop: "-10%",
    height: "400px",
  };

  return (
    <div
      style={certificateStyle}
      className="relative mt-0 flex flex-col items-center ml-40"
    >
      <div className="flex justify-center">
        <div className="mr-4">
          <CreateButton
            colorClass="bg-naranja h-20"
            selected={selectedOption === "Pendientes"}
            onClick={() => handleButtonClick("Pendientes")}
            text="Pendientes"
          ></CreateButton>
        </div>
        <div className="mr-4">
          <CreateButton
            colorClass="bg-verde-claro h-20"
            selected={selectedOption === "Aceptadas"}
            onClick={() => handleButtonClick("Aceptadas")}
            text="Aceptadas"
          ></CreateButton>
        </div>
        <div className="mr-4">
          <CreateButton
            colorClass="bg-amarillo h-20"
            selected={selectedOption === "Firmadas"}
            onClick={() => handleButtonClick("Firmadas")}
            text="Firmadas"
          ></CreateButton>
        </div>
        <div className="mr-4">
          <CreateButton
            colorClass="bg-gris-oscuro h-20"
            selected={selectedOption === "Rechazadas"}
            onClick={() => handleButtonClick("Rechazadas")}
            text="Rechazadas"
          ></CreateButton>
        </div>
      </div>
      <div>
        <DonationInformation
          documentos={documentosFiltrados}
        ></DonationInformation>
      </div>
    </div>
  );
}
