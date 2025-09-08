import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DatabaseProvider } from '../components/DatabaseContext';
import Navigation from '../components/Navigation';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netflix Admin - Streaming Analytics",
  description: "Professional streaming platform analytics dashboard with real-time insights and comprehensive data visualization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <DatabaseProvider>
          <div className="min-h-screen">
            <Navigation />
            <main className="pt-20">
              {children}
            </main>
          </div>
        </DatabaseProvider>
      </body>
    </html>
  );
}