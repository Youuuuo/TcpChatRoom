'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  IMG_URL: '"http://192.168.137.1:5555/chat/"',
  SOCKET_URL: '"http://192.168.137.1:9999/"'
})
