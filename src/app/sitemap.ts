import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { LAST_UPDATED_ISO } from "@/lib/build-info";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: LAST_UPDATED_ISO,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
