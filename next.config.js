/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'goxwrlx89aaxmikq.public.blob.vercel-storage.com',
                port: '',
            },
        ],
    },
};

module.exports = nextConfig;
