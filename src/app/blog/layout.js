import MainFooter from "@/components/Footer/MainFooter";
import MainHeader from "@/components/Header/MainHeader";
import { getDictionary } from "../dictionaries";
import { getLocale } from "@/lib/locale";

export default async function BlogLayout({ children }) {
  const lang = await getLocale();
  const dict = await getDictionary(lang);
  return (
    <div>
      <MainHeader dict={dict} lang={lang} />
      {children}
      <MainFooter dict={dict} />
    </div>
  );
}

