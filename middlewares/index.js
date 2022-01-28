const validarArchivoUpload = require("../middlewares/validar-archivo-upload");
const validarCampos = require("../middlewares/validar-campos.middleware");
const categoriaExists = require("../middlewares/validar-categoria.middleware");
const productoExists = require("../middlewares/validar-producto.middleware");
const validarRol = require("../middlewares/validar-rol.middleware");
const validarJWT = require("../middlewares/validarJWT.middleware");

module.exports = {
	validarArchivoUpload,
	validarCampos,
	categoriaExists,
	productoExists,
	validarRol,
	validarJWT,
};
