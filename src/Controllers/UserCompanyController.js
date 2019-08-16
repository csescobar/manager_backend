const UserCompany = require('../models/UserCompany');

module.exports = {
    async store(req, res) {
        const { idUser, idCompany, isAdmin } = req.body;

        UserCompany.create({
            idUser,
            idCompany,
            isAdmin
        }).then(result => res.json({
            status: 'OK',
            msg: 'Registro criado'
        })
        ).catch((err) => {
            res.send(err);
        })
    }

}