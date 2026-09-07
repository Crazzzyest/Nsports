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
};

export default nextConfig;
