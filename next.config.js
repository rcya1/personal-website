/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      { source: '/projects', destination: '/', permanent: true },
      { source: '/posts', destination: '/#posts', permanent: true }
    ]
  }
}

module.exports = nextConfig
