const Roles = require("../models/roles.model");
const Usuario = require("../models/usuario.model");

const rolValidator = async (rol = "") => {
	const existRol = await Roles.findOne({ role: rol });
	if (!existRol) {
		throw new Error("El rol ingresado no es valido.");
	} else {
		return true;
	}
};

const emailUnique = async (correo) => {
	const correoExist = await Usuario.findOne({ correo: correo });
	if (correoExist) {
		throw new Error("El correo ingresado ya existe, vo so loko?");
	} else {
		return true;
	}
};

const coleccionesPermitidas = (coleccion, colecciones = []) => {
	if (!colecciones.includes(coleccion)) {
		throw new Error("ingrese una coleccion valida");
	} else {
		return true;
	}
};

module.exports = { rolValidator, emailUnique };
module.exports = coleccionesPermitidas;
