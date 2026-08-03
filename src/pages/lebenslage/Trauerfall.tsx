import { Link } from "react-router-dom";
import {
  Flower,
  Phone,
  FileText,
  Handshake,
  CaretRight,
  Clock,
} from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { AnsprechpartnerStrip } from "@/components/AnsprechpartnerCard";

type Phase = {
  id: string;
  zeit: string;
  titel: string;
  schritte: { title: string; desc: string }[];
};

const PHASEN: Phase[] = [
  {
    id: "stunden",
    zeit: "In den ersten Stunden",
    titel: "Das Nötigste zuerst",
    schritte: [
      { title: "Ärztin oder Arzt verständigen", desc: "Zur Feststellung des Todes und Ausstellung des Totenscheins. Bei einem Todesfall zu Hause rufen Sie die Hausärztin, den ärztlichen Notdienst oder 112." },
      { title: "Nahe Angehörige informieren", desc: "Nehmen Sie sich Zeit. Niemand muss in dieser Situation sofort alles allein regeln." },
      { title: "Ein Bestattungsinstitut kontaktieren", desc: "Das Bestattungsunternehmen übernimmt die Überführung und begleitet Sie durch viele der folgenden Formalitäten." },
    ],
  },
  {
    id: "tage",
    zeit: "In den ersten Tagen",
    titel: "Formalitäten regeln",
    schritte: [
      { title: "Sterbeurkunde beim Standesamt", desc: "Der Sterbefall wird beim Standesamt beurkundet, meist übernimmt das Bestattungsinstitut die Anzeige. Die Sterbeurkunde brauchen Sie für viele weitere Schritte." },
      { title: "Bestattung organisieren", desc: "Art und Ort der Bestattung mit dem Institut und der Friedhofsverwaltung der Stadt klären." },
      { title: "Versicherungen & Rente informieren", desc: "Kranken- und Rentenversicherung, Arbeitgeber sowie Lebens- und weitere Versicherungen benachrichtigen." },
    ],
  },
  {
    id: "wochen",
    zeit: "In den Wochen danach",
    titel: "In Ruhe ordnen",
    schritte: [
      { title: "Konten & Verträge klären", desc: "Laufende Verträge (Miete, Strom, Abos) kündigen oder übertragen, Bankangelegenheiten regeln." },
      { title: "Nachlass & Erbschein", desc: "Beim Nachlassgericht klären, ob ein Erbschein nötig ist. Ein Testament ist beim Gericht abzugeben." },
      { title: "Hilfe annehmen", desc: "Trauer braucht Zeit. Seelsorge und Trauerbegleitung sind für Sie da. Sie müssen diesen Weg nicht allein gehen." },
    ],
  },
];

const STERBEURKUNDE_UNTERLAGEN = [
  "Totenschein (ärztliche Todesbescheinigung)",
  "Personalausweis der verstorbenen Person",
  "Geburtsurkunde oder, bei Verheirateten: Eheurkunde",
  "Bei Geschiedenen: Scheidungsurteil · bei Verwitweten: Sterbeurkunde des Ehegatten",
];

export function Trauerfall() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Lebenslage"
        title="Im Trauerfall"
        intro="Der Verlust eines nahen Menschen ist schwer. Diese Seite gibt Ihnen einen ruhigen Überblick, was in welcher Reihenfolge zu tun ist: Schritt für Schritt, ohne Druck."
        crumbs={[{ label: "Lebenslagen" }, { label: "Im Trauerfall" }]}
        icon={Flower}
        variant="cream"
      />

      {/* ── Ruhiger Einstieg ──────────────────────────────────────── */}
      <section className="border-b border-ink-line/60 bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
          <p className="text-lg leading-relaxed text-ink-soft">
            Vieles hat Zeit. In den ersten Stunden sind nur wenige Dinge wirklich dringend, den Rest
            können Sie in Ruhe angehen, oft mit Unterstützung des Bestattungsinstituts.
          </p>
        </div>
      </section>

      {/* ── Phasen ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <div className="space-y-12">
          {PHASEN.map((p) => (
            <Reveal key={p.id}>
              <section>
                <div className="mb-5 flex items-center gap-2.5">
                  <Clock className="h-5 w-5 text-gold-700" weight="light" />
                  <div>
                    <div className="eyebrow text-gold-700">{p.zeit}</div>
                    <h2 className="headline text-xl text-ink sm:text-2xl">{p.titel}</h2>
                  </div>
                </div>
                <ul className="space-y-3">
                  {p.schritte.map((s) => (
                    <li key={s.title} className="rounded-xl border border-ink-line/60 bg-cream p-5">
                      <h3 className="card-title text-ink">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Sterbeurkunde beim Standesamt ─────────────────────────── */}
      <section className="border-y border-ink-line/70 bg-cream-dark">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <Reveal>
            <SectionHeader eyebrow="Der Weg zur Stadt" heading="Sterbeurkunde beim Standesamt" />
          </Reveal>
          <p className="-mt-4 mb-6 text-ink-soft">
            Die Sterbeurkunde ist die Grundlage für fast alle weiteren Schritte. In der Regel meldet das
            Bestattungsinstitut den Sterbefall an, diese Unterlagen werden dafür benötigt:
          </p>
          <ul className="space-y-2.5">
            {STERBEURKUNDE_UNTERLAGEN.map((u) => (
              <li key={u} className="flex items-start gap-2.5 rounded-lg bg-cream px-4 py-3 text-sm text-ink-soft">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" weight="regular" />
                <span>{u}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <AnsprechpartnerStrip keyword="Sterbe" heading="Standesamt & Friedhofsverwaltung" limit={2} />
          </div>
        </div>
      </section>

      {/* ── Unterstützung ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <div className="rounded-2xl border border-gold-500/30 bg-gold-100/40 p-7">
          <div className="flex items-start gap-4">
            <Handshake className="mt-0.5 h-8 w-8 shrink-0 text-gold-700" weight="light" />
            <div>
              <h2 className="headline text-xl text-ink">Sie müssen das nicht allein tragen</h2>
              <p className="mt-2 text-ink-soft">
                Seelsorge und Trauerbegleitung stehen Ihnen zur Seite, unabhängig von Konfession und
                kostenfrei. Bei akuter seelischer Not ist die Telefonseelsorge rund um die Uhr erreichbar.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="tel:08001110111"
                  className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-cream hover:bg-red-700"
                >
                  <Phone className="h-4 w-4" weight="regular" />
                  Telefonseelsorge: 0800 111 0 111
                </a>
                <SupportLink to="/mein-moosburg/gesundheit" label="Beratung & Seelsorge vor Ort" />
              </div>
            </div>
          </div>
        </div>

        {/* Verwandte Lebenslagen */}
        <div className="mt-10">
          <div className="eyebrow mb-4 text-ink-muted">Verwandte Lebenslagen</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <SupportLink to="/lebenslage/pflege-alter" label="Pflege & Alter" block />
            <SupportLink to="/rathaus/kontakt" label="Kontakt zur Stadtverwaltung" block />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function SupportLink({ to, label, block }: { to: string; label: string; block?: boolean }) {
  return (
    <Link
      to={to}
      className={
        block
          ? "group flex items-center justify-between gap-3 rounded-xl border border-ink-line/70 bg-cream px-5 py-4 transition hover:border-red-500/40"
          : "inline-flex items-center gap-1.5 rounded-lg border border-gold-500/40 px-5 py-2.5 text-sm font-medium text-gold-700 transition hover:bg-gold-100/60"
      }
    >
      <span className={block ? "card-title text-ink" : ""}>{label}</span>
      <CaretRight className="h-4 w-4 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-red-700" weight="regular" />
    </Link>
  );
}
