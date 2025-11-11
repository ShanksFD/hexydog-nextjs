import { getBlogPosts } from "@/services/blog";
import BlogList from "@/components/Blog/BlogList";
import { getDictionary } from "../dictionaries";
import { getLocale } from "@/lib/locale";

export default async function BlogPage() {
  const lang = await getLocale();
  const dict = await getDictionary(lang);
  const blogs = await getBlogPosts(6);

  return <BlogList initialBlogs={blogs} dict={dict} lang={lang} />;
}

