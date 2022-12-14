/** @type {import('next').NextConfig} */

// next-pwa not working with appdir (next 13) and next-pwa 5.6.0
// see here: https://github.com/shadowwalker/next-pwa/issues/424
// const withPWA = require("next-pwa");

// https://github.com/shadowwalker/next-pwa/pull/427で治らないかな:eyes:
// 一生マージされなさそうなのでとりあえず↓を使う
// とりあえずよくわからないのを使う><
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
})
