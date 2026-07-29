/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                oro: '#D4AF37',
                morado: '#4A154B',
                magenta: '#942768',
                azulClaro: '#87CEEB',
                beige: '#E6DAC3',
                crema: '#F9F6F0',
                blanco: '#FFFFFF',
                texto: '#2D1533', // Dark purple for reading text
                muted: '#8C8273', // Warm gray for less important text
            },
            fontFamily: {
                display: ['"Playfair Display"', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}