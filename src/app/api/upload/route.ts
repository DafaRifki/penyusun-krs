import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs"; // wajib di Vercel untuk fs

export async function POST(req: Request) {
  const buffer = await req.formData();
  const file = buffer.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "Tidak ada file" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const content = Buffer.from(arrayBuffer).toString("utf8");

  // Pilih folder tmp sesuai environment
  const tmpDir =
    process.env.VERCEL === "1" ? "/tmp" : path.join(process.cwd(), "tmp");

  // Pastikan folder ada
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const savePath = path.join(tmpDir, "uploaded-krs.html");
  fs.writeFileSync(savePath, content, "utf8");

  return NextResponse.json({ message: "Upload berhasil", savePath });
}
