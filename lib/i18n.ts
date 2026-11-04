// UI strings and localized routes. French lives at the root, English under /en.
export type Lang = 'fr' | 'en';
export const LANGS: Lang[] = ['fr', 'en'];

export type PageKey = 'home' | 'download' | 'contact' | 'legal' | 'terms' | 'privacy';

export const ROUTES: Record<Lang, Record<PageKey, string>> = {
  fr: {
    home: '/',
    download: '/download/',
    contact: '/contact/',
    legal: '/mentions-legales/',
    terms: '/cgu/',
    privacy: '/politique-de-confidentialite/',
  },
  en: {
    home: '/en/',
    download: '/en/download/',
    contact: '/en/contact/',
    legal: '/en/legal-notice/',
    terms: '/en/terms/',
    privacy: '/en/privacy/',
  },
};

/** Finds the language and page of a path (without basePath), e.g. "/en/terms/" → en / terms. */
export function matchRoute(pathname: string): { lang: Lang; page: PageKey } {
  const path = pathname.endsWith('/') ? pathname : pathname + '/';
  for (const lang of LANGS) {
    for (const [page, route] of Object.entries(ROUTES[lang]) as [PageKey, string][]) {
      if (route === path) return { lang, page };
    }
  }
  return { lang: path.startsWith('/en/') ? 'en' : 'fr', page: 'home' };
}

export type TikTokErrorCode = 'private' | 'not_found' | 'invalid' | 'unavailable';

const fr = {
  meta: {
    siteTitle: 'PasteTok — Téléchargeur de vidéos TikTok gratuit',
    homeTitle: 'PasteTok — Téléchargeur de vidéos TikTok gratuit, sans filigrane',
    description:
      'Téléchargez des vidéos TikTok gratuitement en HD, sans filigrane ou en MP3. Rapide, gratuit, sans inscription.',
    ogDescription: 'Téléchargez des vidéos TikTok gratuitement en HD, sans filigrane ou en MP3.',
    keywords: ['télécharger tiktok', 'tiktok sans filigrane', 'tiktok downloader', 'télécharger vidéo tiktok', 'tiktok mp3'],
    locale: 'fr_FR',
    appDescription: 'Téléchargeur de vidéos TikTok gratuit',
    titles: {
      download: 'Télécharger la vidéo',
      contact: 'Contact',
      legal: 'Mentions légales',
      terms: "Conditions Générales d'Utilisation",
      privacy: 'Politique de confidentialité',
    },
  },
  nav: { home: 'Accueil', contact: 'Contact', switchTo: 'English version' },
  hero: {
    badge: 'Gratuit · Sans inscription · Sans filigrane',
    titleBefore: 'Téléchargez vos vidéos ',
    titleAfter: '',
    subtitle: "Collez le lien d'une vidéo TikTok et téléchargez-la en HD, avec ou sans filigrane, ou en MP3.",
    submit: 'Télécharger',
    loading: 'Chargement…',
    errEmpty: 'Collez une URL TikTok ici.',
    errInvalid: 'URL invalide. Seules les URLs TikTok (tiktok.com, vm.tiktok.com) sont acceptées.',
  },
  errors: {
    private: 'Cette vidéo est privée.',
    not_found: 'Vidéo introuvable ou supprimée.',
    invalid: 'Impossible de récupérer la vidéo. Vérifiez le lien.',
    unavailable: 'Le service est temporairement indisponible. Réessayez dans quelques instants.',
  } satisfies Record<TikTokErrorCode, string>,
  how: {
    title: 'Comment ça marche ?',
    subtitle: "En 3 étapes simples, téléchargez n'importe quelle vidéo TikTok publique.",
    step: 'Étape',
    steps: [
      { title: 'Copiez le lien', description: 'Ouvrez TikTok, appuyez sur "Partager" puis "Copier le lien" sur la vidéo souhaitée.' },
      { title: 'Collez & analysez', description: 'Collez l\'URL dans le champ ci-dessus et cliquez sur "Télécharger". Notre outil récupère la vidéo en quelques secondes.' },
      { title: 'Téléchargez', description: 'Choisissez le format : vidéo sans filigrane, avec filigrane, ou audio MP3. Votre fichier est prêt !' },
    ],
  },
  faq: {
    title: 'Questions fréquentes',
    items: [
      { q: 'Est-ce gratuit ?', a: 'Oui, PasteTok est entièrement gratuit et sans inscription.' },
      { q: 'Comment supprimer le filigrane TikTok ?', a: 'Choisissez l\'option "Sans filigrane" sur la page de téléchargement. Notre outil utilise l\'URL de streaming originale sans watermark.' },
      { q: 'Puis-je télécharger des vidéos privées ?', a: 'Non. Seules les vidéos publiques peuvent être téléchargées. Les vidéos privées ou supprimées ne sont pas accessibles.' },
      { q: 'Quel est le nombre maximum de téléchargements ?', a: 'Aucune limite de notre côté. Le service tiers qui extrait les vidéos (tikwm.com) peut toutefois limiter les requêtes trop rapprochées.' },
      { q: 'Stockez-vous mes vidéos ?', a: 'Non. Aucune vidéo ne passe par nos serveurs : votre navigateur récupère le fichier directement depuis les serveurs TikTok. Seul un compteur anonyme est envoyé lorsqu\'un lien est soumis.' },
      { q: "C'est légal ?", a: "PasteTok est un outil de téléchargement personnel. Vous êtes responsable du respect des droits d'auteur. N'utilisez pas les vidéos téléchargées à des fins commerciales sans l'accord des créateurs." },
    ],
  },
  download: {
    back: 'Télécharger une autre vidéo',
    notFound: 'Aucune vidéo trouvée.',
    backHome: "Retour à l'accueil",
    tipsTitle: 'Conseils',
    tips: [
      'Choisissez "Sans filigrane" pour une meilleure qualité',
      'Sur mobile, appuyez longuement pour sauvegarder',
      'Le MP3 extrait uniquement la bande sonore',
      'Respectez les droits des créateurs',
    ],
  },
  options: {
    heading: 'Choisissez votre format :',
    recommended: 'RECOMMANDÉ',
    noWatermark: { label: 'Sans filigrane', description: 'Vidéo HD originale sans logo TikTok' },
    watermark: { label: 'Avec filigrane', description: 'Vidéo avec le filigrane TikTok' },
    audio: { label: 'Audio MP3', description: 'Extraire uniquement la musique' },
    opened: "Le fichier s'est ouvert dans un nouvel onglet : utilisez « Enregistrer » (ou appui long sur mobile).",
  },
  preview: { fallbackTitle: 'Vidéo TikTok', views: 'vues' },
  contact: {
    title: 'Contact',
    text: 'Une question, un bug ou une idée ? PasteTok est open source : ouvrez une issue sur GitHub.',
    button: 'Ouvrir une issue sur GitHub',
  },
  footer: {
    tagline: 'Téléchargez des vidéos TikTok gratuitement, sans filigrane. Outil tiers non affilié à TikTok.',
    links: 'Liens',
    legal: 'Mentions légales',
    terms: 'CGU',
    privacy: 'Politique de confidentialité',
    contact: 'Contact',
    legalTitle: 'Légal',
    legalText: "PasteTok ne stocke aucune vidéo. Respectez les droits d'auteur et les ",
    tiktokTerms: 'CGU de TikTok',
    rights: 'Tous droits réservés.',
  },
};

export type Dict = typeof fr;

const en: Dict = {
  meta: {
    siteTitle: 'PasteTok — Free TikTok video downloader',
    homeTitle: 'PasteTok — Free TikTok video downloader, no watermark',
    description:
      'Download TikTok videos for free in HD, without watermark or as MP3. Fast, free, no sign-up.',
    ogDescription: 'Download TikTok videos for free in HD, without watermark or as MP3.',
    keywords: ['tiktok downloader', 'download tiktok', 'tiktok no watermark', 'download tiktok video', 'tiktok mp3'],
    locale: 'en_US',
    appDescription: 'Free TikTok video downloader',
    titles: {
      download: 'Download the video',
      contact: 'Contact',
      legal: 'Legal notice',
      terms: 'Terms of Use',
      privacy: 'Privacy policy',
    },
  },
  nav: { home: 'Home', contact: 'Contact', switchTo: 'Version française' },
  hero: {
    badge: 'Free · No sign-up · No watermark',
    titleBefore: 'Download ',
    titleAfter: ' videos',
    subtitle: 'Paste a TikTok video link and download it in HD, with or without watermark, or as MP3.',
    submit: 'Download',
    loading: 'Loading…',
    errEmpty: 'Paste a TikTok URL here.',
    errInvalid: 'Invalid URL. Only TikTok URLs (tiktok.com, vm.tiktok.com) are accepted.',
  },
  errors: {
    private: 'This video is private.',
    not_found: 'Video not found or deleted.',
    invalid: "Couldn't fetch the video. Check the link.",
    unavailable: 'The service is temporarily unavailable. Please try again in a moment.',
  },
  how: {
    title: 'How does it work?',
    subtitle: 'Download any public TikTok video in 3 simple steps.',
    step: 'Step',
    steps: [
      { title: 'Copy the link', description: 'Open TikTok, tap "Share" then "Copy link" on the video you want.' },
      { title: 'Paste & fetch', description: 'Paste the URL in the field above and click "Download". The video is fetched in a few seconds.' },
      { title: 'Download', description: 'Pick a format: video without watermark, with watermark, or MP3 audio. Your file is ready!' },
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      { q: 'Is it free?', a: 'Yes, PasteTok is completely free and requires no sign-up.' },
      { q: 'How do I remove the TikTok watermark?', a: 'Pick the "No watermark" option on the download page. The tool uses the original, watermark-free streaming URL.' },
      { q: 'Can I download private videos?', a: 'No. Only public videos can be downloaded. Private or deleted videos are not accessible.' },
      { q: 'Is there a download limit?', a: 'Not on our side. The third-party service that extracts videos (tikwm.com) may however throttle requests made too close together.' },
      { q: 'Do you store my videos?', a: 'No. No video goes through our servers: your browser fetches the file straight from TikTok\'s servers. Only an anonymous counter is sent when a link is submitted.' },
      { q: 'Is it legal?', a: 'PasteTok is a personal download tool. You are responsible for respecting copyright. Do not use downloaded videos commercially without the creators\' consent.' },
    ],
  },
  download: {
    back: 'Download another video',
    notFound: 'No video found.',
    backHome: 'Back to home',
    tipsTitle: 'Tips',
    tips: [
      'Pick "No watermark" for the best quality',
      'On mobile, long-press to save',
      'MP3 extracts the soundtrack only',
      "Respect creators' rights",
    ],
  },
  options: {
    heading: 'Choose your format:',
    recommended: 'RECOMMENDED',
    noWatermark: { label: 'No watermark', description: 'Original HD video without the TikTok logo' },
    watermark: { label: 'With watermark', description: 'Video with the TikTok watermark' },
    audio: { label: 'MP3 audio', description: 'Extract the music only' },
    opened: 'The file opened in a new tab: use "Save" (or long-press on mobile).',
  },
  preview: { fallbackTitle: 'TikTok video', views: 'views' },
  contact: {
    title: 'Contact',
    text: 'A question, a bug or an idea? PasteTok is open source: open an issue on GitHub.',
    button: 'Open an issue on GitHub',
  },
  footer: {
    tagline: 'Download TikTok videos for free, without watermark. Third-party tool, not affiliated with TikTok.',
    links: 'Links',
    legal: 'Legal notice',
    terms: 'Terms of use',
    privacy: 'Privacy policy',
    contact: 'Contact',
    legalTitle: 'Legal',
    legalText: 'PasteTok stores no videos. Respect copyright and ',
    tiktokTerms: "TikTok's Terms of Service",
    rights: 'All rights reserved.',
  },
};

export const DICT: Record<Lang, Dict> = { fr, en };
