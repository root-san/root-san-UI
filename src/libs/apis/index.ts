import { DefaultApi, Configuration } from './generated'

const basePath =
  process.env.VITE_STAGE === 'development'
    ? '/api'
    : 'https://api.root3.trap.games'

const conf = new Configuration({
  basePath,
})
const apis = new DefaultApi(conf)

export default apis

export * from './generated'
