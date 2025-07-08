import type { Metadata } from "next";
import "./globals.css";
import "./override.css";

import { ReactQueryProvider } from '@/components/provider/ReactQueryProvider'



export const metadata: Metadata = {
  title: "Binarytree | Your Tech Portfolio Simplified",
  description: "Showcase your technical prowess, Impress Recruiters, Get more interviews, Land your dream job",
  icons: {
    icon: '/favicon.ico',
  },

  openGraph: {
    title: 'Binarytree',
    description: "Showcase your technical prowess, Impress Recruiters, Get more interviews, Land your dream job",
    url: 'https://www.binarytree.me', // Your website's full URL
    siteName: 'Binarytree',
    images: [
      {
        url: '/binarytree-logo.png', // Path to your image in the public folder
        width: 1200,
        height: 630,
      },
    ],
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
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>

      </body>
    </html>
  );
}
