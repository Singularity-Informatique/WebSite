import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import ImageProtection from "@/components/ImageProtection";
import TechMarquee from "@/components/TechMarquee";
import NeonOnView from "@/components/NeonOnView";

/* ---------------------------------------------------------------------------
 * DÉCOUPAGE DU JAVASCRIPT
 * ---------------------------------------------------------------------------
 * L'accueil est chargé immédiatement (premier écran). Les autres pages
 * deviennent des chunks séparés, téléchargés à la première navigation :
 * le visiteur n'attend plus le code de CGPS, Contact ou des articles
 * ressources pour afficher l'accueil.
 * ------------------------------------------------------------------------- */
const ServicePage = lazy(() => import("@/pages/ServicePage"));
const RessourcesIndex = lazy(() => import("@/pages/RessourcesIndex"));
const RessourcesOutilsEssentiels = lazy(
  () => import("@/pages/RessourcesOutilsEssentiels")
);
const RessourcesOutilsFondations = lazy(
  () => import("@/pages/RessourcesOutilsFondations")
);
const RessourcesGuideAnyDesk = lazy(
  () => import("@/pages/RessourcesGuideAnyDesk")
);
const RessourcesLiensSecurite = lazy(
  () => import("@/pages/RessourcesLiensSecurite")
);
const Contact = lazy(() => import("@/pages/Contact"));
const MentionsLegales = lazy(() => import("@/pages/MentionsLegales"));
const Confidentialite = lazy(() => import("@/pages/Confidentialite"));
const Cgps = lazy(() => import("@/pages/Cgps"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/**
 * Attente de chargement d'une page différée. Volontairement silencieuse :
 * le fond du site reste en place et la hauteur est réservée pour éviter que
 * le pied de page remonte. Aucun spinner, aucune annonce : le titre de la
 * page arrivante est annoncé une seule fois par RouteAnnouncer, sinon le
 * lecteur d'écran entendrait « Chargement » puis le titre.
 */
function PageFallback() {
  return <div className="min-h-[60svh]" />;
}

/**
 * Remonte en haut de la page à chaque changement de route.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

/**
 * Annonce du changement de page aux lecteurs d'écran.
 *
 * Application à page unique : le contenu change sans rechargement et rien
 * ne signale la navigation. Chaque page met à jour `document.title` via
 * usePageMeta. Cette zone live attend que le titre ait effectivement
 * changé — le chargement d'une page différée peut le retarder — puis
 * l'annonce. Le premier affichage n'est pas annoncé : le titre d'arrivée
 * est déjà lu par le lecteur d'écran.
 */
function RouteAnnouncer() {
  const { pathname } = useLocation();
  const [message, setMessage] = useState("");
  const lastPathname = useRef(pathname);

  useEffect(() => {
    // Même route (premier affichage, ou double exécution en mode strict) :
    // le titre d'arrivée est déjà lu, pas d'annonce.
    if (lastPathname.current === pathname) return;
    lastPathname.current = pathname;

    // Titre au moment de la navigation : l'annonce attend qu'il change.
    // Le titre courant est relu à chaque sondage, car la page peut être
    // chargée en différé (React.lazy) après le début de la transition.
    const expected = document.title;
    let attempts = 0;
    let announceTimer = 0;

    const poll = window.setInterval(() => {
      attempts += 1;
      const current = document.title;
      // ~2 s maximum : au-delà, on annonce le titre courant.
      if (current === expected && attempts < 40) return;
      window.clearInterval(poll);
      // Vider d'abord garantit une nouvelle annonce même si deux pages
      // portent le même titre.
      setMessage("");
      announceTimer = window.setTimeout(() => setMessage(current), 60);
    }, 50);

    return () => {
      window.clearInterval(poll);
      window.clearTimeout(announceTimer);
    };
  }, [pathname]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

/**
 * Enveloppe les routes dans une transition de page douce (fondu +
 * léger glissement). La clé de remontée rejoue l'animation à chaque
 * navigation. « prefers-reduced-motion » est respecté via le CSS.
 */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-fade">
      <Suspense fallback={<PageFallback />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          {/* Ancienne adresse du hub des ressources : redirection transparente
              vers la première rubrique (le menu va déjà directement aux deux). */}
          <Route
            path="/ressources"
            element={<Navigate to="/ressources/outils" replace />}
          />
          <Route
            path="/ressources/outils"
            element={<RessourcesIndex slug="outils" />}
          />
          <Route
            path="/ressources/outils/essentiels-en-ligne"
            element={<RessourcesOutilsEssentiels />}
          />
          <Route
            path="/ressources/outils/fondations-libres"
            element={<RessourcesOutilsFondations />}
          />
          {/* Ancienne adresse de l'article fusionné : redirection transparente */}
          <Route
            path="/ressources/outils/boite-a-outils"
            element={<Navigate to="/ressources/outils" replace />}
          />
          <Route
            path="/ressources/guides-liens"
            element={<RessourcesIndex slug="guides-liens" />}
          />
          <Route
            path="/ressources/guides/anydesk"
            element={<RessourcesGuideAnyDesk />}
          />
          <Route
            path="/ressources/liens/securite-informatique"
            element={<RessourcesLiensSecurite />}
          />
          {/* Anciennes adresses des rubriques séparées : redirections transparentes */}
          <Route
            path="/ressources/guides"
            element={<Navigate to="/ressources/guides-liens" replace />}
          />
          <Route
            path="/ressources/liens"
            element={<Navigate to="/ressources/guides-liens" replace />}
          />
          {/* Ancienne adresse du guide : redirection transparente */}
          <Route
            path="/ressources/anydesk"
            element={<Navigate to="/ressources/guides/anydesk" replace />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/cgps" element={<Cgps />} />
          <Route
            path="/conditions-de-prestation"
            element={<Navigate to="/cgps" replace />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

/**
 * Application Singularity.
 *
 * Routage par hash (#/chemin) : compatible avec GitHub Pages sans
 * configuration serveur — chaque page reste accessible directement
 * par son URL, y compris dans un sous-chemin de dépôt.
 */
export default function App() {
  return (
    <HashRouter>
      <ImageProtection />
      <ScrollToTop />
      <RouteAnnouncer />
      <NeonOnView />

      {/* Lien d'évitement (accessibilité clavier) */}
      <a
        href="#contenu"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById("contenu");
          main?.focus();
          main?.scrollIntoView();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-sm focus:bg-orange2 focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-semibold focus:text-noir"
      >
        Aller au contenu principal
      </a>

      {/* Grain cinématographique global — DÉSACTIVÉ (test de performance).
          Une couche fixe plein écran en mix-blend-mode: soft-light force le
          navigateur à re-mélanger tout le viewport à chaque frame. Pour le
          réactiver, il suffit de décommenter la ligne ci-dessous. */}
      {/* <div className="grain" aria-hidden="true" /> */}

      <Header />

      <main id="contenu" tabIndex={-1}>
        <AnimatedRoutes />
      </main>

      {/* Bandeau des technologies — une seule instance, visible sur toutes les pages */}
      <TechMarquee />

      <Footer />
    </HashRouter>
  );
}
