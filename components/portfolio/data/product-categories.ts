import type { StaticImageData } from "next/image";
import Lifestyle_and_Gifting from "@/public/images/product_category_cover/Lifestyle_and_Gifting.jpg";
import Accessories from "@/public/images/product_category_cover/Accessories.jpg";
import Festive_Gifting from "@/public/images/product_category_cover/Festive_Gifting.jpg";
import Packaged_Food from "@/public/images/product_category_cover/Packaged_Food Products.jpg";

export type CategoryCard = {
  title: string;
  slug: string;
  image: StaticImageData;
};

export const productCategories: CategoryCard[] = [
  {
    title: "Lifestyle and Gifting",
    slug: "lifestyle-and-gifting",
    image: Lifestyle_and_Gifting,
  },
  {
    title: "Accessories",
    slug: "accessories",
    image: Accessories,
  },
  {
    title: "Festive Gifting",
    slug: "festive-gifting",
    image: Festive_Gifting,
  },
  {
    title: "Packaged Food Products",
    slug: "packaged-food-products",
    image: Packaged_Food,
  },
];
