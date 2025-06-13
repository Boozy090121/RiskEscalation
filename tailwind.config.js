/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pci-blue': '#0051BA',
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
      },
      screens: {
        'xs': '375px',
      }
    },
  },
  plugins: [],
}