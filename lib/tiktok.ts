import type { TikTokErrorCode } from './i18n';

export interface TikTokVideo {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  thumbnail: string;
  duration: number;
  plays: number;
  likes: number;
  noWatermarkUrl: string;
  watermarkUrl: string;
  audioUrl: string;
}

export interface TikTokApiResponse {
  success: boolean;
  video?: TikTokVideo;
  error?: TikTokErrorCode;
}

// Using tikwm.com public API — no key required.
// Called straight from the browser (tikwm returns Access-Control-Allow-Origin: *).
const TIKWM_ORIGIN = 'https://www.tikwm.com';
const TIKWM_API = `${TIKWM_ORIGIN}/api/`;
const STATS_ENDPOINT = 'https://compteurs.timeo-jeannin.workers.dev';

export function countVideoSubmission(): void {
  void fetch(STATS_ENDPOINT + '/hit', {
    method: 'POST',
    keepalive: true,
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ nom: 'pastetok-videos' }),
  }).catch(() => {}); // Statistics must never interrupt a submission.
}

// tikwm sometimes returns relative paths (/video/media/...) instead of absolute CDN URLs
function absolute(url: unknown): string {
  if (typeof url !== 'string' || !url) return '';
  try {
    const parsed = new URL(url.startsWith('/') ? TIKWM_ORIGIN + url : url);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : '';
  } catch {
    return '';
  }
}

export async function fetchTikTokVideo(url: string): Promise<TikTokApiResponse> {
  try {
    const response = await fetch(TIKWM_API, {
      method: 'POST',
      // "Simple" request (form-urlencoded, no custom header): no CORS preflight
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ url, hd: '1' }).toString(),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return { success: false, error: 'unavailable' };
    }

    const data = await response.json();

    if (data.code !== 0 || !data.data) {
      const msg = typeof data?.msg === 'string' ? data.msg.toLowerCase() : '';
      if (msg.includes('private') || msg.includes('privé')) {
        return { success: false, error: 'private' };
      }
      if (msg.includes('not found') || msg.includes('deleted')) {
        return { success: false, error: 'not_found' };
      }
      // tikwm answers a bad or dead link with code -1 and "Url parsing is failed"
      if (msg.includes('parsing')) {
        return { success: false, error: 'invalid' };
      }
      return { success: false, error: 'unavailable' };
    }

    const d = data.data;
    const noWatermarkUrl = absolute(d.play) || absolute(d.wmplay);
    if (!noWatermarkUrl) {
      return { success: false, error: 'unavailable' };
    }

    return {
      success: true,
      video: {
        id: d.id || '',
        title: d.title || '',
        author: d.author?.nickname || d.author?.unique_id || 'Inconnu',
        authorAvatar: absolute(d.author?.avatar),
        thumbnail: absolute(d.cover || d.origin_cover),
        duration: d.duration || 0,
        plays: d.play_count || 0,
        likes: d.digg_count || 0,
        noWatermarkUrl,
        watermarkUrl: absolute(d.wmplay || d.play),
        audioUrl: absolute(d.music),
      },
    };
  } catch {
    return { success: false, error: 'unavailable' };
  }
}

/**
 * Downloads a remote file as `filename`. The TikTok CDN allows CORS:
 * fetch → blob → <a download>. If the fetch fails (CORS, network), the URL opens
 * in a new tab so the user can save the file manually.
 */
export async function downloadFile(url: string, filename: string): Promise<'saved' | 'opened'> {
  try {
    const res = await fetch(url, { referrerPolicy: 'no-referrer' });
    if (!res.ok) throw new Error(String(res.status));
    const blobUrl = URL.createObjectURL(await res.blob());
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
    return 'saved';
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer');
    return 'opened';
  }
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}
