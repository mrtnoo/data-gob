import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Display serif con carácter — usada con restricción en titulares
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600"],
});

// Cuerpo de texto utilitario
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

// Métricas, IDs, datos en vivo — refuerza que esto es una empresa de datos
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "DATA/GOB — Consultoría de datos",
  description:
    "Plataformas, pipelines y dashboards que convierten datos en decisiones.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}