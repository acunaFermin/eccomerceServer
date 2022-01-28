const { request, response } = require("express");
const Categoria = require("../models/categorias.model");

const categoriaExists = async (req = request, res = response, next) => {
	const _id = req.params.id;

	const categoria = await Categoria.where({ estado: true }).findOne({ _id });

	if (categoria) {
		next();
	} else {
		return res.status(400).json({
			msg: "El id ingresado no corresponde a ninguna categoria existente",
		});
	}
};

module.exports = categoriaExists;
