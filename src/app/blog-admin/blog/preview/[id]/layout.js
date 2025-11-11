import { getDictionary } from "@/app/dictionaries";
import { getLocale } from "@/lib/locale";
import BlogPreview from "@/components/Blog/admin/BlogPreview";

export async function generateMetadata() {
  const lang = await getLocale();
  const dict = await getDictionary(lang);

  return {
    title: dict.HELMET.HOME_PAGE.TITLE,
    description: dict.HELMET.HOME_PAGE.DESCRIPTION,
  };
}

export default async function RootLayout() {
  const lang = await getLocale();
  const dict = await getDictionary(lang);
  return <BlogPreview dict={dict} lang={lang} />;
}

