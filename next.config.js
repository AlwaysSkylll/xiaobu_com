const withPlugins = require('next-compose-plugins');
const less = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const image = require('next-images')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");


const nextConfig = {
  // distDir: 'dist',
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // Perform customizations to webpack config
    // Important: return the modified config
    // if (!isServer) {
    //   config.externals = {
    //     AMap: 'AMap',
    //     AMapUI: 'AMapUI',
    //     ECharts: 'echarts',
    //   }
    // }
    // iconfont support
    config.module.rules.push({
      test: /\.(woff|svg|eot|ttf)\??.*$/,
      loader: 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]',
    })

    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }

    return config;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  }
};

module.exports = withPlugins([
  [less, {
    cssModules: true,
    javascriptEnabled: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]",
    },
    // postcssLoaderOptions: {
    //   parser: true,
    //   config: {
    //     ctx: {
    //       // theme: JSON.stringify(process.env.REACT_APP_THEME)
    //       options: {}
    //     }
    //   }
    // }
  }],
  [withCss, {

  }],
  [image, {
    inlineImageLimit: 16384,
  }],
  [withBundleAnalyzer, {
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: './bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: './bundles/client.html'
      }
    }
  }]
], nextConfig);
