import type { Metadata } from "next";

import { Mulish } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "./_components/ui/sidebar";

import Header from "./_components/header";
import SessionProvider from "./_providers/session";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-Br">
      <body className={`${mulish.className} dark antialiased`}>
        <SessionProvider>
          <SidebarProvider>
            <Header />
            <main className="flex h-full w-dvw justify-center p-2 md:p-5">
              {children}
            </main>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
