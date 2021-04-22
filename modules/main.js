const fs = require('fs')
const config = require('../modules/rconfig').readConfig('main')

exports.md = function() {
    let pMode = config.prod_mode
    return {
        styles: pMode ? fs.readdirSync(__dirname + '/../public/jsvue/css').sort((a, b) => b.length - a.length) : [],
        scripts: fs.readdirSync(__dirname + '/../public/jsvue/js').filter(el => el.endsWith('.map') === false).sort((a, b) => b.length - a.length)
    }
}