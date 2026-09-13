import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Bilder lastet opp i Sanity serveres herfra. Har ingen effekt før
    // Sanity er koblet på; lokale bilder under /public går utenom.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    formats: ["image/avif", "image/webp"],
    // Ekstra små breddesteg slik at mobil henter et lettere bilde i stedet
    // for å hoppe rett til 640 px, og en lavere kvalitet enn standard 75.
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [68, 75],
  },
  poweredByHeader: false,
  async redirects() {
    // Produktet het tidligere «elektrisk-golfbil». Gamle og bokmerkede
    // lenker skal fortsatt lande på den nye adressen.
    return [
      {
        source: "/produkter/elektrisk-golfbil",
        destination: "/produkter/elektriske-golfbiler-og-nyttekjoretoy",
        permanent: true,
      },
      {
        source: "/en/products/elektrisk-golfbil",
        destination: "/en/products/elektriske-golfbiler-og-nyttekjoretoy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
