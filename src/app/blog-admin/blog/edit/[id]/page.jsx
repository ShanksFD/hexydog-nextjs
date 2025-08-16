import { getDictionary } from "@/app/[lang]/dictionaries";
import BlogEditor from "@/components/Blog/admin/BlogEditor";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.HELMET.HOME_PAGE.TITLE,
    description: dict.HELMET.HOME_PAGE.DESCRIPTION,
  };
}

const BlogEditorPage = async ({ params }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <BlogEditor dict={dict} />;
};

export default BlogEditorPage;
