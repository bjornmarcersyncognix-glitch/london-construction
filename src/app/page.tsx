import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { CapabilityIndex } from "@/components/home/CapabilityIndex";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { Approach } from "@/components/home/Approach";
import { Pathways } from "@/components/home/Pathways";
import { LocalPresence } from "@/components/home/LocalPresence";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <CapabilityIndex />
      <FeaturedServices />
      <Approach />
      <Pathways />
      <LocalPresence />
      <ClosingCTA />
    </>
  );
}
