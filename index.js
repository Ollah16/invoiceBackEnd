require("dotenv").config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
let authenticateRoute = require('./Routes/userRoute')
let invoiceRoute = require('./Routes/invoiceRoute')
app.use('/authenticate', authenticateRoute)
app.use('/invoice', invoiceRoute)
app.listen(port, () => {
    console.log(`connected to ${process.env.PORT}`)
})