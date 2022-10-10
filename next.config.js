/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: './',
  sassOptions: {
    includePaths: [path.join(__dirname), './'],
  },
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
