import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/AppContext";
import { FloatingSparkles } from "@/components/ui/floating-sparkles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LexVault | Privacy-Preserving Evidence Vault",
  description: "Verify authenticity without revealing confidential evidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased relative overflow-x-hidden`}>
        <FloatingSparkles className="fixed inset-0 z-0 opacity-50" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <AppProvider>
            {children}
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
