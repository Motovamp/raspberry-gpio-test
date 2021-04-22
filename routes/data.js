const router = require('express').Router()
const dataController = require('../controllers/data')

router.get('/', dataController.index)

module.exports = router