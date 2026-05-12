import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CaseCursor } from "@/components/ui/CaseCursor";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Anna Yarigina — Product Designer",
  description: "Portfolio of Anna Yarigina, product designer focused on digital experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${dmSans.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#FDFDFF]">
        <CaseCursor />
        <Header />
        <main className="flex-1" style={{ paddingTop: 72 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
