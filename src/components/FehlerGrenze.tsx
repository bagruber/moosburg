import { Component } from "react";
import { Link } from "react-router-dom";

/**
 * Fängt Fehler beim Rendern des Seiteninhalts. Ohne sie leert React den ganzen
 * Baum, und unter einer Stadtadresse steht eine weiße Fläche. Eine Klasse, weil
 * React dafür keinen Hook anbietet.
 */
export class FehlerGrenze extends Component<
  { pfad: string; children: React.ReactNode },
  { fehler: boolean }
> {
  state = { fehler: false };

  static getDerivedStateFromError() {
    return { fehler: true };
  }

  // Die Meldung gilt der Seite, nicht dem Besuch: Wer über die Navigation
  // weitergeht, soll die nächste Seite sehen. Über `key` ginge das auch, baute
  // aber jeden Seiteninhalt bei jedem Adresswechsel neu auf.
  componentDidUpdate(vorher: { pfad: string }) {
    if (this.state.fehler && vorher.pfad !== this.props.pfad) this.setState({ fehler: false });
  }

  render() {
    if (!this.state.fehler) return this.props.children;
    return (
      <div role="alert" className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
        <h1 className="headline text-3xl text-ink lg:text-4xl">
          Diese Seite lässt sich gerade nicht anzeigen
        </h1>
        <p className="mt-4 max-w-2xl text-base text-ink-soft">
          Beim Aufbau der Seite ist ein Fehler aufgetreten. Laden Sie die Seite neu
          oder gehen Sie über die Navigation oben weiter.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-md bg-red-500 px-7 py-3 text-sm font-semibold text-cream shadow-soft hover:bg-red-700"
          >
            Seite neu laden
          </button>
          <Link to="/" className="text-sm font-medium text-red-700 hover:underline">
            Zur Startseite
          </Link>
        </div>
      </div>
    );
  }
}
