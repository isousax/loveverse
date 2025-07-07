/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        borel: ['Borel', 'sans-serif'],
        comicRelief: ['"Comic Relief"', 'cursive'], 
        eduNSWACTHandPre: ['"Edu NSW ACT Hand Pre"', 'cursive'],
        lilitaOne: ['"Lilita One"', 'cursive'],
      },
    },
  },
  animation: {
    'spin-slow': 'spin 20s linear infinite',
    floatingBg: 'floatingBg 120s linear infinite'
  },
  keyframes: {
    floatingBg: {
      '0%': { transform: 'translate(0, 0)' },
      '100%': { transform: 'translate(0, -100%)' }
    }
  },
  plugins: [],
}