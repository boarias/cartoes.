
import React from "react";

type DataRow = {
  [key: string]: string | number | boolean | null;
};

const data: DataRow[] = [
  { nome: "João", idade: 30, ativo: true },
  { nome: "Maria", idade: 25, ativo: false },
];

const exportToExcel = () => {
  // Função de exportação (placeholder)
  console.log("Exportando para Excel...");
};

export default function Home() {
  return (
    <>
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key, idx) => (
              <th key={idx} className="px-2 py-1 border border-gray-300">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((val, idy) => (
                <td key={idy} className="px-2 py-1 border border-gray-300">
                  {String(val)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={exportToExcel}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Exportar Excel
      </button>
    </>
  );
}
