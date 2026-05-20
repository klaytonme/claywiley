import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/nodeeditor/:path*',
				destination: 'https://nodeeditor.vercel.app/:path*',
			},
		];
	},
};

export default nextConfig;
