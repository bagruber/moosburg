import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppStateProvider } from "./state/AppState";
import { Zaehlung } from "./components/Zaehlung";
import { KonzeptHinweis } from "./components/KonzeptHinweis";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppStateProvider>
        <Zaehlung />
        <App />
        {/* Ausserhalb von PageLayout, damit das Zuklappen einen Seitenwechsel
            ueberlebt — PageLayout wird je Seite neu gerendert. */}
        <KonzeptHinweis />
      </AppStateProvider>
    </BrowserRouter>
  </StrictMode>,
);
