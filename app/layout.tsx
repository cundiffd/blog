import "./globals.css";

import { Inter } from "next/font/google";
import { themeEffect } from "./theme-effect";
import { Analytics } from "./analytics";
import { Header } from "./header";
import { Footer } from "./footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dakarai Cundiff",
  description:
    "Dakarai Taye Cundiff is driven by a deep passion for technology and aspires to share this passion with the world.",
  openGraph: {
    title: "Dakarai Cundiff's blog",
    description:
      "Dakarai Taye Cundiff is driven by a deep passion for technology and aspires to share this passion with the world.",
    url: "https://dakarai.org",
    siteName: "Dakarai Cundiff's blog",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dakaraicundiff",
    creator: "@dakaraicundiff",
  },
  metadataBase: new URL("https://dakarai.org"),
};

export const viewport = {
  themeColor: "transparent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} antialiased`}
      suppressHydrationWarning={true}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();`,
          }}
        />
      </head>

      <body className="dark:text-gray-100 max-w-2xl m-auto">
        <main className="p-6 pt-3 md:pt-6 min-h-screen">
          <Header />
          {children}
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
