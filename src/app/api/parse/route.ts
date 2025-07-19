import { NextResponse } from "next/server";
import { load } from "cheerio";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "tmp", "uploaded-krs.html");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File belum diupload" }, { status: 404 });
  }

  const html = fs.readFileSync(filePath, "utf8");
  const $ = load(html);

  let nim = "Tidak ditemukan";
  let nama = "Tidak ditemukan";
  let prodi = "Tidak ditemukan";
  let status = "Tidak ditemukan";
  let semester = "Tidak ditemukan";
  let pembimbing = "Tidak ditemukan";
  let angkatan = "Tidak ditemukan";

  // ✅ Parsing dari struktur <label> dan <div>
  $(".callout.callout-info .row").each((_, row) => {
    const labels = $(row).find("label");
    const values = $(row).find("div");

    labels.each((i, labelEl) => {
      const key = $(labelEl).text().trim().toLowerCase();
      const value = $(values[i]).text().trim();

      if (key === "nim") nim = value;
      else if (key === "nama mahasiswa") nama = value;
      else if (key === "program studi") prodi = value;
      else if (key === "status mahasiswa") status = value;
      else if (key === "semester") semester = value;
      else if (key === "pembimbing akademik") pembimbing = value;
      else if (key === "angkatan") angkatan = value;
    });
  });

  const data = $("table.table tbody tr")
    .map((_, el) => {
      const cols = $(el).find("td");
      return {
        no: $(cols[0]).text().trim(),
        kode: $(cols[1]).text().trim(),
        mataKuliah: $(cols[2]).text().trim(),
        kelas: $(cols[3]).text().trim(),
        sks: $(cols[4]).text().trim(),
        jadwal: $(cols[5]).text().trim(),
        dosen: $(cols[6]).text().trim(),
      };
    })
    .get();

  return NextResponse.json({
    data,
    nim,
    nama,
    prodi,
    status,
    semester,
    pembimbing,
    angkatan,
  });
}
