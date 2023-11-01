const express = require('express')
const { handleUserLogin, handleUserRegistration } = require('../control/authenticatePage')
const router = express.Router()

router.post('/login', handleUserLogin)
router.post('/register', handleUserRegistration)
module.exports = router