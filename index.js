if (process.env.Node_ENV != "production") require("dotenv").config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
let authenticateRoute = require('./Routes/userRoute')
let invoiceRoute = require('./Routes/invoiceRoute')
app.use('/authenticate', authenticateRoute)
app.use('/invoice', invoiceRoute)
app.listen(process.env.PORT, () => {
    console.log(`connected to ${process.env.PORT}`)
})