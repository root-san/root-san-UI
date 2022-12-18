const express = require('express')
const history = require('connect-history-api-fallback')
const path = require('path')

const app = express()
app.use(history())
app.use(express.static(path.join(__dirname, '/dist')))

const port = process.env.PORT || 8080
app.listen(port)
console.log(`server started :${port}`)
