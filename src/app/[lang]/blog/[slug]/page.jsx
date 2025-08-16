import { notFound } from "next/navigation";
import { getBlogPost, getRelatedPosts } from "@/services/blog";
import BlogPost from "@/components/Blog/BlogPost";

export async function generateMetadata({ params }) {
  const blog = await getBlogPost(params.slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const seoTitle = blog.seo?.title || blog.title;
  const seoDescription = blog.seo?.description || blog.excerpt || "";
  const canonicalUrl = `https://hexydog-nextjs.netlify.app/blog/${
    blog.slug || blog.id
  }`;

  return {
    title: `${seoTitle} | HEXYDOG`,
    description: seoDescription,
    keywords: blog.seo?.keywords || "",
    openGraph: {
      type: "article",
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      images: blog.featuredImage ? [blog.featuredImage] : [],
      publishedTime: new Date(blog.createdAt).toISOString(),
      modifiedTime: new Date(blog.updatedAt).toISOString(),
      tags: blog.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const blog = await getBlogPost(params.slug);

  if (!blog || !blog.published) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(blog);

  const translations = {
    back: "Back",
    blogNotFound: "Blog post not found",
    backToBlogs: "Back to Blogs",
    home: "Home",
    blog: "Blog",
    share: "Share",
    shareThisArticle: "Share this article",
    shareOnFacebook: "Share on Facebook",
    shareOnTwitter: "Share on Twitter",
    relatedPosts: "Related Posts",
  };

  return (
    <BlogPost
      blog={blog}
      relatedPosts={relatedPosts}
      translations={translations}
    />
  );
}
