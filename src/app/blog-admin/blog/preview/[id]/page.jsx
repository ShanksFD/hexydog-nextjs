import { getDictionary } from "@/app/[lang]/dictionaries";
import BlogPreview from "@/pages/Blog/admin/BlogPreview";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.HELMET.HOME_PAGE.TITLE,
    description: dict.HELMET.HOME_PAGE.DESCRIPTION,
  };
}

const BlogPreviewPage = async ({ params }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <BlogPreview dict={dict} />;
};

export default BlogPreviewPage;
