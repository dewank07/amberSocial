import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import Example from "@/layouts/home";
import { PostProvider } from "@/context/postData";
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
    <ClerkProvider>
      <PostProvider>
        <html lang='en'>
          <body className={inter.className}>{children}</body>
        </html>
      </PostProvider>
    </ClerkProvider>
  );
}
