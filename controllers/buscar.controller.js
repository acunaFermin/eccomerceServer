const { response, request } = require("express");
const { buscarProductos, buscarUsuarios } = require("../helpers");

const buscar = (req = request, res = response) => {
	const { coleccion, termino } = req.params;

	const colecciones = ["usuarios", "roles", "categorias", "productos"];

	if (!colecciones.includes(coleccion)) {
		return res.status(400).json({
			msg: `Ingrese una coleccion valida: ${colecciones}`,
		});
	}

	switch (coleccion) {
		case "usuarios":
			return buscarUsuarios(termino, res);
			break;
		case "roles":
			break;
		case "productos":
			return buscarProductos(termino, res);
			break;
		default:
			res.status(500).json({
				msg: "ocurrio un error",
			});
	}

	res.json({ coleccion });
};

module.exports = buscar;
