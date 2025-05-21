/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#FF6B35',
          50: '#FFECE5',
          100: '#FFDACC',
          200: '#FFB599',
          300: '#FF9066',
          400: '#FF6B35', // Primary orange
          500: '#FF4B09',
          600: '#D13800',
          700: '#9E2B00',
          800: '#6B1D00',
          900: '#380F00',
        },
        black: {
          DEFAULT: '#1A1A1A',
          50: '#F2F2F2',
          100: '#E6E6E6',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A',
        },
      },
      animation: {
        'fadeIn': 'fadeIn 1s ease-in-out',
        'slideDown': 'slideDown 0.3s ease-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
};