const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    'postcss-preset-env',
    'tailwindcss/nesting',
    tailwindcss('./tailwind.config.js'),
  ],
};
