"use client";

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
import Image from "next/image";

const GuideModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="hover:bg-blue-600 hover:text-white dark:hover:bg-indigo-600">
          Panduan
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-7xl w-full h-[80vh] overflow-y-auto">
        <AlertDialogHeader>
          <div className="space-y-2 text-sm text-muted-foreground">
            <AlertDialogTitle className="text-primary dark:text-blue-400">
              Panduan Penggunaan
            </AlertDialogTitle>
            <ScrollArea className="flex-1 w-full rounded-md border p-4">
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
                <Image
                  src="/logo.png"
                  alt="Contoh Panduan"
                  width={600}
                  height={400}
                />
                {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit
                distinctio impedit velit rerum nesciunt earum, ratione
                voluptatibus reiciendis consequatur, excepturi deserunt, soluta
                dolore atque quam adipisci possimus quisquam sapiente? Nisi!
                Iusto officia nulla aliquam praesentium ipsum magnam sint
                laudantium obcaecati. Tempora porro, ad dolore vitae sequi,
                consequatur molestiae corporis quia, dolorum modi quidem omnis
                blanditiis veniam doloremque! Praesentium, repellat consequatur.
                Rerum enim quos adipisci doloribus, sit magnam necessitatibus
                eaque deleniti error ex odio optio, dolorem molestiae. Delectus
                aspernatur placeat cumque optio quis velit maiores? Quae
                inventore nobis dolor veniam alias? Beatae, praesentium, libero
                laudantium qui ipsam neque vitae modi commodi, totam vel
                similique eos quo veniam! Repudiandae commodi ab est
                necessitatibus dolorem maiores soluta, nihil molestiae illo
                rerum vero earum? Doloribus dolore saepe iure molestias odit eos
                obcaecati ex similique nihil aliquam temporibus, soluta tenetur
                sequi perspiciatis impedit beatae itaque, repellendus quam
                laborum accusantium voluptatum officia natus incidunt minus!
                Nam! Dicta quasi facilis repellendus est expedita rerum corrupti
                ab molestiae quia amet, iure quidem quod ad, veniam provident
                sed. Ut error dicta sit dolore corporis delectus quis commodi
                illo saepe! Neque voluptates natus ullam suscipit, in quam nulla
                quae debitis placeat sint consectetur aut obcaecati maiores
                consequuntur ducimus eius, ipsa sunt officiis autem asperiores
                eveniet minima! Inventore adipisci ipsa totam. Quis, facilis
                voluptas est amet ipsum dolor iure non beatae dignissimos illo
                error nisi deserunt animi alias in excepturi eaque suscipit?
                Exercitationem doloribus magni deleniti vitae cum inventore sit
                doloremque. Officiis non soluta illo aut corrupti quasi dolorum,
                quidem eum suscipit nisi eius rerum culpa facilis quo ipsa
                nulla! Itaque laboriosam cum est velit dolores alias nisi
                consequatur, magni necessitatibus! Sed placeat nostrum minima
                magni, tempora at consequatur laborum culpa ipsam molestiae
                soluta aliquid necessitatibus excepturi totam modi cum provident
                officia vitae rerum nemo, vero repellat optio. Ullam,
                reprehenderit cupiditate! Placeat, animi? Tempora alias suscipit
                soluta ab inventore dolorum sint doloremque molestiae.
                Voluptatum vero voluptates, sunt similique autem quisquam. Sit
                cumque illo earum. Ad ipsum reiciendis et minima esse molestiae.
                Iusto aspernatur minus soluta repellendus blanditiis vero non
                iure consequuntur cupiditate quis tempora est nostrum recusandae
                enim rem sunt, ullam id assumenda laudantium dicta sit quasi.
                Harum ea aspernatur molestiae? Quis ducimus porro earum iste, id
                eaque cumque quia, fuga eum totam labore deleniti modi magni
                quibusdam assumenda debitis! Cupiditate numquam doloribus fuga
                necessitatibus ut iste dicta quia id error? Labore, ipsum
                asperiores vero architecto deserunt maiores impedit vel facere
                fugit laborum. Nam hic voluptas aspernatur totam at officiis,
                nisi fuga a, est praesentium harum ipsam, cum rerum ea unde!
                Molestiae earum delectus consequuntur eius cupiditate beatae
                esse dolor exercitationem officiis! Vero incidunt a rem. Quae
                dolorem exercitationem architecto culpa sapiente dolore illo
                enim aliquam explicabo! Sunt dignissimos quam accusamus! */}
              </AlertDialogDescription>
            </ScrollArea>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-red-500 hover:text-white hover:dark:bg-red-500 hover:dark:text-white">
            Tutup
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GuideModal;
