/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "techcrunch.com",
        hostname: "localhost",
        hostname: "bloghub-backend-itag.onrender.com",
      },
    ],
  },
};

export default nextConfig;
