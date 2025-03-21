import type { NextConfig } from "next";
import { keepAliveCalcs } from "@/server-actions/acoustic-calcs";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Call keepAliveCalcs when the server starts
      keepAliveCalcs();
    }
    return config;
  },
};

export default nextConfig;
