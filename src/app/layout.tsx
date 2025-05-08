import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});
import { ScrollHandler } from "@/components/scroll-handler";
import { BackgroundProvider } from "./background-provider";

export const metadata: Metadata = {
  title: "Portfolio | Developer",
  description:
    "Personal portfolio website showcasing skills, experiences, and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interSans.className}`} cz-shortcut-listen="true">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundProvider>
            <LanguageProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <div id="/" className="flex-1 py-8">
                  {children}
                </div>
                <Footer />
                <ScrollHandler />
              </div>
            </LanguageProvider>
          </BackgroundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
