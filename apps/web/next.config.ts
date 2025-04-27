import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui'],
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

export default nextConfig
