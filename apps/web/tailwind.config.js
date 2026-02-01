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
                    50: "#f5f3f1",
                    100: "#ede9e4",
                    200: "#ddd4ca",
                    300: "#cbb4a0",
                    400: "#a9907e",
                    500: "#8b7355",
                    600: "#675d50",
                    700: "#554c43",
                    800: "#47403a",
                    900: "#3c3530",
                    DEFAULT: "#675d50",
                },
                secondary: {
                    50: "#faf8f6",
                    100: "#f3ede8",
                    200: "#e8ddd2",
                    300: "#d9c9b2",
                    400: "#a9907e",
                    500: "#8b7355",
                    600: "#6f5f50",
                    700: "#5d4f45",
                    800: "#50443c",
                    900: "#453a32",
                    DEFAULT: "#A9907E",
                },
                tertiary: {
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
