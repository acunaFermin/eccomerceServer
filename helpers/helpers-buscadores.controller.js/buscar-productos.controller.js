const { ObjectId } = require("mongoose").Types;
const { Producto } = require("../../models");
const filtroBusqueda = require("../buscador-filtro");

const buscarProductos = async (terminoBusqueda = "", res = response) => {
	const esMongoID = ObjectId.isValid(terminoBusqueda);

	const terminos = terminoBusqueda.split(" ");

	if (esMongoID) {
		const producto = await Producto.where({ estado: true }).findOne({
			terminoBusqueda,
		});

		return res.json({
			producto,
		});
	} else {
		const regexTermino = new RegExp(terminos[0], "i");

		let productos = await Producto.where({ estado: true })
			.populate("usuario")
			.populate("categoria")
			.find({
				$or: [
					{
						nombre: regexTermino,
					},
				],
			});
		productos = filtroBusqueda(terminos, productos);

		return res.json({
			productos,
		});
	}
};

module.exports = buscarProductos;
