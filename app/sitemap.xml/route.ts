import { NextResponse } from "next/server";
import { getAllModels } from "@/server-actions/model";
import { iModel } from "@/lib/data-helpers";

const EXTERNAL_DATA_URL = "https://sound-wave.dev";

export async function GET() {
  const models = await getAllModels();
  const allModels = models.payload as iModel[];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${EXTERNAL_DATA_URL}/acoustic/materials</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>        
    </url>    
    <url>
      <loc>${EXTERNAL_DATA_URL}/resume</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>        
    </url>
      ${allModels
        .map((model) => {
          return `
            <url>
              <loc>${EXTERNAL_DATA_URL}/acoustic/models/${model._id}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>              
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
