/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#f6faf4",
                    100: "#eef5e8",
                    200: "#deebd1",
                    300: "#c7deac",
                    400: "#abc4aa",
                    500: "#8fb597",
                    600: "#6fa082",
                    700: "#588570",
                    800: "#486d5f",
                    900: "#3b574d",
                    DEFAULT: "#ABC4AA",
                },
                secondary: {
                    50: "#f4f3f2",
                    100: "#e4e1de",
                    200: "#c9c3bc",
                    300: "#a89f96",
                    400: "#8a7f74",
                    500: "#766b60",
                    600: "#675D50",
                    700: "#564d43",
                    800: "#474038",
                    900: "#3a342e",
                    DEFAULT: "#675D50",
                },
                tertiary: {
                    50: "#f5f3f1",
                    100: "#ede9e4",
                    200: "#ddd4ca",
                    300: "#cbb4a0",
                    400: "#A9907F",
                    500: "#8b7355",
                    600: "#675d50",
                    700: "#554c43",
                    800: "#47403a",
                    900: "#3c3530",
                    DEFAULT: "#A9907F",
                },
            },
            fontFamily: {
                display: ["var(--font-display)", "cursive"],
                sans: ["var(--font-sans)", "system-ui", "sans-serif"],
            },
            fontSize: {
                "heading-1": ["3.5rem", { lineHeight: "1.1", fontWeight: "700" }],
                "heading-2": ["2.5rem", { lineHeight: "1.2", fontWeight: "600" }],
                "heading-3": ["2rem", { lineHeight: "1.3", fontWeight: "600" }],
                "heading-4": ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
            },
            spacing: {
                section: "6rem",
                "section-sm": "3rem",
            },
            animation: {
                "fade-in-up": "fadeInUp 0.6s ease-out forwards",
                "fade-in": "fadeIn 0.6s ease-out forwards",
                "scale-in": "scaleIn 0.6s ease-out forwards",
            },
            keyframes: {
                fadeInUp: {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(30px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                fadeIn: {
                    "0%": {
                        opacity: "0",
                    },
                    "100%": {
                        opacity: "1",
                    },
                },
                scaleIn: {
                    "0%": {
                        opacity: "0",
                        transform: "scale(0.95)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "scale(1)",
                    },
                },
            },
        },
    },
    plugins: [],
};
