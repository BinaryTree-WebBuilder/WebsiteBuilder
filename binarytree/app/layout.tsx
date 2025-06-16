import type { Metadata } from "next";
import "./globals.css";
import "./override.css";



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
        {/* <Providers> */}
          {children}
        {/* </Providers> */}
      </body>
    </html>
  );
}
