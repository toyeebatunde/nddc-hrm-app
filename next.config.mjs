/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '/',
  },
  trailingSlash: true,
  env: {
    base: "https://employer-api.nddc.gov.ng/"
  }
}

export default nextConfig
