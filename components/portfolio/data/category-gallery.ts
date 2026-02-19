import { productImages } from "@/components/portfolio/data/product-images";
import { indianCuisineImages } from "./food/indian-cuisine";
import { sweetsDessertsImages } from "./food/sweets-desserts";
import { streetFoodImages } from "./food/street-food";
import { multiCuisineImages } from "./food/multi-cuisine";
import { beveragesImages } from "./food/beverages";
import { freshProduceImages } from "./food/fresh-produce";
import { bakeryBreadsImages } from "./food/bakery-breads";
import { ImageItem } from "./types";

export const categoryGallery: Record<string, ImageItem[]> = {
  "food-indian-cuisine": indianCuisineImages,
  "food-street-food": streetFoodImages,
  "food-sweets-desserts": sweetsDessertsImages,
  "food-beverages": beveragesImages,
  "food-bakery-breads": bakeryBreadsImages,
  "food-multi-cuisine": multiCuisineImages,
  "food-fresh-produce": freshProduceImages,
  "product-beauty": productImages,
  "product-fragrance": productImages,
  "product-lifestyle": productImages,
  "product-crafted-goods": productImages,
  "product-packaging": productImages,
};
