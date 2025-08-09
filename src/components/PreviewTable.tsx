import { MataKuliah } from "@/types/matakuliah";
import { RefObject } from "react";

interface PreviewTableProps {
  data: MataKuliah[];
  printRef: RefObject<HTMLDivElement | null>;
  className?: string;
}

export default function PreviewTable({ data, printRef }: PreviewTableProps) {
  return (
    <div className="mt-4 border border-gray-200 rounded-lg bg-white shadow-sm dark:bg-gray-900 dark:border-gray-700">
      <div ref={printRef} className="overflow-auto p-4">
        <div className="w-full">
          <table className="min-w-full table-fixed border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 dark:bg-gray-800">
                <th className="border border-gray-200 px-3 py-2 w-[80px] font-semibold dark:border-primary dark:text-blue-400">
                  Kode
                </th>
                <th className="border border-gray-200 px-3 py-2 w-[250px] font-semibold dark:border-primary dark:text-blue-400">
                  Mata Kuliah
                </th>
                <th className="border border-gray-200 px-3 py-2 w-[60px] font-semibold dark:border-primary dark:text-blue-400">
                  Kelas
                </th>
                <th className="border border-gray-200 px-3 py-2 w-[40px] font-semibold dark:border-primary dark:text-blue-400">
                  SKS
                </th>
                <th className="border border-gray-200 px-3 py-2 w-[200px] font-semibold dark:border-primary dark:text-blue-400">
                  Jadwal
                </th>
                <th className="border border-gray-200 px-3 py-2 w-[200px] font-semibold dark:border-primary dark:text-blue-400">
                  Dosen
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((mk, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-100">
                  <td className="border border-gray-200 px-3 py-2 text-center dark:border-gray-700">
                    {mk.kode}
                  </td>
                  <td className="border border-gray-200 px-3 py-2 dark:border-gray-700">
                    {mk.mataKuliah}
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-center dark:border-gray-700">
                    {mk.kelas}
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-center dark:border-gray-700">
                    {mk.sks}
                  </td>
                  <td className="border border-gray-200 px-3 py-2 dark:border-gray-700">
                    {mk.jadwal}
                  </td>
                  <td className="border border-gray-200 px-3 py-2 dark:border-gray-700">
                    {mk.dosen}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
