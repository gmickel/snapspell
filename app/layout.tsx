import type React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'SnapSpell - AI-Powered Image Generation with Flux 1.1 Pro',
  description:
    'Transform your words into stunning visuals with SnapSpell, powered by Flux 1.1 Pro. Experience lightning-fast, high-quality AI image generation from text prompts.',
  keywords: [
    'AI',
    'image generation',
    'text-to-image',
    'artificial intelligence',
    'creative tool',
    'digital art',
    'Flux 1.1 Pro',
    'fast image generation',
    'high-quality AI images',
  ],
  authors: [{ name: 'Gordon Mickel', url: 'https://mickel.tech' }],
  creator: 'Gordon Mickel',
  publisher: 'Gordon Mickel',
  metadataBase: new URL('https://snapspell.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://snapspell.ai',
    siteName: 'SnapSpell',
    title: 'SnapSpell - AI-Powered Image Generation with Flux 1.1 Pro',
    description:
      'Experience lightning-fast, high-quality AI image generation with SnapSpell, powered by Flux 1.1 Pro.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SnapSpell - AI-Powered Image Generation with Flux 1.1 Pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SnapSpell - AI-Powered Image Generation with Flux 1.1 Pro',
    description:
      'Experience lightning-fast, high-quality AI image generation with SnapSpell, powered by Flux 1.1 Pro.',
    creator: '@gmickel',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://snapspell.ai',
    languages: {
      'en-US': 'https://snapspell.ai',
      // Add other language versions if available
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-512x512.png' },
      { url: '/favicon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#11181d',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
