/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        'node_modules/daisyui/dist/**/*.js',
        'node_modules/react-daisyui/dist/**/*.js',
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                //light
                highlight: 'gray-500',
                mediumlight: '#c2bfc7',
                smalllight: '#f4f4f5',
                //dark
                hightDark: 'slate-800',
                mediumDark: 'slate-700',
                smallDark: 'slate-500',
            }
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                lighting: {
                    "primary": "#6b7280",
                    "secondary": "#c2bfc7",
                    "accent": "#f4f4f5",
                    "neutral": "#2b3440",
                    "base-100": "#ffffff",
                    "info": "#60a5fa",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                },
                darkness: {
                    "primary": "#cbd5e1",
                    "secondary": "#334155",
                    "accent": "#209187",
                    "neutral": "#2b3440",
                    "base-100": "#1e293b",  //Background
                    "info": "#1e40af", //btn
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                },
            },
        ],
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
        prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    },
}
