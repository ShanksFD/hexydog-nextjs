import BlogDashboard from "@/components/Blog/admin/BlogDashboard";
import { getDictionary } from "../dictionaries";
import { getLocale } from "@/lib/locale";

export async function generateMetadata() {
  const lang = await getLocale();
  const dict = await getDictionary(lang);

  return {
    title: dict.HELMET.HOME_PAGE.TITLE,
    description: dict.HELMET.HOME_PAGE.DESCRIPTION,
  };
}

const BlogPage = async () => {
  const lang = await getLocale();
  const dict = await getDictionary(lang);
  return <BlogDashboard dict={dict} lang={lang} />;
};

export default BlogPage;
