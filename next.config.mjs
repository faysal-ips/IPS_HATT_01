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
  async redirects() {
    return [
      { source: "/terms", destination: "/policy#terms", permanent: true },
      {
        source: "/privacy-policy",
        destination: "/policy#privacy",
        permanent: true,
      },
      {
        source: "/refund-policy",
        destination: "/policy#refund",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
