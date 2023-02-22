const User = require("../models/User");

module.exports = class UserController {
	static async register(req, res) {
		const { name, email, phone, password, confirmpassword } = req.body;

		// validations
		if (!name) {
			res.status(422).json({ message: "O nome é obrigatório" });
			return;
		}
		if (!email) {
			res.status(422).json({ message: "O email é obrigatório" });
			return;
		}
		if (!phone) {
			res.status(422).json({ message: "O phone é obrigatório" });
			return;
		}
		if (!password) {
			res.status(422).json({ message: "O password é obrigatório" });
			return;
		}
		if (!confirmpassword) {
			res.status(422).json({ message: "O confirmpassword é obrigatório" });
			return;
		}

		if (password !== confirmpassword) {
			res
				.status(422)
				.json({ message: "A senha e confimação de senha precisam ser iguais" });
			return;
		}

		// check if user exists
		const userExists = await User.findOne({ email: email });

		if (userExists) {
			res.status(422).json({ message: "Por favor, utilize outro e-mail" });
			return;
		}
	}
};
