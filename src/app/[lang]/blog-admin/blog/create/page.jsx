import BlogEditor from "@/components/Blog/admin/BlogEditor";

const BlogCreatePage = async ({ params }) => {
  const { lang } = await params;
  return <BlogEditor lang={lang} />;
};

export default BlogCreatePage;
