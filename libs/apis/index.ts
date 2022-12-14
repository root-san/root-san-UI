import { DefaultApi, Configuration } from './generated'

const basePath =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:8080'
    : 'http://localhost:4010'

const conf = new Configuration({
  basePath,
})
const apis = new DefaultApi(conf)

export default apis
