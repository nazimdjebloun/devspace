import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
// import { Providers } from "@/app/sessionProviders";
// import { SessionProvider } from "./SessionContext";
import QueryProvider from "@/app/QueryProvider";
import { getServerSession } from "@/lib/auth";
import Header from "@/components/header/header";
import { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Blogs",
  description: "A blog platform made for developers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          <div className="pt-20">
            <QueryProvider>
              {children}
              <Toaster />
            </QueryProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
