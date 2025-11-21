import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import Navigation from "@/components/Navigation";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Habit Patch",
  description: "Where good habits grow, one day at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-main antialiased h-screen`}>
        <Providers>
          {/* <Navigation /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
