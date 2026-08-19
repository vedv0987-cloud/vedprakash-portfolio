import type { Metadata } from 'next';
import { DM_Sans, JetBrains_Mono } from 'next/font/google';
import { siteConfig } from '@/data/portfolio';
import { getSiteUrl } from '@/lib/site-url';
import './globals.css';

const siteUrl = getSiteUrl();

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: 'Vedprakash Vishwakarma — Creative AI Lead & Visual Content Architect',
    template: '%s — Vedprakash Vishwakarma',
  },
  description:
    'Executive portfolio of Vedprakash Vishwakarma — Creative AI Lead specializing in luxury real estate visual production, architectural CGI, and commercial cinematic multimedia.',
  keywords: [
    'Vedprakash Vishwakarma',
    'Creative AI Lead',
    'Visual Content Architect',
    'Luxury Real Estate CGI',
    'AI Film Director',
    'Multimedia Lead Mumbai',
  ],
  authors: [{ name: 'Vedprakash Vishwakarma' }],
  creator: 'Vedprakash Vishwakarma',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Vedprakash Vishwakarma — Creative AI Lead',
    description:
      'Executive portfolio of Vedprakash Vishwakarma — Creative AI Lead specializing in luxury real estate visual production, architectural CGI, and commercial cinematic multimedia.',
    siteName: 'Vedprakash Vishwakarma Portfolio',
    locale: 'en_US',
    type: 'website',
    ...(siteUrl ? { images: [{ url: '/images/hero-bg.jpg', alt: 'Vedprakash Vishwakarma creative portfolio' }] } : {}),
  },
  twitter: { card: 'summary_large_image', title: 'Vedprakash Vishwakarma — Creative AI Lead', description: 'Creative AI direction, CGI, and commercial visual production.' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${sans.variable} ${mono.variable} font-sans antialiased bg-background text-text-main selection:bg-accent selection:text-white`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: siteConfig.name,
              jobTitle: 'Creative AI Lead',
              email: siteConfig.email,
              address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
              sameAs: [siteConfig.linkedin, siteConfig.behance],
            }),
          }}
        />
      </body>
    </html>
  );
}
