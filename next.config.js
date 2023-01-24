/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '/',
  },
  async redirects() {
    return [
      {
        source: '/system',
        destination: '/system/usermanagement',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
