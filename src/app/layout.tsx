import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "HYUK",
  description: "A motion design archive.",
};

const siteCursor = `url("${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/cursors/landing-arrow.svg") 2 2, auto`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ cursor: siteCursor }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
