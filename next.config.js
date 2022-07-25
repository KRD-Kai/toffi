/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["react-daisyui"]);

const nextConfig = {
    reactStrictMode: true,
    images: {
        loader: "akamai",
        path: "",
    },
};

module.exports = nextConfig;
