const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack'); // ✅ Ensure webpack is imported
// Load environment variables
require('dotenv').config();

module.exports = {
  mode: 'production',

  // Entry points for your extension (TypeScript -> JavaScript)
  entry: {
    main: './src/main.tsx',
    content: './src/content.tsx',
    background: './src/background.ts',
    auth: './src/auth/AutheFrame.tsx',
    styles: './App.css', // ✅ Include App.css from the root directory
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // Outputs to main.js, content.js, etc.
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000, // Local dev server port
    open: true, // Automatically opens the browser
    hot: true, // Hot Module Replacement (HMR)
    compress: true, // Enable gzip compression
    historyApiFallback: true, // Support SPA routing
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/, // Transpile TS and TSX files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i, // Handle CSS
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        // Handle images (copies to dist/icons)
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'icons/[name][ext]',
        },
      },
    ],
  },

  plugins: [
      // ✅ Extract CSS to a separate file
      new MiniCssExtractPlugin({
        filename: '[name].css', // Outputs main.css, content.css, etc.
      }),
      
    new CopyPlugin({
      patterns: [
        { from: 'public', to: 'index.html' },
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'icons', to: 'icons' }, // Copy icons to output
      ],
    }),
      new webpack.DefinePlugin({
      'process.env.FIREBASE_HOSTING_URL': JSON.stringify(process.env.FIREBASE_HOSTING_URL),
      'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
      'process.env.CHROME_ID': JSON.stringify(process.env.CHROME_ID),
    }),


  ],
 

  devtool: 'source-map',
};
