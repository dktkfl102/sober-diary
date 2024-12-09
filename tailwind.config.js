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
    safelist: [
        "bg-[#FF1104]",
        "bg-[#E85F0C]",
        "bg-[#FFAA00]",
        "bg-[#E8D00C]",
        "bg-[#9BFF0D]",
    ],
    plugins: [],
};
