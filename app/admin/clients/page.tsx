"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import Image from "next/image";
import { UploadCloud, Trash2, Plus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractStoragePath } from "@/lib/supabase/storage";

type Client = {
  id: string;
  name: string;
  logo_url: string;
  website: string | null;
  position: number;
};

export default function ClientManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [pendingFiles, setPendingFiles] = useState<{ file: File; preview: string; name: string; website: string }[]>([]);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/clients")
      .then((res) => res.json())
      .then((data) => setClients(data.clients ?? []))
      .finally(() => setLoading(false));
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: typeof pendingFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;
      newFiles.push({
        file,
        preview: URL.createObjectURL(file),
        name: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        website: "",
      });
    }

    setPendingFiles((prev) => [...prev, ...newFiles]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpdatePending = (index: number, field: string, value: string) => {
    setPendingFiles((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [field]: value } : f))
    );
  };

  const handleRemovePending = (index: number) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (pendingFiles.length === 0) {
      setMessage("Select images to upload.");
      return;
    }

    setUploading(true);
    setMessage(null);

    for (const pf of pendingFiles) {
      const formData = new FormData();
      formData.append("file", pf.file);
      formData.append("name", pf.name);
      if (pf.website) formData.append("website", pf.website);

      const response = await fetch("/api/admin/clients", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        setMessage(result.error ?? "Upload failed");
        setUploading(false);
        return;
      }
    }

    startTransition(async () => {
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      setClients(data.clients ?? clients);
    });

    setPendingFiles([]);
    setUploading(false);
    setMessage("Upload complete.");
  };

  const handleDelete = async (client: Client) => {
    const pathMatch = extractStoragePath(client.logo_url);
    if (!pathMatch) {
      setMessage("Unable to locate storage path.");
      return;
    }

    const response = await fetch("/api/admin/clients/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: client.id,
        storagePath: decodeURIComponent(pathMatch),
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      setMessage(result.error ?? "Delete failed");
      return;
    }

    setClients((prev) => prev.filter((c) => c.id !== client.id));
  };

  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Client Logos
        </p>
        <h2 className="text-xl font-semibold text-slate-900">
          Manage brand clients
        </h2>
        <p className="text-sm text-slate-500">
          Upload and manage client logos displayed on the brands page.
        </p>
      </header>

      <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />

      <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <div className="flex flex-wrap items-end gap-4">
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Logos
          </Button>
          <Button onClick={handleUpload} disabled={isPending || pendingFiles.length === 0 || uploading} className="gap-2">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
            Upload {pendingFiles.length > 0 ? `(${pendingFiles.length})` : ""}
          </Button>
        </div>

        {pendingFiles.length > 0 && (
          <div className="grid gap-2 max-h-60 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
            {pendingFiles.map((pf, index) => (
              <div key={index} className="relative flex gap-3 rounded-lg border border-slate-200 bg-white p-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-slate-100">
                  <img src={pf.preview} alt="" className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <input
                    type="text"
                    placeholder="Client name"
                    value={pf.name}
                    onChange={(e) => handleUpdatePending(index, "name", e.target.value)}
                    className="w-full rounded border border-slate-200 px-2 py-1 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Website URL (optional)"
                    value={pf.website}
                    onChange={(e) => handleUpdatePending(index, "website", e.target.value)}
                    className="w-full rounded border border-slate-200 px-2 py-1 text-xs text-slate-500"
                  />
                </div>
                <button onClick={() => handleRemovePending(index)} className="absolute top-1 right-1 rounded p-1 text-slate-400 hover:bg-slate-100">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {message && <p className="text-sm text-slate-500">{message}</p>}

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {clients.length === 0 ? (
            <div className="col-span-full rounded-xl border border-dashed border-slate-200 px-6 py-10 text-center text-sm text-slate-500">
              No client logos uploaded yet.
            </div>
          ) : (
          clients.map((client) => (
            <div key={client.id} className="group relative rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={client.logo_url}
                  alt={client.name}
                  fill
                  sizes="200px"
                  className="object-contain"
                  quality={75}
                />
              </div>
              <p className="mt-2 text-center text-sm font-medium text-slate-700 truncate">{client.name}</p>
              <button
                onClick={() => handleDelete(client)}
                className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-slate-500 shadow-sm opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
                aria-label="Delete client"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
      )}
    </section>
  );
}