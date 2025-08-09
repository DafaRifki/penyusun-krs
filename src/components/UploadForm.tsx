import React, { useState, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";
import clsx from "clsx";
import GuideModal from "./GuideModal";

interface UploadFormProps {
  onUploaded: () => void;
}

export default function UploadForm({ onUploaded }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && !selectedFile.name.endsWith(".html")) {
      toast.error("Hanya file .html yang diperbolehkan");
      setFile(null);
      return;
    }

    setFile(selectedFile || null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && !droppedFile.name.endsWith(".html")) {
      toast.error("Hanya file .html yang diperbolehkan");
      return;
    }

    setFile(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.warning("Masukkan file HTML terlebih dahulu.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal upload.");

      toast.success(`Berhasil upload: ${file.name}`);
      onUploaded();
    } catch (error) {
      toast.error("Terjadi kesalahan saat meng-upload file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label
        htmlFor="file-upload"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        className={clsx(
          "flex items-center gap-3 cursor-pointer border-2 border-dashed rounded-md px-4 py-6 text-center justify-center transition-colors",
          dragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
            : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-indigo-500"
        )}>
        <UploadCloud className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground truncate max-w-[220px] mx-auto text-center">
          {file?.name || "Klik atau drag file .html ke sini"}
        </span>

        <Input
          ref={inputRef}
          id="file-upload"
          type="file"
          accept=".html"
          onChange={handleChange}
          className="hidden"
          disabled={uploading}
        />
      </label>

      <div className="flex justify-between items-center gap-4">
        <Button
          className="hover:bg-blue-600 hover:text-white dark:hover:bg-indigo-600"
          type="submit"
          disabled={uploading}
          variant="default">
          {uploading ? "Upload file..." : "Upload & Tampilkan"}
        </Button>

        <GuideModal />
      </div>
    </form>
  );
}
