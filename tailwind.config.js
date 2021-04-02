module.exports = {
  purge: ['./src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      gridTemplateRows: {
        pancake: 'auto 1fr auto',
      },
      translate: {'-3/2': '150%', '3/2': '150%'},
    },
  },
  variants: {
    scrollbar: ['rounded', 'dark'],
  },
  plugins: [require('tailwind-scrollbar')],
};
