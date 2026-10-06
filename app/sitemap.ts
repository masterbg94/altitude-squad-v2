import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const sections: readonly string[] = [
  "",
  "#services",
  "#industries",
  "#safety",
  "#team",
  "#process",
  "#faq",
  "#contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url;
  const lastModified = new Date();

  const serviceUrls = site.services.map(([name]) => ({
    url: `${baseUrl}/usluge/${slugify(name)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1,
      alternates: {
        languages: {
          sr: baseUrl,
          "sr-RS": baseUrl,
        },
      },
    },
    ...sections.slice(1).map((section) => ({
      url: `${baseUrl}${section}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...serviceUrls,
  ];
}
