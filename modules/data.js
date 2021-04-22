const fs = require('fs')
const base_path = require('../server').base_path
const config = require('./rconfig').readConfig('main')

exports.get = function() {
    return JSON.parse(fs.readFileSync(base_path + config.data_path))
}