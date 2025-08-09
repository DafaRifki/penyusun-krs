"use client";

import PreviewTable from "@/components/PreviewTable";
import { Button } from "@/components/ui/button";
import UploadForm from "@/components/UploadForm";
import { parseKRS } from "@/services/krsService";
import { MataKuliah } from "@/types/matakuliah";
import { generatePDF } from "@/utils/generatePDF";
import { sortByHariJam } from "@/utils/sortJadwal";
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [data, setData] = useState<MataKuliah[]>([]);
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("");
  const [status, setStatus] = useState("");
  const [semester, setsemester] = useState("");
  const [pembimbing, setPembimbing] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [loading, setLoading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const loadData = async () => {
    setLoading(true);
    const result = await parseKRS();
    setData(result.data);
    setNama(result.nama);
    setNim(result.nim);
    setProdi(result.prodi);
    setStatus(result.status);
    setsemester(result.semester);
    setPembimbing(result.pembimbing);
    setAngkatan(result.angkatan);
    setLoading(false);
  };

  const sortedData = sortByHariJam(data);

  return (
    <main className="p-6 max-w-4xl mx-auto text-foreground">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary dark:text-blue-400">
          Penyusun KRS Mahasiswa
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Unggah file KRS dalam format HTML untuk menampilkan dan mencetaknya.
        </p>
        <div className="flex items-center justify-end mb-4">
          <ThemeToggle />
        </div>
      </div>

      <Card className="mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl hover:shadow-xl dark:hover:shadow-indigo-500 transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-primary dark:text-blue-400">
            Unggah File KRS (HTML)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="sm:flex-1">
              <UploadForm onUploaded={loadData} />
            </div>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="animate-spin w-6 h-6 mr-2 text-muted-foreground" />
          <span>Memproses data KRS...</span>
        </div>
      )}

      {!loading && data.length > 0 && (
        <>
          {/* Informasi Mahasiswa */}
          <Card className="mt-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-primary dark:text-blue-400">
                Informasi Mahasiswa
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-800 dark:text-gray-100">
              <div className="space-y-4">
                {/* NIM */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-cyan-500 mb-1">
                    NIM
                  </p>
                  <p>{nim}</p>
                </div>

                {/* Nama */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-cyan-500 mb-1">
                    Nama
                  </p>
                  <p>{nama}</p>
                </div>

                {/* Program Studi */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-cyan-500 mb-1">
                    Program Studi
                  </p>
                  <p>{prodi}</p>
                </div>
                {/* Angkatan */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-cyan-500 mb-1">
                    Angkatan
                  </p>
                  <p>{angkatan}</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Status */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-cyan-500 mb-1">
                    Status
                  </p>
                  <p>{status}</p>
                </div>

                {/* Semester */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-cyan-500 mb-1">
                    Semester
                  </p>
                  <p>{semester}</p>
                </div>

                {/* Dosen Pembimbing */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-cyan-500 mb-1">
                    Dosen Pembimbing Akademik
                  </p>
                  <p>{pembimbing}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabel KRS */}
          <PreviewTable
            data={sortedData}
            printRef={printRef}
            className="mt-6"
          />

          {/* Tombol PDF */}
          <div className="flex justify-end mt-6">
            <Button
              variant="default"
              className="hover:bg-blue-600 hover:text-white dark:hover:bg-indigo-600"
              onClick={() => {
                generatePDF(
                  {
                    nama,
                    nim,
                    prodi,
                    status,
                    semester,
                    pembimbing,
                    angkatan,
                    logoUrl: "/logo-uika.png",
                    data,
                  },
                  `${nama}_KRS.pdf`
                );
              }}>
              Cetak / Download PDF
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
