/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["react-daisyui"]);

const nextConfig = withTM({
    reactStrictMode: true,
});

module.exports = nextConfig;
