import Link from 'next/link';
import { DICT, ROUTES, type Lang } from '@/lib/i18n';
import LegalPage, { linkClass, type LegalSection } from './LegalPage';

function sections(lang: Lang): LegalSection[] {
  const contact = <Link href={ROUTES[lang].contact} className={linkClass}>Contact</Link>;
  const githubPrivacy = (label: string) => (
    <a
      href={`https://docs.github.com/${lang}/site-policy/privacy-policies/github-general-privacy-statement`}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
    >
      {label}
    </a>
  );

  if (lang === 'en') {
    return [
      { title: '1. Data collected', body: <p><strong>An anonymous counter only.</strong> When a valid link is submitted, a Cloudflare Worker receives a counter name, with no personal data or TikTok link in the payload. Only the cumulative submission total is stored, regardless of whether retrieval succeeds. The application does not store IP addresses or collect anything else (no URL, no TikTok account, no individual tracking).</p> },
      {
        title: '2. Third-party services',
        body: (
          <>
            <p>Your browser talks directly to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>tikwm.com</strong>, which receives the pasted TikTok URL to extract the download links;</li>
              <li><strong>TikTok&apos;s servers</strong> (CDN), from which the file is downloaded;</li>
              <li><strong>Cloudflare</strong>, which runs the counter when a valid link is submitted, and sees your IP address to deliver the request and limit repeated calls;</li>
              <li><strong>GitHub Pages</strong>, which hosts the site and may log visitors&apos; IP addresses for security purposes (see {githubPrivacy('GitHub’s privacy statement')}).</li>
            </ul>
          </>
        ),
      },
      { title: '3. Local storage', body: <p>The current video&apos;s details are kept in your browser&apos;s <em>sessionStorage</em> while the download page is shown. They are cleared when the tab is closed and are never sent to us.</p> },
      { title: '4. Cookies and advertising', body: <p>This site sets no cookies and shows no ads.</p> },
      { title: '5. Contact', body: <p>For any question, see the {contact} page.</p> },
    ];
  }
  return [
    { title: '1. Données collectées', body: <p><strong>Un compteur anonyme uniquement.</strong> Lorsqu&apos;un lien valide est soumis, un Cloudflare Worker reçoit un nom de compteur, sans donnée personnelle ni lien TikTok dans le contenu envoyé. Seul le total cumulé des soumissions est conservé, même si la récupération échoue. L&apos;application ne conserve pas les adresses IP et ne collecte rien d&apos;autre (ni URL, ni compte TikTok, ni suivi individuel).</p> },
    {
      title: '2. Services tiers',
      body: (
        <>
          <p>Votre navigateur communique directement avec :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>tikwm.com</strong>, qui reçoit l&apos;URL TikTok collée pour en extraire les liens de téléchargement ;</li>
            <li><strong>les serveurs TikTok</strong> (CDN), d&apos;où le fichier est téléchargé ;</li>
            <li><strong>Cloudflare</strong>, qui exécute le compteur lorsqu&apos;un lien valide est soumis et voit votre adresse IP pour acheminer la requête et limiter les appels répétés ;</li>
            <li><strong>GitHub Pages</strong>, qui héberge le site et peut journaliser les adresses IP des visiteurs pour des raisons de sécurité (voir la {githubPrivacy('déclaration de confidentialité de GitHub')}).</li>
          </ul>
        </>
      ),
    },
    { title: '3. Stockage local', body: <p>Les informations de la vidéo en cours sont gardées dans le <em>sessionStorage</em> de votre navigateur le temps d&apos;afficher la page de téléchargement. Elles sont effacées à la fermeture de l&apos;onglet et ne nous sont jamais transmises.</p> },
    { title: '4. Cookies et publicités', body: <p>Ce site ne dépose aucun cookie et n&apos;affiche aucune publicité.</p> },
    { title: '5. Contact', body: <p>Pour toute question, voir la page {contact}.</p> },
  ];
}

export default function PrivacyView({ lang }: { lang: Lang }) {
  return (
    <LegalPage
      title={DICT[lang].meta.titles.privacy}
      sections={sections(lang)}
      updated={lang === 'en' ? 'Last updated: October 2026' : 'Dernière mise à jour : octobre 2026'}
    />
  );
}
