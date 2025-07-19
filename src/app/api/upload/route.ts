import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const form = formidable({ multiples: false });

  const buffer = await req.formData();
  const file = buffer.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const content = Buffer.from(arrayBuffer).toString("utf8");

  const savePath = path.join(process.cwd(), "tmp", "uploaded-krs.html");
  fs.writeFileSync(savePath, content, "utf8");

  return NextResponse.json({ message: "Upload berhasil" });
}
