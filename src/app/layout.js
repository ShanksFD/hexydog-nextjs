import Providers from "@/components/Providers";
import "./globals.css";

export const metadata = {
  title: "Hexydog – Crypto Presale for Pet Care and Blockchain Utility",
  description:
    "Join the HEXY token presale and revolutionize pet care with blockchain technology.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-arp="">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
