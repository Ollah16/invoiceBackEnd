const express = require('express')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const { handleFetchInvoice, handleFetchRecords, handleSaveRecord } = require('../control/recordsControlPage')
const router = express.Router()

const jwtMiddleWare = async (req, res, next) => {
    let { authorization } = req.headers
    let [, accessToken] = authorization.split(' ')
    let userId = await jwt.verify(accessToken, process.env.SECRETKEY)
    if (userId) {
        req.userId = userId
        next()
    }
}

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
        cb(null, true);
    } else {
        req.error = { message: 'File not supported' };
        cb(null, false);
    }
};

const upload = multer({ storage, fileFilter });

router.post('/saveinvoice', jwtMiddleWare, upload.single('logo'), handleSaveRecord);
router.get('/fetchrecords', jwtMiddleWare, handleFetchRecords)
router.get('/getinvoice/:userSalesId', jwtMiddleWare, handleFetchInvoice)
module.exports = router