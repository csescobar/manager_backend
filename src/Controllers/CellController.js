const Cell = require('../models/Cell');
const ConvertHourToMinutes = require('../utils/convertHourToMinutes');
const ConvertMinutesToHour = require('../utils/convertMinutesToHour');

module.exports = {
  async store(req, res) {
    
    const {
      name,
      rede,
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
        rede,
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
    const cellsFound = await Cell.find();
    const cells = cellsFound.map((cellsFoundItem) => {
      const fromConverted = ConvertMinutesToHour(cellsFoundItem.from);
      const toConverted = ConvertMinutesToHour(cellsFoundItem.to);

      return {
        name: cellsFoundItem.name,
        rede: cellsFoundItem.rede,
        day_of_week: cellsFoundItem.day_of_week,
        company: cellsFoundItem.company,
        from: fromConverted,
        to: toConverted
      }
    }); 

    res.status('200').send(cells);
  }
}