const { request, response } = require("express");
const Producto = require("../models/productos.model");

const productoExists = async (req = request, res = response, next) => {
	try {
		const _id = req.params.id;

		const producto = await Producto.where({ estado: true }).findOne({
			_id,
		});

		if (!producto) {
			return res.status(400).json({
				msg: "El id ingresado no corresponde a ningun producto existente",
			});
		} else {
			next();
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			msg: "no se ha podido procesar la solictud",
			err,
		});
	}
};

module.exports = productoExists;
