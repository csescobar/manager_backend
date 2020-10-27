const CellMember = require("../models/CellMember");
const funcao = require('../utils/enumFuncoes');


module.exports = {
  async create(req, res) {
    const {
      name,
      whatsapp,
      email,
      funcao,
      birth_date,
      cell
    } = req.body;
    try {
      await CellMember.create({
        name,
        whatsapp,
        email,
        funcao,
        birth_date,
        cell
      });

      res.status('201').json( {message: 'ok'} );
    } catch (err) {
      res.status(500).send(err);
    }
  },
  async index(req, res) {
    const cellMembersFound = 
      await CellMember.find()
        .populate('cell', 'name');
    
    const cellMembers = cellMembersFound.map((cellMembersFoundItem) => {
      const funcaoCellMeber = funcao[cellMembersFoundItem.funcao];

      return {
        id: cellMembersFoundItem._id,
        name: cellMembersFoundItem.name,
        whatsapp: cellMembersFoundItem.whatsapp,
        email: cellMembersFoundItem.email,
        funcao: funcaoCellMeber,
        birth_date: cellMembersFoundItem.birth_date,
        cell: cellMembersFoundItem.cell.name
      }
    });
    res.status('200').send(cellMembers);
  }
}