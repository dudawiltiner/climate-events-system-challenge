import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import Providers from "../context/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sistema de Monitoramento Climático - i4sea",
  description: "Monitoramento em tempo real de eventos climáticos",
  keywords: ["clima", "monitoramento", "eventos", "tempo real", "i4sea"],
  authors: [{ name: "i4sea" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${roboto.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
