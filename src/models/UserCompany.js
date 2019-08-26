const { Schema, model } = require('mongoose');
const { updateRelation, removeRelation } = require('../Controllers/UserController');


const UserCompanySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    company: {
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
//UserCompanySchema.index({ idUser: 1, idCompany: 1 }, { unique: true });

UserCompanySchema.post('save', async function (UserCompanySchema) {
    console.log(UserCompanySchema);
    await updateRelation(UserCompanySchema);

});

UserCompanySchema.post('deleteOne', { document: false, query: true }, async function () {

    console.log(UserCompanySchema)//(this.user + '-' + this.company);
    //   await removeRelation(this.user, this.company);

})

module.exports = model('UserCompany', UserCompanySchema);