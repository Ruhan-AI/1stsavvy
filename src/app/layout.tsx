import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { InitialSplashScreen } from '@/components/brand/InitialSplashScreen';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'First Savvy — From Stars to Legacy | Family & Personal Finance',
    template: '%s | First Savvy',
  },
  description:
    'First Savvy brings family money management and personal finance into one connected experience. From earning stars and saving allowances to budgets, accounts, and net worth.',
  keywords: [
    'Family finance',
    'Financial education for kids',
    'Chore tracker',
    'Star rewards',
    'Kids allowance app',
    'Personal finance management',
    'Net worth tracker',
    'Household budgeting',
  ],
  authors: [{ name: 'First Savvy' }],
  creator: 'First Savvy',
  metadataBase: new URL('https://1stsavvy.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://1stsavvy.com',
    siteName: 'First Savvy',
    title: 'First Savvy — From Stars to Legacy',
    description:
      'The connected platform for family financial education and personal finance management.',
    images: [
      {
        url: '/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: 'First Savvy — From Stars to Legacy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'First Savvy — From Stars to Legacy',
    description:
      'The connected platform for family financial education and personal finance management.',
    images: ['/brand/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/brand/logo-mark.png', type: 'image/png' },
      { url: '/brand/logo-mark.png' },
    ],
    apple: '/brand/logo-mark.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/brand/logo-mark.png" type="image/png" />
      </head>
      <body className="min-h-screen bg-[#F9F7F8] dark:bg-[#1A232E] text-[#1D2D42] dark:text-slate-100 font-sans antialiased">
        <InitialSplashScreen />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
