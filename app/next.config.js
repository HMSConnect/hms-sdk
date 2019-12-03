
require('dotenv').config()

const withCSS = require('@zeit/next-css')
const withStylus = require('@zeit/next-stylus')
const path = require('path')                                                      
const Dotenv = require('dotenv-webpack')    

const env = process.env.NODE_ENV.trim() || 'development';
module.exports = withStylus({
  webpack(config, options) {
    return config
  }
});

module.exports = withCSS({
  cssModules: false,
  webpack (config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    })

    config.module.rules.push({
      // Transpile ES6 to ES5 with babel
      // Remove if your app does not use JSX or you don't need to support old browsers
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [/node_modules/],
      options: {
        presets: ['@babel/preset-react']
      }
    })

    // Read the .env file   
    config.plugins.push(                                                    
      new Dotenv({                                                       
        path: path.join(__dirname, ('.env.'+env)),                                       
        systemvars: true                                                          
      })                                               
    )

    return config
  }
})