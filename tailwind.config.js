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
    safelist: ["bg-[#D9D9D9]", "bg-[#FFC4C4]", "bg-[#FFDE7B]", "bg-[#F5586A]"],
    plugins: [],
};
