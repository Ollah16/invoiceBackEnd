const { Sequelize } = require("sequelize");
const { sequelize } = require("../model/invoiceModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const handleUserLogin = async (req, res) => {
    let { email, password } = req.body;
    res.send(email)
    // try {
    //     const users = await sequelize.query(
    //         "SELECT * FROM user WHERE email = ?",
    //         {
    //             replacements: [email],
    //             type: Sequelize.QueryTypes.SELECT
    //         }
    //     );

    //     if (users.length) {
    //         const hashedPassword = users[0].password;
    //         const checkedPassword = await bcrypt.compareSync(password, hashedPassword);

    //         if (checkedPassword) {
    //             let userId = users[0].userId
    //             let accessToken = await jwt.sign({ userId }, process.env.SECRETKEY)
    //             res.status(200).json({ message: 'Login successful!', accessToken });
    //         } else {
    //             res.status(401).json({ error: 'Invalid password.' });
    //         }
    //     } else {
    //         res.status(404).json({ error: 'User not found.' });
    //     }
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'An error occurred while logging in the user.' });
    // }
};

const handleUserRegistration = async (req, res) => {
    let { email, password } = req.body;
    try {
        const checkEmail = await sequelize.query('SELECT * from user WHERE email = ?',
            {
                replacements: [email],
                type: Sequelize.QueryTypes.SELECT
            })
        if (!checkEmail.length) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hashSync(password, salt)
            await sequelize.query('INSERT INTO user(email, password) VALUES(?,?)',
                {
                    replacements: [email, hashedPassword],
                    type: Sequelize.QueryTypes.INSERT
                }
            )
            res.status(200).json({ message: 'User registered successfully!' });
        }
        else {
            res.status(404).json({ error: 'User exists!' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
};

module.exports = { handleUserLogin, handleUserRegistration };
