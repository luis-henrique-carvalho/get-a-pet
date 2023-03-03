const jwt = require("jsonwebtoken");
const User = require("../models/User");

// get user by token
const getUserByToken = async (token) => {
	if (!token) {
		return res.status(401).json({ message: "Acesso Negadooooo!" });
	}

	const decoded = jwt.verify(token, "nossosecret");

	const userId = decoded.id;

	const user = await User.findById({ _id: userId });

	if (!user) {
		return res.status(402).json({ message: "Acesso Negado!" });
	}

	return user;
};

module.exports = getUserByToken;
