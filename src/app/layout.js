import Providers from "@/components/Providers";
import "./globals.css";

export async function generateMetadata() {
  return {
    title: {
      template: "%s | HEXYDOG",
      default: "HEXYDOG – Crypto Presale for Pet Care and Blockchain Utility",
    },
    description:
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

    // Theme and display
    themeColor: "#51A9FD",
    colorScheme: "dark",
    viewport: "width=device-width, initial-scale=1.0",

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
      title: "Hexydog – Crypto Presale for Pet Care and Blockchain Utility",
      description:
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
      title: "Hexydog – Crypto Presale for Pet Care and Blockchain Utility",
      description:
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

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-H72HTNV3ZZ"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H72HTNV3ZZ');
            `,
          }}
        />

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
              image: "/social-media.webp",
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
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
