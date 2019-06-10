const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function generateConfig(name) {
  var uglify = name.indexOf('min') > -1;
  var config = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: name + '.js',
      sourceMapFilename: name + '.map'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Custom template',
        // Load a custom template (lodash by default)
        template: 'src/index.html',
        inject: 'my-app',
        filename: '../index.html'
      })
    ]
  };
  config.optimization = {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `webpack.${packageName.replace('@', '')}`;
          }
        }
      }
    }
  };
  if (uglify) {
    config.optimization.minimize = true;
    config.mode = 'production';
  }
  return config;
}

module.exports = (env) => {
  switch (env) {
    case 'test': return {
      mode: 'development',
      entry: './test/index.ts',
      output: {
        path: path.resolve(__dirname, 'test'),
        filename: 'index.js',
        sourceMapFilename: 'index.map'
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js']
      },
      module: {
        rules: [{
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }]
      }
    };
    case 'production': return generateConfig('index.min');
    default: return generateConfig('index');
  }
}
