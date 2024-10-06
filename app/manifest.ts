import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: process.env.NEXT_PUBLIC_SITE_NAME,
    short_name: process.env.NEXT_PUBLIC_SITE_NAME,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#11181d',
    theme_color: '#11181d',
    icons: [
      {
        src: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/favicon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
