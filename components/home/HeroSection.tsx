'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Loader2, Link as LinkIcon } from 'lucide-react';
import { fetchTikTokVideo, countVideoSubmission } from '@/lib/tiktok';
import { isValidTikTokUrl, sanitizeString } from '@/lib/security';
import { DICT, ROUTES, type Lang } from '@/lib/i18n';

export default function HeroSection({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    const cleanUrl = sanitizeString(url);
    if (!cleanUrl) {
      setError(t.hero.errEmpty);
      return;
    }
    if (!isValidTikTokUrl(cleanUrl)) {
      setError(t.hero.errInvalid);
      return;
    }

    countVideoSubmission();
    setLoading(true);
    try {
      const result = await fetchTikTokVideo(cleanUrl);

      if (!result.success || !result.video) {
        setError(t.errors[result.error || 'invalid']);
        return;
      }

      // Store result in sessionStorage for the download page
      sessionStorage.setItem('tiktok_video', JSON.stringify(result.video));
      router.push(ROUTES[lang].download);
    } catch {
      setError(t.errors.unavailable);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-20 px-4">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-600/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand-800/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-950 border border-brand-800 px-3 py-1 text-xs text-brand-300">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
          {t.hero.badge}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
          {t.hero.titleBefore}
          <span className="text-brand-500">TikTok</span>
          {t.hero.titleAfter}
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          {t.hero.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <div className="relative flex-1">
            <LinkIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.tiktok.com/@user/video/..."
              className="w-full rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-semibold px-6 py-3 text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> {t.hero.loading}</>
            ) : (
              <><Download className="h-4 w-4" /> {t.hero.submit}</>
            )}
          </button>
        </form>

        {error && (
          <p className="mt-3 text-sm text-red-400 animate-fade-in">{error}</p>
        )}
      </div>
    </section>
  );
}
