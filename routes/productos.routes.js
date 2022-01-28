const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos, validarJWT, productoExists } = require("../middlewares");
const {
	getProductos,
	getProdById,
	crearProducto,
	deleteProducto,
	actualizarProducto,
} = require("../controllers");

const router = Router();

//obtener todas las productos
router.get(
	"/",
	validarJWT,
	check("limit", "El limite de paginado debe ser un numero").isNumeric(),
	check("from", "El comienzo de paginado debe ser un numero").isNumeric(),
	validarCampos,
	getProductos
);

//obtener producto por id
router.get(
	"/:id",
	validarJWT,
	productoExists,
	check("id", "EL id no es valido").isMongoId(),
	validarCampos,
	getProdById
);

//crear nuevo producto
router.post(
	"/",
	validarJWT,
	check("nombre", "El nombre es obligatorio").not().isEmpty(),
	check("nombre", "El nombre debe contener mas de 3 caracteres").isLength({
		min: 3,
	}),
	check("categoriaNombre", "La categoria es obligatoria").not().isEmpty(),
	check("precio", "El precio es obligatorio").not().isEmpty(),
	check("precio", "El precio debe ser numerico").isNumeric(),
	validarCampos,
	crearProducto
);

//actualizar producto
router.put(
	"/:id",
	validarJWT,
	check("id", "El id no es valido").isMongoId(),
	productoExists,
	check("nombre", "El nombre debe tener mas de tres caracteres").isLength({
		min: 3,
	}),
	check("estado", "el estado es incorrecto, debe ser true/false").isBoolean(),
	validarCampos,
	actualizarProducto
);

//borrar producto
router.delete(
	"/:id",
	validarJWT,
	productoExists,
	check("id", "El id no es valido").isMongoId(),
	validarCampos,
	deleteProducto
);

module.exports = router;
