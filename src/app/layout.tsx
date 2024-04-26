import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import Example from "@/layouts/home";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QRify | Home",
  description:
    "Transforming events with hassle-free ticketing solutions, ensuring every attendee's experience is unforgettable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
