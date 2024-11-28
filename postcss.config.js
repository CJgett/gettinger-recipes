module.exports = {
  plugins: {
    'postcss-preset-env': {
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'gap-properties': true,
        'logical-properties-and-values': true,
        // Add other features as needed here!
      },
      // You can specify browser support
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
    }
  }
}
