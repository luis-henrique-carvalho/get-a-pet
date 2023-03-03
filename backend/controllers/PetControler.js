const Pet = require("../models/Pet");
const ObjectId = require("mongoose").Types.ObjectId;

// helpers
const getToken = require("../helper/get-token");
const getUserByToken = require("../helper/get-user-by-token");

module.exports = class UserController {
	static async create(req, res) {
		const { name, age, weight, color } = req.body;

		const available = true;

		// images upload
		const images = req.files;

		// validations
		if (!name) {
			res.status(422).json({ message: "O nome é obrigatório!" });
			return;
		}

		if (!age) {
			res.status(422).json({ message: "A idade é obrigatória!" });
			return;
		}

		if (!weight) {
			res.status(422).json({ message: "O peso é obrigatório!" });
			return;
		}

		if (!color) {
			res.status(422).json({ message: "A cor é obrigatória!" });
			return;
		}

		if (!images) {
			res.status(422).json({ message: "A imagem é obrigatória!" });
			return;
		}

		const token = getToken(req);
		const user = await getUserByToken(token);

		// create a pet
		const pet = new Pet({
			name,
			age,
			weight,
			color,
			available,
			images: [],
			user: {
				_id: user._id,
				email: user.email,
				name: user.name,
				image: user.image,
				phone: user.phone,
			},
		});

		images.map((image) => {
			pet.images.push(image.filename);
		});

		try {
			const newPet = await pet.save();
			res.status(201).json({
				message: "Pet cadastrado com sucesso!",
				newPet,
			});
		} catch (error) {
			res.status(500).json({ message: error });
			return
		}
	}

	static async getAll(req, res) {
		const pets = await Pet.find().sort("-createdAt");
		res.status(201).json({
			pets: pets,
		});
	}

	static async getAllUserPets(req, res) {
		// get user from token
		const token = getToken(req);
		const user = await getUserByToken(token);

		const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");
		console.log(pets);
		res.status(201).json({
			message: "Seus pets cadastrados!",
			pets,
		});
	}

	static async getAllUserAdoptions(req, res) {
		// get user from token
		const token = getToken(req);
		const user = await getUserByToken(token);

		const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");
		console.log(pets);
		res.status(201).json({
			message: "Seus pets adotados!",
			pets,
		});
	}

	static async getPetById(req, res) {
		const id = req.params.id;

		if (!ObjectId.isValid(id)) {
			res.status(422).json({ message: "ID inválido!" });
			return;
		}

		const pet = await Pet.findOne({ _id: id });

		if (!pet) {
			res.status(404).json({ message: "Pet não encontrado!" });
			return;
		}

		res.status(200).json({
			pet,
		});
	}

	static async removePetById(req, res) {
		const id = req.params.id;

		// check if id is valid
		if (!ObjectId.isValid(id)) {
			res.status(422).json({ message: "Id inválido" });
			return;
		}

		// check if pet exists
		const pet = await Pet.findOne({ _id: id });

		if (!pet) {
			res.status(404).json({ message: "Pet não encontrado" });
			return;
		}

		// check if logged in user registered the pet
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (pet.user._id.toString() !== user._id.toString()) {
			res.status(422).json({ message: "Pet não pertence ao usuário" });
			return;
		}

		await Pet.findByIdAndRemove(id);

		res.status(200).json({ message: "Pet removido com sucesso", pet });
	}

	static async updatePet(req, res) {
		const id = req.params.id;

		const { name, age, weight, color, available } = req.body;

		const images = req.files;

		const updateData = {};

		if (!ObjectId.isValid(id)) {
			res.status(422).json({ message: "Id inválido" });
			return;
		}

		const pet = await Pet.findOne({ _id: id });

		if (!pet) {
			res.status(404).json({ message: "Pet não encontrado" });
			return;
		}

		// check if logged in user registered the pet
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (pet.user._id.toString() !== user._id.toString()) {
			res.status(422).json({ message: "Pet não pertence ao usuário" });
			return;
		}

		// validations
		if (!name) {
			res.status(422).json({ message: "O nome é obrigatório!" });
			return;
		} else {
			updateData.name = name;
		}

		if (!age) {
			res.status(422).json({ message: "A idade é obrigatória!" });
			return;
		} else {
			updateData.age = age;
		}

		if (!weight) {
			res.status(422).json({ message: "O peso é obrigatório!" });
			return;
		} else {
			updateData.weight = weight;
		}

		if (!color) {
			res.status(422).json({ message: "A cor é obrigatória!" });
			return;
		} else {
			updateData.color = color;
		}

		if (images.length === 0) {
			res.status(422).json({ message: "A imagem é obrigatória!" });
			return;
		} else {
			updateData.images = [];
			images.map((image) => {
				updateData.images.push(image.filename);
			});
		}

		const updatedPet = await Pet.findByIdAndUpdate(id, updateData);

		res
			.status(200)
			.json({ message: "Pet atualizado com sucesso!", updatedPet });
	}

	static async schedule(req, res) {
		const id = req.params.id;

		// check if pet existis

		if (!ObjectId.isValid(id)) {
			res.status(422).json({ message: "Id inválido" });
			return;
		}

		const pet = await Pet.findOne({ _id: id });

		if (!pet) {
			res.status(404).json({ message: "Pet não encontrado" });
			return;
		}

		// check if user registered the pet
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (pet.user._id.equals(user._id)) {
			res.status(422).json({
				message: "Você não pode agendar uma visita com seu próprio pet!",
			});
			return;
		}

		// check if user has already schedule the pet
		if (pet.adopter) {
			if (pet.adopter._id.equals(user._id)) {
				res.status(422).json({
					message: "Você já agendou uma visita para este pet!",
				});
				return;
			}
		}

		// add user to pet
		pet.adopter = {
			_id: user._id,
			name: user.name,
			email: user.email,
			image: user.image,
		};

		await Pet.findByIdAndUpdate(id, pet);

		res.status(200).json({
			message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`,
		});
	}

	static async concludeAdoption(req, res) {
		const id = req.params.id;

		// check if pet existis

		if (!ObjectId.isValid(id)) {
			res.status(422).json({ message: "Id inválido" });
			return;
		}

		const pet = await Pet.findOne({ _id: id });

		if (!pet) {
			res.status(404).json({ message: "Pet não encontrado" });
			return;
		}

		const token = getToken(req)
		const user = await getUserByToken(token)

		if (user._id.toString() !== pet.user._id.toString()) {
			res.status(422).json({
				message: "Apenas o dono pode concluir o ciclo de adoção!",
			});
			return;
		}

		pet.availible = false

		await Pet.findByIdAndUpdate(id, pet)

		res.status(200).json({
			message: "Parabéns, o ciclo de adoção foi finalizado com sucesso!"
		})
	}
};
