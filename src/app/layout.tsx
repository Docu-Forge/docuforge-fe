import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/elements/Footer';
import { Navbar } from '@/components/elements/Navbar';
import { Suspense } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title:
    'DocuForge | Generate Legal Documents & Digital Signatures Effortlessly',
  description:
    'DocuForge is an innovative platform that simplifies legal document creation and digital signing. With advanced features, high security, and an intuitive interface, DocuForge helps you manage your documents quickly, securely, and in compliance with regulations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body className={`${poppins.className} overflow-x-hidden min-h-screen`}>
        <Suspense>
          <Navbar />
          <Toaster />
          <main className="w-full min-h-screen bg-white">{children}</main>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
