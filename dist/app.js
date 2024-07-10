"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable n/handle-callback-err */
/* eslint-disable no-trailing-spaces */
var _server = require('./server'); var _server2 = _interopRequireDefault(_server);
var _process = require('process'); var _process2 = _interopRequireDefault(_process);
const path = require('path')
const fs = require('fs')

_process2.default.on('uncaughtException', (err, origin) => {
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

_server2.default.listen(PORT, HOST, () => {
  console.log(`The server is running on port ${PORT}`)
})
