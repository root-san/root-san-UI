import { DefaultApi, Configuration } from './generated'

const basePath = import.meta.env.DEV
  ? '/api'
  : 'https://root-san.trap.show/root-san'

const conf = new Configuration({
  basePath,
})
const apis = new DefaultApi(conf)

export default apis

export * from './generated'
