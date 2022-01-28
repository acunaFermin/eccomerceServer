const { ObjectId } = require("mongoose").Types;
const Usuario = require("../../models/usuario.model");
const filtroBusqueda = require("../buscador-filtro");

const buscarUsuarios = async (terminoBusqueda = "", res = response) => {
	const esMongoID = ObjectId.isValid(terminoBusqueda);

	const terminos = terminoBusqueda.split(" ");

	const regexTermino = new RegExp(terminos[0], "i");

	if (esMongoID) {
		const usuario = await Usuario.where({ estado: true }).findOne({
			terminoBusqueda,
		});

		return res.json({
			usuario,
		});
	} else {
		let usuarios = await Usuario.where({ estado: true }).find({
			$or: [
				{
					nombre: regexTermino,
				},
				{ rol: regexTermino },
				{
					correo: regexTermino,
				},
			],
		});

		usuarios = filtroBusqueda(terminos, usuarios);

		return res.json({
			usuarios,
		});
	}
};

module.exports = buscarUsuarios;
