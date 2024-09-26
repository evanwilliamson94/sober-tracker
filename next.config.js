/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Adding Firebase Storage domain to the list of allowed image domains
  images: {
    domains: ['firebasestorage.googleapis.com'], // Add the Firebase Storage domain
  },

  async headers() {
    return [
      {
        source: '/(.*)', // Applies the caching to all routes
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Cache for 1 year
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
