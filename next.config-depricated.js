/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
	console.log('rewrites called');
    return [
      {
        source: '/nodeeditor/:path*',
        destination: 'https://nodeeditor.vercel.app/nodeeditor/:path*',
      },
    ];
  },
};

console.log('config loaded');
module.exports = nextConfig;