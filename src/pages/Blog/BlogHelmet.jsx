"use client";

import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export const BlogHelmet = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  // Base URL for canonical links and OG tags
  const baseUrl = "https://hexydog.com";

  return (
    <Helmet>
      <html lang={currentLanguage.slice(0, 2)} />
      <title>{t("HELMET.BLOG.TITLE")}</title>
      <meta name="description" content={t("HELMET.BLOG.DESCRIPTION")} />
      <link rel="canonical" href={`${baseUrl}/blog`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t("HELMET.BLOG.TITLE")} />
      <meta property="og:description" content={t("HELMET.BLOG.DESCRIPTION")} />
      <meta property="og:url" content={`${baseUrl}/blog`} />
      <meta property="og:site_name" content="HEXYDOG" />
      <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t("HELMET.BLOG.TITLE")} />
      <meta name="twitter:description" content={t("HELMET.BLOG.DESCRIPTION")} />
      <meta name="twitter:image" content={`${baseUrl}/og-image.jpg`} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: t("HELMET.BLOG.TITLE"),
          description: t("HELMET.BLOG.DESCRIPTION"),
          url: `${baseUrl}/blog`,
          publisher: {
            "@type": "Organization",
            name: "HEXYDOG",
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/logo.png`,
            },
          },
        })}
      </script>
    </Helmet>
  );
};

export default BlogHelmet;
