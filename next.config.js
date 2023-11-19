/** @type {import('next').NextConfig} */
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin")

const nextConfig = {
  trailingSlash: false,
  reactStrictMode: false,

  transpilePackages: ["@package/bug"],
  env: {
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
        port: "",
        pathname: "/f/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/signin",
        permanent: false,
      },
    ]
  },
  webpack: (config) => {
    Object.assign(config.resolve.alias, {
      "@mongodb-js/zstd": false,
      "@aws-sdk/credential-providers": false,
      snappy: false,
      aws4: false,
      "mongodb-client-encryption": false,
      kerberos: false,
      "supports-color": false,
    })
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: [/the request of a dependency is an expression/],
      })
    )
    return config
  },
  reactStrictMode: process.env.NODE_ENV !== "development",
}

module.exports = nextConfig
