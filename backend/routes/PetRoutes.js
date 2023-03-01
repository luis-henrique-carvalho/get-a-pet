const router = require("express").Router();

const PetController = require("../controllers/PetControler");

// middlewares
const verifyToken = require('../helper/verify-token')

router.post("/create",verifyToken, PetController.create);

module.exports = router;
