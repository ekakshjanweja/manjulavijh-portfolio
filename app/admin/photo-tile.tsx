"use client";

import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties } from "react";

type PhotoRecord = {
  id: string;
  image_url: string;
  alt_text: string | null;
  description: string | null;
};

type Props = {
  photo: PhotoRecord;
};

export default function PhotoTile({ photo }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: photo.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      className={`group relative w-full overflow-hidden border border-slate-200 bg-white shadow-sm text-left ${
        isDragging ? "opacity-70" : ""
      }`}
      {...attributes}
      {...listeners}
    >
      <Image
        src={photo.image_url}
        alt={photo.alt_text ?? ""}
        width={0}
        height={0}
        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        className="w-full h-auto"
        quality={75}
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
        <p className="truncate text-xs text-white">{photo.alt_text || "No alt text"}</p>
        {photo.description && (
          <p className="truncate text-xs text-white/80">{photo.description}</p>
        )}
      </div>
    </button>
  );
}
