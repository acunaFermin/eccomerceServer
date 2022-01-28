const request = require("express");

const response = require("express");

const Usuario = require("../models/usuario.model");

const Categoria = require("../models/categorias.model");

//obtener todas las categorias
const getCategorias = async (req = request, res = response) => {
	try {
		const { limit, from } = req.query;

		const [categorias, total] = await Promise.all([
			//categorias:
			Categoria.where({ estado: "true" })
				.find()
				.skip(from)
				.limit(limit)
				.populate("usuario", "nombre"),
			//total:
			Categoria.where({ estado: "true" }).countDocuments(),
		]);

		res.json({
			msg: `mostrando ${categorias.length} de ${total} categorias`,
			categorias,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			msg: "Ocurrio un error al procesar la solucitud",
			err,
		});
	}
};

//devolver una unica categoria
const getCatById = async (req = request, res = response) => {
	try {
		const _id = req.params.id;

		const categoria = await Categoria.findOne({ _id }).populate(
			"usuario",
			"nombre"
		);

		if (categoria) {
			return res.json({
				categoria,
			});
		} else {
			return res.status(400).json({
				msg: "La categoria no existe",
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			msg: "Ocurrio un error al procesar la solucitud",
		});
	}
};

//crear nueva categoria
const crearCategoria = async (req = request, res = response) => {
	try {
		const nombre = req.body.nombre;

		const categoriaExists = await Categoria.findOne({ nombre });

		const usuario = req.authUser._id;

		const data = {
			nombre,
			usuario,
		};

		if (categoriaExists) {
			return res.status(400).json({
				msg: `La categoria ${nombre} ya existe en la base de datos`,
			});
		} else {
			const categoria = new Categoria(data);
			await categoria.save();

			res.json({
				msg: "crear nueva categoria",
				categoria,
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

//actualizar categoria
const actualizarCategoria = async (req = request, res = response) => {
	const _id = req.params.id;

	const { nombre, estado } = req.body;

	const categoria = await Categoria.findOneAndUpdate(
		{ _id },
		{ nombre, estado }
	);

	res.json({
		msg: `La categoria ${categoria.nombre} ha sido actualizada`,
		categoria,
	});
};

//borrar categoria
const deleteCategoria = async (req = request, res = response) => {
	try {
		const _id = req.params.id;

		const categoria = await Categoria.findOneAndUpdate(
			{ _id },
			{
				estado: false,
			}
		);

		res.json({
			msg: `La categoria '${categoria.nombre}' ha sido eliminada`,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			msg: "error al procesar la solicitud",
		});
	}
};

module.exports = {
	getCategorias,
	getCatById,
	crearCategoria,
	actualizarCategoria,
	deleteCategoria,
};
