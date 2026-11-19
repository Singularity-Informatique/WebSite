import { LegalPage, LegalSection } from "@/components/Legal";
import { SITE } from "@/config";
import { usePageMeta } from "@/hooks/usePageMeta";

/* ---------------------------------------------------------------------------
 * POLITIQUE DE CONFIDENTIALITÉ
 * Rédigée à partir des traitements réellement effectués par le site :
 * - aucun cookie, aucun outil de mesure d'audience ;
 * - aucune ressource tierce sollicitée (polices auto-hébergées) ;
 * - un formulaire de contact qui prépare un courriel via mailto
 *   dans le logiciel de messagerie du visiteur : rien ne transite
 *   par le site ;
 * - des liens sortants vers des sites officiels tiers, qui n'exigent
 *   aucune donnée du visiteur.
 * En cas d'ajout d'outils (statistiques, service de formulaire…),
 * cette politique devra être mise à jour.
 * ------------------------------------------------------------------------- */

const LAST_UPDATE = "1er novembre 2026";

export default function Confidentialite() {
  usePageMeta(
    "Politique de confidentialité",
    "Politique de confidentialité du site Singularity-informatique : données traitées, finalités, durées de conservation et droits des personnes."
  );

  const contactEmail = (
    <a
      href={`mailto:${SITE.email}`}
      className="break-all text-ambre2 underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange2"
    >
      {SITE.email}
    </a>
  );
  const contactPhone = (
    <a
      href={`tel:+33${SITE.phone.replace(/\s/g, "").slice(1)}`}
      className="text-ambre2 underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange2"
    >
      {SITE.phone}
    </a>
  );

  return (
    <LegalPage
      kicker="Vos données"
      title="Politique de confidentialité"
      intro="Cette politique décrit les traitements de données réellement effectués par le site Singularity-informatique. Elle a été rédigée pour refléter l'état exact du site au jour de sa publication — un site qui n'a rien à collecter n'a pas de raison de collecter."
      updatedAt={LAST_UPDATE}
    >
      <LegalSection index="01" title="Responsable de traitement">
        <p>
          Le responsable de traitement est l'éditeur du site :{" "}
          <strong className="text-blanc">{SITE.name}</strong> — assistance
          informatique et sécurité numérique, {SITE.zone.toLowerCase()}.
        </p>
        <p>
          Contact : {contactEmail} — {contactPhone}.
        </p>
      </LegalSection>

      <LegalSection index="02" title="Données traitées et finalités">
        <p>
          Le site Singularity-informatique est un site vitrine statique. En l'état, il
          procède aux traitements suivants :
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-blanc">Aucun cookie</strong> n'est déposé
            lors de la navigation.
          </li>
          <li>
            <strong className="text-blanc">Aucun outil de mesure d'audience</strong>{" "}
            n'est utilisé : le site ne collecte pas de statistiques de visite.
          </li>
          <li>
            <strong className="text-blanc">Aucune donnée n'est stockée</strong>{" "}
            sur l'appareil du visiteur (ni localStorage, ni sessionStorage
            contenant des informations personnelles).
          </li>
          <li>
            <strong className="text-blanc">Aucun profilage ni publicité</strong> :
            le site ne contient ni traceur publicitaire ni contenu sponsorisé.
          </li>
        </ul>
      </LegalSection>

      <LegalSection index="03" title="Formulaire de contact">
        <p>
          Le formulaire de la page contact prépare un courriel dans votre
          propre logiciel de messagerie (protocole <code className="font-mono text-xs text-ambre2">mailto</code>).
          Les informations que vous saisissez — nom, adresse e-mail, sujet et
          message — demeurent sur votre appareil jusqu'à l'envoi depuis votre
          messagerie.
        </p>
        <p>
          Elles ne transitent par aucun serveur du site et n'y sont conservées
          nulle part. Seul votre logiciel de messagerie, et le fournisseur de
          celui-ci, traitent le message que vous choisissez d'envoyer.
        </p>
      </LegalSection>

      <LegalSection index="04" title="Ressources externes">
        <p>
          Aucune requête n'est effectuée vers des services tiers lors de la
          navigation : les polices de caractères sont hébergées localement
          avec le site, et l'ensemble des visuels y est intégré. Le site
          n'utilise pas de CDN tiers, de service de polices distant ni de
          lecteur vidéo.
        </p>
        <p>
          Certaines pages proposent des liens sortants vers des sites
          officiels tiers (Cybermalveillance.gouv.fr, SignalConso, CNIL,
          ANSSI…). Leur ouverture ne transmet aucune donnée de votre part à
          Singularity-informatique : une fois sur ces sites, ce sont leurs propres
          politiques de confidentialité qui s'appliquent.
        </p>
      </LegalSection>

      <LegalSection index="05" title="Hébergement">
        <p>
          Le contenu du site est servi par GitHub Pages (GitHub, Inc.,
          États-Unis). Lors d'une visite, l'hébergeur peut traiter des
          journaux techniques standard (adresse IP, navigateur, horodatage),
          selon ses propres règles ; ces journaux ne sont ni consultés ni
          exploités par l'éditeur du site.
        </p>
      </LegalSection>

      <LegalSection index="06" title="Courriels reçus">
        <p>
          Les courriels que vous nous adressez via{" "}
          {contactEmail} sont utilisés uniquement pour répondre à votre
          demande. Ils sont conservés le temps nécessaire à son traitement,
          puis supprimés ; ils ne sont ni revendus, ni transmis à des tiers à
          des fins commerciales.
        </p>
      </LegalSection>

      <LegalSection index="07" title="Durées de conservation">
        <p>
          Le site lui-même ne conservant aucune donnée personnelle, aucune
          durée de conservation ne s'applique en dehors des échanges traités
          à la section 06.
        </p>
      </LegalSection>

      <LegalSection index="08" title="Vos droits">
        <p>
          Vous disposez de droits sur vos données : droit d'accès, de
          rectification, d'effacement, de limitation, d'opposition et de
          portabilité, ainsi que le droit de définir des directives
          relatives à leur sort après votre décès.
        </p>
        <p>
          Pour les exercer, écrivez à {contactEmail}{" "}
          ou appelez {contactPhone} : une réponse vous sera apportée dans les
          meilleurs délais. Vous pouvez également introduire une réclamation
          auprès de la CNIL —{" "}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ambre2 underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange2"
          >
            www.cnil.fr
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
        </p>
      </LegalSection>

      <LegalSection index="09" title="Évolution de cette politique">
        <p>
          Cette politique reflète l'état réel du site au jour de sa mise à
          jour. Si des outils devaient être ajoutés — mesure d'audience,
          formulaire avec service tiers, contenus intégrés —, elle serait
          revue et republiée en conséquence.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
