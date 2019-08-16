const { Schema, model } = require('mongoose');

const UserCompanySchema = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    idCompany: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {
        timestamps: true
    })
UserCompanySchema.index({ idUser: 1, idCompany: 1 }, { unique: true });

module.exports = model('UserCompany', UserCompanySchema);