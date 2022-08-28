const { withSuperjson } = require('next-superjson')

/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	reactStrictMode: true,
	swcMinify: true,
	async redirects() {
		return []
	},
	experimental: {
		images: {
			allowFutureImage: true,
		},
	},
}

module.exports = withSuperjson()(nextConfig)
