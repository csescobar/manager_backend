const User = require('../models/User');
const Company = require('../models/Company');

module.exports = {
    async store(req, res) {
        const { firstname, lastname, password, email } = req.body;

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
        const { firstname, lastname } = req.body;
        const { user } = req.headers;

        User.findById(user).then((model) => {
            return Object.assign(model, { firstname, lastname });
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
    },
    async updateRelation(user) {

        User.updateOne({ _id: user.user },
            { $addToSet: { company: [user.company] } })
            .catch((err) => {
                console.log(err);
                return JSON.stringify(err);
            });
        Company.updateOne({ _id: user.company },
            { $addToSet: { user: [user.user] } })
            .catch((err) => {
                console.log(err);
                return JSON.stringify(err);
            });
        return JSON.stringify({ status: 'ok' })
    },
    async removeRelation(user, company) {
        User.updateOne({ _id: user },
            { $pull: { company: { $in: [company] } } })
            .catch((err) => {
                console.log(err);
                return JSON.stringify(err);
            });
        Company.updateOne({ _id: company },
            { $pull: { user: { $in: [user] } } })
            .catch((err) => {
                console.log(err);
                return JSON.stringify(err);
            });

        return JSON.stringify({ status: 'ok' })
    }
}
