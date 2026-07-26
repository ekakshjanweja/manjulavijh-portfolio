export type PortfolioCategory = "food" | "product" | "concept";

export const CATEGORY_LABELS: Record<PortfolioCategory, string> = {
  food: "Food",
  product: "Product",
  concept: "Concept",
};

export const CATEGORY_COVER_PATHS: Record<PortfolioCategory, string> = {
  food: "/images/category/food_cover.jpg",
  product: "/images/category/product_cover.jpg",
  concept: "/images/category/concept_cover.jpg",
};

export const FOOD_SUBCATEGORIES = [
  { label: "Indian Cuisine", slug: "indian-cuisine" },
  { label: "Street Food", slug: "street-food" },
  { label: "Sweets and Desserts", slug: "sweets-desserts" },
  { label: "Beverages", slug: "beverages" },
  { label: "Bakery and Breads", slug: "bakery-breads" },
  { label: "Multi Cuisine", slug: "multi-cuisine" },
  { label: "Fresh Produce", slug: "fresh-produce" },
];

export const PRODUCT_SUBCATEGORIES = [
  { label: "Lifestyle and Gifting", slug: "lifestyle-and-gifting" },
  { label: "Accessories", slug: "accessories" },
  { label: "Festive Gifting", slug: "festive-gifting" },
  { label: "Packaged Food Products", slug: "packaged-food-products" },
];

type Subcategory = { label: string; slug: string };

export const CATEGORY_SUBCATEGORIES: Record<PortfolioCategory, Subcategory[]> = {
  food: FOOD_SUBCATEGORIES,
  product: PRODUCT_SUBCATEGORIES,
  concept: [],
};
