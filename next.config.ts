import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
      ignoreDuringBuilds: true,
  },
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        port: '',
        pathname: '/storage/v1/**',
      },
    ],
    domains: ['placehold.co']    
  }
};

export default nextConfig;
