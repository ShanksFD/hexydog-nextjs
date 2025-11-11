import Script from "next/script";
import "./globals.css";
import { getDictionary } from "./dictionaries";
import { getLocale } from "@/lib/locale";
import Providers from "@/components/Providers";

export async function generateMetadata() {
  const lang = await getLocale();
  const dict = await getDictionary(lang);

  return {
    title: {
      template: "%s | HEXYDOG",
      default:
        dict.HELMET.HOME_PAGE.TITLE ||
        "Hexydog – Crypto Presale for Pet Care and Blockchain Utility",
    },
    description:
      dict.HELMET.HOME_PAGE.DESCRIPTION ||
      "Hexydog (HEXY) provides blockchain solutions to transform the pet care sector. Join the best crypto presale of 2025 and drive innovation in animal welfare.",
    keywords: [
      "hexydog",
      "crypto",
      "presale",
      "pet care",
      "blockchain",
      "utility token",
      "animal welfare",
      "HEXY",
    ],
    authors: [{ name: "HEXYDOG" }],
    creator: "HEXYDOG",
    publisher: "HEXYDOG",

    // App configuration
    applicationName: "HEXYDOG",
    appleWebApp: {
      title: "HEXYDOG",
      capable: true,
      statusBarStyle: "default",
    },

    // Referrer policy
    referrer: "no-referrer",

    // Icons and manifest
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: [
        { url: "/apple-touch-icon.png" },
        { url: "/apple-touch-icon-precomposed.png" },
      ],
    },

    manifest: "/manifest.json",

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
      type: "website",
      locale: lang,
      url: "https://hexydog.com",
      siteName: "HEXYDOG",
      title:
        dict.HELMET.HOME_PAGE.TITLE ||
        "Hexydog – Crypto Presale for Pet Care and Blockchain Utility",
      description:
        dict.HELMET.HOME_PAGE.DESCRIPTION ||
        "Hexydog (HEXY) provides blockchain solutions to transform the pet care sector. Join the best crypto presale of 2025 and drive innovation in animal welfare.",
      images: [
        {
          url: "https://hexydog.com/social-media.webp",
          width: 1200,
          height: 630,
          alt: "HEXYDOG - Crypto Presale for Pet Care",
        },
      ],
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      site: "@hexydog",
      creator: "@hexydog",
      title:
        dict.HELMET.HOME_PAGE.TITLE ||
        "Hexydog – Crypto Presale for Pet Care and Blockchain Utility",
      description:
        dict.HELMET.HOME_PAGE.DESCRIPTION ||
        "Hexydog (HEXY) provides blockchain solutions to transform the pet care sector. Join the best crypto presale of 2025 and drive innovation in animal welfare.",
      images: ["https://hexydog.com/social-media.webp"],
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Language alternates
    alternates: {
      canonical: "https://hexydog.com",
      languages: {
        en: "https://hexydog.com",
        tr: "https://hexydog.com",
        ru: "https://hexydog.com",
        es: "https://hexydog.com",
        fr: "https://hexydog.com",
        de: "https://hexydog.com",
        it: "https://hexydog.com",
        ar: "https://hexydog.com",
      },
    },

    // Additional meta
    other: {
      "apple-mobile-web-app-title": "HEXYDOG",
    },
  };
}

export async function generateViewport() {
  return {
    themeColor: "#51A9FD",
    colorScheme: "dark",
    width: "device-width",
    initialScale: 1.0,
  };
}

export default async function RootLayout({ children }) {
  const lang = await getLocale();

  return (
    <html lang={lang} data-arp="">
      <head>
        {/* Preconnect for performance */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://hexydog.com" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "@id": "https://hexydog.com",
              name: "Hexydog – Crypto Presale for Pet Care and Blockchain Utility",
              description:
                "Hexydog (HEXY) provides blockchain solutions to transform the pet care sector.",
              image: "https://hexydog.com/og-image.jpg",
              url: "https://hexydog.com",
              brand: {
                "@type": "Brand",
                name: "Hexydog",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "120",
              },
            }),
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>

        {/* Google Analytics with next/script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H72HTNV3ZZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H72HTNV3ZZ');
          `}
        </Script>
      </body>
    </html>
  );
}

