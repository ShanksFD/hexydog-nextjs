import { getBlogPosts } from "@/services/blog";
import BlogList from "@/components/Blog/BlogList";
import { getDictionary } from "../dictionaries";

export default async function BlogPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const blogs = await getBlogPosts(6);

  return <BlogList initialBlogs={blogs} dict={dict} lang={lang} />;
}
