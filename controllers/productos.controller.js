const request = require("express");

const response = require("express");

const Usuario = require("../models/usuario.model");

const Producto = require("../models/productos.model");

const Categoria = require("../models/categorias.model");

//obtener todas las productos
const getProductos = async (req = request, res = response) => {
	try {
		const { limit, from } = req.query;

		const [productos, total] = await Promise.all([
			//productos:
			Producto.where({ estado: "true" })
				.find()
				.skip(from)
				.limit(limit)
				.populate("usuario", "nombre"),
			//total:
			Producto.where({ estado: "true" }).countDocuments(),
		]);

		res.json({
			msg: `mostrando ${productos.length} de ${total} productos`,
			productos,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			msg: "Ocurrio un error al procesar la solucitud",
			err,
		});
	}
};

//devolver una unica producto
const getProdById = async (req = request, res = response) => {
	try {
		const _id = req.params.id;

		const producto = await Producto.findOne({ _id }).populate(
			"usuario",
			"nombre"
		);

		if (producto) {
			return res.json({
				producto,
			});
		} else {
			return res.status(400).json({
				msg: "La producto no existe",
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			msg: "Ocurrio un error al procesar la solucitud",
		});
	}
};

//crear nuevo producto
const crearProducto = async (req = request, res = response) => {
	try {
		const { nombre, categoriaNombre, precio, descripcion = "" } = req.body;

		const [productoExists, categoria] = await Promise.all([
			//productoExists:
			Producto.findOne({ nombre }),
			//categoria:
			Categoria.where({ estado: true }).findOne({
				nombre: categoriaNombre,
			}),
		]);

		const usuario = req.authUser._id;

		if (!categoria) {
			return res.status(400).json({
				msg: "la categoria ingresada no es valida",
			});
		}

		const data = {
			nombre,
			precio,
			descripcion,
			usuario,
			categoria: categoria._id,
		};

		if (productoExists) {
			return res.status(400).json({
				msg: `El producto ${nombre} ya existe en la base de datos`,
			});
		} else {
			const producto = new Producto(data);
			await producto.save();

			res.json({
				msg: `Nuevo producto creado: ${producto.nombre}`,
				producto,
			});
		}
	} catch (err) {
		console.log(err);

		return res.status(500).json({
			msg: "no se pudo completar la solicitud",
			err,
		});
	}
};

//actualizar producto
const actualizarProducto = async (req = request, res = response) => {
	const _id = req.params.id;
	const usuario = req.authUser;

	const { categoriaNombre, ...data } = req.body;

	const categoria = await Categoria.where({ estado: true }).findOne({
		nombre: categoriaNombre,
	});

	if (!categoria) {
		return res.status(400).json({
			msg: "Ingrese una categoria valida",
		});
	}

	const producto = await Producto.findOneAndUpdate(
		{ _id },
		{
			...data,
			categoria: categoria._id,
		}
	);

	res.json({
		msg: `El producto ${producto.nombre} ha sido actualizada`,
		producto,
	});
};

//borrar producto
const deleteProducto = async (req = request, res = response) => {
	try {
		const _id = req.params.id;

		const producto = await Producto.findOneAndUpdate(
			{ _id },
			{
				estado: false,
			}
		);

		res.json({
			msg: `El producto '${producto.nombre}' ha sido eliminada`,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			msg: "error al procesar la solicitud",
		});
	}
};

module.exports = {
	getProductos,
	getProdById,
	crearProducto,
	actualizarProducto,
	deleteProducto,
};
