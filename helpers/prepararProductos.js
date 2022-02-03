const { Producto } = require("../models");

const prepararProductos = async (productosReq = []) => {
	let arrayProductos = [];

	let arrayID = [];

	//obtengo un array con ids
	productosReq.forEach((prod) => {
		arrayID.push(prod.prodId);
	});

	//busco los productos
	const productos = await Producto.find()
		.in("_id", arrayID)
		.populate("categoria");

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

	//preparo la respuesta
	productos.forEach((producto) => {
		//busco las cantidades solicitadas en la request para cada producto
		let cantidad = obtCant(producto);

		arrayProductos.push({
			id: producto._id,
			nombre: producto.nombre,
			categoria: producto.categoria.nombre,
			precio: producto.precio,
			cantidad,
		});
	});

	return arrayProductos;
};

module.exports = prepararProductos;
