import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { SERVICES } from "@/data/services";
import { RESOURCE_CATEGORIES } from "@/data/resources";
import { cn } from "@/utils/cn";
import { createPortal } from "react-dom";

const NAV_LINK =
  "relative inline-flex items-center gap-1.5 font-display text-sm font-medium tracking-wide text-texte2 transition-colors duration-300 hover:text-blanc " +
  "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-orange2 after:transition-all after:duration-300 hover:after:w-full";

function navLinkClass(active: boolean) {
  return cn(NAV_LINK, active && "text-blanc after:w-full");
}

/**
 * En-tête partagé : logo, navigation horizontale sur ordinateur
 * (avec sous-menu Services), menu plein écran sur mobile, CTA principal.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | "ressources" | null>(
    null
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const location = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);
  const ressourcesRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  /* État discret au défilement */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Ferme les menus au changement de page */
  useEffect(() => {
    setOpenMenu(null);
    setMobileGroup(null);
    setMenuOpen(false);
  }, [location.pathname]);

  /* Verrouille le défilement quand le menu mobile est ouvert */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* Referme le menu mobile si l'écran passe en affichage ordinateur */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Piège de focus du menu mobile : le menu est une boîte de dialogue
     modale. À l'ouverture, le focus entre dans le dialogue et Tab /
     Maj+Tab bouclent entre ses éléments. Le reste de la page est rendu
     inerte (non focalisable et invisible pour les lecteurs d'écran). */
  useEffect(() => {
    if (!menuOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    /* Le dialogue est rendu visible et retiré de l'état `inert` au même
       commit : le focus peut donc entrer immédiatement. */
    closeBtnRef.current?.focus({ preventScroll: true });

    /* Arrière-plan inerte : tout le contenu de la page, sauf le dialogue
       (portail rendu directement dans <body>). */
    const background = Array.from(document.body.children).filter(
      (element) => element !== dialog
    );
    background.forEach((element) => element.setAttribute("inert", ""));

    const FOCUSABLE =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((element) => element.getClientRects().length > 0);
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !dialog.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      background.forEach((element) => element.removeAttribute("inert"));
      /* Rendre le focus au bouton d'ouverture, une fois l'arrière-plan
         redevenu actif (il était inerte pendant l'ouverture). */
      burgerRef.current?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  /* Échap ferme le sous-menu et le menu mobile */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        /* Si le focus est sur un lien du sous-menu, il disparaît avec le
           panneau et retomberait sur <body> : on le ramène d'abord sur le
           bouton d'ouverture, comme le fait déjà le menu mobile avec son
           hamburger. */
        const panel =
          openMenu === "services"
            ? servicesRef.current
            : openMenu === "ressources"
              ? ressourcesRef.current
              : null;
        const active = document.activeElement;
        if (
          panel &&
          active instanceof HTMLElement &&
          panel.contains(active)
        ) {
          panel.querySelector("button")?.focus({ preventScroll: true });
        }

        setOpenMenu(null);
        setMobileGroup(null);
        if (menuOpen) {
          setMenuOpen(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, openMenu]);

  /* Clic extérieur : referme le sous-menu ouvert (Services ou Ressources) */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideServices =
        servicesRef.current && servicesRef.current.contains(target);
      const insideRessources =
        ressourcesRef.current && ressourcesRef.current.contains(target);
      if (!insideServices && !insideRessources) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const servicesActive = location.pathname.startsWith("/services");
  const ressourcesActive = location.pathname.startsWith("/ressources");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-bordure/70 bg-noir/85 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-18">
        <Logo />

        {/* Navigation ordinateur */}
        <nav
          className="hidden items-center gap-9 lg:flex"
          aria-label="Navigation principale"
        >
          <NavLink to="/" end className={({ isActive }) => navLinkClass(isActive)}>
            Accueil
          </NavLink>

          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => setOpenMenu("services")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              aria-expanded={openMenu === "services"}
              onClick={() =>
                setOpenMenu((m) => (m === "services" ? null : "services"))
              }
              className={cn(NAV_LINK, "cursor-pointer", servicesActive && "text-blanc after:w-full")}
            >
              Services
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  openMenu === "services" && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>

            <div
              className={cn(
                "absolute top-full left-1/2 w-[360px] min-w-[360px] -translate-x-1/2 pt-4 transition-all duration-300",
                openMenu === "services"
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0"
              )}
            >
              <div className="border border-bordure bg-noir2/95 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md">
                {SERVICES.map((s) => (
                  <NavLink
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center gap-4 rounded-sm px-4 py-3 transition-colors duration-200 hover:bg-surface",
                        isActive && "bg-surface/70"
                      )
                    }
                  >
                    <span className="font-mono text-[11px] text-orange2">
                      {s.number}
                    </span>
                    <span className="block font-display text-sm font-semibold text-blanc">
                      {s.navName}
                    </span>
                    <ArrowUpRight
                      className="ml-auto h-4 w-4 text-texte2 opacity-0 transition-all duration-200 group-hover:text-orange2 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={ressourcesRef}
            className="relative"
            onMouseEnter={() => setOpenMenu("ressources")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              aria-expanded={openMenu === "ressources"}
              onClick={() =>
                setOpenMenu((m) => (m === "ressources" ? null : "ressources"))
              }
              className={cn(NAV_LINK, "cursor-pointer", ressourcesActive && "text-blanc after:w-full")}
            >
              Centre de ressources
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  openMenu === "ressources" && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>

            <div
              className={cn(
                "absolute top-full left-1/2 w-[360px] min-w-[360px] -translate-x-1/2 pt-4 transition-all duration-300",
                openMenu === "ressources"
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0"
              )}
            >
              <div className="border border-bordure bg-noir2/95 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md">
                {RESOURCE_CATEGORIES.map((r) => (
                  <NavLink
                    key={r.slug}
                    to={r.to}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center gap-4 rounded-sm px-4 py-3 transition-colors duration-200 hover:bg-surface",
                        isActive && "bg-surface/70"
                      )
                    }
                  >
                    <span className="font-mono text-[11px] text-orange2">
                      {r.number}
                    </span>
                    <span className="block font-display text-sm font-semibold text-blanc">
                      {r.navName}
                    </span>
                    <ArrowUpRight
                      className="ml-auto h-4 w-4 text-texte2 opacity-0 transition-all duration-200 group-hover:text-orange2 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <NavLink to="/contact" className={({ isActive }) => navLinkClass(isActive)}>
            Contact
          </NavLink>
        </nav>

        <div className="hidden lg:block">
          <Link to="/contact" className="btn btn-primary px-5 py-2.5">
            Nous contacter
          </Link>
        </div>

        {/* Bouton du menu mobile */}
        <button
          ref={burgerRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Ouvrir le menu de navigation"
          aria-expanded={menuOpen}
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-bordure bg-noir2/60 text-blanc transition-colors hover:border-orange2/50 lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Menu mobile plein écran */}
      {createPortal(
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          className={cn(
            "fixed inset-0 z-100 flex flex-col overflow-hidden bg-noir",
            "h-screen w-full max-w-none",
            "transition-opacity duration-300 lg:hidden",
            menuOpen
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          )}
        >
          <div
            className="absolute inset-0 grid-overlay opacity-30"
            aria-hidden="true"
          />

          <div className="container-x relative z-20 flex h-16 shrink-0 items-center justify-between">
            <Logo />

            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu de navigation"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-bordure bg-noir2/60 text-blanc transition-colors hover:border-orange2/50"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="container-x relative z-10 flex-1 min-h-0 w-full overflow-x-hidden overflow-y-auto overscroll-contain bg-noir pt-8 pb-10">
            <ul className="space-y-1">
              {/* Accueil */}
              <li
                className={cn(
                  "transition-all duration-500",
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
                style={{ transitionDelay: menuOpen ? "0ms" : "0ms" }}
              >
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    cn(
                      "flex items-baseline gap-4 border-b border-bordure/60 py-4 font-display text-xl font-semibold transition-colors",
                      isActive ? "text-ambre2" : "text-blanc hover:text-ambre2"
                    )
                  }
                >
                  Accueil
                </NavLink>
              </li>

              {/* Catégorie Services */}
              <li
                className={cn(
                  "transition-all duration-500",
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
                style={{ transitionDelay: menuOpen ? "60ms" : "0ms" }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setMobileGroup(mobileGroup === "Services" ? null : "Services")
                  }
                  aria-expanded={mobileGroup === "Services"}
                  className="flex w-full items-baseline gap-4 border-b border-bordure/60 py-4 text-left font-display text-xl font-semibold text-blanc transition-colors hover:text-ambre2"
                >
                  Services
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      mobileGroup === "Services" && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
              </li>

              {mobileGroup === "Services" &&
                SERVICES.map((s, i) => (
                  <li
                    key={s.slug}
                    className={cn(
                      "transition-all duration-500",
                      menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    )}
                    style={{ transitionDelay: menuOpen ? `${60 + i * 60}ms` : "0ms" }}
                  >
                    <NavLink
                      to={`/services/${s.slug}`}
                      className={({ isActive }) =>
                        cn(
                          "flex items-baseline gap-4 border-b border-bordure/60 py-4 font-display text-xl font-semibold transition-colors",
                          isActive ? "text-ambre2" : "text-blanc hover:text-ambre2"
                        )
                      }
                    >
                      <span className="font-mono text-xs font-normal text-orange2">
                        {s.number}
                      </span>
                      {s.navName}
                    </NavLink>
                  </li>
                ))}

              {/* Catégorie Ressources */}
              <li
                className={cn(
                  "transition-all duration-500",
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
                style={{ transitionDelay: menuOpen ? "60ms" : "0ms" }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setMobileGroup(mobileGroup === "Ressources" ? null : "Ressources")
                  }
                  aria-expanded={mobileGroup === "Ressources"}
                  className="flex w-full items-baseline gap-4 border-b border-bordure/60 py-4 text-left font-display text-xl font-semibold text-blanc transition-colors hover:text-ambre2"
                >
                  Centre de ressources
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      mobileGroup === "Ressources" && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
              </li>

              {mobileGroup === "Ressources" &&
                RESOURCE_CATEGORIES.map((r, i) => (
                  <li
                    key={r.slug}
                    className={cn(
                      "transition-all duration-500",
                      menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    )}
                    style={{ transitionDelay: menuOpen ? `${120 + i * 60}ms` : "0ms" }}
                  >
                    <NavLink
                      to={r.to}
                      className={({ isActive }) =>
                        cn(
                          "flex items-baseline gap-4 border-b border-bordure/60 py-4 font-display text-xl font-semibold transition-colors",
                          isActive ? "text-ambre2" : "text-blanc hover:text-ambre2"
                        )
                      }
                    >
                      <span className="font-mono text-xs font-normal text-orange2">
                        {r.number}
                      </span>
                      {r.navName}
                    </NavLink>
                  </li>
                ))}

              {/* Contact */}
              <li
                className={cn(
                  "transition-all duration-500",
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
                style={{ transitionDelay: menuOpen ? "240ms" : "0ms" }}
              >
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    cn(
                      "flex items-baseline gap-4 border-b border-bordure/60 py-4 font-display text-xl font-semibold transition-colors",
                      isActive ? "text-ambre2" : "text-blanc hover:text-ambre2"
                    )
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>

            <div
              style={{
                transitionDelay: menuOpen ? "480ms" : "0ms",
              }}
              className={cn(
                "mt-8 transition-all duration-500",
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              )}
            >
              <Link to="/contact" className="btn btn-primary w-full">
                Nous contacter
              </Link>

              <p className="mt-6 font-mono text-[10px] tracking-[0.22em] text-texte2/90 uppercase">
                Un Numérique Responsable. L'éthique Comme Fondation. La Sécurité Par Conception.
              </p>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </header>
  );
}
