"use client";

import { useEffect, useState } from "react";
import { RotateCw, RotateCcw, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageEditorProps {
  file: File;
  onSave: (editedFile: File) => void;
  onCancel: () => void;
}

export function ImageEditor({ file, onSave, onCancel }: ImageEditorProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [rotation, setRotation] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const handleRotate = async (degrees: number) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("rotation", degrees.toString());

      const response = await fetch("/api/admin/photos/process", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        const newBlob = new Blob([result.data]);
        const newFile = new File([newBlob], file.name.replace(/\.[^/.]+$/, ".jpg"), { type: "image/jpeg" });
        const url = URL.createObjectURL(newBlob);
        setPreviewUrl(url);
        setRotation((prev) => (prev + degrees) % 360);
      }
    } catch (error) {
      console.error("Failed to rotate:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = async () => {
    setIsProcessing(true);
    try {
      if (previewUrl) {
        const response = await fetch(previewUrl);
        const blob = await response.blob();
        const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), { type: "image/jpeg" });
        onSave(newFile);
      }
    } catch (error) {
      console.error("Failed to save:", error);
      onSave(file);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-xl bg-white p-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h3 className="text-lg font-semibold text-slate-900">Edit Image</h3>
          <button
            onClick={onCancel}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center overflow-hidden p-4">
          {isProcessing ? (
            <div className="flex h-96 w-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-96 max-w-full object-contain"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRotate(-90)}
              disabled={isProcessing}
            >
              <RotateCcw className="mr-1 h-4 w-4" />
              Left
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRotate(90)}
              disabled={isProcessing}
            >
              <RotateCw className="mr-1 h-4 w-4" />
              Right
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isProcessing}>
              <Check className="mr-1 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}