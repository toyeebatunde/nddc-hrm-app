/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '/',
  },
  trailingSlash: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/system',
  //       destination: '/system/usermanagement',
  //       permanent: true,
  //     },
  //   ]
  // },
}

export default nextConfig
