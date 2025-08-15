import { getDictionary } from "@/app/[lang]/dictionaries";
import BlogPreview from "@/pages/Blog/admin/BlogPreview";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

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
  return (
    <Provider store={store}>
      <BlogPreview dict={dict} />
    </Provider>
  );
};

export default BlogPreviewPage;
