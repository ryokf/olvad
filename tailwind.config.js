/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.jsx",
        "./resources/**/*.js",
        "node_modules/flowbite-react/lib/esm/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light:"#ACC4AB",
                    medium : "#6B916A",
                    dark: "#123311",
                },
                secondary: {
                    light: "#A9907E",
                    dark: "#42352B",
                },
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
