"use client";

import { useMemo, useState, useTransition, useRef } from "react";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { UploadCloud, Trash2, X, Edit3, Plus, ImageIcon } from "lucide-react";
import Masonry from "react-masonry-css";

import {
  CATEGORY_LABELS,
  CATEGORY_SUBCATEGORIES,
  CATEGORY_COVER_PATHS,
  type PortfolioCategory,
} from "@/lib/portfolio-categories";
import { extractStoragePath } from "@/lib/supabase/storage";
import { compressImage, defaultImageOptions } from "@/lib/image-utils";
import PhotoTile from "@/app/admin/photo-tile";
import { ImageEditor } from "@/app/admin/image-editor";
import { Button } from "@/components/ui/button";

type PhotoRecord = {
  id: string;
  image_url: string;
  alt_text: string | null;
  description: string | null;
  category: string;
  subcategory: string | null;
  position: number;
  created_at: string;
};

type GroupedPhotos = Record<string, PhotoRecord[]>;

type UploadFile = {
  id: string;
  originalFile: File;
  processedFile: File | null;
  preview: string;
  status: "pending" | "processing" | "complete" | "error";
  error?: string;
  altText: string;
  description: string;
};

type UploadState = {
  files: UploadFile[];
  category: PortfolioCategory;
  subcategory: string;
};

type Props = {
  initialGroupedPhotos: GroupedPhotos;
  fixedCategory?: PortfolioCategory;
  fixedSubcategory?: string;
};

const categoryOptions: { value: PortfolioCategory; label: string }[] = (
  Object.keys(CATEGORY_LABELS) as PortfolioCategory[]
).map((key) => ({ value: key, label: CATEGORY_LABELS[key] }));

function buildGroupKey(category: string, subcategory: string | null) {
  return `${category}:${subcategory ?? ""}`;
}

function parseGroupKey(groupKey: string) {
  const [category, subcategory = ""] = groupKey.split(":");
  return {
    category,
    subcategory: subcategory || null,
  };
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function PhotoManager({
  initialGroupedPhotos,
  fixedCategory,
  fixedSubcategory,
}: Props) {
  const [groupedPhotos, setGroupedPhotos] = useState<GroupedPhotos>(initialGroupedPhotos);
  const [uploadState, setUploadState] = useState<UploadState>(() => {
    const initialCategory = fixedCategory ?? "food";
    const initialSubcategory =
      initialCategory === "product"
        ? "lifestyle-and-gifting"
        : initialCategory === "food"
          ? "indian-cuisine"
          : "";
    return {
      files: [],
      category: initialCategory,
      subcategory: fixedSubcategory ?? initialSubcategory,
    };
  });

  const effectiveCategory = fixedCategory ?? uploadState.category;
  const effectiveSubcategory = fixedSubcategory ?? uploadState.subcategory;
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const groups = useMemo(() => {
    const entries = Object.entries(groupedPhotos);
    const categoryOrder: PortfolioCategory[] = ["food", "product", "concept"];
    return entries.sort(([aKey], [bKey]) => {
      const [aCategory, aSub] = aKey.split(":");
      const [bCategory, bSub] = bKey.split(":");
      const categoryDiff =
        categoryOrder.indexOf(aCategory as PortfolioCategory) -
        categoryOrder.indexOf(bCategory as PortfolioCategory);
      if (categoryDiff !== 0) return categoryDiff;
      return (aSub || "").localeCompare(bSub || "");
    });
  }, [groupedPhotos]);

  const activeSubcategories =
    effectiveCategory === "concept"
      ? undefined
      : CATEGORY_SUBCATEGORIES[effectiveCategory];

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newFiles: UploadFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;

      const preview = URL.createObjectURL(file);
      const id = generateId();

      newFiles.push({
        id,
        originalFile: file,
        processedFile: null,
        preview,
        status: "pending",
        altText: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        description: "",
      });
    }

    setUploadState((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const processFile = async (uploadFile: UploadFile): Promise<File> => {
    try {
      const compressed = await compressImage(uploadFile.originalFile, defaultImageOptions);
      const fileName = uploadFile.originalFile.name.replace(/\.[^/.]+$/, ".jpg");
      return new File([compressed], fileName, { type: "image/jpeg" });
    } catch (error) {
      console.error("Compression failed:", error);
      return uploadFile.originalFile;
    }
  };

  const handleUpload = async () => {
    const pendingFiles = uploadState.files.filter((f) => f.status === "pending" || f.status === "error");
    if (pendingFiles.length === 0) {
      setMessage("No files to upload.");
      return;
    }

    if (effectiveCategory !== "concept" && !effectiveSubcategory) {
      setMessage("Select a subcategory before uploading.");
      return;
    }

    setMessage(null);

    for (const uploadFile of pendingFiles) {
      setUploadState((prev) => ({
        ...prev,
        files: prev.files.map((f) =>
          f.id === uploadFile.id ? { ...f, status: "processing" as const } : f
        ),
      }));

      setUploadProgress((prev) => ({ ...prev, [uploadFile.id]: 10 }));

      try {
        const processedFile = await processFile(uploadFile);
        setUploadProgress((prev) => ({ ...prev, [uploadFile.id]: 40 }));

        const formData = new FormData();
        formData.append("file", processedFile);
        formData.append("category", effectiveCategory);
        if (effectiveCategory !== "concept" && effectiveSubcategory) {
          formData.append("subcategory", effectiveSubcategory);
        }
        if (uploadFile.altText) {
          formData.append("altText", uploadFile.altText);
        }
        if (uploadFile.description) {
          formData.append("description", uploadFile.description);
        }

        setUploadProgress((prev) => ({ ...prev, [uploadFile.id]: 60 }));

        const response = await fetch("/api/admin/photos/upload", {
          method: "POST",
          body: formData,
        });

        setUploadProgress((prev) => ({ ...prev, [uploadFile.id]: 90 }));

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error ?? "Upload failed");
        }

        setUploadState((prev) => ({
          ...prev,
          files: prev.files.map((f) =>
            f.id === uploadFile.id
              ? { ...f, status: "complete" as const, processedFile }
              : f
          ),
        }));
        setUploadProgress((prev) => ({ ...prev, [uploadFile.id]: 100 }));
      } catch (error) {
        setUploadState((prev) => ({
          ...prev,
          files: prev.files.map((f) =>
            f.id === uploadFile.id
              ? {
                  ...f,
                  status: "error" as const,
                  error: error instanceof Error ? error.message : "Upload failed",
                }
              : f
          ),
        }));
      }
    }

    startTransition(async () => {
      const updated = await fetch(
        fixedCategory && fixedSubcategory
          ? `/api/admin/photos?category=${fixedCategory}&subcategory=${fixedSubcategory}`
          : fixedCategory
            ? `/api/admin/photos?category=${fixedCategory}`
            : "/api/admin/photos",
      );
      if (updated.ok) {
        const data = await updated.json();
        setGroupedPhotos(data.grouped ?? groupedPhotos);
      }
    });

    setTimeout(() => {
      setUploadState((prev) => ({
        ...prev,
        files: prev.files.filter((f) => f.status !== "complete"),
      }));
      setUploadProgress((prev) => {
        const next = { ...prev };
        pendingFiles.forEach((f) => delete next[f.id]);
        return next;
      });
      setMessage("Upload complete.");
    }, 1000);
  };

  const handleRemoveFile = (id: string) => {
    setUploadState((prev) => ({
      ...prev,
      files: prev.files.filter((f) => f.id !== id),
    }));
    setUploadProgress((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleEditFile = (id: string) => {
    setEditingFileId(id);
  };

  const handleSaveEdit = (id: string, editedFile: File) => {
    setUploadState((prev) => ({
      ...prev,
      files: prev.files.map((f) =>
        f.id === id
          ? {
              ...f,
              originalFile: editedFile,
              processedFile: null,
              preview: URL.createObjectURL(editedFile),
              status: "pending" as const,
            }
          : f
      ),
    }));
    setEditingFileId(null);
  };

  const handleDelete = async (photo: PhotoRecord) => {
    setMessage(null);
    const pathMatch = extractStoragePath(photo.image_url);
    if (!pathMatch) {
      setMessage("Unable to locate storage path for image.");
      return;
    }

    const response = await fetch("/api/admin/photos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: photo.id,
        storagePath: decodeURIComponent(pathMatch),
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      setMessage(result.error ?? "Delete failed.");
      return;
    }

    setGroupedPhotos((prev) => {
      const key = buildGroupKey(photo.category, photo.subcategory);
      const next = { ...prev };
      next[key] = (next[key] ?? []).filter((item) => item.id !== photo.id);
      return next;
    });
  };

  const handleDragEnd = async (event: DragEndEvent, groupKey: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const group = (groupedPhotos[groupKey] ?? []).slice();
    const oldIndex = group.findIndex((item) => item.id === active.id);
    const newIndex = group.findIndex((item) => item.id === over.id);
    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const reordered = arrayMove(group, oldIndex, newIndex).map((item, index) => ({
      ...item,
      position: index + 1,
    }));

    setGroupedPhotos((prev) => ({
      ...prev,
      [groupKey]: reordered,
    }));

    const response = await fetch("/api/admin/photos/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updates: reordered.map((item) => ({
          id: item.id,
          position: item.position,
        })),
      }),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      setMessage(result?.error ?? "Reorder failed.");
      return;
    }

    const refreshed = await fetch(
      fixedCategory && fixedSubcategory
        ? `/api/admin/photos?category=${fixedCategory}&subcategory=${fixedSubcategory}`
        : fixedCategory
          ? `/api/admin/photos?category=${fixedCategory}`
          : "/api/admin/photos",
    );
    if (refreshed.ok) {
      const data = await refreshed.json();
      setGroupedPhotos(data.grouped ?? groupedPhotos);
    }
  };

  const pendingCount = uploadState.files.filter((f) => f.status === "pending" || f.status === "processing").length;
  const totalProgress = Object.values(uploadProgress).reduce((sum, p) => sum + p, 0) / Math.max(pendingCount, 1);

  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Portfolio Images
        </p>
        <h2 className="text-xl font-semibold text-slate-900">
          Manage gallery content
        </h2>
        <p className="text-sm text-slate-500">
          Upload, delete, and reorder portfolio images by category.
        </p>
      </header>

      <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-wrap items-end gap-4">
          <div className="flex min-w-[180px] flex-col gap-2 text-xs uppercase tracking-wide text-slate-400">
            Images
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="justify-start gap-2"
            >
              <Plus className="h-4 w-4" />
              Select Images
            </Button>
          </div>
          {fixedCategory ? (
            <div className="flex min-w-[140px] flex-col gap-2 text-xs uppercase tracking-wide text-slate-400">
              Category
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
                {CATEGORY_LABELS[fixedCategory]}
              </div>
            </div>
          ) : (
            <div className="flex min-w-[140px] flex-col gap-2 text-xs uppercase tracking-wide text-slate-400">
              Category
              <select
                value={uploadState.category}
                onChange={(event) => {
                  const nextCategory = event.target.value as PortfolioCategory;
                  const subcategories = CATEGORY_SUBCATEGORIES[nextCategory];
                  setUploadState((prev) => ({
                    ...prev,
                    category: nextCategory,
                    subcategory: subcategories?.[0]?.slug ?? "",
                  }));
                }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          {fixedSubcategory ? (
            <div className="flex min-w-[180px] flex-col gap-2 text-xs uppercase tracking-wide text-slate-400">
              Subcategory
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
                {activeSubcategories?.find((subcategory) => subcategory.slug === fixedSubcategory)
                  ?.label ?? fixedSubcategory}
              </div>
            </div>
          ) : (
            <div className="flex min-w-[180px] flex-col gap-2 text-xs uppercase tracking-wide text-slate-400">
              Subcategory
              <select
                value={effectiveCategory === "concept" ? "" : effectiveSubcategory}
                onChange={(event) =>
                  setUploadState((prev) => ({
                    ...prev,
                    subcategory: event.target.value,
                  }))
                }
                disabled={effectiveCategory === "concept"}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 disabled:opacity-50"
              >
                {effectiveCategory === "concept" ? (
                  <option value="">None</option>
                ) : (
                  activeSubcategories?.map((subcategory) => (
                    <option key={subcategory.slug} value={subcategory.slug}>
                      {subcategory.label}
                    </option>
                  ))
                )}
              </select>
            </div>
          )}
          <Button
            type="button"
            onClick={handleUpload}
            disabled={isPending || pendingCount === 0}
            className="flex items-center justify-center gap-2"
          >
            <UploadCloud className="h-4 w-4" />
            Upload {pendingCount > 0 ? `(${pendingCount})` : ""}
          </Button>
        </div>

        {pendingCount > 0 && (
          <div className="space-y-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-slate-900 transition-all duration-300"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <div className="grid gap-2 max-h-40 overflow-y-auto">
              {uploadState.files
                .filter((f) => f.status !== "complete")
                .map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-2"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-slate-100">
                      {file.preview ? (
                        <img
                          src={file.preview}
                          alt={file.altText}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-slate-400" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {file.originalFile.name}
                      </p>
                      <input
                        type="text"
                        placeholder="Alt text"
                        value={file.altText}
                        onChange={(event) =>
                          setUploadState((prev) => ({
                            ...prev,
                            files: prev.files.map((f) =>
                              f.id === file.id
                                ? { ...f, altText: event.target.value }
                                : f
                            ),
                          }))
                        }
                        className="w-full rounded border border-slate-200 px-2 py-1 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Description (optional)"
                        value={file.description}
                        onChange={(event) =>
                          setUploadState((prev) => ({
                            ...prev,
                            files: prev.files.map((f) =>
                              f.id === file.id
                                ? { ...f, description: event.target.value }
                                : f
                            ),
                          }))
                        }
                        className="w-full rounded border border-slate-200 px-2 py-1 text-xs"
                      />
                      {file.status === "processing" && (
                        <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${uploadProgress[file.id] ?? 0}%` }}
                          />
                        </div>
                      )}
                      {file.status === "error" && (
                        <p className="text-xs text-red-500">{file.error}</p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => handleEditFile(file.id)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                        title="Edit image"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(file.id)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                        title="Remove"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {message ? <p className="text-sm text-slate-500">{message}</p> : null}

      <div className="space-y-8">
        {groups.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 px-6 py-10 text-center text-sm text-slate-500">
            No photos uploaded yet.
          </div>
        ) : (
          groups.map(([groupKey, photos]) => {
            const { category, subcategory } = parseGroupKey(groupKey);
            const labelMap =
              category === "food" || category === "product"
                ? CATEGORY_SUBCATEGORIES[category]
                : undefined;
            const subcategoryLabel = subcategory
              ? labelMap?.find((entry) => entry.slug === subcategory)?.label ?? subcategory
              : "";
            const heading = subcategory
              ? `${CATEGORY_LABELS[category as PortfolioCategory] ?? category} · ${subcategoryLabel}`
              : CATEGORY_LABELS[category as PortfolioCategory] ?? category;

            return (
              <div key={groupKey} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {heading}
                    </p>
                    <p className="text-sm text-slate-500">
                      {photos.length} images
                    </p>
                  </div>
                  {CATEGORY_COVER_PATHS[category as PortfolioCategory] ? (
                    <span className="text-xs text-slate-400">
                      Cover: {CATEGORY_COVER_PATHS[category as PortfolioCategory]}
                    </span>
                  ) : null}
                </div>

                <DndContext
                  sensors={sensors}
                  onDragEnd={(event) => handleDragEnd(event, groupKey)}
                >
                  <SortableContext
                    items={photos.map((photo) => photo.id)}
                    strategy={rectSortingStrategy}
                  >
                    <Masonry
                      breakpointCols={{ default: 3, 1024: 2, 640: 1 }}
                      className="flex gap-2"
                      columnClassName="flex flex-col gap-2"
                    >
                      {photos.map((photo) => (
                        <div key={photo.id} className="relative w-full">
                          <PhotoTile photo={photo} />
                          <button
                            type="button"
                            onClick={() => handleDelete(photo)}
                            className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-slate-700 shadow-sm transition hover:bg-white"
                            aria-label="Delete image"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </Masonry>
                  </SortableContext>
                </DndContext>
              </div>
            );
          })
        )}
      </div>

      {editingFileId && (
        <ImageEditor
          file={
            uploadState.files.find((f) => f.id === editingFileId)?.originalFile ??
            new File([], "")
          }
          onSave={(editedFile) => handleSaveEdit(editingFileId, editedFile)}
          onCancel={() => setEditingFileId(null)}
        />
      )}
    </section>
  );
}