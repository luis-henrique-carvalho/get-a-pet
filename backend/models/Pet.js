const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Pet = mongoose.model(
	"Pet",
	new Schema(
		{
			name: {
				type: String,
				required: true,
			},
			age: {
				type: String,
				required: true,
			},
			weight: {
				type: Number,
				required: true,
			},
			color: {
				type: String,
				required: true,
			},
			images: {
				type: Array,
				required: false,
			},
			availible: {
				type: Boolean,
				required: false,
			},
			user: Object,
			adopter: Object,
		},
		{ timestamps: true }
	)
);

module.exports = Pet;
