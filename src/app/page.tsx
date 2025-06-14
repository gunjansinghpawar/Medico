import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";

export default function Home() {
  return (
    <>
      <div className="bg-background text-foreground transition-colors duration-300">
        <Hero />
        <Features />
        <HowItWorks />
      </div>
    </>
  );
}
