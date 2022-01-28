const { Router } = require("express");
const { check, param, query } = require("express-validator");
const { validarCampos, validarJWT, validarRol } = require("../middlewares");
const { rolValidator, emailUnique } = require("../helpers");
const {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosDelete,
	usuariosPatch,
} = require("../controllers");

const router = Router();
router.get(
	"/",
	query(
		"from",
		"El parametro de inicio de paginacion debe ser un numero"
	).isNumeric(),
	query(
		"limit",
		"El parametro de fin de paginacion debe ser un numero"
	).isNumeric(),
	validarCampos,
	usuariosGet
);
router.put(
	"/:id",
	check("id", "El id no es valido").isMongoId(),
	validarCampos,
	usuariosPut
);
router.post(
	"/",
	check("nombre", "El nombre es obligatorio").not().isEmpty(),
	check("nombre", "El nombre debe tener mas de 3 caracteres").isLength({
		min: 3,
	}),
	check("password", "El password es obligatorio").not().isEmpty(),
	check("password", "El password debe tener mas de 6 caracteres").isLength({
		min: 6,
	}),
	check("correo", "El correo no es valido").isEmail().custom(emailUnique), //EXPRESS-VALIDATOR::de aca va al validation result, en los controllers
	check("rol", "EL rol no es valido").custom((ROL) => rolValidator(ROL)),
	validarCampos, //middleware personalizado
	usuariosPost
);
router.delete(
	"/:id",
	validarJWT,
	validarRol,
	param("id", "El id ingresado no existe").isMongoId(),
	validarCampos,
	usuariosDelete
);
router.patch("/", usuariosPatch);

module.exports = router;
