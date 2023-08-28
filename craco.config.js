/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const CracoAlias = require('craco-alias');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'development';

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './',
        tsConfigPath: './tsconfig-aliases.json'
      }
    }
  ],
  style: {
    postcssOptions: {
      plugins: [
        require('tailwindcss')('./tailwind.config.js'),
        require('postcss-nesting'),
        require('autoprefixer')
      ]
    }
  },
  babel: {
    plugins: [['@babel/plugin-transform-typescript', { allowNamespaces: true }]]
  },
  webpack: {
    add: [
      new SentryWebpackPlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: 'sprint-technology',
        project: 'sprint-frontend',
        release: `sprint-frontend@${process.env.REACT_APP_VERSION}`,
        dryRun: IS_DEV,
        debug: IS_DEV,
        setCommits: { auto: true },
        deploy: {
          env: process.env.REACT_APP_ENV,
          url: process.env.REACT_APP_DEPLOY_URL
        },

        include: './build',
        ignore: ['node_modules', 'craco.config.js']
      })
    ]
  }
};
