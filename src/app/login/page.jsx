import Login from "@/pages/Login/Login";
import { getDictionary } from "../[lang]/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.LOGIN.TITLE,
    description: dict.LOGIN.DESCRIPTION,
  };
}

export default async function LoginPage({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <Login dict={dict} />;
}
