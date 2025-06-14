import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />

      <main className="flex flex-col space-y-24">
        <section id="hero" className="min-h-screen flex items-center justify-center">
          <Hero />
        </section>

        <section id="features" className="min-h-[80vh] px-4 md:px-8 lg:px-16">
          <Features />
        </section>

        <section id="how-it-works" className="min-h-[80vh] px-4 md:px-8 lg:px-16">
          <HowItWorks />
        </section>
      </main>

      <footer className="mt-24">
        <Footer />
      </footer>
    </div>
  );
}
