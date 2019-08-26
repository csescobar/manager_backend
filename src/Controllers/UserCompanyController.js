const UserCompany = require('../models/UserCompany');
const { removeRelation } = require('../Controllers/UserController');

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
        //console.log(usercompany);
        const uC = await UserCompany.findById(usercompany);
        console.log(uC)
        UserCompany.deleteOne({ _id: usercompany }
        ).then(result => {
            removeRelation(uC.user, uC.company);
            res.json({
                status: 'OK',
                msg: 'Relacionamento deletado'
            })
        }).catch(err => {
            res.send(err);
        })
    }

}