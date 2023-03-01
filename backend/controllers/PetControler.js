const Pet = require('../models/Pet')

module.exports = class UserController {
  static async create(req, res) {

    const {name, age, weight, color} = req.body

    const available = true

    // images upload
        
    // validations
    if (!name) {
			res.status(422).json({ message: "O nome é obrigatório" });
			return;
		}
		if (!age) {
			res.status(422).json({ message: "A idade obrigatório" });
			return;
		}
		if (!weight) {
			res.status(422).json({ message: "O peso é obrigatório" });
			return;
		}
		if (!color) {
			res.status(422).json({ message: "O color é obrigatório" });
			return;
		}



		
  }
}