const Company = require('../models/Company');

module.exports = {
    async store(req, res) {
        const { name, cnpj, adress, cep, cidade, estado, pais } = req.body;

        if (cnpj !== null && cnpj !== '') {
            const companyExists = await Company.findOne({ cnpj: cnpj })
            if (companyExists) {
                return res.json({
                    status: 'ERRO',
                    msg: 'Já existe o CNPJ cadastrado'
                })
            }
        }
        Company.create({
            name, cnpj, adress, cep, cidade, estado, pais
        }).then(result => res.json({
            status: 'OK',
            msg: 'Registro criado com sucesso'
        })
        ).catch((err) => {
            res.send(err);
        })
    },
    async put(req, res) {
        const { name, cnpj, adress, cep, cidade, estado, pais } = req.body;
        const { idcompany } = req.headers;

        Company.findById(idcompany).then((model) => {
            return Object.assign(model, { name, cnpj, adress, cep, cidade, estado, pais });
        }).then((model) => {
            return model.save();
        }).then((updateModel) => {
            res.json({
                status: 'OK',
                msg: 'Registro alterado'
            });
        }).catch((err) => {
            res.send(err);
        })
    },
    async remove(req, res) {
        const { idcompany } = req.headers;

        Company.deleteOne({ _id: idcompany }
        ).then(result => {
            res.json({
                status: 'OK',
                msg: 'Registro deletado'
            })
        }).catch(err => {
            res.send(err);
        })

    }
}