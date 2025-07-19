import { MataKuliah } from "@/types/matakuliah";

// ✅ Tambahkan tipe hasil parsing lengkap
export interface ParseKRSResult {
  data: MataKuliah[];
  nim: string;
  nama: string;
  prodi: string;
  status: string;
  angkatan: string;
  semester: string;
  pembimbing: string;
}

// Tidak perlu ubah
export const uploadKRS = async (formData: FormData): Promise<void> => {
  await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
};

// ✅ Perbarui return type dan hasil parsing
export const parseKRS = async (): Promise<ParseKRSResult> => {
  const res = await fetch("/api/parse");
  return res.json();
};
