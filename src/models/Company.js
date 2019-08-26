const { Schema, model } = require('mongoose');

const CompanySchema = new Schema({
    name: String,
    cnpj: String,
    adress: String,
    cep: String,
    cidade: String,
    estado: String,
    pais: String,
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
        timestamps: true
    })

module.exports = model('Company', CompanySchema);