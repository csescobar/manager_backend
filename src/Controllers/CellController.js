const Cell = require('../models/Cell');
const ConvertHourToMinutes = require('../utils/convertHourToMinutes');
const ConvertMinutesToHour = require('../utils/convertMinutesToHour');
const diasdaSemana = require('../utils/enumDiasDaSemana');
const redes = require('../utils/enumRedes');

module.exports = {
  async store(req, res) {
    
    const {
      name,
      address,
      net,
      day_of_week,
      company,
      from,
      to
    } = req.body;

    const fromConverted = ConvertHourToMinutes(from);
    const toConverted = ConvertHourToMinutes(to);

    try {
      await Cell.create({
        name,
        address,
        net,
        day_of_week,
        company,
        from: fromConverted,
        to: toConverted
      });

      res.status('201').json({ message: 'Registro incluído' });
    } catch (error) {
      res.status(500).send(error);
    }
    
  },

  async index(req, res) {
    const cellsFound = await Cell.find().populate('company', 'name') ;
    const cells = cellsFound.map((cellsFoundItem) => {
      const fromConverted = ConvertMinutesToHour(cellsFoundItem.from);
      const toConverted = ConvertMinutesToHour(cellsFoundItem.to);
      
      const nomeDiaSemana = diasdaSemana[cellsFoundItem.day_of_week];
      const rede = redes[cellsFoundItem.net]

      return {
        id: cellsFoundItem._id,
        name: cellsFoundItem.name,
        address: cellsFoundItem.address,
        net: rede,
        company: cellsFoundItem.company.name,
        day_of_week: nomeDiaSemana,
        from: fromConverted,
        to: toConverted
      }
    }); 

    res.status('200').send(cells);
  }
}