import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Prevents cross-site scripting (XSS) attacks
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Prevents clickjacking by blocking iframe embedding from other sites
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Prevents MIME-sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Controls how much referrer info is sent with requests
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          // Enforces HTTPS
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ];
  },
};

export default nextConfig;
