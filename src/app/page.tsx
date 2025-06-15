import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import KeyFeature from "@/components/KeyFeature";
import OurMission from "@/components/OurMission";
import TechnologySection from "@/components/TechnologySection";
import Disclaimer from "@/components/Disclaimer";
import ContactSection from "@/components/ContactSection";
// import CustomCursor from "../components/CustomCursor";

export default function Home() {
  return (
    <>
      <div className="relative bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
        {/* <CustomCursor /> */}
        <Hero />
        <Features />
        <HowItWorks />
        <OurMission/>
        <KeyFeature/>
        <TechnologySection/>
        <Disclaimer/>
        <ContactSection/>
      </div>
    </>
  );
}
