/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "ips-hatt-01.local",
        pathname: "/wp-content/uploads/**",
      },
    ],
    // Local WordPress (.local) private IP te resolve hoy, tai dev e eta lagbe
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
