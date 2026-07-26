import { type PortfolioCategory } from "./portfolio-categories";

export type ImageProcessingOptions = {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  format: "image/jpeg" | "image/webp";
};

export const defaultImageOptions: ImageProcessingOptions = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.85,
  format: "image/jpeg",
};

export async function compressImage(
  file: File,
  options: Partial<ImageProcessingOptions> = {}
): Promise<Blob> {
  const opts = { ...defaultImageOptions, ...options };

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Failed to load image"));
    };
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;

      if (width > opts.maxWidth || height > opts.maxHeight) {
        const ratio = Math.min(opts.maxWidth / width, opts.maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to compress image"));
          }
        },
        opts.format,
        opts.quality
      );
    };
  });
}

export type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export async function cropImage(
  file: File,
  cropArea: CropArea
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Failed to load image"));
    };
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropArea.width;
      canvas.height = cropArea.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.drawImage(
        img,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height
      );

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to crop image"));
          }
        },
        "image/jpeg",
        0.92
      );
    };
  });
}

export async function rotateImage(
  file: File,
  degrees: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Failed to load image"));
    };
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const radians = (degrees * Math.PI) / 180;

      const sin = Math.abs(Math.sin(radians));
      const cos = Math.abs(Math.cos(radians));

      if (degrees === 90 || degrees === 270) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(radians);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to rotate image"));
          }
        },
        "image/jpeg",
        0.92
      );
    };
  });
}

export function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Failed to load image"));
    };
    img.src = URL.createObjectURL(file);
  });
}

export function getFileExtension(filename: string): string {
  return filename.split(".").pop() || "jpg";
}

export function generateFileName(category: PortfolioCategory, subcategory: string | null): string {
  const timestamp = Date.now();
  const uniqueId = crypto.randomUUID().slice(0, 8);
  const subcategoryPath = subcategory ? `${subcategory}/` : "";
  return `${category}/${subcategoryPath}${timestamp}-${uniqueId}`;
}