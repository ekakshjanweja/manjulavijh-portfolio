import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHost = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;

const nextConfig: NextConfig = {
  images: {
    qualities: [70, 72, 75],
    ...(supabaseHost
      ? {
          remotePatterns: [
            {
              protocol: "https",
              hostname: supabaseHost,
              pathname: "/storage/v1/object/public/portfolio-images/**",
            },
          ],
        }
      : {}),
  },
};
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
