const mix = require('laravel-mix');
const webpack = require('webpack');

const webpackConfig = {
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    })
  ],
  module: {
    rules: [
      {
        resolve: {
            fullySpecified: false
        }
      }
    ]
  },
  resolve: {
    fallback: {
      crypto: false,
      path: false,
      fs: false,
      buffer: false,
      os: false,
      https: false,
      http: false,
      stream: false
    }
}};

mix
  .setPublicPath("./public")
  .webpackConfig(webpackConfig)
  .sass("app/styles/style.scss", "public/styles")
  .ts('app/app.tsx', 'public/js')
  .copy('app/assets', 'public/assets')
  .copy('app/index.html', 'public')
  .copy('app/index.html', 'api')
  .react()
  .sourceMaps();
