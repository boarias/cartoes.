import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { defval: '' });
      setData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "updated-planilha.xlsx");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Controle de Cartões de Crédito</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mb-4" />
      {data.length > 0 && (
        <>
          <table className="table-auto w-full mb-4 border border-gray-200">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-2 py-1 border border-gray-300">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, idy) => (
                    <td key={idy} className="px-2 py-1 border border-gray-300">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={exportToExcel} className="bg-blue-500 text-white px-4 py-2 rounded">Exportar Excel</button>
        </>
      )}
    </div>
  );
}