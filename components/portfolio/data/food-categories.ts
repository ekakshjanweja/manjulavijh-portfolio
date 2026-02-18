import type { StaticImageData } from "next/image";
import foodCover1 from "@/public/images/food/food-01.jpg";
import foodCover2 from "@/public/images/food/food-02.jpg";
import foodCover3 from "@/public/images/food/food-03.jpg";
import foodCover4 from "@/public/images/food/food-04.jpg";
import foodCover5 from "@/public/images/food/food-05.jpg";
import foodCover6 from "@/public/images/food/food-06.jpg";
import foodCover7 from "@/public/images/hero-food.jpg";

export type CategoryCard = {
  title: string;
  slug: string;
  image: StaticImageData;
};

export const foodCategories: CategoryCard[] = [
  {
    title: "Plated Mains",
    slug: "plated-mains",
    image: foodCover1,
  },
  {
    title: "Street Bites",
    slug: "street-bites",
    image: foodCover2,
  },
  {
    title: "Bakery",
    slug: "bakery",
    image: foodCover3,
  },
  {
    title: "Desserts",
    slug: "desserts",
    image: foodCover4,
  },
  {
    title: "Beverages",
    slug: "beverages",
    image: foodCover5,
  },
  {
    title: "Fresh Produce",
    slug: "fresh-produce",
    image: foodCover6,
  },
  {
    title: "Tabletop Styling",
    slug: "tabletop-styling",
    image: foodCover7,
  },
];
