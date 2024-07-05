// import path from 'path';
// import { fileURLToPath } from 'url';
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    // poweredByHeader: false,
    // distDir: "dist/next",
    // webpack: (config) => {
    //     config.resolve.alias['@'] = path.resolve(__dirname, './src');
    //     return config;
    // },
    images: {
        // loader: "custom",
        // loaderFile: "./src/services/loader.js",
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
