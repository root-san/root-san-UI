import { DefaultApi, Configuration } from './generated'

const basePath = import.meta.env.VITE_DEV ?? 'http://localhost:8080'

const conf = new Configuration({
  basePath,
})
const apis = new DefaultApi(conf)

export default apis
