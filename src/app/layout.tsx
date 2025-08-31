import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sonja Pengili",
  description: "Portfolio showcasing my skills and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
