export type ImageItem = {
  id: number;
  src: string;
  size?: "small" | "medium" | "large";
  shape?: "square" | "portrait";
};

export const foodImages: ImageItem[] = [
  {
    id: 1,
    src: "/images/food/food-01.jpg",
    shape: "square",
  },
  {
    id: 2,
    src: "/images/food/food-02.jpg",
    shape: "portrait",
  },
  {
    id: 3,
    src: "/images/food/food-03.jpg",
    size: "medium",
  },

  {
    id: 4,
    src: "/images/food/food-04.jpg",
    size: "medium",
  },
  {
    id: 5,
    src: "/images/food/food-05.jpg",
    size: "medium",
  },{
    id: 6,
    src: "/images/food/food-06.jpg",
    shape: "portrait",
  },
];
