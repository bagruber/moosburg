import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TopTiles } from "@/components/TopTiles";
import { Lebenslagen } from "@/components/Lebenslagen";
import { Events } from "@/components/Events";
import { Identity } from "@/components/Identity";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        <Hero />
        <TopTiles />
        <Lebenslagen />
        <Events />
        <Identity />
      </main>
      <Footer />
    </div>
  );
}
