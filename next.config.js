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
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; connect-src 'self' https://blob.vercel-storage.com; img-src 'self' https://goxwrlx89aaxmikq.public.blob.vercel-storage.com",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
