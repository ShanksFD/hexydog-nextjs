import { NextResponse } from "next/server";
import { getBlogPosts } from "@/services/blog";

export async function GET() {
  try {
    const blogs = await getBlogPosts(1000);
    console.log("Fetched blogs:", blogs);
    const validBlogs = blogs.filter((blog) => blog.slug && blog.updatedAt);
    const currentDate = new Date().toISOString().split("T")[0];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Root homepage -->
  <url>
    <loc>https://hexydog.com</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Main blog page -->
  <url>
    <loc>https://hexydog.com/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Individual blog posts -->
  ${validBlogs
    .map((blog) => `
  <url>
    <loc>https://hexydog.com/blog/${blog.slug || blog.id}</loc>
    <lastmod>${
      blog.updatedAt ? blog.updatedAt.toISOString().split("T")[0] : currentDate
    }</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
