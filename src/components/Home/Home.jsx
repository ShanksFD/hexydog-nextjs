import { Box } from "@mui/material";
import Hero from "@/sections/Homepage/Hero";
import About from "@/sections/Homepage/About";
import Roadmap from "@/sections/Homepage/Roadmap";
import Features from "@/sections/Homepage/Features";
import HowToBuy from "@/sections/Homepage/HowToBuy";
import Faq from "@/sections/Homepage/Faq";
import Mission from "@/sections/Homepage/Mission";
import Tokenomics from "@/sections/Homepage/Tokenomics";
import PartnershipsMarquee from "@/sections/Homepage/PartnershipsMarquee";

export default function Home({ dict }) {
  return (
    <Box>
      <Hero dict={dict} />
      <PartnershipsMarquee />
      <About dict={dict} />
      <Mission dict={dict} />
      <HowToBuy dict={dict} />
      <Features dict={dict} />
      <Tokenomics dict={dict} />
      <Roadmap dict={dict} />
      <Faq dict={dict} />
    </Box>
  );
}
