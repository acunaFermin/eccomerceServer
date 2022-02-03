const { request, response } = require("express");
const { prepararProductos, calcularTotal, updateStock } = require("../helpers");
const Transacciones = require("../models/transacciones.model");

const nuevaTransaccion = async (req = request, res = response) => {
	const { usuario, cliente, productosReq, descripcion } = req.body;

	//Preparo el array con los nombres, precios... de los productos
	let productos = [];
	productos = await prepararProductos(productosReq);

	//calculo el total de la transaccion
	const total = calcularTotal(productos);

	//actualizo el stock
	updateStock(productosReq, res);

	const transaccion = new Transacciones({
		usuario,
		cliente,
		productos,
		descripcion,
		total,
	});

	await transaccion.save();

	const transa = await Transacciones.find(transaccion)
		.populate("usuario")
		.populate("cliente");

	res.json({
		msj: "nueva transaccion",
		transa,
	});
};

module.exports = nuevaTransaccion;
