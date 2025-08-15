import Marquee from "react-fast-marquee";
import { darken, Stack } from "@mui/material";
import Image from "next/image";
import { theme } from "@/lib/theme";

const PartnershipsMarquee = () => {
  const logos = [
    {
      src: "/images/coincodex-logo.webp",
      alt: "CoinCodex",
      width: 140,
      height: 40,
    },
    {
      src: "/images/finbold-logo.webp",
      alt: "Finbold",
      width: 120,
      height: 25,
    },
    { src: "/images/utoday-logo.webp", alt: "Utoday", width: 120, height: 25 },
    { src: "/images/bnc-logo.webp", alt: "BNC", width: 120, height: 40 },
    {
      src: "/images/coinpedia-logo.webp",
      alt: "Coinpedia",
      width: 120,
      height: 35,
    },
    {
      src: "/images/techopedia-logo.webp",
      alt: "Techopedia",
      width: 135,
      height: 35,
    },
    {
      src: "/images/crypto-news-logo.webp",
      alt: "Crypto News",
      width: 120,
      height: 40,
    },
    {
      src: "/images/bitcoinist-logo.webp",
      alt: "Bitcoinist",
      width: 170,
      height: 48,
    },
    {
      src: "/images/bitcoin-magazine-logo.webp",
      alt: "Bitcoin Magazine",
      width: 150,
      height: 32,
    },
  ];

  return (
    <Stack
      sx={{
        backgroundColor: "primary.secondary",
        borderBottom: "6px solid",
        borderColor: darken(theme.palette.primary.secondary, 0.3),
        py: 1,
      }}
      gap={1}
    >
      <Marquee speed={90}>
        {logos.map((logo, index) => (
          <div key={index} style={{ margin: "8px 56px" }}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              style={{
                opacity: 0.9,
                objectFit: "contain",
              }}
              title={`${logo.alt} Logo`}
            />
          </div>
        ))}
      </Marquee>
    </Stack>
  );
};

export default PartnershipsMarquee;
