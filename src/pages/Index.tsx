import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TramitesGrid from "@/components/TramitesGrid";
import HowItWorks from "@/components/HowItWorks";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection search={search} onSearchChange={setSearch} />
        <TramitesGrid search={search} />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
