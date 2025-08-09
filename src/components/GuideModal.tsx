import React from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "./ui/scroll-area";

const GuideModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="hover:bg-blue-600 hover:text-white dark:hover:bg-indigo-600">
          Panduan
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Panduan Penggunaan</AlertDialogTitle>
          <ScrollArea className="mt-2 h-[200px] w-full rounded-md border p-4">
            <AlertDialogDescription>
              📌 Langkah-langkah:
              <br />
              1. Klik &quot;Upload & Tampilkan&quot; untuk mengunggah file.
              <br />
              2. Pastikan format file sesuai.
              <br />
              3. Data akan muncul otomatis setelah upload.
              <br />
              <br />
              <strong>Catatan tambahan:</strong>
              <br />
              Jika file terlalu besar atau format tidak sesuai, sistem akan
              menolak unggahan.
              <br />
              Pastikan Anda menggunakan browser terbaru untuk kompatibilitas
              penuh.
              <br />
              <br />
              ⚠️ Hindari mengunggah file yang berisi data pribadi yang tidak
              relevan.
              <br />
              <br />
            </AlertDialogDescription>
          </ScrollArea>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Tutup</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GuideModal;
