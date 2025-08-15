import Providers from "@/components/Providers";
import "./globals.css";

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  return (
    <html lang={lang} data-arp="">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
