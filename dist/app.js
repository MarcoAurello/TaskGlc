"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _server = require('./server'); var _server2 = _interopRequireDefault(_server);

const PORT = 3354
const HOST = '0.0.0.0'

_server2.default.listen(PORT, HOST, () => {
  console.log(`The server is running on port ${PORT}`)
})

_server2.default.listen()
