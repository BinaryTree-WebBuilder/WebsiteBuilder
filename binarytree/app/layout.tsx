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
