import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Bilder lastet opp i Sanity serveres herfra. Har ingen effekt før
    // Sanity er koblet på; lokale bilder under /public går utenom.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
