import { Article } from "@/types";

export const articles: Article[] = [
  {
    slug: "doubling-task-completion",
    title: "How an EdTech startup enhances students' motivation through effective UI/UX design",
    platform: "DOU",
    language: "ua",
    hasPage: true,
    date: "Jun 2024",
    readTime: 10,
  },
  {
    slug: "ai-fears-designers",
    title: "How can product designers overcome fears about AI?",
    platform: "vctr.media",
    language: "ua",
    hasPage: true,
    date: "Jan 2024",
    readTime: 4,
  },
  {
    slug: "junior-designer-guide",
    title: "A guide for junior designers",
    platform: "dev.ua",
    language: "ua",
    hasPage: true,
    date: "Sep 2023",
    readTime: 8,
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug) ?? null;
}
