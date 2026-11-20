import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { SiInstagram, SiMastodon } from "react-icons/si";
import Logo from "@/components/Logo";
import Placeholder from "@/components/Placeholder";
import { SERVICES } from "@/data/services";
import { SITE, isEmailPlaceholder } from "@/config";

/**
 * Réseaux sociaux du pied de page : profils publics de l'activité
 * (X, Mastodon, Instagram).
 */
const SOCIAL_LINKS = [
  {
    name: "X",
    url: "https://x.com/Singularity_FR",
    Logo: FaXTwitter,
  },
  {
    name: "Mastodon",
    url: "https://mastodon.social/@Singularity_Informatique",
    Logo: SiMastodon,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/singularity_informatique",
    Logo: SiInstagram,
  },
];

/**
 * Pied de page partagé : marque, services, navigation, coordonnées
 * publiques configurées et liens légaux. Les informations non
 * renseignées affichent un emplacement « À compléter ».
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bordure bg-graphite">
      <div className="container-x grid gap-12 py-14 md:grid-cols-2 2xl:grid-cols-[1.55fr_0.9fr_0.6fr_0.5fr_1.05fr]">
        {/* Marque */}
        <div>
          <Logo
            markClassName="h-[100px] w-[100px] md:h-[100px] md:w-[100px]"
            textClassName="text-[28px]"
            /* Tablette et laptop (2 colonnes) : largeur de colonne insuffisante
               pour un logo horizontal → il se dispose verticalement pour ne
               pas déborder sur Services.
               Très grand écran (2xl) : 5 colonnes, retour du logo en ligne avec
               l'emblème à gauche du nom (~379 px disponibles dans la colonne). */
            linkClassName="gap-5 md:flex-col md:items-start md:gap-3 2xl:flex-row 2xl:items-center 2xl:gap-5"
          />
          <p className="mt-6 max-w-xs font-display text-sm font-medium text-blanc">
            {SITE.signature}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-texte2">
            Services informatiques et sécurité numérique pour particuliers.
          </p>
        </div>


        {/* Services */}
        <nav aria-label="Services — pied de page">
          <h2 className="font-mono text-[11px] tracking-[0.25em] text-texte2 uppercase">
            Services
          </h2>
          <ul className="mt-5 space-y-3">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group inline-flex items-center gap-2.5 text-[13px] whitespace-nowrap text-texte2 transition-colors hover:text-blanc"
                >
                  <span className="font-mono text-[10px] text-orange2">
                    {s.number}
                  </span>
                  {s.navName}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-orange2 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Navigation */}
        <nav aria-label="Navigation — pied de page">
          <h2 className="font-mono text-[11px] tracking-[0.25em] text-texte2 uppercase">
            Navigation
          </h2>
          <ul className="mt-5 space-y-3">
            <li>
              <Link
                to="/"
                className="text-[13px] whitespace-nowrap text-texte2 transition-colors hover:text-blanc"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/ressources/outils"
                className="text-[13px] whitespace-nowrap text-texte2 transition-colors hover:text-blanc"
              >
                Espaces Numériques
              </Link>
            </li>
            <li>
              <Link
                to="/ressources/guides-liens"
                className="text-[13px] whitespace-nowrap text-texte2 transition-colors hover:text-blanc"
              >
                Guides &amp; liens
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-[13px] whitespace-nowrap text-texte2 transition-colors hover:text-blanc"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Réseaux sociaux */}
        <nav aria-label="Réseaux sociaux — pied de page">
          <h2 className="font-mono text-[11px] tracking-[0.25em] text-texte2 uppercase">
            Réseaux
          </h2>
          <ul className="mt-5 space-y-3">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-[13px] whitespace-nowrap text-texte2 transition-colors hover:text-blanc"
                >
                  <social.Logo
                    className="h-4 w-4 flex-none text-orange2/80 transition-colors group-hover:text-orange2"
                    aria-hidden="true"
                  />
                  {social.name}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-orange2 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Coordonnées publiques configurées */}
        <div>
          <h2 className="font-mono text-[11px] tracking-[0.25em] text-texte2 uppercase">
            Contact
          </h2>
          <ul className="mt-5 space-y-4 text-[13px]">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="group inline-flex items-center gap-3 whitespace-nowrap text-texte2 transition-colors hover:text-blanc"
              >
                <Mail
                  className="h-4 w-4 flex-none text-orange2"
                  aria-hidden="true"
                />
                <span className="break-all">{SITE.email}</span>
              </a>
              {isEmailPlaceholder && (
                <span className="mt-1.5 block pl-7 font-mono text-[10px] tracking-wider text-ambre2/80 uppercase">
                  Adresse provisoire — à compléter
                </span>
              )}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 flex-none text-orange2" aria-hidden="true" />
              {SITE.phone ? (
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="text-texte2 transition-colors hover:text-blanc"
                >
                  {SITE.phone}
                </a>
              ) : (
                <Placeholder label="Téléphone à compléter" />
              )}
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 flex-none text-orange2" aria-hidden="true" />
              {SITE.zone ? (
                <span className="text-texte2">{SITE.zone}</span>
              ) : (
                <Placeholder label="Zone à préciser" />
              )}
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 flex-none text-orange2" aria-hidden="true" />
              {SITE.hours ? (
                <span className="text-texte2">{SITE.hours}</span>
              ) : (
                <Placeholder label="Disponibilités à préciser" />
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-bordure/60">
        <div className="container-x py-6">
          <p className="text-xs text-texte2">
            © {year} Singularity-informatique — Tous droits réservés.
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
            <Link
              to="/mentions-legales"
              className="text-blanc transition-colors hover:text-ambre2"
            >
              Mentions légales
            </Link>
            <span className="text-bordure" aria-hidden="true">
              |
            </span>
            <Link
              to="/confidentialite"
              className="text-blanc transition-colors hover:text-ambre2"
            >
              Politique de confidentialité
            </Link>
            <span className="text-bordure" aria-hidden="true">
              |
            </span>
            <Link
              to="/cgps"
              className="text-blanc transition-colors hover:text-ambre2"
            >
              CGPS
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
