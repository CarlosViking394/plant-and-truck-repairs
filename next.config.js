/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Qualities used by next/image across the site (Next 16 requires
    // non-default values to be declared here)
    qualities: [75, 80, 85, 90],
  },
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
}

module.exports = nextConfig
