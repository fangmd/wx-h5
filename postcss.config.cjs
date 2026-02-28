module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport-8-plugin': {
      viewportWidth: 750,
      viewportUnit: 'vw',
      unitPrecision: 5,
      minPixelValue: 1,
      mediaQuery: false,
    },
  },
}
