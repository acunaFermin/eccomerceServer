const dbValidator = require("../helpers/db-validator");
const {
	coleccionesPermitidas,
	rolValidator,
	emailUnique,
} = require("../helpers/db-validator");
const extension = require("../helpers/extension");
const googleVerify = require("../helpers/google-verify");
const JWT = require("../helpers/JWT");
const subirArchivo = require("../helpers/subir-archivo");
const buscarProductos = require("../helpers/helpers-buscadores.controller.js/buscar-productos.controller");
const buscarUsuarios = require("../helpers/helpers-buscadores.controller.js/buscar-usuarios.controller");
const filtroBusqueda = require("../helpers/buscador-filtro");
const prepararProductos = require("../helpers/prepararProductos");
const calcularTotal = require("../helpers/calcularTotal");
const updateStock = require("../helpers/updateStock");

module.exports = {
	dbValidator,
	extension,
	googleVerify,
	JWT,
	coleccionesPermitidas,
	subirArchivo,
	buscarProductos,
	buscarUsuarios,
	filtroBusqueda,
	rolValidator,
	emailUnique,
	prepararProductos,
	calcularTotal,
	updateStock,
};
