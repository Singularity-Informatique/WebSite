import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Clock,
  Copy,
  FileText,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { INTERVENTION_CONDITIONS, SERVICES } from "@/data/services";
import { SITE, isEmailPlaceholder } from "@/config";
import Reveal from "@/components/Reveal";
import Picture from "@/components/Picture";
import Placeholder from "@/components/Placeholder";
import { usePageMeta } from "@/hooks/usePageMeta";
import { smoothScrollTo } from "@/utils/scroll";

const INPUT_CLASS =
  "w-full rounded-sm border border-bordure bg-noir2 px-4 py-3 text-sm text-blanc placeholder:text-texte2/70 transition-colors duration-300 hover:border-bordure/80 focus:border-orange2/60";

const LABEL_CLASS =
  "mb-2 block font-mono text-[11px] tracking-[0.18em] text-texte2 uppercase";

const TIPS = [
  "Indiquez le service ou l'équipement concerné.",
  "Précisez votre demande et ajoutez toute information utile à sa compréhension.",
];

/**
 * Longueur maximale du message. Le formulaire compose une URL `mailto:` :
 * au-delà de ~2 000 caractères d'URL, certains logiciels de messagerie
 * coupent le corps sans prévenir. À 1 200 caractères, l'URL complète
 * mesure ~1 530 caractères en texte simple et ~2 050 avec des accents :
 * c'est la limite pratique, l'URL n'étant plus illimitée comme avant.
 */
const MESSAGE_MAX = 1200;
/** Le compteur n'apparaît qu'à l'approche du plafond. */
const MESSAGE_COUNT_FROM = 1000;

/**
 * Plafonds des champs d'en-tête. Le nom et l'adresse sont recopiés dans
 * le corps du courriel : sans limite, ils peuvent à eux seuls faire
 * dépasser plusieurs milliers de caractères d'URL et faire tronquer le
 * message. 80 caractères de nom et 254 pour l'e-mail (maximum du
 * standard RFC 5321) laissent toute latitude aux cas réels.
 */
const NAME_MAX = 80;
const EMAIL_MAX = 254;

/**
 * Page de contact : moyens de contact configurés et formulaire
 * fonctionnel sans backend — il prépare un courriel via le protocole
 * mailto dans le logiciel de messagerie du visiteur. Aucune donnée
 * ne transite par le site. Après la tentative d'ouverture, un repli
 * manuel (adresse copiable, lien mailto direct) s'affiche : le site
 * n'affirme jamais qu'un message a bien été envoyé.
 */
export default function Contact() {
  usePageMeta(
    "Contact",
    "Un Besoin, Une Question, Un Projet ? Contactez Singularity : assistance, sécurité, sauvegarde et entretien informatique pour particuliers."
  );

  const [prepared, setPrepared] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle"
  );
  // Sujet = l'un des sept pôles de SERVICES (ou « Autre demande »).
  // Le menu « Service » est dérivé dynamiquement des prestations du pôle
  // choisi — aucune liste de services n'est codée ici (source unique : data/services.ts).
  const [subject, setSubject] = useState("");
  const [serviceRef, setServiceRef] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  const selectedCategory = SERVICES.find((s) => s.name === subject);
  const availableServices = selectedCategory?.prestations ?? [];

  const handleSubjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
    // Changement de sujet : le service choisi n'appartient plus à la liste,
    // on le réinitialise pour éviter un envoi incohérent.
    setServiceRef("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").slice(0, NAME_MAX);
    const email = String(data.get("email") ?? "").slice(0, EMAIL_MAX);
    const subject = String(data.get("subject") ?? "");
    const message = String(data.get("message") ?? "").slice(0, MESSAGE_MAX);

    // Service sélectionné : résolu par son identifiant unique (ref)
    // depuis la source unique de données.
    const service = SERVICES.flatMap((s) => s.prestations).find(
      (p) => p.ref === serviceRef
    );
    const serviceLine = service
      ? `Service souhaité : ${service.ref} — ${service.title}`
      : "";
    const mailtoSubject = service
      ? `[Site Singularity] ${subject} — ${service.ref} ${service.title}`
      : `[Site Singularity] ${subject}`;

    const body = [
      `Nom : ${name}`,
      `Adresse de réponse : ${email}`,
      ...(serviceLine ? [serviceLine] : []),
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      mailtoSubject
    )}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
    setCopyState("idle");
  };

  /**
   * Repli manuel : copie l'adresse dans le presse-papiers. Si l'API
   * Clipboard est indisponible (contexte non sécurisé, permission
   * refusée), un champ temporaire sélectionné prend le relais.
   */
  const copyEmail = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("presse-papiers indisponible");
      }
      await navigator.clipboard.writeText(SITE.email);
      setCopyState("copied");
    } catch {
      try {
        const field = document.createElement("textarea");
        field.value = SITE.email;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.top = "-1000px";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand("copy");
        document.body.removeChild(field);
        setCopyState(copied ? "copied" : "error");
      } catch {
        setCopyState("error");
      }
    }
  };

  return (
    <>
      {/* --------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b border-bordure pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="absolute -left-40 -top-24 h-112 w-md rounded-full bg-orange/8 blur-[130px]" />
        </div>
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="kicker">Contact</p>
            <h1 className="mt-5 max-w-xl font-display text-4xl leading-tight font-semibold tracking-normal text-blanc sm:text-5xl">
              <span className="block">Un Besoin,</span>
              <span className="block text-ambre">Une Question,</span>
              <span className="block text-orange">Un Projet ?</span>
            </h1>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {/* Le bouton ne compose plus de courriel : il conduit
                  directement à la formule en bas de page (défilement doux). */}
              <button
                type="button"
                onClick={() => smoothScrollTo("contact-form")}
                className="btn btn-primary cursor-pointer"
              >
                Écrire à Singularity
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <Link to="/" className="btn btn-ghost">
                Découvrir les services
              </Link>
            </div>
          </Reveal>

          <Reveal delay={150} className="relative">
            <div className="relative border border-bordure bg-surface/40 p-2">
              <Picture
                src="images/contact-desk.jpg"
                alt="Bureau sombre et feutré, ordinateur portable éclairé d'une lueur ambrée"
                className="aspect-4/3 w-full object-cover"
              />
              {/* Équerres d'angle */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-5 w-5 border-t-2 border-l-2 border-orange2"
              />
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 h-5 w-5 border-t-2 border-r-2 border-orange2"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-orange2"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-orange2"
              />
            </div>
            <div className="absolute -bottom-4 right-6 flex items-center gap-2.5 border border-bordure bg-noir px-4 py-2.5">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-orange2" />
              <span className="font-mono text-[10px] tracking-[0.22em] text-texte2 uppercase">
                Singularity
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------- Coordonnées + formulaire */}
      <section className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.25fr]">
          {/* Coordonnées */}
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-blanc">
              Coordonnées
            </h2>
            <ul className="mt-7 space-y-6">
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center border border-bordure bg-graphite text-orange2">
                  <Mail className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-texte2 uppercase">
                    Adresse e-mail
                  </p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="mt-1.5 inline-block text-sm break-all text-blanc transition-colors hover:text-ambre2"
                  >
                    {SITE.email}
                  </a>
                  {isEmailPlaceholder && (
                    <p className="mt-2 font-mono text-[10px] tracking-wider text-ambre2/80 uppercase">
                      Adresse provisoire — à compléter (voir README)
                    </p>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center border border-bordure bg-graphite text-orange2">
                  <Phone className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-texte2 uppercase">
                    Téléphone
                  </p>
                  {SITE.phone ? (
                    <a
                      href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                      className="mt-1.5 inline-block text-sm text-blanc transition-colors hover:text-ambre2"
                    >
                      {SITE.phone}
                    </a>
                  ) : (
                    <div className="mt-1.5">
                      <Placeholder label="À compléter" />
                    </div>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center border border-bordure bg-graphite text-orange2">
                  <MapPin className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-texte2 uppercase">
                    Zone d'intervention
                  </p>
                  {SITE.zone ? (
                    <p className="mt-1.5 text-sm text-blanc">{SITE.zone}</p>
                  ) : (
                    <div className="mt-1.5">
                      <Placeholder label="À préciser" />
                    </div>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center border border-bordure bg-graphite text-orange2">
                  <Clock className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-texte2 uppercase">
                    Disponibilités
                  </p>
                  {SITE.hours ? (
                    <p className="mt-1.5 text-sm text-blanc">{SITE.hours}</p>
                  ) : (
                    <div className="mt-1.5">
                      <Placeholder label="À préciser" />
                    </div>
                  )}
                </div>
              </li>
            </ul>

            <div className="mt-10 border border-bordure bg-graphite/50 p-6">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-orange2" aria-hidden="true" />
                <h3 className="font-display text-sm font-semibold text-blanc">
                  Avant d'écrire
                </h3>
              </div>
              <ul className="mt-4 space-y-2.5">
                {TIPS.map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 flex-none text-orange2"
                      aria-hidden="true"
                    />
                    <span className="text-xs leading-relaxed text-texte2">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Détails pratiques : mêmes références facilitent la réponse. Ici,
                le cadre de l'intervention (domicile, atelier, déplacement),
                dit une seule fois sur tout le site. */}
            <div className="mt-4 border border-bordure bg-graphite/50 p-6">
              <h3 className="font-mono text-[11px] font-medium tracking-[0.22em] text-ambre2 uppercase">
                Cadre d&apos;intervention
              </h3>
              <ul className="mt-4 grid list-none gap-3 p-0">
                {INTERVENTION_CONDITIONS.map((condition) => (
                  <li
                    key={condition.label}
                    className="grid grid-cols-[14px_1fr] items-start gap-2.5"
                  >
                    <span
                      aria-hidden="true"
                      className="text-[10px] leading-[1.9] text-ambre"
                    >
                      ▸
                    </span>
                    <span>
                      <span className="block font-mono text-[11.5px] font-medium text-blanc">
                        {condition.label}
                      </span>
                      <span className="block text-xs leading-relaxed text-texte2">
                        {condition.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Formulaire (mailto) */}
          <Reveal delay={120}>
            <form
              onSubmit={handleSubmit}
              id="contact-form"
              className="border border-bordure bg-graphite/70 p-6 scroll-mt-24 md:p-9"
              noValidate={false}
            >
              <h2 className="font-display text-2xl font-semibold text-blanc">
                Décrivez votre besoin
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-texte2">
                Ce formulaire prépare un message dans votre propre logiciel de
                messagerie : aucune donnée n'est transmise via le site.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={LABEL_CLASS}>
                    Votre nom
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    maxLength={NAME_MAX}
                    autoComplete="name"
                    placeholder="Ex. : Jack Sparrow"
                    className={INPUT_CLASS}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={LABEL_CLASS}>
                    Votre e-mail
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={EMAIL_MAX}
                    autoComplete="email"
                    placeholder="vous@exemple.fr"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-subject" className={LABEL_CLASS}>
                    Sujet de votre demande
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    value={subject}
                    onChange={handleSubjectChange}
                    className={INPUT_CLASS}
                  >
                    <option value="" disabled>
                      Choisir un sujet…
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s.slug} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value="Autre demande">Autre demande</option>
                  </select>
                </div>

                {/* Service choisi dynamiquement parmi les prestations du pôle
                    sélectionné — la liste reste vide tant qu'aucun sujet
                    n'est choisi. Identifiant unique : p.ref. */}
                <div>
                  <label htmlFor="contact-service" className={LABEL_CLASS}>
                    Sélectionner un service
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={serviceRef}
                    disabled={!selectedCategory}
                    onChange={(e) => setServiceRef(e.target.value)}
                    aria-describedby="contact-service-hint"
                    className={`${INPUT_CLASS} disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    {selectedCategory ? (
                      <>
                        <option value="" disabled>
                          Sélectionner un service…
                        </option>
                        {availableServices.map((p) => (
                          <option key={p.ref} value={p.ref}>
                            {p.ref} — {p.title}
                          </option>
                        ))}
                      </>
                    ) : subject === "Autre demande" ? (
                      <option value="">
                        Aucun service — précisez dans le message
                      </option>
                    ) : (
                      <option value="">
                        Choisissez d'abord un sujet…
                      </option>
                    )}
                  </select>
                  <p
                    id="contact-service-hint"
                    className="mt-2 font-mono text-[10px] tracking-wider leading-relaxed text-texte2/90 uppercase"
                  >
                    {selectedCategory
                      ? `${availableServices.length} service${availableServices.length > 1 ? "s" : ""} — pôle ${selectedCategory.number} : ${selectedCategory.name}`
                      : subject === "Autre demande"
                        ? "Aucun service à sélectionner : décrivez votre demande dans le message."
                        : "Les services correspondants s'affichent après le choix du sujet."}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="contact-message" className={LABEL_CLASS}>
                  Votre message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  maxLength={MESSAGE_MAX}
                  onChange={(e) =>
                    setMessageLength(
                      Math.min(e.target.value.length, MESSAGE_MAX)
                    )
                  }
                  aria-describedby={
                    messageLength >= MESSAGE_COUNT_FROM
                      ? "contact-message-count"
                      : undefined
                  }
                  placeholder="Expliquez-nous votre besoin ou votre situation en quelques mots…"
                  className={INPUT_CLASS}
                />
                {messageLength >= MESSAGE_COUNT_FROM && (
                  <p
                    id="contact-message-count"
                    className="mt-2 font-mono text-[10px] tracking-wider text-texte2/90 uppercase"
                  >
                    {messageLength} / {MESSAGE_MAX} caractères
                    {messageLength >= MESSAGE_MAX
                      ? " — plafond atteint, au-delà le courriel serait tronqué."
                      : ""}
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="btn btn-primary cursor-pointer">
                  Préparer le message
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Repli manuel : affiché après la tentative d'ouverture de la
                  messagerie. Le site ne peut pas savoir si un client mail
                  s'est réellement ouvert, il ne l'affirme donc pas. */}
              {prepared && (
                <div className="mt-6 border border-ambre2/40 bg-noir2/60 p-5">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-ambre2 uppercase">
                    Rien ne s&apos;est ouvert ?
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-texte2">
                    Certains postes n&apos;ont pas de messagerie configurée, et
                    le navigateur peut bloquer l&apos;ouverture. Vous pouvez
                    écrire directement à cette adresse :
                  </p>
                  <p className="mt-3 font-mono text-sm break-all text-blanc">
                    {SITE.email}
                  </p>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="btn btn-ghost cursor-pointer px-4 py-2 text-xs"
                    >
                      {copyState === "copied" ? (
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      {copyState === "copied"
                        ? "Adresse copiée"
                        : "Copier l'adresse"}
                    </button>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="btn btn-ghost px-4 py-2 text-xs"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      Ouvrir un nouveau courriel
                    </a>
                  </div>
                  <p
                    role="status"
                    aria-live="polite"
                    className="mt-3 font-mono text-[10px] tracking-wider leading-relaxed text-texte2/90"
                  >
                    {copyState === "copied" &&
                      "L'adresse est dans le presse-papiers."}
                    {copyState === "error" &&
                      "Copie automatique indisponible : sélectionnez l'adresse ci-dessus pour la copier."}
                  </p>
                </div>
              )}

              <p className="mt-6 border-t border-bordure/60 pt-5 text-xs leading-relaxed text-texte2/80">
                En validant, votre logiciel de messagerie tente de s&apos;ouvrir
                avec le message pré-rempli. Le courriel est envoyé depuis votre
                propre messagerie : les informations saisies ne transitent pas
                par ce site et n&apos;y sont pas conservées.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
