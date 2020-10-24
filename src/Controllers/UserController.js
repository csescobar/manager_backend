const User = require("../models/User");
const Company = require("../models/Company");

module.exports = {
  async store(req, res) {
    const { firstname, lastname, password, email, company } = req.body;

    try {
      await User.create({
        firstname,
        lastname,
        email, 
        password,
        company,
      });

      res.json({ message: "OK" });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async put(req, res) {
    const { firstname, lastname, company } = req.body;
    const { user } = req.headers;

    User.findById(user)
      .then((model) => {
        return Object.assign(model, { firstname, lastname, company });
      })
      .then((model) => {
        return model.save();
      })
      .then((updateModel) => {
        res.json({
          status: "OK",
          msg: "Usuário alterado",
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  async remove(req, res) {
    const { user } = req.headers;

    User.deleteOne({ _id: user })
      .then((result) => {
        res.json({
          status: "OK",
          msg: "usuário deletado",
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
