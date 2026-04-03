import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TramitesGrid from "@/components/TramitesGrid";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">
      <HeroSection />
      <TramitesGrid />
      <HowItWorks />
    </main>
    <Footer />
  </div>
);

export default Index;
