const express = require('express')
const { handleUserLogin, handleUserRegistration } = require('../control/authenticatePage')
const router = express.Router()

router.post('/login', handleUserLogin)
router.post('/register', handleUserRegistration)
router.post('/check', (req, res) => {
    res.send('helloRoute')
})
module.exports = router