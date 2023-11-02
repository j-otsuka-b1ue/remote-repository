const config = {
  mode: 'production', // "production" | "development" | "none"
  resolve: {
    extensions: ['*', '.mjs', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ]
  }
}

module.exports = {
  //...
  module: {
    rules: [
      //...
      { test: /\.json$/, type: 'json' },
    ],
  }
  //...
}

// module.exports = config