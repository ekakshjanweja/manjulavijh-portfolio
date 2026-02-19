import { productImages } from "@/components/portfolio/data/product-images";
import { indianCuisineImages } from "./food/indian-cuisine";
import { sweetsDessertsImages } from "./food/sweets-desserts";
import { streetFoodImages } from "./food/street-food";
import { multiCuisineImages } from "./food/multi-cuisine";
import { beveragesImages } from "./food/beverages";
import { freshProduceImages } from "./food/fresh-produce";
import { bakeryBreadsImages } from "./food/bakery-breads";
import { ImageItem } from "./types";
import { lifestyleGiftingImages } from "./product/lifestyle-and-gifting";
import { accessoriesImages } from "./product/accessores";
import { festiveGiftingImages } from "./product/festive-gifting";
import { packagedFoodProductsImages } from "./product/packaged-food-products";

export const categoryGallery: Record<string, ImageItem[]> = {
  "food-indian-cuisine": indianCuisineImages,
  "food-street-food": streetFoodImages,
  "food-sweets-desserts": sweetsDessertsImages,
  "food-beverages": beveragesImages,
  "food-bakery-breads": bakeryBreadsImages,
  "food-multi-cuisine": multiCuisineImages,
  "food-fresh-produce": freshProduceImages,
  
  "product-lifestyle-and-gifting": lifestyleGiftingImages,
  "product-accessories": accessoriesImages,
  "product-festive-gifting": festiveGiftingImages,
  "product-packaged-food-products": packagedFoodProductsImages,
};
