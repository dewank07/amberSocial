import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PostProvider } from "@/context/ApisData";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amber Social",
  description: "Transforming the social experience with the power of Amber.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PostProvider>
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </PostProvider>
  );
}
