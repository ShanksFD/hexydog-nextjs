import BlogEditor from "@/components/Blog/admin/BlogEditor";
import { getLocale } from "@/lib/locale";

const BlogCreatePage = async () => {
  const lang = await getLocale();
  return <BlogEditor lang={lang} />;
};

export default BlogCreatePage;

