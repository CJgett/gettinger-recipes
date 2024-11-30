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
                        value: [
                            "default-src 'self' https://blob.vercel-storage.com https://vercel.live",
                            "connect-src 'self' https://blob.vercel-storage.com https://vercel.live",
                            "img-src 'self' https://goxwrlx89aaxmikq.public.blob.vercel-storage.com",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
                            "script-src-elem 'self' 'unsafe-inline' https://vercel.live",
                            "style-src 'self' 'unsafe-inline'"
                        ].join('; ')
                    }
                ],
            },
        ];
    },
};

module.exports = nextConfig;
