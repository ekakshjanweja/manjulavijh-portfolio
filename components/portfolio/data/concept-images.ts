export type ImageItem = {
  id: number;
  src: string;
  size?: "small" | "medium" | "large";
  shape?: "square" | "portrait";
};

export const conceptImages: ImageItem[] = [
  {
    id: 1,
    src: "/images/signature_work/Brand_1.jpg",
    size: "medium",
  },
  {
    id: 2,
    src: "/images/signature_work/Brand_2.jpg",
    shape: "portrait",
  },
  {
    id: 3,
    src: "/images/signature_work/Brand_3.jpg",
    size: "small",
  },
  {
    id: 4,
    src: "/images/signature_work/Brand_4.jpg",
    size: "medium",
  },
  {
    id: 5,
    src: "/images/signature_work/Brand_5.jpg",
    shape: "portrait",
  },
  {
    id: 6,
    src: "/images/signature_work/Brand_6.jpg",
    size: "medium",
  },
];
