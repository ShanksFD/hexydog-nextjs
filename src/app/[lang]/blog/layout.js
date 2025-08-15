import MainFooter from "@/components/Footer/MainFooter";
import MainHeader from "@/components/Header/MainHeader";
import { getDictionary } from "../dictionaries";

export default async function BlogLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div>
      <MainHeader dict={dict} lang={lang} />
      {children}
      <MainFooter dict={dict} />
    </div>
  );
}
