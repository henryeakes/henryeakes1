/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: "/listen/feed.xml", destination: "/listen/feed" }];
  },
};

module.exports = nextConfig;
