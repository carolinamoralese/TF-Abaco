export function DonationInformation() {
  return (
    <div className="flex space-x-4 mt-8 bg-gray-200 bg-opacity-50 font-bold p-4">
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
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">12-10-2023</td>
            <td className="px-6 py-4 whitespace-nowrap">XX -2023</td>
            <td className="px-6 py-4 whitespace-nowrap">Eficacia S.A</td>
            <td className="px-6 py-4 whitespace-nowrap">Concepto ...</td>
            <td className="px-6 py-4 whitespace-nowrap">Ver- Editar</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">14-10-23</td>
            <td className="px-6 py-4 whitespace-nowrap">XX -2023</td>
            <td className="px-6 py-4 whitespace-nowrap">Colvanes SAS</td>
            <td className="px-6 py-4 whitespace-nowrap">Concepto ...</td>
            <td className="px-6 py-4 whitespace-nowrap">Ver- Editar</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
