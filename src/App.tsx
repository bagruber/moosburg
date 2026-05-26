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
import { Kontakt } from "@/pages/flagship/Kontakt";
import { VerEntsorgung } from "@/pages/flagship/VerEntsorgung";
import { Bauen } from "@/pages/flagship/Bauen";
import { Notfall } from "@/pages/flagship/Notfall";
import { Satzungen } from "@/pages/flagship/Satzungen";
import { Einkaufen } from "@/pages/flagship/Einkaufen";
import { Essen } from "@/pages/flagship/Essen";
import { Gesundheit } from "@/pages/flagship/Gesundheit";
import { Freizeit } from "@/pages/flagship/Freizeit";
import { Mobilitaet } from "@/pages/flagship/Mobilitaet";
import { Umwelt } from "@/pages/flagship/Umwelt";
import { Wohnen } from "@/pages/flagship/Wohnen";
import { Firmen } from "@/pages/flagship/Firmen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Flagship service pages */}
      <Route path="/rathaus/termin-buchen" element={<TerminBuchen />} />
      <Route path="/rathaus/online-dienste" element={<OnlineDienste />} />
      <Route path="/rathaus/stellenangebote" element={<Stellenangebote />} />
      <Route path="/rathaus/kontakt" element={<Kontakt />} />
      <Route path="/rathaus/ver-entsorgung" element={<VerEntsorgung />} />
      <Route path="/rathaus/bauantrag" element={<Bauen />} />
      <Route path="/rathaus/notfall" element={<Notfall />} />
      <Route path="/rathaus/satzungen" element={<Satzungen />} />
      <Route path="/mein-moosburg/einkaufen" element={<Einkaufen />} />
      <Route path="/mein-moosburg/essen" element={<Essen />} />
      <Route path="/mein-moosburg/gesundheit" element={<Gesundheit />} />
      <Route path="/mein-moosburg/freizeit" element={<Freizeit />} />
      <Route path="/mein-moosburg/mobilitaet" element={<Mobilitaet />} />
      <Route path="/mein-moosburg/umwelt" element={<Umwelt />} />
      <Route path="/mein-moosburg/wohnen" element={<Wohnen />} />
      <Route path="/mein-moosburg/firmen" element={<Firmen />} />
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
