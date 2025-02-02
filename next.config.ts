import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	rewrites: async () => {
		return [
			{
				source: "/articulos/:article",
				destination: "/articulos/grupo-articulos/:article",
			},
		]
	},
}

export default nextConfig
