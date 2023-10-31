const { Sequelize } = require('sequelize')
const { sequelize } = require("../model/invoiceModel")
const { handleS3Upload } = require('../s3')

const handleSaveRecord = async (req, res) => {
    const {
        discountTitle, termsTitle, taxTitle, shippingTitle, noteTitle, balanceDueTitle, totalTitle,
        subTotalTitle, amountPaidTitle, billToTitle, addressTitle, dueDateTitle, poTitle, paymentTitle,
        dateTitle, whoIsFrom, billTo, address, poNumber, terms, invoiceNum, date, dueDate,
        paymentTerms, note, total, discountAmount, taxAmount, shippingAmount, balance, subTotal,
        amountPaid, isShipping, isDiscount, isTax, currency, data
    } = req.body;
    try {
        const { userId } = req.userId
        const logo = req.file.originalname;

        await handleS3Upload(req.file);
        const [userSalesId] = await sequelize.query(
            `INSERT INTO salerecords (discountTitle, termsTitle, taxTitle, shippingTitle, noteTitle, balanceDueTitle, totalTitle, 
                subTotalTitle, amountPaidTitle, billToTitle, addressTitle, dueDateTitle, poTitle, paymentTitle, 
                dateTitle, logo, whoIsFrom, billTo, address, poNumber, terms, invoiceNum, date, dueDate, 
                paymentTerms, note, total, discountAmount, taxAmount, shippingAmount, balance, subTotal, 
                amountPaid, isShipping, isDiscount, isTax, currency, userId) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            {
                replacements: [
                    discountTitle, termsTitle, taxTitle, shippingTitle, noteTitle, balanceDueTitle, totalTitle,
                    subTotalTitle, amountPaidTitle, billToTitle, addressTitle, dueDateTitle, poTitle, paymentTitle,
                    dateTitle, logo, whoIsFrom, billTo, address, poNumber, terms, invoiceNum, date, dueDate,
                    paymentTerms, note, total, discountAmount, taxAmount, shippingAmount, balance, subTotal,
                    amountPaid, isShipping, isDiscount, isTax, currency, userId
                ],
                type: Sequelize.QueryTypes.INSERT
            }
        );

        const parsedData = JSON.parse(data);
        for (const dataRecord of parsedData) {
            const { description, rate, quantity, amount } = dataRecord;
            await sequelize.query(
                `INSERT INTO dataRecords (description, rate, quantity, amount, userId, userSalesId)        
                 VALUES (?, ?, ?, ?, ?, ?)`,
                {
                    replacements: [description, rate, quantity, amount, userId, userSalesId],
                    type: Sequelize.QueryTypes.INSERT
                }
            );
        }

        res.json({ message: 'Invoice successfully saved' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const handleFetchRecords = async (req, res) => {
    try {
        let { userId } = req.userId

        const saleRecords = await sequelize.query('SELECT * FROM salerecords WHERE userId = ?', {
            replacements: [userId],
            type: Sequelize.QueryTypes.SELECT
        });
        res.status(200).json({ saleRecords });
    } catch (err) { console.error(err) }
}

const handleFetchInvoice = async (req, res) => {
    try {
        const { userId } = req.userId
        let { userSalesId } = req.params

        const userInvoice = await sequelize.query('SELECT * FROM salerecords WHERE userSalesId = ? AND userId = ?', {
            replacements: [userSalesId, userId],
            type: Sequelize.QueryTypes.SELECT
        })
        const userData = await sequelize.query('SELECT * FROM dataRecords WHERE userSalesId = ?', {
            replacements: [userSalesId],
            type: Sequelize.QueryTypes.SELECT
        })
        res.status(200).json({ userInvoice, userData });
    }
    catch (err) { console.error(err) }
}

module.exports = { handleSaveRecord, handleFetchRecords, handleFetchInvoice }