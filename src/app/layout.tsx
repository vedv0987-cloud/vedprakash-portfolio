import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import GrainOverlay from '@/components/ui/GrainOverlay';
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
  title: 'Vedprakash Vishwakarma — Creative AI Lead & Visual Content Architect',
  description:
    'International Portfolio of Vedprakash Vishwakarma — Creative AI Lead specializing in luxury real estate visual production, prompt engineering pipelines, and commercial cinematic multimedia.',
  keywords: [
    'Vedprakash Vishwakarma',
    'Creative AI Lead',
    'Visual Content Architect',
    'AI Production Director',
    'Generative AI Multimedia',
    'Luxury Real Estate Visuals',
    'Runway Gen-3',
    'Midjourney Director',
  ],
  authors: [{ name: 'Vedprakash Vishwakarma' }],
  creator: 'Vedprakash Vishwakarma',
  openGraph: {
    title: 'Vedprakash Vishwakarma — Creative AI Lead',
    description:
      'International Portfolio of Vedprakash Vishwakarma — Creative AI Lead specializing in generative AI production, creative direction, luxury branding, and next-generation multimedia systems.',
    siteName: 'Vedprakash Vishwakarma Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vedprakash Vishwakarma — Creative AI Lead',
    description:
      'International Portfolio of Vedprakash Vishwakarma — Creative AI Lead specializing in generative AI production, creative direction, luxury branding, and next-generation multimedia systems.',
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
        className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className} antialiased bg-[#fafafa] text-[#0a0a0c] overflow-x-hidden`}
        suppressHydrationWarning
      >
        <GrainOverlay />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
