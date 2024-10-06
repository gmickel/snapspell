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
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} - AI-Powered Image Generation with Flux 1.1 Pro`,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
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
  authors: [
    {
      name: process.env.NEXT_PUBLIC_AUTHOR_NAME,
      url: process.env.NEXT_PUBLIC_AUTHOR_URL,
    },
  ],
  creator: process.env.NEXT_PUBLIC_AUTHOR_NAME,
  publisher: process.env.NEXT_PUBLIC_AUTHOR_NAME,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || ''),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    title: `${process.env.NEXT_PUBLIC_SITE_NAME} - AI-Powered Image Generation with Flux 1.1 Pro`,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${process.env.NEXT_PUBLIC_SITE_NAME} - AI-Powered Image Generation with Flux 1.1 Pro`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${process.env.NEXT_PUBLIC_SITE_NAME} - AI-Powered Image Generation with Flux 1.1 Pro`,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    creator: process.env.NEXT_PUBLIC_AUTHOR_TWITTER,
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
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
    languages: {
      'en-US': process.env.NEXT_PUBLIC_SITE_URL,
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
