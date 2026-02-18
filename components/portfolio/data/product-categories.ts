import type { StaticImageData } from "next/image";
import productCover1 from "@/public/images/signature_work/Brand_1.jpg";
import productCover2 from "@/public/images/signature_work/Brand_2.jpg";
import productCover3 from "@/public/images/signature_work/Brand_3.jpg";
import productCover4 from "@/public/images/signature_work/Brand_4.jpg";
import productCover5 from "@/public/images/signature_work/Brand_5.jpg";

export type CategoryCard = {
  title: string;
  slug: string;
  image: StaticImageData;
};

export const productCategories: CategoryCard[] = [
  {
    title: "Beauty",
    slug: "beauty",
    image: productCover1,
  },
  {
    title: "Fragrance",
    slug: "fragrance",
    image: productCover2,
  },
  {
    title: "Lifestyle",
    slug: "lifestyle",
    image: productCover3,
  },
  {
    title: "Crafted Goods",
    slug: "crafted-goods",
    image: productCover4,
  },
  {
    title: "Packaging",
    slug: "packaging",
    image: productCover5,
  },
];
