import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
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
    default: 'FirstSavvy — From Stars to Legacy | Family & Personal Finance',
    template: '%s | FirstSavvy',
  },
  description:
    'FirstSavvy brings family money management and personal finance into one connected experience. From earning stars and saving allowances to budgets, accounts, and net worth.',
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
  authors: [{ name: 'FirstSavvy' }],
  creator: 'FirstSavvy',
  metadataBase: new URL('https://1stsavvy.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://1stsavvy.com',
    siteName: 'FirstSavvy',
    title: 'FirstSavvy — From Stars to Legacy',
    description:
      'The connected platform for family financial education and personal finance management.',
    images: [
      {
        url: '/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FirstSavvy — From Stars to Legacy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FirstSavvy — From Stars to Legacy',
    description:
      'The connected platform for family financial education and personal finance management.',
    images: ['/brand/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/brand/logo-mark.svg', type: 'image/svg+xml' },
      { url: '/brand/favicon.ico' },
    ],
    apple: '/brand/apple-touch-icon.png',
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
        <link rel="icon" href="/brand/logo-mark.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-[#F9F7F8] dark:bg-[#1A232E] text-[#1D2D42] dark:text-slate-100 font-sans antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
