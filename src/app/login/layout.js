import Login from "@/components/Login/Login";
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

export default async function RootLayout() {
  const lang = await getLocale();
  const dict = await getDictionary(lang);
  return <Login dict={dict} />;
}

