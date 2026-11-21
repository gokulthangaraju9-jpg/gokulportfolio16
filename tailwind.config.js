/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        script:  ['Dancing Script', 'cursive'],
      },
      colors: {
        // Vibrant Orange & Amber Palette from reference image
        brand: {
          blue:       '#FF6D00',
          deepBlue:   '#C63702',
          gold:       '#FFB300',
          brightGold: '#FFA000',
          orange:     '#FF7A00',
          darkOrange: '#D84315',
        },
        cyber: {
          bg:        '#FF6D00',
          bgLight:   '#FFE0B2',
          navy:      '#C63702',
          navyDark:  '#2E1305',
          cream:     '#FFF8E7',
          amber:     '#FFB300',
        },
        text: {
          main:      '#2E1305',
          secondary: '#C63702',
          light:     '#FFFFFF',
        },
        bg: {
          main: '#FF6D00',
        },
        glass: {
          white:  'rgba(255, 255, 255, 0.75)',
          strong: 'rgba(255, 255, 255, 0.90)',
          border: 'rgba(255, 255, 255, 0.85)',
        },
        accent: '#FF6D00',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #FF7A00 0%, #FF5722 50%, #E64A19 100%)',
        'glass-panel':    'linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,248,231,0.75))',
        'amber-glow':     'radial-gradient(circle, #FFB300 0%, #FF8F00 75%, transparent 100%)',
      },
      boxShadow: {
        'premium': '0 20px 60px rgba(198, 55, 2, 0.18)',
        'nav':     '0 15px 50px rgba(198, 55, 2, 0.15)',
        'card':    '0 10px 36px rgba(255, 109, 0, 0.22)',
        'btn':     '0 6px 20px rgba(230, 74, 25, 0.40)',
        'float':   '0 12px 40px rgba(255, 109, 0, 0.28)',
      },
    },
  },
  plugins: [],
}
