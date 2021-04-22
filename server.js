const base_path = require('path').resolve(__dirname)
exports.base_path = base_path
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const config = require('./modules/rconfig').readConfig('main')

//Шаблонизатор и статика
app.set('views', './templates')
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'))
app.use('/img', express.static(__dirname + '/public/jsvue/img'))

// Роутинг
app.use('/', require('./routes/index'))
app.use('/data/', require('./routes/data'))

// Запуск
server.listen(config.port, () => {
    console.log(`IO started at port ${config.port}`)
})

// Сокеты!!!
io.sockets.on('connection', socket => {
    console.log('connected')
    socket.on('test', data => { 
        console.log(data, socket)
        setTimeout(() => {
            socket.emit('response', 'success')
        }, 1000)
    })
})