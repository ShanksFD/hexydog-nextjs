import { getDictionary } from "@/app/dictionaries";
import { getLocale } from "@/lib/locale";
import BlogEditor from "@/components/Blog/admin/BlogEditor";

export async function generateMetadata() {
  const lang = await getLocale();
  const dict = await getDictionary(lang);

  return {
    title: dict.HELMET.HOME_PAGE.TITLE,
    description: dict.HELMET.HOME_PAGE.DESCRIPTION,
  };
}

const BlogEditorPage = async () => {
  const lang = await getLocale();
  const dict = await getDictionary(lang);
  return <BlogEditor dict={dict} lang={lang} />;
};

export default BlogEditorPage;

