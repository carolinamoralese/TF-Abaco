import { useState, useEffect } from "react";
import { obtenerDocumentos } from "../../servicios/servicios";

export function DonationInformation() {
  const [documentos, setDocumentos] = useState([]);

  const propiedadFechaDeExpedicion = "Fecha Expedición";
  const propiedadConsecutivo = "Consecutivo";
  const propiedadEmpresa = "EMPRESA ";
  const propiedadTipoDeCertificado = "Tipo_Certificado";

  useEffect(() => {
    obtenerDocumentos()
      .then((info) => {
        setDocumentos(info);
        console.log(obtenerDocumentos, 90);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex justify-end mt-8 bg-gray-200 bg-opacity-50 font-bold p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              N de constancia
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Empresa
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Concepto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acción
            </th>
          </tr>
        </thead>

        {documentos.map((documento, index) => (
          // console.log(documento)
          <tbody className="bg-white divide-y divide-gray-200" key={index}>
            {documento[propiedadFechaDeExpedicion] &&
            documento[propiedadConsecutivo] &&
            documento[propiedadEmpresa] &&
            documento[propiedadTipoDeCertificado] ? (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  {documento[propiedadFechaDeExpedicion]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {documento[propiedadConsecutivo]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {documento[propiedadEmpresa]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {documento[propiedadTipoDeCertificado]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Ver- Editar</td>
              </tr>
            ) : (
              <tr></tr>
            )}
          </tbody>
        ))}
      </table>
      
    </div>
  );
}
