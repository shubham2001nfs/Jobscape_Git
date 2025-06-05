/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        'mine-shaft': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#2d2d2d',
        },
        'web-orange': {
          '50': '#fffcea',
          '100': '#fff5c5',
          '200': '#ffeb85',
          '300': '#ffda46',
          '400': '#ffc71b',
          '500': '#ffa500',
          '600': '#e27c00',
          '700': '#bb5502',
          '800': '#984208',
          '900': '#7c360b',
          '950': '#481a00',
        },
      },
      screens: {
        'xsm': '350px',
        'xs': '476px',
        'sm': '640px',
        'md': '768px',
        'bs': '900px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '2xl-mx': { 'max': '1535px' },
        'xl-mx': { 'max': '1279px' },
        'lg-mx': { 'max': '1023px' },
        'bs-mx': { 'max': '899px' },
        'md-mx': { 'max': '767px' },
        'sm-mx': { 'max': '639px' },
        'xs-mx': { 'max': '475px' },
        'xsm-mx': { 'max': '349px' },
      },
      keyframes: {
        'option-animation': {
          '0%': { transform: 'translateY(-10%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'option-animation': 'option-animation 200ms ease forwards',
      },
    },
  },
  plugins: [],
}
