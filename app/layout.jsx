import "./globals.css";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SITE } from "../lib/site";

const serif = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Henry Eakes — College Football & NFL Writing",
    template: "%s · Henry Eakes",
  },
  description: SITE.description,
  authors: [{ name: SITE.name, url: SITE.url }],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    title: "Henry Eakes — College Football & NFL Writing",
    description: SITE.description,
    url: "/",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.xHandle,
    title: "Henry Eakes — College Football & NFL Writing",
    description: SITE.description,
    images: [SITE.ogImage],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c1b33",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <Header />
        <div id="content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
