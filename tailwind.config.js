/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./src/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            pretendard: ["Pretendard", "sans-serif"],
        },
        extend: {
            width: {
                "47/100": "47%",
            },
            maxWidth: {
                10: "10rem",
            },
        },
    },
    safelist: [],
    plugins: [],
};
