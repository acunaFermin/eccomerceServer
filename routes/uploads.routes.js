const { check, body } = require("express-validator");
const { validarCampos, validarArchivoUpload } = require("../middlewares");
const { coleccionesPermitidas } = require("../helpers");
const Router = require("express");

const {
	cargarArchivo,
	actualizarImagen,
	servirImg,
} = require("../controllers");

const router = Router();

router.post("/", validarArchivoUpload, validarCampos, cargarArchivo);

router.put(
	"/:coleccion/:id",
	validarArchivoUpload,
	check("id", "debe ingresar un id valido").isMongoId(),
	check("coleccion").custom((coleccion) =>
		coleccionesPermitidas(coleccion, ["usuarios", "productos"])
	),
	validarCampos,
	actualizarImagen
);

router.put(
	"/:coleccion/:id",
	check("id", "debe ingresar un id valido").isMongoId(),
	check("coleccion").custom((coleccion) =>
		coleccionesPermitidas(coleccion, ["usuarios", "productos"])
	),
	validarCampos,
	servirImg
);

module.exports = router;
