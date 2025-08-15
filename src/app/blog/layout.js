import MainFooter from "@/components/Footer/MainFooter";

const { default: MainHeader } = require("@/components/Header/MainHeader");

export default function BlogLayout({ children }) {
  return (
    <div>
      <MainHeader />
      {children}
      <MainFooter />
    </div>
  );
}
