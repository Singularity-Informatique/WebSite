import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LegalPage, LegalSection } from "@/components/Legal";
import Placeholder from "@/components/Placeholder";
import { SITE } from "@/config";
import { usePageMeta } from "@/hooks/usePageMeta";

/* ---------------------------------------------------------------------------
 * CONDITIONS GÉNÉRALES DE PRESTATION DE SERVICES (CGPS)
 * Encadrent les prestations décrites sur le site (cf. src/data/services.ts).
 * Aucune information juridique n'est inventée : les éléments qui dépendent
 * encore de décisions de l'activité (médiateur de la consommation…) restent
 * marqués « À compléter ». La durée de la garantie d'exécution (trente
 * jours, pratique de secteur) reste ajustable.
 * ------------------------------------------------------------------------- */

const LAST_UPDATE = "15 novembre 2026";

/** Valeur clé d'une liste ou d'une phrase (mis en évidence). */
function Val({ children }: { children: ReactNode }) {
  return <strong className="text-blanc">{children}</strong>;
}

/** Clause mis en exergue au sein d'une section. */
function ClauseCadre({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-orange2/40 pl-4 font-mono text-xs leading-relaxed tracking-wide text-blanc">
      {children}
    </p>
  );
}

/** Lien interne discret, dans le style des pages légales. */
function Lien({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="text-ambre2 underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange2"
    >
      {children}
    </Link>
  );
}

export default function Cgps() {
  usePageMeta(
    "CGPS — Conditions générales de prestation de services",
    "Conditions générales de prestation de services de Singularity-informatique : diagnostic, devis, sauvegarde des données, responsabilité, confidentialité, paiement et garantie des interventions."
  );

  return (
    <LegalPage
      kicker="Cadre contractuel"
      title="Conditions de prestation"
      intro="Les Conditions générales de prestation de services (CGPS) définissent les règles applicables à toute prestation réalisée par Singularity-informatique pour les particuliers. Leur fil directeur est la transparence : chaque clause est là pour qu'on sache, de part et d'autre, ce qui est possible, ce qui est garanti et ce qui ne l'est pas."
      updatedAt={LAST_UPDATE}
    >
      {/* 01 -------------------------------------------------------------- */}
      <LegalSection index="01" title="Objet et champ d'application">
        <p>
          Les présentes CGPS encadrent toute prestation de services
          informatiques réalisée par <Val>{SITE.name}</Val> (ci-après « le
          prestataire ») au profit de particuliers, dans la zone
          d'intervention suivante : <Val>{SITE.zone}</Val>.
        </p>
        <p>
          Elles s'appliquent de plein droit dès l'acceptation d'un devis ou
          la confirmation d'une intervention. Aucune condition contraire
          n'est opposable tant qu'elle n'a pas été acceptée expressément par
          écrit. En cas d'incompatibilité entre un devis et les présentes
          CGPS, le devis prévaut pour ce qu'il précise.
        </p>
        <p>
          Le traitement des données personnelles est en outre régi par la{" "}
          <Lien to="/confidentialite">politique de confidentialité</Lien>,
          qui complète les présentes CGPS sans les remplacer.
        </p>
      </LegalSection>

      {/* 02 -------------------------------------------------------------- */}
      <LegalSection index="02" title="Prestations concernées">
        <p>Sept pôles de prestations sont couverts par les CGPS :</p>
        <ul className="mt-1 space-y-2">
          <li>
            <Val>DIA</Val> — Diagnostic &amp; assistance (diagnostic complet,
            assistance à distance)
          </li>
          <li>
            <Val>SEC</Val> — Sécurité &amp; protection (sécurisation
            numérique des appareils)
          </li>
          <li>
            <Val>SVG</Val> — Sauvegarde &amp; récupération de données
          </li>
          <li>
            <Val>ENT</Val> — Entretien &amp; performance
          </li>
          <li>
            <Val>INS</Val> — Installation, réparation &amp; évolution
          </li>
          <li>
            <Val>GAM</Val> — Gaming IT &amp; rétro-gaming
          </li>
          <li>
            <Val>IA</Val> — IA locale &amp; solutions intelligentes (assistant
            IA hébergé chez vous, accessible depuis l'extérieur en toute
            sécurité)
          </li>
        </ul>
        <p>
          Chaque prestation est décrite sur sa page dédiée du site ; les
          références (par exemple <Val>DIA-001</Val>) correspondent aux
          éléments chiffrés sur devis.
        </p>
      </LegalSection>

      {/* 03 -------------------------------------------------------------- */}
      <LegalSection index="03" title="Devis et commande">
        <p>
          Toute prestation fait l'objet d'un devis préalable, établi à partir
          de la description faite par le client et, si nécessaire, après un
          échange de précision. Le devis indique la nature exacte de la
          prestation, le délai prévisionnel, le coût et sa durée de validité.
        </p>
        <p>
          La commande n'est formée qu'après <Val>acceptation du devis</Val> :
          signature, accord exprimé par écrit, ou toute confirmation convenue
          avec le prestataire. Tant que le devis n'est pas accepté, aucune
          intervention n'est engagée et aucun frais n'est dû.
        </p>
        <p>
          Si l'examen du matériel révèle des éléments que le devis ne
          couvrait pas, un devis complémentaire est proposé. Aucun
          supplément n'est engagé sans accord exprès du client.
        </p>
      </LegalSection>

      {/* 04 -------------------------------------------------------------- */}
      <LegalSection index="04" title="Diagnostic informatique — modalités et frais">
        <p>
          Le diagnostic consiste en une analyse méthodique de la machine :
          état matériel, état logiciel, performances et sécurité. Il débouche
          sur la restitution d'un rapport et la proposition de suites
          possibles, sans obligation pour le client d'engager une
          réparation.
        </p>
        <p>
          Le diagnostic est une prestation en soi, qui peut donner lieu à
          facturation. Son mode de facturation — état des lieux inclus, part
          déduite en cas de réparation validée — est <Val>annoncé avant le
          début du diagnostic</Val> ou précisé sur le devis. À défaut
          d'information préalable, aucun frais de diagnostic n'est facturé.
        </p>
        <ClauseCadre>
          Aucun coût n'est engagé sans que vous en ayez été informé
          au préalable.
        </ClauseCadre>
      </LegalSection>

      {/* 05 -------------------------------------------------------------- */}
      <LegalSection index="05" title="Modalités d'intervention">
        <p>
          Selon la nature de la prestation, l'intervention est réalisée : à
          domicile, à distance (prise en main sécurisée, avec votre accord et
          en votre présence), ou sur une machine qui vous a été confiée. Les
          modalités d'accès au matériel vous sont rappelées avant chaque
          rendez-vous.
        </p>
        <p>
          Vous certifiez disposer du matériel concerné et de{" "}
          <Val>licences authentiques</Val> pour les logiciels installés. Aucune
          installation ne contournе une licence et ne repose sur des moyens
          illicites : cette exigence est non négociable.
        </p>
        <p>
          Les délais annoncés sont des délais indicatifs, engagés de bonne
          foi. Un délai d'approvisionnement de pièce, l'indisponibilité du
          matériel ou un report demandé par le client peuvent les modifier ;
          le client est informé dès que le prestataire en a connaissance.
        </p>
      </LegalSection>

      {/* 06 -------------------------------------------------------------- */}
      <LegalSection index="06" title="Réparations — validation du devis">
        <p>
          Aucune réparation n'est engagée sans <Val>devis préalable
          accepté</Val>. Le devis précise le coût, les pièces nécessaires et
          le délai prévisionnel. Si la réparation met au jour un élément non
          prévu, un devis complémentaire est soumis avant de poursuivre.
        </p>
        <p>
          Une fois validé, le client reste libre de renoncer en cours de
          route : les opérations déjà réalisées et les pièces éventuellement
          acquises lui sont alors facturées au prorata, sur justificatifs.
        </p>
        <p>
          Les pièces remplacées peuvent être restituées au client sur
          demande, sauf échange constructeur.
        </p>
      </LegalSection>

      {/* 07 -------------------------------------------------------------- */}
      <LegalSection index="07" title="Sauvegarde des données — obligation du client">
        <p>
          Avant toute intervention, il appartient au client de{" "}
          <Val>sauvegarder ses données</Val> : documents, photos, carnets
          d'adresses, identifiants, courriels. Mises à jour, réinstallations,
          nettoyages ou remplacement de pièce peuvent modifier, voire
          effacer, des informations présentes sur la machine.
        </p>
        <p>
          Si le client ne dispose d'aucune sauvegarde à jour, un{" "}
          <Val>clonage complet du système</Val> — copie fidèle des données et
          de la configuration, conservée sur un support dédié — est proposé
          avant toute intervention. Cette proposition est systématique : le
          client l'accepte ou la refuse en pleine liberté, et ce choix est
          consigné sur le devis. La prestation de clonage, lorsqu'elle est
          retenue, est tarifée et réalisée avant l'entame des travaux.
        </p>
        <ClauseCadre>
          Aucune intervention ne démarre sans que la question de la
          sauvegarde ait été posée et tranchée avec le client : c'est ce
          geste préalable, proposé et consigné, qui protège les données —
          et donne à l'intervention un cadre serein.
        </ClauseCadre>
      </LegalSection>

      {/* 08 -------------------------------------------------------------- */}
      <LegalSection index="08" title="Perte de données — limites de responsabilité">
        <p>
          Malgré toutes les précautions prises, aucune manipulation
          informatique ne permet d'exclure de manière absolue la perte, la
          corruption ou l'endommagement de données : un support défectueux,
          une panne préexistante ou un incident matériel peuvent survenir
          sans préavis. C'est précisément pour cette raison que la
          sauvegarde du client reste la seule protection fiable.
        </p>
        <p>
          Le prestataire ne saurait être tenu responsable de la perte de
          données non sauvegardées par le client, ni des dommages imputables
          à un défaut préexistant ou à un support défaillant — sauf si la
          perte résulte directement d'une faute imputable à son
          intervention. Lorsque sa responsabilité est engagée, elle est
          limitée aux dommages directs et prévisibles, et bornée, en toute
          hypothèse, au montant payé par le client pour la prestation
          concernée ; rien n'exclut ni ne limite la responsabilité pour les
          obligations essentielles ou en cas de faute lourde.
        </p>
        <p>
          La récupération de données reste, par nature, sans garantie de
          résultat (cf. section 09). Le taux de réussite probable est
          annoncé honnêtement en amont, jamais surestimé.
        </p>
      </LegalSection>

      {/* 09 -------------------------------------------------------------- */}
      <LegalSection index="09" title="Obligation de moyens">
        <p>
          Certaines prestations ne s'attachent pas à l'obtention d'un
          résultat garanti, notamment : la récupération de données, la
          désinfection intégrale d'un système fortement compromis, ou la
          prise en charge d'une panne dont la cause ne peut être isolée.
          Pour de telles interventions, le prestataire est tenu d'une{" "}
          <Val>obligation de moyens</Val> : il met en œuvre, avec
          conscience professionnelle, les moyens, outils et procédures
          adaptés — sans garantie d'issue.
        </p>
        <p>
          Si une obligation de résultat est contractuellement assumée (par
          exemple la mise en service d'un matériel neuf conforme), elle est
          inscrite explicitement sur le devis. À défaut de mention
          contraire, l'intervention est conduite au titre de l'obligation de
          moyens, dans le respect de l'art. 1112-1 du Code civil.
        </p>
      </LegalSection>

      {/* 10 -------------------------------------------------------------- */}
      <LegalSection index="10" title="Confidentialité et protection des données">
        <p>
          Pendant l'intervention, le prestataire accède à des fichiers
          personnels. Il s'engage à les utiliser <Val>uniquement pour la
          prestation</Val> : aucune copie, aucun transfert, aucune analyse
          extérieure au cadre de la mission. Les mots de passe éventuellement
          communiqués restent strictement confidentiels et ne sont pas
          conservés à la fin de l'intervention.
        </p>
        <p>
          Conformément au RGPD (règle n° 2016/679) et à la loi
          Informatique et Libertés, les données personnelles du client
          ne sont conservées que le temps nécessaire à la facturation et au
          suivi de la prestation. Le détail est décrit sur la{" "}
          <Lien to="/confidentialite">page Confidentialité</Lien>.
        </p>
      </LegalSection>

      {/* 11 -------------------------------------------------------------- */}
      <LegalSection index="11" title="Tarifs, facturation et paiement">
        <p>
          Les tarifs sont communiqués <Val>avant toute intervention</Val>,
          sur devis ou sur demande directe. Aucun tarif n'est appliqué sans
          que le client ait été informé au préalable.
        </p>
        <p>
          Le paiement s'effectue selon les modalités acceptées sur devis.
          Une facture détaillée est remise pour chaque prestation payée.
          Toute remise exceptionnelle (étudiants, seniors, engagements
          multi-prestations) est mentionnée sur le devis.
        </p>
        <p>
          Le paiement est effectué à la fin de l'intervention, contre remise
          de la facture détaillée. Deux moyens de paiement sont acceptés :{" "}
          <Val>carte bancaire</Val> et <Val>espèces</Val>, dans la limite
          légale de 1 000 € applicable aux paiements en espèces. Aucun
          montant n'est exigé avant l'exécution, sauf acompte expressément
          convenu sur devis. Les prestations étant réglées à leur
          achèvement, aucune pénalité de retard n'est applicable ; un
          éventuel délai de paiement particulier serait convenu par écrit,
          sur le devis.
        </p>
      </LegalSection>

      {/* 12 -------------------------------------------------------------- */}
      <LegalSection index="12" title="Garantie des prestations">
        <p>
          Les prestations relèvent des garanties de droit commun : garantie
          légale contre les vices cachés (art. 1641 et suivants du Code
          civil) et responsabilité du prestataire pour la bonne exécution du
          service convenu. En revanche, lorsque le contrat a pour objet
          principal une prestation de service — dépannage, entretien,
          installation —, les pièces éventuellement fournies à l'occasion de
          l'intervention ne bénéficient pas de la garantie légale de
          conformité des biens (art. L217-3 et suivants du Code de la
          consommation) : cette particularité est portée à la connaissance
          du client avant l'intervention.
        </p>
        <p>
          En complément, une garantie d'exécution s'applique à la
          main-d'œuvre : si une réparation exécutée par le prestataire
          s'avère défaillante dans les suites immédiates de l'intervention,
          une nouvelle intervention de correction est réalisée
          gratuitement, lorsque la cause relève de la prestation elle-même
          (erreur de réglage, mauvais remontage, contrôle omis). Cette
          garantie de service ne couvre pas un nouvel incident externe, un
          usage inadapté ou une intervention intermédiaire réalisée par un
          tiers.
        </p>
        <p>
          La garantie d'exécution s'applique pendant <Val>trente jours</Val>{" "}
          à compter de la date de l'intervention ; au-delà, toute nouvelle
          intervention fait l'objet d'un devis. La durée exacte et la portée
          de la garantie sont rappelées sur chaque devis.
        </p>
        <p>
          Les pièces neuves fournies bénéficient de la garantie du
          constructeur, aux conditions propres de chaque fabricant.
        </p>
      </LegalSection>

      {/* 13 -------------------------------------------------------------- */}
      <LegalSection
        index="13"
        title="Droit de rétractation (clients consommateurs)"
      >
        <p>
          Pour une prestation conclue à distance (téléphone, courriel,
          formulaire), le client consommateur bénéficie d'un droit de
          rétractation de <Val>quatorze jours</Val>, en application des
          articles L221-18 et suivants du Code de la consommation. Si une
          intervention doit débuter avant l'expiration de ce délai, sa
          renonciation expresse est recueillie par écrit avant l'entame de
          la prestation — le prestataire ne demande jamais ce renoncement de
          fait, par habitude.
        </p>
        <p>
          Les interventions réalisées à domicile pendant la présence du
          client, à sa demande expresse, ainsi que les travaux personnalisés
          en cours d'exécution selon devis, suivent les règles spécifiques
          prévues par ces mêmes articles.
        </p>
      </LegalSection>

      {/* 14 -------------------------------------------------------------- */}
      <LegalSection index="14" title="Annulation, report et imprévus">
        <p>
          Une annulation ou un report annoncé dans un délai raisonnable ne
          donne lieu à aucun frais. Après le départ du prestataire pour un
          rendez-vous, les frais de déplacement déjà engagés peuvent être
          dus. Réciproquement, le prestataire s'engage à avertir le client
          en cas de réajustement de son agenda.
        </p>
        <p>
          Si une intervention ne peut aboutir en réunion (accès refusé,
          matériel indisponible, licences manquantes), elle est simplement
          reprogrammée ; aucun supplément n'est facturé pour ces seules
          causes.
        </p>
      </LegalSection>

      {/* 15 -------------------------------------------------------------- */}
      <LegalSection index="15" title="Modification des CGPS">
        <p>
          Les présentes CGPS peuvent être modifiées. La version applicable à
          une prestation est celle en vigueur à la date du devis ou de la
          confirmation de l'intervention. La date de dernière mise à jour
          figure en tête de cette page ; toute modification substantielle
          est signalée sur le site.
        </p>
      </LegalSection>

      {/* 16 -------------------------------------------------------------- */}
      <LegalSection index="16" title="Droit applicable et litiges">
        <p>
          Les présentes CGPS sont soumises au droit français et sont
          intégralement rédigées en langue française.
        </p>
        <p>
          En cas de difficulté, une solution amiable est toujours recherchée
          en premier lieu : prenez contact, les coordonnées figurent sur la
          page <Lien to="/contact">Contact</Lien>. Les organismes officiels
          utiles (signalisation de litiges, CNIL) sont référencés sur la
          page <Lien to="/ressources/guides-liens">Liens utiles &amp; sécurité</Lien>.
        </p>
        <p>
          Conformément à l'article L612-1 du Code de la consommation, le
          client consommateur peut recourir gratuitement à un médiateur de
          la consommation, à condition de s'être préalablement adressé au
          prestataire par écrit.
        </p>
        <p>
          <Placeholder label="Médiateur de la consommation retenu : dénomination, adresse et modalités de saisine (adhésion en cours)" />
        </p>
      </LegalSection>
    </LegalPage>
  );
}
