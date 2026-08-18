import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vedprakash Vishwakarma — Creative AI Lead',
  description:
    'Portfolio of Vedprakash Vishwakarma — Creative AI Lead specializing in generative AI production, creative direction, luxury branding, and next-generation multimedia systems.',
  keywords: [
    'Vedprakash Vishwakarma',
    'Creative AI Lead',
    'AI Production',
    'Generative AI',
    'Multimedia Design',
    'Creative Direction',
  ],
  authors: [{ name: 'Vedprakash Vishwakarma' }],
  creator: 'Vedprakash Vishwakarma',
  openGraph: {
    title: 'Vedprakash Vishwakarma — Creative AI Lead',
    description:
      'Portfolio of Vedprakash Vishwakarma — Creative AI Lead specializing in generative AI production, creative direction, luxury branding, and next-generation multimedia systems.',
    siteName: 'Vedprakash Vishwakarma Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vedprakash Vishwakarma — Creative AI Lead',
    description:
      'Portfolio of Vedprakash Vishwakarma — Creative AI Lead specializing in generative AI production, creative direction, luxury branding, and next-generation multimedia systems.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className} antialiased bg-white text-[#1d1d1f] overflow-x-hidden`}
        suppressHydrationWarning
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
