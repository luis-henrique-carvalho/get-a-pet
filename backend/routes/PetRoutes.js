const router = require("express").Router();

const PetController = require("../controllers/PetControler");
const { imageUpload } = require("../helper/image-upload");

// middlewares
const verifyToken = require("../helper/verify-token");

router.post(
	"/create",
	verifyToken,
	imageUpload.array("images"),
	PetController.create
);
router.get("/", PetController.getAll)

module.exports = router;
