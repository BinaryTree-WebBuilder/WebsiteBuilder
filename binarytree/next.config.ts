import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
      return [
        {
          source: '/',           // The incoming path pattern
          destination: '/main',
          permanent: true,       // Use true for 308 Permanent Redirect (SEO friendly)
        },
        {
          source: '/auth/:path*',
          destination: '/main/waitlist',
          permanent: true,
        },

        // {
        //   source: '/builder/:path*',
        //   destination: '/main/waitlist',
        //   permanent: true,
        // },
      ];
    },
};

export default nextConfig;
