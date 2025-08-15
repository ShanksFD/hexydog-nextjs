"use client";

import { Box } from "@mui/material";
import Head from "next/head";
import Hero from "@/sections/Homepage/Hero";
import About from "@/sections/Homepage/About";
import Roadmap from "@/sections/Homepage/Roadmap";
import Features from "@/sections/Homepage/Features";
import HowToBuy from "@/sections/Homepage/HowToBuy";
import Faq from "@/sections/Homepage/Faq";
import Mission from "@/sections/Homepage/Mission";
import Tokenomics from "@/sections/Homepage/Tokenomics";
import PartnershipsMarquee from "@/sections/Homepage/PartnershipsMarquee";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Hexydog – Crypto Presale for Pet Care and Blockchain Utility
        </title>
        <meta
          name="description"
          content="Join the HEXY token presale and revolutionize pet care with blockchain technology."
        />
        <meta
          property="og:title"
          content="Hexydog – Crypto Presale for Pet Care and Blockchain Utility"
        />
        <meta
          property="og:description"
          content="Join the HEXY token presale and revolutionize pet care with blockchain technology."
        />
        <meta
          name="twitter:title"
          content="Hexydog – Crypto Presale for Pet Care and Blockchain Utility"
        />
        <meta
          name="twitter:description"
          content="Join the HEXY token presale and revolutionize pet care with blockchain technology."
        />
      </Head>
      <Box>
        <Hero />
        <PartnershipsMarquee />
        <About />
        <Mission />
        <HowToBuy />
        <Features />
        <Tokenomics />
        <Roadmap />
        <Faq />
      </Box>
    </>
  );
}
