/* eslint-disable n/handle-callback-err */
/* eslint-disable no-trailing-spaces */
import app from './server'
import process from 'process'
const path = require('path')
const fs = require('fs')

process.on('uncaughtException', (err, origin) => {
  const date = new Date()
  const fileName = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}.txt`

  fs.writeFile(
    path.join(__dirname, 'logs', fileName),
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`,
    (err) => {
      if (err) {
        console.log(err)
      }
    }
  )
})

const PORT = 3354
const HOST = '0.0.0.0'

app.listen(PORT, HOST, () => {
  console.log(`The server is running on port ${PORT}`)
})
