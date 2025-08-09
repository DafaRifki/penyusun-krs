import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { MataKuliah } from "@/types/matakuliah";
import { sortByHariJam } from "./sortJadwal";

interface MahasiswaInfo {
  nama: string;
  nim: string;
  prodi?: string;
  status?: string;
  semester?: string;
  angkatan?: string;
  pembimbing?: string;
  logoUrl?: string;
  data: MataKuliah[];
}

export const generatePDF = async (
  options: MahasiswaInfo,
  filename?: string
) => {
  const {
    nama,
    nim,
    prodi = "",
    status = "",
    semester = "",
    angkatan = "",
    pembimbing = "",
    logoUrl = "/logo.png",
    data,
  } = options;

  const cleanName = nama.trim().toLowerCase().replace(/\s+/g, "_"); // nama_dipisah_dengan_underscore
  const finalFilename = filename || `krs_${cleanName}.pdf`;

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let y = 30;

  // Logo
  const logo = new Image();
  logo.src = logoUrl;
  await new Promise((res) => {
    logo.onload = () => {
      pdf.addImage(logo, "PNG", 40, y, 40, 40); // lebih kecil
      res(true);
    };
  });

  // Judul
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("KARTU RENCANA STUDI (KRS)", pageWidth / 2, y + 15, {
    align: "center",
  });

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text("Semester Genap Tahun Akademik 2024 / 2025", pageWidth / 2, y + 30, {
    align: "center",
  });

  y += 50;
  pdf.setDrawColor(180);
  pdf.line(40, y, pageWidth - 40, y);
  y += 10;

  // Info Mahasiswa - dua kolom
  pdf.setFontSize(9);
  const labelX1 = 130;
  const labelX2 = pageWidth / 2;
  const infoY = y;

  pdf.text(`Nama   : ${nama}`, labelX1, infoY);
  pdf.text(`NIM    : ${nim}`, labelX1, infoY + 12);
  pdf.text(`Prodi  : ${prodi}`, labelX1, infoY + 24);
  pdf.text(`Semester  : ${semester}`, labelX1, infoY + 36);

  pdf.text(`Dosen Pembimbing Akademik : ${pembimbing}`, labelX2, infoY);
  pdf.text(`Status : ${status}`, labelX2, infoY + 12);
  pdf.text(`Angkatan : ${angkatan}`, labelX2, infoY + 24);

  y += 60;

  // Tabel KRS - kompak
  const sortedData = sortByHariJam(data); // ← baru ditambahkan

  autoTable(pdf, {
    startY: y,
    head: [["Kode", "Mata Kuliah", "Kelas", "SKS", "Jadwal", "Dosen"]],
    body: sortedData.map((mk) => [
      mk.kode,
      mk.mataKuliah,
      mk.kelas,
      mk.sks,
      mk.jadwal,
      mk.dosen,
    ]),
    styles: { fontSize: 10, cellPadding: 2 },
    headStyles: { fillColor: [115, 147, 179], halign: "center" },
    bodyStyles: { valign: "middle" },
    theme: "grid",
    margin: { left: 40, right: 40 },
    pageBreak: "avoid",
  });

  const finalY = (pdf as any).lastAutoTable.finalY || y + 180;

  // Footer (pastikan tetap di halaman sama)
  const date = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const footerY = finalY + 30;

  pdf.setFontSize(10);
  const lineStartX = pageWidth - 200;
  const lineEndX = pageWidth - 50;
  const lineY = footerY + 40;

  pdf.text(`Bogor, ${date}`, lineStartX, footerY);
  pdf.text("Tanda tangan mahasiswa", lineStartX, footerY + 15);
  pdf.line(lineStartX, lineY, lineEndX, lineY);

  // Tambahkan nama mahasiswa di bawah garis
  const textWidth = pdf.getTextWidth(nama);
  const centerX = (lineStartX + lineEndX) / 2;
  pdf.text(nama, centerX - textWidth / 2, lineY + 12);

  // Simpan
  pdf.save(finalFilename);
};
