import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import { Analytics } from "@vercel/analytics/react";

const departureMono = localFont({
  src: "../../public/fonts/DepartureMono-Regular.woff2",
  variable: "--font-departure",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://4mag.art'),
  title: "4MAG — Art Printed Magazine · 4 The Culture",
  description: "In a world that scrolls, we print. Independent art magazine from São Paulo. Sign up to get the next issue.",
  openGraph: {
    title: "4MAG — Art Printed Magazine",
    description: "In a world that scrolls, we print.",
    url: "https://4mag.art",
    siteName: "4MAG",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "4MAG — Art Printed Magazine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "4MAG — Art Printed Magazine",
    description: "In a world that scrolls, we print.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${departureMono.variable} h-full`}
    >
      <body className="min-h-full overflow-x-hidden">
        <LenisProvider>
          <CustomCursor />
          {children}
          <Analytics />
        </LenisProvider>
      </body>
    </html>
  );
}
