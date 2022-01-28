const { Router } = require("express");
const { check, param, query } = require("express-validator");
const validarCampos = require("../middlewares/validar-campos.middleware");

const { login, googleSignIn } = require("../controllers");

const router = Router();

router.post(
	"/login",
	check("correo", "El correo es obligatorio").not().isEmpty(),
	check("password", "El password es obligatorio").not().isEmpty(),
	validarCampos,
	login
);

router.post(
	"/google",
	// check("id_token", "el id_token es necesario").not().isEmpty(),
	validarCampos,
	googleSignIn
);

module.exports = router;
