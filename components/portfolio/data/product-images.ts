export type ImageItem = {
  id: number;
  src: string;
  size?: "small" | "medium" | "large";
  shape?: "square" | "portrait";
};

export const productImages: ImageItem[] = [
  {
    id: 1,
    src: "/images/portfolio/product-01.jpg",
    size: "small",
  },
  {
    id: 2,
    src: "/images/portfolio/product-02.jpg",
    shape: "portrait",
  },
  {
    id: 3,
    src: "/images/portfolio/product-03.jpg",
    size: "medium",
  },
];
