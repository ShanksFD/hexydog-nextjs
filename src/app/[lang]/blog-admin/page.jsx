import BlogDashboard from "@/components/Blog/admin/BlogDashboard";
import { getDictionary } from "../[lang]/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.HELMET.HOME_PAGE.TITLE,
    description: dict.HELMET.HOME_PAGE.DESCRIPTION,
  };
}

const BlogPage = async ({ params }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <BlogDashboard dict={dict} />;
};

export default BlogPage;
