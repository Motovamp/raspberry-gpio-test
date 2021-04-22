const fs = require('fs')
const path = require('../server').base_path

//Чтение файла с настройками
function readConfig(conf) {
    let first, second
    if(fs.existsSync(path + '/config/' + conf + '.json')) {
        //console.log('Config exists')
        try {
            if (!fs.existsSync(path + '/config/' + conf + '-local.json')) {
                fs.copyFileSync(path + '/config/' + conf + '.json', path + '/config/' + conf+ '-local.json')
            } 
            
            try {
                first = JSON.parse(fs.readFileSync(path + '/config/' + conf + '.json'))
                second = JSON.parse(fs.readFileSync(path + '/config/' + conf + '-local.json'))
            } catch (e) {
                console.log('Config ' + conf + ' parsing failed')
            }

        } catch(err) {
            console.error(err)
        }    
    } else {
        console.log(path + '/config/' + conf + '.json is not exists')
    }
    
    return recurSet(first, second)
}

function recurSet(a, b) {
    if((Array.isArray(a) || typeof a === 'object') && (Array.isArray(b) || typeof b === 'object')) {
        for(let i in b) {
            if(Array.isArray(b[i]) || typeof b[i] === 'object') {
                a[i] = recurSet(a[i], b[i])
            } else {
                a[i] = b[i]
            }
        }
    }
    return a
}

module.exports = {
    readConfig
}