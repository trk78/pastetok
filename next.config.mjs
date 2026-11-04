/** @type {import('next').NextConfig} */
// Fully static export for GitHub Pages (served under /pastetok).
// Static export: the tikwm API and the TikTok CDN allow CORS, so retrieval runs in the browser.
const nextConfig = {
  output: 'export',
  basePath: '/pastetok',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
