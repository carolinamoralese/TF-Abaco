import React from "react";

export function DonationInformation({ documentos }) {
  const propiedadFechaDeExpedicion = "Fecha Expedición";
  const propiedadConsecutivo = "Consecutivo";
  const propiedadEmpresa = "EMPRESA ";
  const propiedadTipoDeCertificado = "Tipo_Certificado";
  const conceptosDocumentos = {
    "Donación_UnaAUno": "Donación uno a uno",
    "Donación_Dinero": "Donación en dinero",
    "Donación_Especie": "Donación en especie"
  }

  return (
    <div className="flex space-x-4 mt-8 bg-gray-200 bg-opacity-50 font-bold p-4">
     
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg--gris-oscuro-50 dark:bg-gris-oscuro-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
              Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                No. de constancia
              </th>
              <th scope="col" className="px-6 py-3">
                Empresa
              </th>
              <th scope="col" className="px-6 py-3">
                Concepto
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>

          {documentos.map((documento, index) => (
          <tbody key={index}>
            <tr className="bg-white border-b dark:bg-gris-oscuro-900 dark:border-gray-700">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {documento[propiedadFechaDeExpedicion]}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{documento[propiedadConsecutivo]}</td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{documento[propiedadEmpresa]}</td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{conceptosDocumentos[documento[propiedadTipoDeCertificado]]}</td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Ver- Editar
                </a>
              </td>
            </tr>
          </tbody>
          ))}
        </table>

      </div>


      
    </div>
  );
}
