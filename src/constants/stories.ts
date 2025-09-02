import type { IStory } from "~/interfaces/story";

export const storySkeleton: IStory = {
  id: "1",
  content_image: "https://via.placeholder.com/400x300",
  title: "Lorem Ipsum Dolor Sit Amet",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel turpis vitae nulla.",
  author: { profile_image: "https://via.placeholder.com/50", name: "John Doe" },
  created_at: "2025-08-14",
  category: { name: "placeholder", id: 1 },
  updated_at: null,
};

export const categories = [
  "Adventure",
  "Fiction",
  "Fantasy",
  "Heartfelt",
  "Mystery",
];

export const allCategories = [
  "All",
  "Comedy",
  "Romance",
  "Horror",
  "Adventure",
  "Fiction",
  "Fantasy",
  "Heartfelt",
  "Mystery",
];

export const sortByOptions = [
  { label: "Newest", value: "newest" },
  { label: "Popular", value: "popular" },
  { label: "A - Z", value: "a-z" },
  { label: "Z - A", value: "z-a" },
];
