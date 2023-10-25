import React from "react";
import { MDBDataTableV5 } from "mdbreact";

export function DonationInformation({ documentos }) {
  documentos.map((documento) => {
    documento.accion = <a href="#">Ver - Editar</a>;
    return documento;
  });

  const data = {
    columns: [
      {
        label: "Fecha",
        field: "Fecha Expedición",
        sort: "asc",
        width: 200,
      },
      {
        label: "No. de constancia",
        field: "Consecutivo",
        sort: "asc",
        width: 270,
      },
      {
        label: "Empresa",
        field: "EMPRESA ",
        sort: "asc",
        width: 300,
      },
      {
        label: "Concepto",
        field: "Tipo_Certificado",
        sort: "asc",
        width: 100,
      },
      {
        label: "Acción",
        field: "accion",
        sort: "asc",
        width: 100,
      },
    ],
    rows: documentos,
  };

  return (
    <div className="mt-8">
      <MDBDataTableV5 striped bordered small data={data} />;
    </div>
  );
}
