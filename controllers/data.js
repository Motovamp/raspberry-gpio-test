let data_module = require('../modules/data')

exports.index = (req, res) => {
    let data = data_module.get()
    res.send(JSON.stringify(data))
}