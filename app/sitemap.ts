import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ogpunetwork.com";

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0
      import { Model, FormData, GenerationHistoryItem, PreviewOutput } from './types';
    },
    {
      url: `${base}/enterprisehome`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${base}/getstarted`,         // ← ADD THIS
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${base}/pilot-confirmed`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3                // low since it's not a landing page
    }
  ];
}
