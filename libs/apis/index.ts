import { DefaultApi, Configuration } from './generated'

const conf = new Configuration({
  basePath: 'http://localhost:8080',
})
const apis = new DefaultApi(conf)

export default apis
