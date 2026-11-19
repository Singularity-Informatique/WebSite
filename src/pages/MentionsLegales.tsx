import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LegalPage, LegalSection } from "@/components/Legal";
import { SITE } from "@/config";
import { usePageMeta } from "@/hooks/usePageMeta";

/* ---------------------------------------------------------------------------
 * MENTIONS LÉGALES
 * Rédigées à partir des informations réellement connues de l'activité
 * (cf. src/config.ts). Éléments réellement connus : dénomination, activité,
 * zone, courriel, téléphone, statut (entreprise individuelle), SIREN.
 * Le champ « Adresse » reste marqué « À compléter » tant qu'il n'est pas
 * communiqué : aucune information juridique n'est inventée.
 * Voir README pour la liste des éléments à fournir avant publication.
 * ------------------------------------------------------------------------- */

const LAST_UPDATE = "15 novembre 2026";

function Label({ children }: { children: string }) {
  return (
    <dt className="font-mono text-[11px] tracking-[0.18em] text-texte2/90 uppercase">
      {children}
    </dt>
  );
}

function Value({ children }: { children: ReactNode }) {
  return <dd className="text-blanc">{children}</dd>;
}

/** Lien interne des pages légales (même signature visuelle que les liens externes). */
const LEGAL_LINK =
  "text-ambre2 underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange2";

export default function MentionsLegales() {
  usePageMeta(
    "Mentions légales",
    "Mentions légales du site Singularity-informatique : éditeur, hébergement, propriété intellectuelle et responsabilité."
  );

  return (
    <LegalPage
      kicker="Informations légales"
      title="Mentions légales"
      intro="Les informations ci-dessous identifient l'éditeur de ce site, son hébergeur et les règles applicables à ses contenus. Elles font partie d'un ensemble qui comprend les conditions de prestation et la politique de confidentialité, et sont tenues à jour au fil de l'évolution du site."
      updatedAt={LAST_UPDATE}
    >
      <LegalSection index="01" title="Éditeur du site">
        <p>Le présent site est édité par :</p>
        <dl className="mt-2 grid gap-x-8 gap-y-3 sm:grid-cols-[10rem_1fr]">
          <Label>Dénomination</Label>
          <Value>{SITE.name}</Value>
          <Label>Activité</Label>
          <Value>
            Maintenance, dépannage, nettoyage, installation, configuration, optimisation, 
            sécurisation et sauvegarde d'ordinateurs et systèmes informatiques.
          </Value>
          <Label>Zone d'intervention</Label>
          <Value>{SITE.zone}</Value>
          <Label>Courriel</Label>
          <Value>
            <a
              href={`mailto:${SITE.email}`}
              className="break-all text-blanc transition-colors hover:text-ambre2"
            >
              {SITE.email}
            </a>
          </Value>
          <Label>Téléphone</Label>
          <Value>
            <a
              href={`tel:+33${SITE.phone.replace(/\s/g, "").slice(1)}`}
              className="text-blanc transition-colors hover:text-ambre2"
            >
              {SITE.phone}
            </a>
          </Value>
          <Label>Statut juridique</Label>
          <Value>
            Entreprise individuelle
          </Value>
          <Label>Immatriculation (SIREN)</Label>
          <Value>
            109 721 324
          </Value>
        </dl>
      </LegalSection>

      <LegalSection index="02" title="Responsable de publication">
        <p>
          La direction de la publication est assurée par l'éditeur du site
          (entreprise individuelle), tel qu'identifié à la section 01. Aucune
          information de nature distincte ne s'y rattache.
        </p>
      </LegalSection>

      <LegalSection index="03" title="Hébergement">
        <p>
          Ce site statique est hébergé sur <strong className="text-blanc">GitHub Pages</strong>,
          un service fourni par GitHub, Inc., 88 Colin P. Kelly Jr. Street,
          San Francisco, CA 94107, États-Unis.
        </p>
        <p>
          Site web :{" "}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ambre2 underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange2"
          >
            github.com
            <span className="sr-only"> (nouvel onglet)</span>
          </a>{" "}
          — Documentation :{" "}
          <a
            href="https://docs.github.com/fr/pages"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ambre2 underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange2"
          >
            docs.github.com/fr/pages
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
        </p>
        <p>
          Les pages du présent site ne déposent aucun cookie et ne collectent
          aucune donnée personnelle ; les traitements associés à la navigation
          sont décrits dans la{" "}
          <Link to="/confidentialite" className={LEGAL_LINK}>
            Politique de confidentialité
          </Link>
          , et les règles applicables aux prestations dans les{" "}
          <Link to="/cgps" className={LEGAL_LINK}>
            Conditions générales de prestation de services
          </Link>
          . Les organismes officiels et les outils présentés au site occupent la
          rubrique{" "}
          <Link to="/ressources/outils" className={LEGAL_LINK}>
            Ressources
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection index="04" title="Propriété intellectuelle">
        <p>
          Le site Singularity-informatique a été conçu et développé à l'aide
          d'outils d'intelligence artificielle, selon une approche de
          développement assisté dite « vibe coding ». Le choix des contenus,
          des textes et de l'interface, ainsi que la vérification de chaque
          itération, demeurent propres à l'éditeur.
        </p>
        <p>
          L'emblème de Singularity-informatique est une création originale de
          l'éditeur — composé par ses soins sous GIMP, puis finalisé avec
          l'assistance d'outils d'intelligence artificielle — qui en demeure
          le propriétaire, à l'instar du nom commercial.
        </p>
        <p>
          Les visuels du site ont été générés pour le projet
          par intelligence artificielle. Les polices de caractères (IBM Plex
          Mono, Inter) sont auto-hébergées sous licence libre
          (<em>Open Font License</em>) ; les bibliothèques logicielles utilisées
          (React, Vite, Tailwind CSS…) sont publiées sous licences libres ou
          permissives et intégrées conformément à leurs conditions respectives.
        </p>
        <p>
          Toute reproduction, représentation, modification ou diffusion,
          totale ou partielle, des éléments propres à l'éditeur, sur quelque
          support que ce soit et sans autorisation écrite préalable, est
          interdite — sous réserve des exceptions prévues par la législation
          en vigueur.
        </p>
        <p>
          Les marques, logos et logiciels de tiers mentionnés sur ce site
          (notamment AnyDesk ou GitHub) restent la propriété de leurs
          titulaires respectifs ; leur mention a uniquement une valeur
          d'information et n'implique aucune affiliation.
        </p>
      </LegalSection>

      <LegalSection index="05" title="Limitation de responsabilité">
        <p>
          Les informations diffusées sur ce site — notamment la description
          des services et les guides pratiques — sont fournies à titre
          indicatif et ne constituent ni un devis, ni un engagement
          contractuel. Les prestations n'engagent l'éditeur qu'après
          confirmation directe, selon les modalités convenues avec chaque
          personne et telles qu'encadrées par les{" "}
          <a
            href="#/cgps"
            className="text-ambre2 underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange2"
          >
            Conditions générales de prestation de services
          </a>
          .
        </p>
        <p>
          Les liens proposés sur ce site mènent vers des sites tiers
          indépendants — en particulier les organismes officiels référencés
          dans la rubrique{" "}
          <Link to="/ressources/outils" className={LEGAL_LINK}>
            Ressources du site
          </Link>
          . Le contenu de ces sites relève de leurs
          seuls éditeurs ; l'éditeur du présent site n'en assume ni le
          contenu, ni la disponibilité.
        </p>
        <p>
          L'éditeur ne peut être tenu responsable des dommages directs ou
          indirects résultant de l'utilisation du site, ni des interruptions
          de service imputables à l'hébergeur ou à des tiers.
        </p>
      </LegalSection>

      <LegalSection index="06" title="Signalement et contact">
        <p>
          Pour toute question, demande ou signalement relatif à ce site ou à
          son contenu, contactez l'éditeur :
        </p>
        <ul className="mt-1 space-y-2">
          <li>
            par courriel :{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-ambre2 underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange2"
            >
              {SITE.email}
            </a>
          </li>
          <li>
            par téléphone :{" "}
            <a
              href={`tel:+33${SITE.phone.replace(/\s/g, "").slice(1)}`}
              className="text-ambre2 underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange2"
            >
              {SITE.phone}
            </a>
          </li>
        </ul>
        <p>
          Une réponse est apportée dans un délai raisonnable. Pour un signalement
          urgent en matière de cybersécurité, les organismes officiels de la
          page{" "}
          <a
            href="#/ressources/liens/securite-informatique"
            className="text-ambre2 underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange2"
          >
            Liens utiles
          </a>{" "}
          restent le premier point d'appui.
        </p>
      </LegalSection>

      <LegalSection index="07" title="Droit applicable">
        <p>
          Le présent site et ses mentions légales sont soumis au droit
          français. Le site est intégralement rédigé en langue française.
          En cas de difficulté, une solution amiable sera toujours recherchée
          en premier lieu par le contact indiqué à la section 06.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
