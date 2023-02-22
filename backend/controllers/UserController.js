const User = require("../models/User");
const bcrypt = require("bcrypt");
const creaetUserToken = require("../helper/create-user-token");

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

		// create a password
		const salt = await bcrypt.genSalt(12);
		const passwordHast = await bcrypt.hash(password, salt);

		// create a user
		const user = new User({
			name,
			email,
			password: passwordHast,
			phone,
		});

		try {
			const newUser = await user.save();

			await creaetUserToken(newUser, req, res);
		} catch (error) {
			res.status(500).json({ message: error });
		}
	}

	static async login(req, res) {
		const { email, password } = req.body;

		// validations
		if (!email) {
			res.status(422).json({ message: "O email é obrigatório" });
			return;
		}

		if (!password) {
			res.status(422).json({ message: "O nome é obrigatório" });
			return;
		}

		// check if user exists
		const user = await User.findOne({ email: email });

		console.log(user)

		if (!user) {
			res
				.status(422)
				.json({ message: "Não há usuário cadastrado com este e-mail" });
			return;
		}

		// check if password match with db password
		const checkPassword = await bcrypt.compare(password, user.password)

		if(!checkPassword){
			res
				.status(422)
				.json({ message: "Senha inválida" });
			return;
		}

		await creaetUserToken(user, req, res);
	}
};
