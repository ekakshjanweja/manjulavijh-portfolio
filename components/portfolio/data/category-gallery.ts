import type { ImageItem } from "@/components/portfolio/data/food-images";
import { foodImages } from "@/components/portfolio/data/food-images";
import { productImages } from "@/components/portfolio/data/product-images";

export const categoryGallery: Record<string, ImageItem[]> = {
  "food-plated-mains": foodImages,
  "food-street-bites": foodImages,
  "food-bakery": foodImages,
  "food-desserts": foodImages,
  "food-beverages": foodImages,
  "food-fresh-produce": foodImages,
  "food-tabletop-styling": foodImages,
  "product-beauty": productImages,
  "product-fragrance": productImages,
  "product-lifestyle": productImages,
  "product-crafted-goods": productImages,
  "product-packaging": productImages,
};
