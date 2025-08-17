import { getDictionary } from "@/app/[lang]/dictionaries";
import Login from "@/components/Login/Login";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.HELMET.HOME_PAGE.TITLE,
    description: dict.HELMET.HOME_PAGE.DESCRIPTION,
  };
}

export default async function RootLayout({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <Login dict={dict} />;
}
