import Providers from "@/components/Providers";
import Script from "next/script";
import "./globals.css";
import { getDictionary } from "./[lang]/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params;
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
      url: `https://hexydog-nextjs.netlify.app/${lang}`,
      siteName: "HEXYDOG",
      title:
        dict.HELMET.HOME_PAGE.TITLE ||
        "Hexydog – Crypto Presale for Pet Care and Blockchain Utility",
      description:
        dict.HELMET.HOME_PAGE.DESCRIPTION ||
        "Hexydog (HEXY) provides blockchain solutions to transform the pet care sector. Join the best crypto presale of 2025 and drive innovation in animal welfare.",
      images: [
        {
          url: "https://hexydog-nextjs.netlify.app/social-media.webp",
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
      images: ["https://hexydog-nextjs.netlify.app/social-media.webp"],
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
      canonical: `https://hexydog-nextjs.netlify.app/${lang}`,
      languages: {
        en: "https://hexydog-nextjs.netlify.app/en",
        tr: "https://hexydog-nextjs.netlify.app/tr",
        ru: "https://hexydog-nextjs.netlify.app/ru",
        es: "https://hexydog-nextjs.netlify.app/es",
        fr: "https://hexydog-nextjs.netlify.app/fr",
        de: "https://hexydog-nextjs.netlify.app/de",
        it: "https://hexydog-nextjs.netlify.app/it",
        ar: "https://hexydog-nextjs.netlify.app/ar",
      },
    },

    // Additional meta
    other: {
      "apple-mobile-web-app-title": "HEXYDOG",
    },
  };
}

// Separate viewport export (required by Next.js 15)
export async function generateViewport({ params }) {
  return {
    themeColor: "#51A9FD",
    colorScheme: "dark",
    width: "device-width",
    initialScale: 1.0,
  };
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;

  return (
    <html lang={lang} data-arp="">
      <head>
        {/* Preconnect for performance */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://hexydog-nextjs.netlify.app" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "@id": "https://hexydog-nextjs.netlify.app/#hexy-token",
              name: "HEXY Token",
              description:
                "HEXY is the utility token powering the Hexydog ecosystem, enabling crypto payments at pet stores and supporting animal welfare.",
              image: "/og-image.jpg",
              url: "https://hexydog-nextjs.netlify.app",
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

        <meta
          itemprop="name"
          content={
            dict.HELMET.HOME_PAGE.TITLE ||
            "Hexydog - Crypto Presale for Pet Care and Blockchain Utility"
          }
        />
        <meta
          itemprop="description"
          content={
            dict.HELMET.HOME_PAGE.DESCRIPTION ||
            "Hexydog (HEXY) propose des solutions blockchain pour transformer le secteur des soins aux animaux. Participez à la meilleure prévente crypto de 2025 et stimulez"
          }
        />
        <meta
          itemprop="image"
          content="https://hexydog-nextjs.netlify.app/social-media.webp"
        />

        <meta
          property="og:url"
          content={`https://hexydog-nextjs.netlify.app/${lang}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={
            dict.HELMET.HOME_PAGE.TITLE ||
            "Hexydog - Crypto Presale for Pet Care and Blockchain Utility"
          }
        />
        <meta
          property="og:description"
          content={
            dict.HELMET.HOME_PAGE.DESCRIPTION ||
            "Hexydog (HEXY) propose des solutions blockchain pour transformer le secteur des soins aux animaux. Participez à la meilleure prévente crypto de 2025 et stimulez"
          }
        />
        <meta
          property="og:image"
          content="https://hexydog-nextjs.netlify.app/social-media.webp"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            dict.HELMET.HOME_PAGE.TITLE ||
            "Hexydog - Crypto Presale for Pet Care and Blockchain Utility"
          }
        />
        <meta
          name="twitter:description"
          content={
            dict.HELMET.HOME_PAGE.DESCRIPTION ||
            "Hexydog (HEXY) propose des solutions blockchain pour transformer le secteur des soins aux animaux. Participez à la meilleure prévente crypto de 2025 et stimulez"
          }
        />
        <meta
          name="twitter:image"
          content="https://hexydog-nextjs.netlify.app/social-media.webp"
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
