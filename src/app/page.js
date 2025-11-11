import Home from "@/components/Home/Home";
import MainHeader from "@/components/Header/MainHeader";
import MainFooter from "@/components/Footer/MainFooter";
import { getDictionary } from "./dictionaries";
import { getLocale } from "@/lib/locale";

export async function generateMetadata() {
  const lang = await getLocale();
  const dict = await getDictionary(lang);

  return {
    title: dict.HELMET.HOME_PAGE.TITLE,
    description: dict.HELMET.HOME_PAGE.DESCRIPTION,
  };
}

export default async function HomePage() {
  const lang = await getLocale();
  const dict = await getDictionary(lang);

  return (
    <div>
      <MainHeader dict={dict} lang={lang} />
      <Home dict={dict} />
      <MainFooter dict={dict} />
    </div>
  );
}

