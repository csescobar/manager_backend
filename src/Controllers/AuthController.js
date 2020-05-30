const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const User = require('../models/User');

dotenv.config();

module.exports = {
    async auth(req, res) {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email }).select('+password');
        console.log(user);
        
        if (!user)
            return res.status(401).send({ error: 'User or password not found' });
        
        const hash = await bcrypt.hash(email, 10);
        console.log(hash);
        console.log(user.password);
        
        
        if (!await bcrypt.compare(email + password, user.password))
            return res.status(401).send({ error: 'User or password not found' });

        user.password = undefined;

        const token = await jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });

        res.send({ auth: true, token });

    }
}