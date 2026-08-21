/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/Banking',
        destination: '/banking',
        permanent: true,
      },
      {
        source: '/NetWorth',
        destination: '/net-worth',
        permanent: true,
      },
      {
        source: '/Budgeting',
        destination: '/budgeting',
        permanent: true,
      },
      {
        source: '/Goals',
        destination: '/goals',
        permanent: true,
      },
      {
        source: '/Calendar',
        destination: '/calendar',
        permanent: true,
      },
      {
        source: '/Profiles',
        destination: '/profiles',
        permanent: true,
      },
      {
        source: '/Dashboard',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/Investments',
        destination: '/investments',
        permanent: true,
      },
      {
        source: '/Contacts',
        destination: '/contacts',
        permanent: true,
      },
      {
        source: '/Settings',
        destination: '/settings',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
