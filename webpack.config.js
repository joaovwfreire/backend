{
    test: /\.scss$/,
    use: [
      'style-loader',  <-----
      MiniCssExtractPlugin.loader, <------
      'css-loader',
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          implementation: require('node-sass'),
        },
      },
    ],
  },