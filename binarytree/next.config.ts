import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
      return [
        {
          source: '/',           // The incoming path pattern
          destination: '/main',  // The path to redirect to
          permanent: true,       // Use true for 308 Permanent Redirect (SEO friendly)
        },
      ];
    },
};

export default nextConfig;
