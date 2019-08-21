const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = {
    async auth(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user)
            return res.status(400).send({ error: 'User or password not found' });

        if (!await bcrypt.compare(email + password, user.password))
            return res.status(400).send({ error: 'User or password not found' });

        user.password = undefined;

        const token = await jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });

        res.send({ auth: true, token });

    },
    async logout(req, res) {
        res.status(200).send({ auth: false, token: null })
    }
}