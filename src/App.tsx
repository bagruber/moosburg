import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { HubPage } from "@/pages/HubPage";
import { StubPage } from "@/pages/StubPage";
import { KontoPage } from "@/pages/Konto";
import { TerminBuchen } from "@/pages/flagship/TerminBuchen";
import { OnlineDienste } from "@/pages/flagship/OnlineDienste";
import { Veranstaltungen } from "@/pages/flagship/Veranstaltungen";
import { MaengelMelden } from "@/pages/flagship/MaengelMelden";
import { Stadtrat } from "@/pages/flagship/Stadtrat";
import { Stellenangebote } from "@/pages/flagship/Stellenangebote";
import { NeuInMoosburg } from "@/pages/flagship/NeuInMoosburg";
import { FamilieBildung } from "@/pages/flagship/FamilieBildung";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Flagship service pages */}
      <Route path="/rathaus/termin-buchen" element={<TerminBuchen />} />
      <Route path="/rathaus/online-dienste" element={<OnlineDienste />} />
      <Route path="/rathaus/stellenangebote" element={<Stellenangebote />} />
      <Route path="/mein-moosburg/veranstaltungen" element={<Veranstaltungen />} />
      <Route path="/mein-moosburg/familie" element={<FamilieBildung />} />
      <Route path="/mein-moosburg/familie/schulen" element={<FamilieBildung />} />
      <Route path="/mitgestalten/maengel-melden" element={<MaengelMelden />} />
      <Route path="/mitgestalten/stadtrat" element={<Stadtrat />} />

      {/* Lebenslagen — flagship per slug, others fall through to stub */}
      <Route path="/lebenslage/neu-in-moosburg" element={<NeuInMoosburg />} />
      <Route path="/lebenslage/*" element={<StubPage />} />

      {/* Account */}
      <Route path="/konto" element={<KontoPage />} />

      {/* Hub landing pages */}
      <Route path="/:hub" element={<HubPage />} />

      {/* Sub-pages (Tier 2, data-driven stubs) */}
      <Route path="/:hub/*" element={<StubPage />} />

      {/* Fallback to home for unknown routes */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
