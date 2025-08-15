import { getBlogPosts } from "@/services/blog";
import BlogList from "@/pages/Blog/BlogList";

export const metadata = {
  title: "HEXYDOG Blog - Latest News and Updates",
  description:
    "Stay updated with the latest news, insights, and developments from the HEXYDOG ecosystem.",
};

export default async function BlogPage() {
  const blogs = await getBlogPosts(6);
  console.log("blogs", blogs);

  const translations = {
    home: "Home",
    blog: "Blog",
    blogTitle: "Latest News and Updates",
    blogDescription:
      "Stay updated with the latest news, insights, and developments from the HEXYDOG ecosystem.",
    noPosts: "No blog posts available",
    loadMore: "Load More",
  };

  return <BlogList initialBlogs={blogs} translations={translations} />;
}
