/** @type {import('next').NextConfig} */
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const nextConfig = {
    trailingSlash : false,
    transpilePackages: ['@package/bug'],
    experimental:{
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/signin',
                permanent: false,
            },
        ]
    },
    webpack: config => {
        Object.assign(config.resolve.alias, {
            '@mongodb-js/zstd': false,
            '@aws-sdk/credential-providers': false,
            'snappy': false,
            'aws4': false,
            'mongodb-client-encryption': false,
            'kerberos': false,
            'supports-color': false
        });
        config.plugins.push(new FilterWarningsPlugin({
            exclude: [/the request of a dependency is an expression/]
        }));
        return config;
    },
    reactStrictMode: process.env.NODE_ENV !== "development"
};

module.exports = nextConfig
