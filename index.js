if (process.env.Node_ENV != "production") require("dotenv").config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
const authenticateRoute = require('./Routes/userRoute')
const invoiceRoute = require('./Routes/invoiceRoute')
app.use('/authenticate', authenticateRoute)
app.use('/invoice', invoiceRoute)
app.post('/check', (req, res) => {
    console.log('hi')
})
app.listen(process.env.PORT, () => {
})