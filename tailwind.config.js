/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "node_modules/daisyui/dist/**/*.js",
        "{layouts,pages,components}/**/*.{j,t}s*",
    ],
    plugins: [require("daisyui")],
};
