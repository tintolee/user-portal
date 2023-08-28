/** @type {import('tailwindcss').Config} */
const {
  default: defaultFontFamily
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('@sendsprint/design-system/foundations/typography/fontFamily');

const extendedColors = {
  lightBlue: '#BCE5F7',
  darkBlue: '#0E397C'
};

const spacingValues = {
  200: '200px',
  220: '220px',
  250: '250px',
  280: '280px',
  300: '300px',
  320: '320px',
  350: '350px',
  400: '400px',
  500: '500px',
  600: '600px',
  700: '700px',
  800: '800px',
  900: '900px',
  1000: '1000px',
  1100: '1100px',
  '10vh': '10vh',
  '20vh': '20vh',
  '30vh': '30vh',
  '40vh': '40vh',
  '50vh': '50vh',
  '60vh': '60vh',
  '70vh': '70vh',
  '80vh': '80vh',
  '85vh': '85vh',
  '90vh': '90vh',
  '10%': '10%',
  '20%': '20%',
  '30%': '30%',
  '40%': '40%',
  '50%': '50%',
  '60%': '60%',
  '70%': '70%',
  '80%': '80%',
  '90%': '90%',
  max: 'max-content',
  fit: 'fit-content'
};

// eslint-disable-next-line no-undef
module.exports = {
  presets: [require('@sendsprint/design-system/tailwind.config')],
  prefix: 'ss-',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    textColor: (theme) => ({
      ...theme('colors'),
      ...extendedColors
    }),
    backgroundColor: (theme) => ({
      ...theme('colors'),
      ...extendedColors
    }),
    extend: {
      screens: {
        xl: '1280px'
      },
      minWidth: {
        ...spacingValues
      },
      maxWidth: {
        ...spacingValues
      },
      minHeight: {
        ...spacingValues
      },
      maxHeight: {
        ...spacingValues
      },
      spacing: {
        ...spacingValues
      },
      fontFamily: {
        body: ['Avenir', ...defaultFontFamily.body],
        heading: ['Outer Sans', ...defaultFontFamily.heading]
      },
      keyframes: {
        loading: {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(0)'
          }
        }
      },
      animation: {
        loading1st: 'loading 3s ease-in-out infinite',
        loading2nd: 'loading 3s ease-in-out -1.5s infinite'
      },
      scale: {
        200: '2'
      },
      boxShadow: {
        'virtual-acct-info-index': '0px 0px 50px 4px rgba(0, 0, 0, 0.12)'
      }
    }
  },
  darkMode: 'class', // or 'media' or false
  plugins: [],
  purge: [
    './src/**/*.ts',
    './src/**/*.tsx',
    './src/**/*.js',
    './src/**/*.jsx',
    './node_modules/@sendsprint/ui-react/**/*.js',
    './src/**/*.css',
    './public/**/*.html'
  ]
};
