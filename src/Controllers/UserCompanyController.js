const UserCompany = require('../models/UserCompany');

module.exports = {
    async store(req, res) {
        const { user, company, isAdmin } = req.body;

        UserCompany.create({
            user,
            company,
            isAdmin
        }).then(result => res.json({
            status: 'OK',
            msg: 'Registro criado'
        })
        ).catch((err) => {
            res.send(err);
        })
    },
    async remove(req, res) {
        const { usercompany } = req.headers;
        console.log(usercompany);
        UserCompany.deleteOne({ _id: usercompany }
        ).then(result => {
            res.json({
                status: 'OK',
                msg: 'Relacionamento deletado'
            })
        }).catch(err => {
            res.send(err);
        })
    }

}