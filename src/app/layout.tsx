import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

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
  title: 'Vedprakash Vishwakarma — Creative AI Lead & Visual Content Architect',
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
  openGraph: {
    title: 'Vedprakash Vishwakarma — Creative AI Lead',
    description:
      'Executive portfolio of Vedprakash Vishwakarma — Creative AI Lead specializing in luxury real estate visual production, architectural CGI, and commercial cinematic multimedia.',
    siteName: 'Vedprakash Vishwakarma Portfolio',
    locale: 'en_US',
    type: 'website',
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
        className={`${sans.variable} ${serif.variable} font-sans antialiased bg-[#ffffff] text-[#1d1d1f] overflow-x-hidden selection:bg-[#0071e3] selection:text-white`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
