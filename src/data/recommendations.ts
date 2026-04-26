import type { Profile } from "@/state/AppState";
import { districtFor } from "./moosburgStreets";

/**
 * Recommendation engine for "Könnte Sie interessieren". Each rule is keyed by
 * one or more profile facts and emits a card. Score lets us sort highest-fit
 * first; we cap output at ~6 to avoid overwhelming the dashboard.
 *
 * Categories (visual color):
 *   service     — blue/ink     (city service/form)
 *   foerderung  — gold         (subsidy / grant)
 *   info        — green        (news, opening hours, advice)
 *   community   — purple       (events, clubs, participation)
 */
export type RecCategory = "service" | "foerderung" | "info" | "community";

export type Recommendation = {
  id: string;
  category: RecCategory;
  title: string;
  desc: string;
  to: string;
  reason: string;     // why we surfaced this (shown as eyebrow)
  score: number;
};

export function recommendationsFor(profile: Profile): Recommendation[] {
  const out: Recommendation[] = [];
  const district = districtFor(profile.address);

  // ── Children-related ──────────────────────────────────────────────
  if (profile.hasChildren && profile.childAges.includes("0-3")) {
    out.push({
      id: "kita-platz",
      category: "service",
      title: "Kita-Platz finden",
      desc: "Über LITTLE BIRD freie Plätze in Moosburger Kitas und Krippen vergleichen.",
      to: "/mein-moosburg/familie",
      reason: "Sie haben Kinder unter 3",
      score: 95,
    });
    out.push({
      id: "elterngeld",
      category: "foerderung",
      title: "Elterngeld & Familienberatung",
      desc: "Beratung beim Familientreff Moosburg, Antragshilfe für Eltern- und Familiengeld.",
      to: "/mein-moosburg/familie",
      reason: "Sie haben kleine Kinder",
      score: 80,
    });
  }
  if (profile.hasChildren && profile.childAges.includes("4-6")) {
    out.push({
      id: "vorschule",
      category: "info",
      title: "Vorschule & Schuleinschreibung",
      desc: "Termine für die Schuleinschreibung an der Anton-Vitzthum-Grundschule.",
      to: "/mein-moosburg/familie/schulen",
      reason: "Ihre Kinder kommen bald in die Schule",
      score: 90,
    });
  }
  if (profile.hasChildren && profile.childAges.includes("7-10")) {
    out.push({
      id: "ogts",
      category: "service",
      title: "Offene Ganztagsschule (OGTS)",
      desc: "Anmeldung zur Mittagsbetreuung & Hausaufgabenhilfe an der Grundschule.",
      to: "/mein-moosburg/familie/schulen",
      reason: "Sie haben Grundschulkinder",
      score: 85,
    });
    out.push({
      id: "ferienprogramm",
      category: "community",
      title: "Sommerferien-Programm 2026",
      desc: "Anmeldung zum Ferienprogramm — über 40 Aktionen mit Vereinen und Stadt.",
      to: "/mein-moosburg/familie",
      reason: "Sie haben Kinder im Schulalter",
      score: 70,
    });
  }
  if (profile.hasChildren && profile.childAges.includes("11-14")) {
    out.push({
      id: "uebertritt",
      category: "info",
      title: "Übertritt nach der 4. Klasse",
      desc: "Beratung zu Realschule, Mittelschule, Gymnasium und Tag der offenen Tür.",
      to: "/mein-moosburg/familie/schulen",
      reason: "Übertrittsphase steht an",
      score: 80,
    });
  }
  if (profile.hasChildren && (profile.childAges.includes("11-14") || profile.childAges.includes("15-18"))) {
    out.push({
      id: "jugendtreff",
      category: "community",
      title: "Jugendtreff Moosburg",
      desc: "Offener Treff, Workshops, Beteiligungsformate für Jugendliche ab 12.",
      to: "/mein-moosburg/familie",
      reason: "Sie haben Jugendliche im Haus",
      score: 65,
    });
  }

  // ── Property owners ───────────────────────────────────────────────
  if (profile.ownsProperty) {
    out.push({
      id: "pv-foerderung",
      category: "foerderung",
      title: "Photovoltaik-Förderung",
      desc: "Bis zu 1.500 € Zuschuss für Balkonkraftwerke und Aufdach-PV in Moosburg.",
      to: "/mein-moosburg/umwelt",
      reason: "Sie sind Eigentümer:in",
      score: 90,
    });
    out.push({
      id: "energieberatung",
      category: "foerderung",
      title: "Kostenlose Energieberatung",
      desc: "Gefördert vom Landkreis Freising — bei der Stadtbibliothek mittwochs nachmittags.",
      to: "/mein-moosburg/umwelt",
      reason: "Sie sind Eigentümer:in",
      score: 75,
    });
    out.push({
      id: "grundsteuer",
      category: "service",
      title: "Grundsteuer & Hebesätze",
      desc: "Aktuelle Hebesätze 2026 und Kontakt für Anpassungen nach Grundsteuerreform.",
      to: "/rathaus/online-dienste",
      reason: "Sie sind Eigentümer:in",
      score: 60,
    });
  }

  // ── Senior / pension ──────────────────────────────────────────────
  if (profile.ageGroup === "65plus" || profile.receivesPension) {
    out.push({
      id: "senioren-treff",
      category: "community",
      title: "Senioren-Treff am Plan",
      desc: "Wöchentliche Treffen, Ausflüge, Kurse — auch Hilfe bei digitalen Anliegen.",
      to: "/mein-moosburg/familie",
      reason: "Senioren-Angebote in Moosburg",
      score: 80,
    });
    out.push({
      id: "pflegeberatung",
      category: "info",
      title: "Pflegestützpunkt Landkreis",
      desc: "Kostenlose Beratung zu Pflegegrad, ambulanten Diensten und Wohnen im Alter.",
      to: "/mein-moosburg/gesundheit",
      reason: "Pflege & Vorsorge",
      score: 70,
    });
    out.push({
      id: "wohngeld",
      category: "foerderung",
      title: "Wohngeld beantragen",
      desc: "Wohnzuschuss für Mieter:innen und Eigentümer:innen — Online-Antragshilfe.",
      to: "/rathaus/online-dienste",
      reason: "Wohngeld-Reform 2026",
      score: 60,
    });
  }

  // ── New in town ───────────────────────────────────────────────────
  if (profile.newInTown) {
    out.push({
      id: "anmelden",
      category: "service",
      title: "Wohnsitz anmelden",
      desc: "Innerhalb von 14 Tagen nach Einzug. Termin online oder persönlich im Bürgerbüro.",
      to: "/rathaus/termin-buchen",
      reason: "Sie sind neu in Moosburg",
      score: 100,
    });
    out.push({
      id: "muell-abo",
      category: "service",
      title: "Müll-Abo aktivieren",
      desc: "Anmeldung der Restmüll-, Bio- und Papiertonne für Ihre neue Adresse.",
      to: "/rathaus/online-dienste",
      reason: "Sie sind neu in Moosburg",
      score: 85,
    });
    out.push({
      id: "stadtfuehrung",
      category: "community",
      title: "Stadtführung „Neu in Moosburg“",
      desc: "Kostenlose Führung für Neubürger:innen — jeden 1. Samstag im Monat.",
      to: "/zu-besuch",
      reason: "Willkommen!",
      score: 60,
    });
  }

  // ── Car owners ────────────────────────────────────────────────────
  if (profile.ownsCar) {
    out.push({
      id: "kfz-um",
      category: "service",
      title: "KFZ-Ummeldung Termin",
      desc: "Bei Umzug oder Halterwechsel — Termin in der Zulassungsstelle.",
      to: "/rathaus/termin-buchen",
      reason: "Sie haben ein Auto",
      score: 50,
    });
    if (district === "altstadt" || district === "bahnhof") {
      out.push({
        id: "anwohner-park",
        category: "service",
        title: "Anwohnerparkausweis",
        desc: "Für Bewohner:innen der Tarifzonen — gilt 12 Monate.",
        to: "/rathaus/online-dienste",
        reason: "Ihre Adresse liegt in einer Anwohnerparkzone",
        score: 75,
      });
    }
  }

  // ── Dog owners ────────────────────────────────────────────────────
  if (profile.ownsDog) {
    out.push({
      id: "hundesteuer",
      category: "service",
      title: "Hundesteuer anmelden",
      desc: "Anmeldung innerhalb von 4 Wochen. Aktuelle Sätze: 50 € / 100 € (Listenhund).",
      to: "/rathaus/online-dienste",
      reason: "Sie haben einen Hund",
      score: 80,
    });
    out.push({
      id: "hundeauslauf",
      category: "info",
      title: "Hundeauslaufflächen",
      desc: "Drei eingezäunte Auslaufflächen im Stadtgebiet — Karte mit Hundekotbeutel-Stationen.",
      to: "/mitgestalten/maengel-melden",
      reason: "Sie haben einen Hund",
      score: 50,
    });
  }

  // ── District-based (always shown if address exists) ───────────────
  if (district) {
    out.push({
      id: "muell-kalender",
      category: "info",
      title: "Müllkalender herunterladen",
      desc: "Persönlicher Abfuhrplan als PDF oder im Kalender abonnieren (iCal).",
      to: "/mein-moosburg/mobilitaet",
      reason: `Für Ihre Adresse (${profile.address.split(/\s+\d/)[0] || "Moosburg"})`,
      score: 55,
    });
  }

  // ── Works in Moosburg ─────────────────────────────────────────────
  if (profile.worksInMoosburg) {
    out.push({
      id: "jobticket",
      category: "foerderung",
      title: "Job-Ticket MVV-Region",
      desc: "Ermäßigung bis 30 % über den Arbeitgeberzuschuss — Antragshilfe Mobilitätsbüro.",
      to: "/mein-moosburg/mobilitaet",
      reason: "Sie arbeiten in Moosburg",
      score: 55,
    });
  }

  // Sort by score, take top 6
  return out.sort((a, b) => b.score - a.score).slice(0, 6);
}
