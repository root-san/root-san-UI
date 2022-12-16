import { DefaultApi, Configuration } from './generated'

const basePath = import.meta.env.DEV ? '/api' : 'http://localhost:8080'

const conf = new Configuration({
  basePath,
})
const apis = new DefaultApi(conf)

export default apis

export * from './generated'
