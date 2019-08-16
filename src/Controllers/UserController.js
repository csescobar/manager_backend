const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { firstname, lastname, email, password } = req.body;

        User.create({
            firstname,
            lastname,
            email,
            password
        }).then(result => res.json({
            status: 'OK',
            msg: 'Registro criado'
        })
        ).catch((err) => {
            res.send(err);
        })
    },
    async put(req, res) {
        const { firstname, lastname, email } = req.body;
        const { user } = req.headers;

        User.findById(user).then((model) => {
            return Object.assign(model, { firstname, lastname, email });
        }).then((model) => {
            return model.save();
        }).then((updateModel) => {
            res.json({
                status: 'OK',
                msg: 'usuário alterado'
            });
        }).catch((err) => {
            res.send(err);
        });
    },
    async remove(req, res) {
        const { user } = req.headers;

        User.deleteOne({ _id: user }
        ).then(result => {
            res.json({
                status: 'OK',
                msg: 'usuário deletado'
            })
        }).catch(err => {
            res.send(err);
        })

    }
}
