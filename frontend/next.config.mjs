/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "techcrunch.com",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
