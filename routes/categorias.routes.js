const { Router } = require("express");
const { check } = require("express-validator");
const {
	validarCampos,
	validarJWT,
	categoriaExists,
} = require("../middlewares");

const {
	getCategorias,
	getCatById,
	crearCategoria,
	deleteCategoria,
	actualizarCategoria,
} = require("../controllers");

const router = Router();

//obtener todas las categorias
router.get(
	"/",
	validarJWT,
	check("limit", "El limite de paginado debe ser un numero").isNumeric(),
	check("from", "El comienzo de paginado debe ser un numero").isNumeric(),
	validarCampos,
	getCategorias
);

//obtener categoria por id
router.get(
	"/:id",
	validarJWT,
	categoriaExists,
	check("id", "EL id no es valido").isMongoId(),
	validarCampos,
	getCatById
);

//crear nueva categoria
router.post(
	"/",
	validarJWT,
	check("nombre", "El nombre es obligatorio").not().isEmpty(),
	validarCampos,
	crearCategoria
);

//actualizar categoria
router.put(
	"/:id",
	validarJWT,
	categoriaExists,
	check("id", "El id no es valido").isMongoId(),
	check("nombre", "El nombre debe tener mas de tres caracteres").isLength({
		min: 3,
	}),
	check("estado", "el estado es incorrecto, debe ser true/false").isBoolean(),
	validarCampos,
	actualizarCategoria
);

//borrar categoria
router.delete(
	"/:id",
	validarJWT,
	categoriaExists,
	check("id", "El id no es valido").isMongoId(),
	validarCampos,
	deleteCategoria
);

module.exports = router;
