/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: process.env.NEXT_PUBLIC_PROTOCOL,
                hostname: process.env.NEXT_PUBLIC_HOSTNAME,
                port: "",
                pathname: process.env.NEXT_PUBLIC_PATHNAME,
            },
        ],
    },
};

export default nextConfig;
