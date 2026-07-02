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
import { Beteiligung } from "@/pages/flagship/Beteiligung";
import { Stadtentwicklung } from "@/pages/flagship/Stadtentwicklung";
import { Stadtfinanzen } from "@/pages/flagship/Stadtfinanzen";
import { Wahlen } from "@/pages/flagship/Wahlen";
import { Stellenangebote } from "@/pages/flagship/Stellenangebote";
import { NeuInMoosburg } from "@/pages/flagship/NeuInMoosburg";
import { FamilieKind } from "@/pages/lebenslage/FamilieKind";
import { Heiraten } from "@/pages/lebenslage/Heiraten";
import { Umziehen } from "@/pages/lebenslage/Umziehen";
import { Trauerfall } from "@/pages/lebenslage/Trauerfall";
import { BauenWohnen } from "@/pages/lebenslage/BauenWohnen";
import { AutoVerkehr } from "@/pages/lebenslage/AutoVerkehr";
import { PflegeAlter } from "@/pages/lebenslage/PflegeAlter";
import { ArbeitAusbildung } from "@/pages/lebenslage/ArbeitAusbildung";
import { Vereinsleben } from "@/pages/lebenslage/Vereinsleben";
import { Ehrenamt } from "@/pages/lebenslage/Ehrenamt";
import { UnternehmenGewerbe } from "@/pages/lebenslage/UnternehmenGewerbe";
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
import { FairTrade } from "@/pages/thema/FairTrade";
import { Strassennamen } from "@/pages/thema/Strassennamen";
import { Partnerstaedte } from "@/pages/thema/Partnerstaedte";
import { Entdecken } from "@/pages/flagship/Entdecken";
import { Geschichte } from "@/pages/flagship/Geschichte";
import { Fuehrungen } from "@/pages/flagship/Fuehrungen";
import { EssenUebernachten } from "@/pages/flagship/EssenUebernachten";
import { Highlights } from "@/pages/flagship/Highlights";
import { Anreise } from "@/pages/flagship/Anreise";
import { DieseWoche } from "@/pages/flagship/DieseWoche";
import { StadtKarte } from "@/pages/flagship/StadtKarte";

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
      <Route path="/thema/fair-trade" element={<FairTrade />} />
      <Route path="/thema/strassennamen" element={<Strassennamen />} />
      <Route path="/thema/partnerstaedte" element={<Partnerstaedte />} />
      <Route path="/mein-moosburg/diese-woche" element={<DieseWoche />} />
      <Route path="/mein-moosburg/stadtplan" element={<StadtKarte />} />
      <Route path="/mein-moosburg/veranstaltungen" element={<Veranstaltungen />} />
      <Route path="/mein-moosburg/familie" element={<FamilieBildung />} />
      <Route path="/mein-moosburg/familie/schulen" element={<FamilieBildung />} />
      <Route path="/zu-besuch/entdecken" element={<Entdecken />} />
      <Route path="/zu-besuch/geschichte" element={<Geschichte />} />
      <Route path="/zu-besuch/fuehrungen" element={<Fuehrungen />} />
      <Route path="/zu-besuch/essen-uebernachten" element={<EssenUebernachten />} />
      <Route path="/zu-besuch/highlights" element={<Highlights />} />
      <Route path="/zu-besuch/anreise" element={<Anreise />} />
      <Route path="/mitgestalten/maengel-melden" element={<MaengelMelden />} />
      <Route path="/mitgestalten/stadtrat" element={<Stadtrat />} />
      <Route path="/mitgestalten/beteiligung" element={<Beteiligung />} />
      <Route path="/mitgestalten/stadtentwicklung" element={<Stadtentwicklung />} />
      <Route path="/mitgestalten/haushalt" element={<Stadtfinanzen />} />
      <Route path="/mitgestalten/wahlen" element={<Wahlen />} />

      {/* Lebenslagen — flagship per slug, others fall through to stub */}
      <Route path="/lebenslage/neu-in-moosburg" element={<NeuInMoosburg />} />
      <Route path="/lebenslage/familie-kind" element={<FamilieKind />} />
      <Route path="/lebenslage/heiraten" element={<Heiraten />} />
      <Route path="/lebenslage/umziehen" element={<Umziehen />} />
      <Route path="/lebenslage/trauerfall" element={<Trauerfall />} />
      <Route path="/lebenslage/bauen-wohnen" element={<BauenWohnen />} />
      <Route path="/lebenslage/auto-verkehr" element={<AutoVerkehr />} />
      <Route path="/lebenslage/pflege-alter" element={<PflegeAlter />} />
      <Route path="/lebenslage/arbeit-ausbildung" element={<ArbeitAusbildung />} />
      <Route path="/lebenslage/vereinsleben" element={<Vereinsleben />} />
      <Route path="/lebenslage/ehrenamt" element={<Ehrenamt />} />
      <Route path="/lebenslage/unternehmen" element={<UnternehmenGewerbe />} />
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
