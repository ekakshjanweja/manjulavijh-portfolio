import type { StaticImageData } from "next/image";
import indian_cuisine from "@/public/images/food_category_cover/indian_cuisine.jpg";
import street_food from "@/public/images/food_category_cover/street_food.jpg";
import sweets_desserts from "@/public/images/food_category_cover/sweets_desserts.jpg";
import beverages from "@/public/images/food_category_cover/beverages.jpg";
import bakery_breads from "@/public/images/food_category_cover/bakery_breads.jpg";
import multi_cuisine from "@/public/images/food_category_cover/multi_cuisine.jpg";
import fresh_produce from "@/public/images/food_category_cover/fresh_produce.jpg";

export type CategoryCard = {
  title: string;
  slug: string;
  image: StaticImageData;
};

export const foodCategories: CategoryCard[] = [
  {
    title: "Indian Cuisine",
    slug: "indian-cuisine",
    image: indian_cuisine,
  },
  {
    title: "Street Food",
    slug: "street-food",
    image: street_food,
  },
  {
    title: "Sweets and Desserts",
    slug: "sweets-desserts",
    image: sweets_desserts,
  },
  {
    title: "Beverages",
    slug: "beverages",
    image: beverages,

  },
  {
    title: "Bakery and Breads",
    slug: "bakery-breads",
    image: bakery_breads,
  },
  {
    title: "Multi Cuisine",
    slug: "multi-cuisine",
    image: multi_cuisine,
  },

  {
    title: "Fresh Produce",
    slug: "fresh-produce",
    image: fresh_produce,
  },
];
