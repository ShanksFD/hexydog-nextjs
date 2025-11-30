import { getBlogPosts } from "@/services/blog";

// Force dynamic rendering and revalidate every hour
export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function sitemap() {
  try {
    const blogs = await getBlogPosts(1000);
    console.log("Fetched blogs for sitemap:", blogs.length);
    
    const validBlogs = blogs.filter((blog) => blog.slug && blog.updatedAt);

    const blogUrls = validBlogs.map((blog) => ({
      url: `https://www.hexydog.com/blog/${blog.slug || blog.id}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [
      {
        url: 'https://www.hexydog.com',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: 'https://www.hexydog.com/blog',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      ...blogUrls,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return minimal sitemap on error
    return [
      {
        url: 'https://www.hexydog.com',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
    ];
  }
}
