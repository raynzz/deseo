/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'hoztlat-regalos.6vlrrp.easypanel.host',
                port: '',
                pathname: '/assets/**',
            },
        ],
    },
};

module.exports = nextConfig;
