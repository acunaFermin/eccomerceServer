const { response } = require("express");
const Producto = require("../models/productos.model");

const updateStock = async (productosReq, res = response) => {
	console.log("Hola Mundo!, update stock");

	let arrayID = [];

	//obtengo un array con ids
	productosReq.forEach((prod) => {
		console.log(prod);
		arrayID.push(prod.prodId);
	});

	//busco los productos
	let productos = await Producto.find().in("_id", arrayID);

	//asocio las cantidades de la request con los id
	const obtCant = (prod) => {
		//para cada producto de la request...
		for (let prodReq of productosReq) {
			//comparo los id de la request con los productos traidos de la db
			if (prodReq.prodId === prod._id.toString()) {
				//cuando los ids coinciden, retorno la cantidad
				return prodReq.cant;
			}
		}
	};

	const update = async (producto, stockActualizado) => {
		await Producto.findByIdAndUpdate(producto._id, {
			stock: Number(stockActualizado),
		});
	};

	//preparo la respuesta
	productos.forEach((producto) => {
		console.log("hola beb");

		//busco las cantidades solicitadas en la request para cada producto
		let cantidadReq = obtCant(producto);
		let stock = producto.stock;

		if (cantidadReq > stock) {
			return res.status(400).json({
				msg: `No hay stock suficiente de ${producto.nombre}. Stock:${stock}`,
			});
		}

		let stockActualizado = stock - cantidadReq;

		update(producto, stockActualizado);

		console.log("cantidad req:", cantidadReq, "stock:", stock);
	});
};

module.exports = updateStock;
