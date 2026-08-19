import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import { siteConfig } from '@/data/portfolio';
import { getSiteUrl } from '@/lib/site-url';
import './globals.css';

const siteUrl = getSiteUrl();

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${sans.variable} ${serif.variable} font-sans antialiased bg-[#ffffff] text-[#1d1d1f] overflow-x-hidden selection:bg-[#0071e3] selection:text-white`}
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
