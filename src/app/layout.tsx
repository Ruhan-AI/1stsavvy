import type { Metadata, Viewport } from 'next';
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

/**
 * Responsive viewport contract — docs/responsive-system.md §13.
 * Kept in its own `viewport` export (Next 14 warns when these keys live in `metadata`).
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9F7F8' },
    { media: '(prefers-color-scheme: dark)', color: '#1A232E' },
  ],
};

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
    'COPPA compliant family finance',
  ],
  authors: [{ name: 'First Savvy' }],
  creator: 'First Savvy',
  publisher: 'First Savvy',
  metadataBase: new URL('https://1stsavvy.com'),
  alternates: {
    canonical: 'https://1stsavvy.com',
  },
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
    icon: '/brand/logo-mark.png',
    apple: '/brand/logo-mark.png',
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
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://1stsavvy.com/#organization',
      name: 'First Savvy',
      alternateName: ['1stSavvy', 'FirstSavvy', '1st Savvy'],
      url: 'https://1stsavvy.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://1stsavvy.com/brand/logo-mark.png',
      },
      sameAs: [
        'https://twitter.com/1stsavvy',
        'https://github.com/Ruhan-AI/1stsavvy',
      ],
      description: 'Family financial education and personal finance management platform.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://1stsavvy.com/#website',
      url: 'https://1stsavvy.com',
      name: 'First Savvy',
      publisher: {
        '@id': 'https://1stsavvy.com/#organization',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://1stsavvy.com/#software',
      name: 'First Savvy',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web, iOS, Android',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Connected platform for kids chore & star tracking, allowance automation, household budgeting, and net worth calculation.',
      provider: {
        '@id': 'https://1stsavvy.com/#organization',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#F9F7F8] dark:bg-[#1A232E] text-[#1D2D42] dark:text-slate-100 font-sans antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <InitialSplashScreen />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
