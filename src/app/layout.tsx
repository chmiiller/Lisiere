import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { LisiereStoreProvider } from '@/store-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lisière - Add EXIF info to your photos',
  description: 'Lisière adds the EXIF info from your photo to your image',
  applicationName: 'Lisière',
  keywords: [
    'EXIF',
    'Photography',
    'ISO',
    'fstop',
    'shutter speed',
    'photo',
    'picture',
    'border',
  ],
  authors: [{ name: 'Carlos Zinato', url: 'https://github.com/chmiiller' }],
  creator: 'Carlos Zinato',
  publisher: 'Carlos Zinato',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LisiereStoreProvider>{children}</LisiereStoreProvider>
      </body>
    </html>
  );
}
