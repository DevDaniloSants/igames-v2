import type { Metadata } from "next";

import { Mulish } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "./_components/ui/sidebar";
import { ToastContainer } from "react-toastify";
import Header from "./_components/header";
import SessionProvider from "./_providers/session";
import { CategoryProvider } from "./_contexts/categories-context";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Igames - As últimas notícias do mundo gamer",
  description:
    "Fique por dentro das principais novidades, análises e lançamentos do universo dos jogos no Igames.",
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
            <CategoryProvider>
              <Header />
              <main className="flex h-full w-dvw justify-center p-2 md:p-5">
                {children}
              </main>
            </CategoryProvider>
          </SidebarProvider>
        </SessionProvider>
        <ToastContainer theme="dark" />
      </body>
    </html>
  );
}
