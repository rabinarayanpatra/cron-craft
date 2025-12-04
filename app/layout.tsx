import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CronCraft - Visual Cron Generator",
    template: "%s | CronCraft",
  },
  description: "The ultimate visual cron expression generator. Build, parse, and schedule cron jobs with a modern, intuitive interface. Supports seconds, presets, and natural language search.",
  keywords: ["cron", "cron generator", "cron schedule", "visual cron", "cron expression", "developer tools", "scheduler", "next.js", "react"],
  authors: [{ name: "CronCraft Team" }],
  creator: "CronCraft",
  publisher: "CronCraft",
  metadataBase: new URL("https://cron-craft.rabinarayanpatra.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cron-craft.rabinarayanpatra.com",
    title: "CronCraft - Visual Cron Generator",
    description: "Build, parse, and schedule cron jobs with a modern, intuitive interface.",
    siteName: "CronCraft",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "CronCraft Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CronCraft - Visual Cron Generator",
    description: "Build, parse, and schedule cron jobs with a modern, intuitive interface.",
    images: ["/preview.png"],
    creator: "@croncraft",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        {children}
      </body>
    </html>
  );
}
